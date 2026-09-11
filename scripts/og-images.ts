/**
 * Builds the branded share images written to public/og.
 *
 * Every card is the same composition: a real still from the work, blurred and
 * darkened, the Where2Studios wordmark, a yellow caption line and a quiet
 * white second line. Run with:
 *
 *   bun scripts/og-images.ts
 *
 * Text is converted to vector paths with opentype.js, so nothing depends on the
 * machine having the fonts installed.
 */
import { readFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import opentype from 'opentype.js'
import { createClient } from '@supabase/supabase-js'
import {
  conventions,
  formatEditionRange,
  getNextEdition,
  nextUnknownYear,
} from '../src/lib/conventions'

/* ------------------------------- constants ------------------------------- */

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_DIR = path.join(ROOT, 'public/og')
const LOGO = path.join(ROOT, 'src/assets/where2studios-logo-full.png')

/** --m3-primary in src/index.css: hsl(43 80% 51%). */
const YELLOW = '#E09E24'

const FREDOKA = opentype.parse(
  readFileSync(path.join(ROOT, 'scripts/fonts/Fredoka-SemiBold.ttf')).buffer as ArrayBuffer
)
const INTER = opentype.parse(
  readFileSync(path.join(ROOT, 'scripts/fonts/Inter-Medium.ttf')).buffer as ArrayBuffer
)

const SUPABASE_URL = 'https://ndnuwfsuanbjjtfflbfc.supabase.co'
const SUPABASE_KEY =
  readFileSync(path.join(ROOT, '.env'), 'utf8').match(
    /VITE_SUPABASE_PUBLISHABLE_KEY="([^"]+)"/
  )?.[1] ?? ''

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/* --------------------------------- text ---------------------------------- */

interface TextLine {
  text: string
  font: opentype.Font
  size: number
  color: string
  opacity: number
  tracking: number
}

function measure(line: TextLine) {
  const chars = [...line.text]
  return (
    chars.reduce((w, ch) => w + line.font.getAdvanceWidth(ch, line.size), 0) +
    line.tracking * Math.max(0, chars.length - 1)
  )
}

/** Centred single line as SVG path data, laid out character by character so tracking applies. */
function linePaths(line: TextLine, centerX: number, baseline: number, maxWidth: number) {
  let size = line.size
  while (measure({ ...line, size }) > maxWidth && size > 12) size -= 1
  const scaled = { ...line, size }
  let x = centerX - measure(scaled) / 2
  const parts: string[] = []
  for (const ch of scaled.text) {
    parts.push(scaled.font.getPath(ch, x, baseline, scaled.size).toPathData(2))
    x += scaled.font.getAdvanceWidth(ch, scaled.size) + scaled.tracking
  }
  return `<path d="${parts.join(' ')}" fill="${line.color}" fill-opacity="${line.opacity}"/>`
}

/* -------------------------------- stills --------------------------------- */

const stillCache = new Map<string, Buffer | null>()

async function fetchStill(url: string | null): Promise<Buffer | null> {
  if (!url) return null
  if (stillCache.has(url)) return stillCache.get(url)!
  let buf: Buffer | null = null
  try {
    const res = await fetch(url)
    if (res.ok) {
      const candidate = Buffer.from(await res.arrayBuffer())
      // Reject anything sharp cannot read (error pages, empty bodies).
      await sharp(candidate).metadata()
      buf = candidate
    }
  } catch {
    buf = null
  }
  stillCache.set(url, buf)
  return buf
}

let thumbnails = new Map<string, string | null>()

async function loadThumbnails() {
  const { data, error } = await supabase.from('projects').select('slug, thumbnail_url')
  if (error) throw new Error(`could not read project thumbnails: ${error.message}`)
  thumbnails = new Map((data ?? []).map((row) => [row.slug as string, row.thumbnail_url]))
}

/** First slug in the list whose thumbnail actually downloads. */
async function stillFromSlugs(slugs: string[]): Promise<{ buf: Buffer; slug: string }> {
  for (const slug of slugs) {
    const buf = await fetchStill(thumbnails.get(slug) ?? null)
    if (buf) return { buf, slug }
  }
  throw new Error(`no usable still among: ${slugs.join(', ')}`)
}

/* ------------------------------- composition ------------------------------ */

interface CardSpec {
  file: string
  width: number
  height: number
  still: Buffer
  caption: string
  second: string
}

