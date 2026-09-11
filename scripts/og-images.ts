/**
 * Builds the branded share images written to public/og.
 *
 * Every card is the same composition: a real still from the work, blurred and
 * darkened, the Where2Studios wordmark, a yellow caption line and a quiet
 * white second line. Run with:
 *
 *   bun scripts/og-images.ts
 *
 * Fonts live in scripts/fonts and are exposed to the SVG renderer through a
 * throwaway fontconfig file, so nothing depends on system fonts.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
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
const FONT_DIR = path.join(ROOT, 'scripts/fonts')
const LOGO = path.join(ROOT, 'src/assets/where2studios-logo-full.png')

/** --m3-primary in src/index.css: hsl(43 80% 51%). */
const YELLOW = '#E09E24'

/* Point the SVG renderer at scripts/fonts before sharp is loaded. */
const FC_DIR = path.join(tmpdir(), 'w2s-og-fontconfig')
mkdirSync(path.join(FC_DIR, 'cache'), { recursive: true })
writeFileSync(
  path.join(FC_DIR, 'fonts.conf'),
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONT_DIR}</dir>
  <cachedir>${path.join(FC_DIR, 'cache')}</cachedir>
</fontconfig>`
)
process.env.FONTCONFIG_FILE = path.join(FC_DIR, 'fonts.conf')

const sharp = (await import('sharp')).default
type Sharp = typeof sharp

const FREDOKA = opentype.parse(
  readFileSync(path.join(FONT_DIR, 'Fredoka-SemiBold.ttf')).buffer as ArrayBuffer
)
const INTER = opentype.parse(
  readFileSync(path.join(FONT_DIR, 'Inter-Medium.ttf')).buffer as ArrayBuffer
)

const SUPABASE_URL = 'https://ndnuwfsuanbjjtfflbfc.supabase.co'
const SUPABASE_KEY =
  readFileSync(path.join(ROOT, '.env'), 'utf8').match(
    /VITE_SUPABASE_PUBLISHABLE_KEY="([^"]+)"/
  )?.[1] ?? ''

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/* --------------------------------- text ---------------------------------- */

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`)
}

function textWidth(font: opentype.Font, text: string, size: number, tracking: number) {
  const chars = [...text]
  return (
    chars.reduce((w, ch) => w + font.getAdvanceWidth(ch, size), 0) +
    tracking * Math.max(0, chars.length - 1)
  )
}

interface LineSpec {
  text: string
  font: opentype.Font
  family: string
  weight: number
  size: number
  color: string
  opacity: number
  tracking: number
}

/** Centred line, shrunk until it clears the safe margins. */
function svgLine(line: LineSpec, centerX: number, baseline: number, maxWidth: number) {
  let size = line.size
  while (textWidth(line.font, line.text, size, line.tracking) > maxWidth && size > 12) size -= 1
  return `<text x="${centerX}" y="${baseline}" text-anchor="middle" font-family="${line.family}" font-weight="${line.weight}" font-size="${size}" letter-spacing="${line.tracking}" fill="${line.color}" fill-opacity="${line.opacity}">${escapeXml(line.text)}</text>`
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
async function stillFromSlugs(slugs: string[]): Promise<Buffer> {
  for (const slug of slugs) {
    const buf = await fetchStill(thumbnails.get(slug) ?? null)
    if (buf) return buf
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
  const square = W === H

  const logoWidth = Math.round(square ? W * 0.47 : W * 0.433) // 520 on 1200x630
  const logo = await sharp(LOGO)
    .trim({ threshold: 10 })
    .resize({ width: logoWidth })
    .png()
    .toBuffer()
  const logoH = (await sharp(logo).metadata()).height ?? 0

  // Wordmark block sits a little above the middle, caption lines below it.
  const captionSize = square ? 46 : 40
  const secondSize = square ? 30 : 26
  // Clear space between the trimmed wordmark and the top of the caption glyphs.
  const captionClearance = square ? 44 : 36
  const captionGap = captionClearance + Math.round(captionSize * 0.75)
  const secondGap = square ? 52 : 44
  const blockHeight = logoH + captionGap + secondGap
  const logoTop = Math.max(
    48,
    Math.round((H - blockHeight) / 2 - H * 0.05) - 30 // group reads centred as a whole
  )
  const captionBaseline = logoTop + logoH + captionGap
  const secondBaseline = captionBaseline + secondGap
  const maxTextWidth = W - 200 // keeps 80px+ of safe margin on both sides

  const background = await sharp(spec.still)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .blur(10)
    .modulate({ saturation: 1.05 })
    .toColourspace('srgb')
    .toBuffer()

  // Vignette centre: the middle of the wordmark plus caption group.
  const vignetteY = Math.round((logoTop + secondBaseline) / 2)

  const scrim = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0.45"/>
        </linearGradient>
        <radialGradient id="vignette" cx="0.5" cy="${(vignetteY / H).toFixed(3)}" r="0.62">
          <stop offset="0" stop-color="#000000" stop-opacity="0.45"/>
          <stop offset="0.6" stop-color="#000000" stop-opacity="0.24"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#000000" fill-opacity="0.45"/>
      <rect width="${W}" height="${H}" fill="url(#vignette)"/>
      <rect width="${W}" height="${H}" fill="url(#fade)"/>
    </svg>`
  )


  // Faint film grain so the blurred still does not look like flat plastic.
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
      ${svgLine(
        {
          text: spec.caption,
          font: FREDOKA,
          family: 'Fredoka',
          weight: 600,
          size: captionSize,
          color: YELLOW,
          opacity: 1,
          tracking: 1,
        },
        W / 2,
        captionBaseline,
        maxTextWidth
      )}
      ${svgLine(
        {
          text: spec.second,
          font: INTER,
          family: 'Inter',
          weight: 500,
          size: secondSize,
          color: '#FFFFFF',
          opacity: 0.7,
          tracking: 0.5,
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
    .png({ compressionLevel: 9, palette: true, quality: 90 })
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
    written.push(await render({ ...spec, still: await stillFromSlugs(spec.slugs) }))
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
    console.log(`  ${path.relative(ROOT, file).padEnd(42)} ${kb.toFixed(0)} KB`)
  }
  if (over) console.warn(`\n${over} file(s) over 400 KB`)
}

await main()