async function render(spec: CardSpec) {
  const { width: W, height: H } = spec

  const logoWidth = Math.round(W * (spec.height === spec.width ? 0.47 : 0.433)) // ~520 on 1200x630
  const logo = await sharp(spec.still ? LOGO : LOGO)
    .trim({ threshold: 10 })
    .resize({ width: logoWidth })
    .png()
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()
  const logoH = logoMeta.height ?? 0

  // Wordmark block sits a little above the middle, caption lines below it.
  const blockHeight = logoH + Math.round(H * 0.185)
  const top = Math.round((H - blockHeight) / 2 - H * 0.045)
  const logoTop = top
  const captionBaseline = logoTop + logoH + Math.round(H * 0.095)
  const secondBaseline = captionBaseline + Math.round(H * 0.07)
  const maxTextWidth = W - 200 // keeps 80px+ of safe margin on both sides

  const background = await sharp(spec.still)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .blur(18)
    .modulate({ saturation: 1.05 })
    .toColourspace('srgb')
    .toBuffer()

  const scrim = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stop-color="#000000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#000000" fill-opacity="0.55"/>
      <rect width="${W}" height="${H}" fill="url(#fade)"/>
    </svg>`
  )

  const grain = await sharp({
    create: {
      width: Math.round(W / 3),
      height: Math.round(H / 3),
      channels: 3,
      noise: { type: 'gaussian', mean: 128, sigma: 26 },
    },
  })
    .resize(W, H)
    .greyscale()
    .ensureAlpha(0.05)
    .png()
    .toBuffer()

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      ${linePaths(
        {
          text: spec.caption,
          font: FREDOKA,
          size: Math.round(H * 0.0635),
          color: YELLOW,
          opacity: 1,
          tracking: 0.8,
        },
        W / 2,
        captionBaseline,
        maxTextWidth
      )}
      ${linePaths(
        {
          text: spec.second,
          font: INTER,
          size: Math.round(H * 0.0413),
          color: '#FFFFFF',
          opacity: 0.7,
          tracking: 0.6,
        },
        W / 2,
        secondBaseline,
        maxTextWidth
      )}
    </svg>`
  )

  const out = path.join(OUT_DIR, spec.file)
  mkdirSync(path.dirname(out), { recursive: true })

  await sharp(background)
    .composite([
      { input: scrim },
      { input: grain, blend: 'overlay' },
      { input: logo, left: Math.round((W - logoWidth) / 2), top: logoTop },
      { input: text },
    ])
    .png({ compressionLevel: 9, quality: 90, palette: true })
    .toFile(out)

  return out
}

/* --------------------------------- images -------------------------------- */

function conventionSecondLine(slug: string) {
  const convention = conventions.find((c) => c.slug === slug)!
  const edition = getNextEdition(convention)
  return edition
    ? formatEditionRange(edition)
    : `${nextUnknownYear(convention)} dates to be announced`
}

async function main() {
  if (!existsSync(LOGO)) throw new Error(`missing logo at ${LOGO}`)
  await loadThumbnails()

  const written: string[] = []
  const add = async (spec: Omit<CardSpec, 'still'> & { slugs: string[] }) => {
    const { buf } = await stillFromSlugs(spec.slugs)
    written.push(await render({ ...spec, still: buf }))
  }

  const home = {
    caption: 'Conference week video coverage',
    second: 'San Francisco',
    slugs: ['the-agent-open-san-francisco', 'cloudflare-rsa-conference-2025'],
  }

  await add({ file: 'home.png', width: 1200, height: 630, ...home })
  await add({ file: 'home-square.png', width: 1200, height: 1200, ...home })

  await add({
    file: 'sf-tech-week.png',
    width: 1200,
    height: 630,
    caption: 'SF Tech Week video coverage',
    second: 'October 5 to 11, 2026',
    slugs: ['the-agent-open-san-francisco', 'passionfroot-tech-event-recap'],
  })

  await add({
    file: 'why.png',
    width: 1200,
    height: 630,
    caption: 'A dedicated conference week crew',
    second: 'where2studios.com',
    slugs: ['cloudflare-rsa-conference-2025', 'the-agent-open-san-francisco'],
  })

  await add({
    file: 'conventions.png',
    width: 1200,
    height: 630,
    caption: 'San Francisco conference calendar',
    second: 'Video coverage near Moscone',
    slugs: ['immuta-snowflake-summit-2025', 'cloudflare-rsa-conference-2025'],
  })

  for (const convention of conventions.filter((c) => !c.href)) {
    await add({
      file: `conventions/${convention.slug}.png`,
      width: 1200,
      height: 630,
      caption: `${convention.name} video coverage`,
      second: conventionSecondLine(convention.slug),
      slugs: convention.proofSlugs,
    })
  }

  console.log('\nWritten:')
  let over = 0
  for (const file of written) {
    const kb = statSync(file).size / 1024
    if (kb > 400) over += 1
    console.log(`  ${path.relative(ROOT, file).padEnd(40)} ${kb.toFixed(0)} KB`)
  }
  if (over) console.warn(`\n${over} file(s) over 400 KB`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
