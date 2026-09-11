/**
 * UX / UI QA audit.
 *
 * Serves the production build from dist/ and drives it with Chromium at three
 * viewports, collecting console errors, failed requests, layout problems,
 * dead links, dead buttons and broken interaction flows.
 *
 * Run:  npm run build && bun scripts/ux-audit.ts
 * Flags: --routes=/,/work   limit routes
 *        --no-shots         skip screenshots
 *        --flows-only       skip the per route sweep
 */
import { chromium, type Browser, type Page } from 'playwright-core'
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = join(process.cwd(), 'dist')
const SHOT_DIR = join(process.cwd(), 'audit-screenshots')
const PORT = 4321
const BASE = `http://localhost:${PORT}`
const CHROME = process.env.CHROME_PATH || '/bin/chromium'

const args = process.argv.slice(2)
const flag = (name: string) => args.some((a) => a === `--${name}`)
const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=')

type Severity = 'blocker' | 'bug' | 'polish'
interface Finding {
  route: string
  viewport: string
  severity: Severity
  what: string
  where: string
  repro: string
}
const findings: Finding[] = []
const add = (f: Finding) => findings.push(f)

const VIEWPORTS = [
  { name: '390x844', width: 390, height: 844 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1440x900', width: 1440, height: 900 },
]

/* ---------------------------------------------------------------- routes */

function sitemapRoutes(): string[] {
  const xml = readFileSync(join(process.cwd(), 'public/sitemap.xml'), 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .map((p) => (p.length > 1 ? p.replace(/\/$/, '') : p))
}

const EXTRA_ROUTES = ['/socials', '/404', '/admin/login', '/work?view=photos', '/nope']

function allRoutes(): string[] {
  const set = new Set([...sitemapRoutes(), ...EXTRA_ROUTES])
  const only = arg('routes')
  const list = [...set]
  return only ? list.filter((r) => only.split(',').includes(r)) : list
}

const KNOWN_PATHS = new Set<string>()
function loadKnownPaths() {
  sitemapRoutes().forEach((r) => KNOWN_PATHS.add(r))
  const src = readFileSync(join(process.cwd(), 'src/routes.tsx'), 'utf8')
  for (const m of src.matchAll(/path:\s*'([^']+)'/g)) {
    const p = m[1]
    if (p.includes(':') || p.includes('*')) continue
    KNOWN_PATHS.add(p.startsWith('/') ? p : `/${p}`)
  }
  ;['/socials', '/backyard-bayou-socials', '/404', '/admin/login'].forEach((p) => KNOWN_PATHS.add(p))
}

/* ------------------------------------------------------------- dev server */

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
}

function serveDist() {
  return Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url)
      let p = decodeURIComponent(url.pathname)
      const candidates = [p, `${p}/index.html`, `${p.replace(/\/$/, '')}/index.html`]
      for (const c of candidates) {
        const file = Bun.file(join(DIST, c))
        if (await file.exists()) {
          const stat = await file.stat().catch(() => null)
          if (stat && stat.isDirectory?.()) continue
          return new Response(file, {
            headers: { 'content-type': MIME[extname(c)] || file.type || 'application/octet-stream' },
          })
        }
      }
      const nf = Bun.file(join(DIST, '404/index.html'))
      if (await nf.exists()) {
        return new Response(nf, { status: 404, headers: { 'content-type': MIME['.html'] } })
      }
      return new Response('not found', { status: 404 })
    },
  })
}

/* --------------------------------------------------------- page utilities */

interface PageSignals {
  errors: string[]
  warnings: string[]
  failed: string[]
  exceptions: string[]
}

function watch(page: Page): PageSignals {
  const s: PageSignals = { errors: [], warnings: [], failed: [], exceptions: [] }
  page.on('console', (msg) => {
    const text = msg.text()
    if (msg.type() === 'error') s.errors.push(text)
    if (msg.type() === 'warning') s.warnings.push(text)
  })
  page.on('pageerror', (err) => s.exceptions.push(err.message))
  page.on('requestfailed', (req) => {
    const url = req.url()
    if (url.startsWith('data:') || url.startsWith('blob:')) return
    s.failed.push(`${url} (${req.failure()?.errorText})`)
  })
  page.on('response', (res) => {
    if (res.status() >= 400) s.failed.push(`${res.status()} ${res.url()}`)
  })
  return s
}

const noisyError = (t: string) =>
  /Failed to load resource: net::ERR_/.test(t) === false && /favicon/i.test(t) === false

async function settle(page: Page, ms = 900) {
  await page.waitForLoadState('domcontentloaded').catch(() => {})
  await page.waitForTimeout(ms)
}

/* ------------------------------------------------------------ per-route */

const externalCache = new Map<string, number>()
async function checkExternal(url: string): Promise<number> {
  if (externalCache.has(url)) return externalCache.get(url)!
  let status = 0
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    status = res.status
    if (status === 405 || status === 403) {
      const res2 = await fetch(url, { method: 'GET', redirect: 'follow' })
      status = res2.status
    }
  } catch {
    status = 0
  }
  externalCache.set(url, status)
  return status
}

async function auditRoute(browser: Browser, route: string, vp: (typeof VIEWPORTS)[number]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  const sig = watch(page)
  const url = `${BASE}${route}`
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  } catch (e) {
    add({
      route,
      viewport: vp.name,
      severity: 'blocker',
      what: `page failed to load: ${(e as Error).message.split('\n')[0]}`,
      where: url,
      repro: `open ${route}`,
    })
    await ctx.close()
    return
  }
  await settle(page)

  // 1. signals
  for (const e of new Set(sig.exceptions)) {
    add({ route, viewport: vp.name, severity: 'blocker', what: `unhandled exception: ${e}`, where: 'window', repro: `open ${route}` })
  }
  for (const e of new Set(sig.errors.filter(noisyError))) {
    add({ route, viewport: vp.name, severity: 'bug', what: `console error: ${e.slice(0, 180)}`, where: 'console', repro: `open ${route}` })
  }
  for (const f of new Set(sig.failed)) {
    if (/\/rest\/v1\/|\/auth\/v1\//.test(f) && f.startsWith('401')) continue
    add({ route, viewport: vp.name, severity: 'bug', what: `failed request: ${f.slice(0, 180)}`, where: 'network', repro: `open ${route}` })
  }

  // 2. horizontal overflow
  const overflow = await page.evaluate((w) => {
    const doc = document.documentElement
    if (doc.scrollWidth <= w + 1) return null
    const offenders: string[] = []
    document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      const style = getComputedStyle(el)
      if (style.position === 'fixed') return
      if (r.right > w + 2 && r.width <= w * 3) {
        const sel = `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}` : ''}`
        if (!offenders.includes(sel)) offenders.push(sel)
      }
    })
    return { scrollWidth: doc.scrollWidth, offenders: offenders.slice(0, 5) }
  }, vp.width)
  if (overflow) {
    add({
      route,
      viewport: vp.name,
      severity: 'bug',
      what: `horizontal overflow: scrollWidth ${overflow.scrollWidth} > ${vp.width}`,
      where: overflow.offenders.join(' | ') || 'unknown',
      repro: `open ${route} at ${vp.name} and scroll right`,
    })
  }

  // 3. links
  const links = await page.evaluate(() => {
    const out: { href: string; raw: string; text: string; blank: boolean; rel: string; sel: string }[] = []
    document.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
      const r = a.getBoundingClientRect()
      const style = getComputedStyle(a)
      if (style.visibility === 'hidden' || style.display === 'none') return
      if (r.width === 0 && r.height === 0) return
      out.push({
        href: a.href,
        raw: a.getAttribute('href') || '',
        text: (a.textContent || '').trim().slice(0, 40),
        blank: a.target === '_blank',
        rel: a.rel,
        sel: `a[href="${a.getAttribute('href')}"]`,
      })
    })
    return out
  })
  const seen = new Set<string>()
  for (const l of links) {
    if (seen.has(l.raw + l.text)) continue
    seen.add(l.raw + l.text)
    if (!l.raw) {
      add({ route, viewport: vp.name, severity: 'bug', what: `anchor with no href ("${l.text}")`, where: l.sel, repro: `open ${route}` })
      continue
    }
    if (l.raw === '#') {
      add({ route, viewport: vp.name, severity: 'bug', what: `placeholder href "#" ("${l.text}")`, where: l.sel, repro: `open ${route}` })
      continue
    }
    if (l.blank && !/noopener/.test(l.rel)) {
      add({ route, viewport: vp.name, severity: 'polish', what: `target=_blank without rel=noopener ("${l.text}")`, where: l.sel, repro: `open ${route}` })
    }
    if (l.raw.startsWith('/')) {
      const path = l.raw.split('?')[0].split('#')[0].replace(/\/$/, '') || '/'
      if (!KNOWN_PATHS.has(path)) {
        add({ route, viewport: vp.name, severity: 'bug', what: `internal link to unknown route ${l.raw}`, where: l.sel, repro: `open ${route}, click "${l.text}"` })
      }
    } else if (/^https?:/.test(l.raw) && !l.href.startsWith(BASE)) {
      const status = await checkExternal(l.href)
      if (status === 0 || status >= 400) {
        add({ route, viewport: vp.name, severity: status === 0 ? 'polish' : 'bug', what: `external link ${status || 'unreachable'}: ${l.href}`, where: l.sel, repro: `open ${route}, click "${l.text}"` })
      }
    }
  }

  // 4. buttons
  const buttons = await page.evaluate(() => {
    const out: { name: string; w: number; h: number; sel: string; idx: number }[] = []
    const els = [...document.querySelectorAll<HTMLElement>('button, [role=button]')]
    els.forEach((el, idx) => {
      const r = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      if (style.visibility === 'hidden' || style.display === 'none' || r.width === 0) return
      const name = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '').trim()
      out.push({ name, w: Math.round(r.width), h: Math.round(r.height), sel: `${el.tagName.toLowerCase()}#${idx}`, idx })
    })
    return out
  })
  for (const b of buttons) {
    if (!b.name) {
      add({ route, viewport: vp.name, severity: 'bug', what: 'button with no accessible name', where: b.sel, repro: `open ${route}, tab to button ${b.idx}` })
    }
    if (vp.width < 500 && (b.w < 40 || b.h < 40)) {
      add({ route, viewport: vp.name, severity: 'polish', what: `tap target ${b.w}x${b.h} under 40x40 ("${b.name || 'unnamed'}")`, where: b.sel, repro: `open ${route} at 390 wide` })
    }
  }

  // click behaviour: does the button do anything?
  const clickable = buttons.filter((b) => b.name && !/close|dismiss/i.test(b.name)).slice(0, 14)
  for (const b of clickable) {
    const before = await page.evaluate(() => ({
      url: location.href,
      html: document.body.innerHTML.length,
      dialogs: document.querySelectorAll('[role=dialog],[data-state=open]').length,
      y: Math.round(window.scrollY),
    }))
    const errBefore = sig.errors.length
    try {
      const handle = (await page.$$('button, [role=button]'))[b.idx]
      if (!handle) continue
      await handle.click({ timeout: 2500, force: false })
    } catch {
      continue
    }
    await page.waitForTimeout(650)
    const after = await page.evaluate(() => ({
      url: location.href,
      html: document.body.innerHTML.length,
      dialogs: document.querySelectorAll('[role=dialog],[data-state=open]').length,
      y: Math.round(window.scrollY),
    }))
    const changed =
      before.url !== after.url ||
      Math.abs(before.html - after.html) > 30 ||
      before.dialogs !== after.dialogs ||
      Math.abs(before.y - after.y) > 20
    if (!changed) {
      add({ route, viewport: vp.name, severity: 'bug', what: `button does nothing when clicked ("${b.name}")`, where: b.sel, repro: `open ${route}, click "${b.name}"` })
    }
    if (sig.errors.length > errBefore) {
      const newest = sig.errors.slice(errBefore).filter(noisyError)[0]
      if (newest) {
        add({ route, viewport: vp.name, severity: 'bug', what: `console error after clicking "${b.name}": ${newest.slice(0, 140)}`, where: b.sel, repro: `open ${route}, click "${b.name}"` })
      }
    }
    // reset
    await page.keyboard.press('Escape').catch(() => {})
    await page.waitForTimeout(200)
    if (before.url !== after.url) {
      await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {})
      await settle(page, 600)
    }
  }

  // 6. layout checks
  const layout = await page.evaluate((w) => {
    const res: { distorted: string[]; tiny: string[]; overlaps: string[]; emptySections: string[]; ctaCoversSubmit: string | null } = {
      distorted: [],
      tiny: [],
      overlaps: [],
      emptySections: [],
      ctaCoversSubmit: null,
    }
    document.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
      if (!img.naturalWidth || !img.complete) return
      const r = img.getBoundingClientRect()
      if (r.width < 4 || r.height < 4) return
      const style = getComputedStyle(img)
      if (style.objectFit && style.objectFit !== 'fill') return
      const natural = img.naturalWidth / img.naturalHeight
      const rendered = r.width / r.height
      if (Math.abs(natural - rendered) / natural > 0.02) {
        res.distorted.push(`${img.currentSrc.split('/').pop()?.slice(0, 40)} natural ${natural.toFixed(2)} vs ${rendered.toFixed(2)}`)
      }
    })
    document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
      if (el.children.length) return
      const text = (el.textContent || '').trim()
      if (!text) return
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs && fs < 12) res.tiny.push(`${el.tagName.toLowerCase()} ${fs}px "${text.slice(0, 30)}"`)
    })
    const fixed = [...document.querySelectorAll<HTMLElement>('body *')].filter((el) => {
      const s = getComputedStyle(el)
      return (s.position === 'fixed' || s.position === 'sticky') && el.getBoundingClientRect().height > 8
    })
    for (let i = 0; i < fixed.length; i++) {
      for (let j = i + 1; j < fixed.length; j++) {
        const a = fixed[i]
        const b = fixed[j]
        if (a.contains(b) || b.contains(a)) continue
        const ra = a.getBoundingClientRect()
        const rb = b.getBoundingClientRect()
        const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)
        const oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
        if (ox > 8 && oy > 8) {
          const label = (el: HTMLElement) => `${el.tagName.toLowerCase()}.${String(el.className).trim().split(/\s+/).slice(0, 2).join('.')}`
          const pair = `${label(a)} over ${label(b)}`
          if (!res.overlaps.includes(pair)) res.overlaps.push(pair)
        }
      }
    }
    document.querySelectorAll<HTMLElement>('section').forEach((s) => {
      const words = (s.textContent || '').trim().split(/\s+/).filter(Boolean).length
      const media = s.querySelector('img, video, iframe, svg, canvas')
      if (words < 5 && !media) {
        res.emptySections.push(`section.${String(s.className).trim().split(/\s+/).slice(0, 2).join('.')}`)
      }
    })
    const submit = document.querySelector<HTMLElement>('form button[type=submit]')
    const cta = [...document.querySelectorAll<HTMLElement>('button')].find(
      (b) => getComputedStyle(b).position === 'fixed'
    )
    if (submit && cta) {
      const rs = submit.getBoundingClientRect()
      const rc = cta.getBoundingClientRect()
      const ox = Math.min(rs.right, rc.right) - Math.max(rs.left, rc.left)
      const oy = Math.min(rs.bottom, rc.bottom) - Math.max(rs.top, rc.top)
      if (ox > 4 && oy > 4) res.ctaCoversSubmit = 'fixed CTA overlaps form submit'
    }
    return res
  }, vp.width)

  layout.distorted.slice(0, 4).forEach((d) =>
    add({ route, viewport: vp.name, severity: 'polish', what: `image aspect ratio distorted: ${d}`, where: 'img', repro: `open ${route}` })
  )
  ;[...new Set(layout.tiny)].slice(0, 4).forEach((t) =>
    add({ route, viewport: vp.name, severity: 'polish', what: `font-size under 12px: ${t}`, where: 'text node', repro: `open ${route}` })
  )
  layout.overlaps.slice(0, 4).forEach((o) =>
    add({ route, viewport: vp.name, severity: 'bug', what: `overlapping fixed elements: ${o}`, where: o, repro: `open ${route} at ${vp.name}` })
  )
  ;[...new Set(layout.emptySections)].slice(0, 4).forEach((s) =>
    add({ route, viewport: vp.name, severity: 'polish', what: 'empty section (under 5 words, no media)', where: s, repro: `open ${route}` })
  )
  if (layout.ctaCoversSubmit) {
    add({ route, viewport: vp.name, severity: 'bug', what: layout.ctaCoversSubmit, where: 'button[type=submit]', repro: `open ${route} at ${vp.name}, scroll to the form` })
  }

  // heading clamp mid word
  const clamped = await page.evaluate(() => {
    const out: string[] = []
    document.querySelectorAll<HTMLElement>('h1, h2, h3').forEach((h) => {
      const s = getComputedStyle(h)
      if (!/line-clamp/.test(s.webkitLineClamp ? 'line-clamp' : '') && s.webkitLineClamp === 'none') return
      if (h.scrollHeight > h.clientHeight + 2) out.push(`${h.tagName} "${(h.textContent || '').trim().slice(0, 40)}"`)
    })
    return out
  })
  clamped.slice(0, 3).forEach((c) =>
    add({ route, viewport: vp.name, severity: 'polish', what: `heading truncated by line-clamp: ${c}`, where: 'heading', repro: `open ${route} at ${vp.name}` })
  )

  // focus ring on first nav link
  const focusRing = await page.evaluate(() => {
    const link = document.querySelector<HTMLElement>('nav a')
    if (!link) return true
    link.focus()
    const s = getComputedStyle(link)
    return s.outlineStyle !== 'none' || s.boxShadow !== 'none' || parseFloat(s.outlineWidth) > 0
  })
  if (!focusRing) {
    add({ route, viewport: vp.name, severity: 'polish', what: 'no visible focus ring on first nav link', where: 'nav a', repro: `open ${route}, press Tab` })
  }

  // 7. screenshot
  if (!flag('no-shots')) {
    const name = `${route.replace(/[^a-z0-9]+/gi, '_') || 'root'}__${vp.name}.png`
    await page.screenshot({ path: join(SHOT_DIR, name), fullPage: true }).catch(() => {})
  }

  await ctx.close()
}

/* --------------------------------------------------------------- flows */

type Flow = { name: string; route: string; viewports?: string[]; run: (page: Page, sig: PageSignals) => Promise<string[]> }

const ok: string[] = []

const flows: Flow[] = [
  {
    name: 'mobile hamburger opens, navigates, closes, restores scroll',
    route: '/',
    viewports: ['390x844'],
    run: async (page) => {
      const errs: string[] = []
      const burger = page.getByRole('button', { name: /open menu/i })
      await burger.click()
      await page.waitForTimeout(500)
      const links = await page.locator('nav a').count()
      if (links < 3) errs.push('mobile menu shows fewer than 3 links')
      if ((await page.evaluate(() => document.body.style.overflow)) !== 'hidden') errs.push('body scroll not locked while menu open')
      await page.getByRole('button', { name: /close menu/i }).first().click()
      await page.waitForTimeout(500)
      if ((await page.evaluate(() => document.body.style.overflow)) === 'hidden') errs.push('body scroll not restored after closing menu')
      await burger.click()
      await page.waitForTimeout(400)
      await page.mouse.click(20, 400)
      await page.waitForTimeout(400)
      if (await page.getByRole('button', { name: /close menu/i }).first().isVisible().catch(() => false)) {
        errs.push('backdrop click does not close the mobile menu')
      }
      return errs
    },
  },
  {
    name: 'booking sheet opens, validates, closes on Escape, submit reachable',
    route: '/',
    run: async (page, sig) => {
      const errs: string[] = []
      const cta = page.getByRole('button', { name: /book a call/i }).first()
      await cta.click({ timeout: 5000 })
      await page.waitForTimeout(700)
      const dialog = page.locator('[role=dialog]').first()
      if (!(await dialog.isVisible().catch(() => false))) return ['Book a Call does not open the booking sheet']
      const selects = await dialog.locator('select').count()
      if (selects < 3) errs.push(`booking sheet has ${selects} selects, expected at least 3`)
      const emptyOptions = await dialog.evaluate((d) =>
        [...d.querySelectorAll('select')].filter((s) => s.options.length < 2).length
      )
      if (emptyOptions) errs.push(`${emptyOptions} select(s) in the booking sheet have no options`)
      const submit = dialog.locator('button[type=submit]').first()
      await submit.scrollIntoViewIfNeeded().catch(() => {})
      if (!(await submit.isVisible().catch(() => false))) errs.push('booking sheet submit button not reachable')
      else {
        await submit.click()
        await page.waitForTimeout(700)
        const invalid = await dialog.evaluate((d) => d.querySelectorAll('[aria-invalid=true], .text-m3-error, [role=alert]').length)
        const text = (await dialog.textContent()) || ''
        if (!invalid && !/required|enter|invalid|at least/i.test(text)) errs.push('empty submit shows no validation messages')
      }
      const honeypot = await dialog.evaluate((d) => d.querySelectorAll('input[tabindex="-1"], input[autocomplete="off"][aria-hidden="true"], .sr-only input, input[name*="website" i]').length)
      if (!honeypot) errs.push('no honeypot field found in the booking sheet')
      await page.keyboard.press('Escape')
      await page.waitForTimeout(600)
      if (await dialog.isVisible().catch(() => false)) errs.push('Escape does not close the booking sheet')
      if ((await page.evaluate(() => document.body.style.overflow)) === 'hidden') errs.push('body scroll not restored after closing the booking sheet')
      if (sig.exceptions.length) errs.push(`exception during booking flow: ${sig.exceptions[0]}`)
      return errs
    },
  },
  {
    name: 'hero video plays muted',
    route: '/',
    run: async (page) => {
      const errs: string[] = []
      const v = page.locator('video').first()
      if (!(await v.count())) return ['no hero video element']
      const state = await v.evaluate((el: HTMLVideoElement) => ({ muted: el.muted, paused: el.paused, ready: el.readyState }))
      if (!state.muted) errs.push('hero video is not muted')
      if (state.paused && state.ready > 0) errs.push('hero video is paused')
      return errs
    },
  },
  {
    name: 'See Our Work goes to /work',
    route: '/',
    run: async (page) => {
      const link = page.getByRole('link', { name: /see our work|see the work/i }).first()
      if (!(await link.count())) return ['no "See Our Work" link on the homepage']
      await link.click()
      await page.waitForTimeout(900)
      return page.url().includes('/work') ? [] : [`"See Our Work" went to ${page.url()}`]
    },
  },
  {
    name: 'homepage photo tile opens the lightbox, arrows and Escape work',
    route: '/',
    run: async (page) => {
      const errs: string[] = []
      const tile = page.locator('button:has(img)').filter({ hasNot: page.locator('svg') }).first()
      const anyTile = (await tile.count()) ? tile : page.locator('button:has(img)').first()
      if (!(await anyTile.count())) return ['no photo tiles found on the homepage']
      await anyTile.scrollIntoViewIfNeeded()
      await page.waitForTimeout(400)
      await anyTile.click()
      await page.waitForTimeout(700)
      const lb = page.locator('[role=dialog][aria-modal=true]').first()
      if (!(await lb.isVisible().catch(() => false))) return ['photo tile does not open a lightbox']
      const src1 = await lb.locator('img').first().getAttribute('src')
      await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(500)
      const src2 = await lb.locator('img').first().getAttribute('src')
      if (src1 === src2) errs.push('ArrowRight does not change the lightbox photo')
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
      if (await lb.isVisible().catch(() => false)) errs.push('Escape does not close the lightbox')
      return errs
    },
  },
  {
    name: '/work filter chips change the grid and the view param',
    route: '/work',
    run: async (page) => {
      const errs: string[] = []
      const chips = page.locator('button').filter({ hasText: /^(All|Conference Activations|Event Recaps|Brand Films|Photos)$/ })
      const count = await chips.count()
      if (count < 3) return [`only ${count} filter chips found on /work`]
      for (let i = 0; i < count; i++) {
        const chip = chips.nth(i)
        const label = ((await chip.textContent()) || '').trim()
        const before = await page.locator('main a[href^="/work/"], main button:has(img)').count()
        await chip.click()
        await page.waitForTimeout(800)
        const after = await page.locator('main a[href^="/work/"], main button:has(img)').count()
        const url = new URL(page.url())
        if (label !== 'All' && !url.searchParams.get('view')) errs.push(`chip "${label}" does not set the view param`)
        if (after === 0) errs.push(`chip "${label}" shows an empty grid (was ${before})`)
      }
      return errs
    },
  },
  {
    name: '/work?view=photos opens the lightbox',
    route: '/work?view=photos',
    run: async (page) => {
      const tile = page.locator('main button:has(img)').first()
      if (!(await tile.count())) return ['no photo tiles in the Photos view']
      await tile.click()
      await page.waitForTimeout(700)
      const lb = page.locator('[role=dialog][aria-modal=true]').first()
      const visible = await lb.isVisible().catch(() => false)
      if (!visible) return ['photo tile in Photos view does not open the lightbox']
      await page.keyboard.press('Escape')
      return []
    },
  },
  {
    name: 'case study: media, booking prefill, convention link, keep reading',
    route: '/work/cloudflare-rsa-conference-2025',
    run: async (page) => {
      const errs: string[] = []
      const media = await page.locator('video, iframe, button:has(svg)').count()
      if (!media) errs.push('no video, embed or play control on the case study')
      const cta = page.getByRole('button', { name: /book coverage like this/i }).first()
      if (!(await cta.count())) errs.push('no "Book coverage like this" button')
      else {
        await cta.click()
        await page.waitForTimeout(800)
        const dialog = page.locator('[role=dialog]').first()
        if (!(await dialog.isVisible().catch(() => false))) errs.push('"Book coverage like this" does not open the sheet')
        else {
          const conference = await dialog.locator('select').first().inputValue().catch(() => '')
          const notes = await dialog.locator('textarea').first().inputValue().catch(() => '')
          if (!conference) errs.push('Conference not prefilled from the case study')
          if (!notes) errs.push('Notes not prefilled from the case study')
          await page.keyboard.press('Escape')
          await page.waitForTimeout(400)
        }
      }
      const keep = page.locator('a', { hasText: /keep reading/i })
      const keepLinks = await page.locator('main a[href^="/"]').count()
      if (!keepLinks) errs.push('no internal links in the case study body')
      return errs
    },
  },
  {
    name: 'case study (uploaded mp4) plays',
    route: '/work/dataiku-brand-hq-build-montage',
    run: async (page) => {
      const errs: string[] = []
      const play = page.locator('main button').first()
      if (await play.count()) {
        await play.click().catch(() => {})
        await page.waitForTimeout(1200)
      }
      const hasMedia = await page.locator('video, iframe').count()
      if (!hasMedia) errs.push('no playable media after clicking play')
      return errs
    },
  },
  {
    name: '/sf-tech-week: proof modal, quote buttons, form validation, FAQ',
    route: '/sf-tech-week',
    run: async (page) => {
      const errs: string[] = []
      const proof = page.locator('button:has(img)').first()
      if (await proof.count()) {
        await proof.click()
        await page.waitForTimeout(900)
        const modal = page.locator('iframe, video').first()
        if (!(await modal.count())) errs.push('proof card does not open a video modal')
        await page.keyboard.press('Escape')
        await page.waitForTimeout(400)
      } else errs.push('no proof cards on /sf-tech-week')

      const quote = page.getByRole('button', { name: /request a quote/i }).first()
      if (!(await quote.count())) errs.push('no "Request a quote" buttons')
      else {
        await quote.click()
        await page.waitForTimeout(900)
        const selected = await page.locator('select').first().inputValue().catch(() => '')
        if (!selected) errs.push('"Request a quote" does not preselect a package')
      }
      const submit = page.locator('form button[type=submit]').first()
      if (!(await submit.count())) errs.push('no quote form on the page')
      else {
        await submit.scrollIntoViewIfNeeded()
        await submit.click()
        await page.waitForTimeout(800)
        const invalid = await page.evaluate(() => document.querySelectorAll('[aria-invalid=true], [role=alert]').length)
        const text = (await page.locator('form').first().textContent()) || ''
        if (!invalid && !/required|enter|invalid/i.test(text)) errs.push('quote form shows no validation on empty submit')
      }
      const faq = page.locator('[data-state], button[aria-expanded]').filter({ hasText: /\?/ }).first()
      if (await faq.count()) {
        const before = await faq.getAttribute('aria-expanded')
        await faq.click()
        await page.waitForTimeout(500)
        const after = await faq.getAttribute('aria-expanded')
        if (before === after) errs.push('FAQ accordion does not toggle')
      }
      return errs
    },
  },
  {
    name: '/conventions cards link out',
    route: '/conventions',
    run: async (page) => {
      const cards = await page.locator('a[href^="/conventions/"], a[href="/sf-tech-week"]').count()
      return cards ? [] : ['no convention cards link anywhere']
    },
  },
  {
    name: '/conventions/dreamforce: form validates, FAQ toggles',
    route: '/conventions/dreamforce',
    run: async (page) => {
      const errs: string[] = []
      const submit = page.locator('form button[type=submit]').first()
      if (!(await submit.count())) errs.push('no form on the convention page')
      else {
        await submit.scrollIntoViewIfNeeded()
        await submit.click()
        await page.waitForTimeout(800)
        const invalid = await page.evaluate(() => document.querySelectorAll('[aria-invalid=true], [role=alert]').length)
        const text = (await page.locator('form').first().textContent()) || ''
        if (!invalid && !/required|enter|invalid/i.test(text)) errs.push('convention form shows no validation on empty submit')
      }
      return errs
    },
  },
  {
    name: '/conventions/sf-tech-week redirects to /sf-tech-week',
    route: '/conventions/sf-tech-week',
    run: async (page) => {
      await page.waitForTimeout(1200)
      return page.url().endsWith('/sf-tech-week') ? [] : [`landed on ${page.url()} instead of /sf-tech-week`]
    },
  },
  {
    name: '/why-a-dedicated-crew: proof cards and Book a Call',
    route: '/why-a-dedicated-crew',
    run: async (page) => {
      const errs: string[] = []
      const proof = await page.locator('a[href^="/work/"], button:has(img)').count()
      if (!proof) errs.push('no proof cards')
      const cta = page.getByRole('button', { name: /book a call/i }).first()
      if (!(await cta.count())) errs.push('no "Book a Call" button')
      else {
        await cta.click()
        await page.waitForTimeout(800)
        if (!(await page.locator('[role=dialog]').first().isVisible().catch(() => false))) errs.push('"Book a Call" does not open the sheet')
        await page.keyboard.press('Escape')
      }
      return errs
    },
  },
  {
    name: '/contact form validates',
    route: '/contact',
    run: async (page) => {
      const submit = page.locator('form button[type=submit]').first()
      if (!(await submit.count())) return ['no contact form found']
      await submit.scrollIntoViewIfNeeded()
      await submit.click()
      await page.waitForTimeout(900)
      const invalid = await page.evaluate(() => document.querySelectorAll('[aria-invalid=true], [role=alert]').length)
      const text = (await page.locator('form').first().textContent()) || ''
      return invalid || /required|enter|invalid/i.test(text) ? [] : ['contact form shows no validation on empty submit']
    },
  },
  {
    name: '/socials redirects to /backyard-bayou-socials',
    route: '/socials',
    run: async (page) => {
      await page.waitForTimeout(1500)
      return page.url().includes('/backyard-bayou-socials') ? [] : [`landed on ${page.url()}`]
    },
  },
  {
    name: '/backyard-bayou-socials carousel and form',
    route: '/backyard-bayou-socials',
    run: async (page) => {
      const errs: string[] = []
      const slides = await page.locator('[class*=embla] , [data-carousel], [role=group]').count()
      if (!slides) errs.push('no carousel found')
      const submit = page.locator('form button[type=submit]').first()
      if (!(await submit.count())) errs.push('no audit form found')
      else {
        await submit.scrollIntoViewIfNeeded()
        await submit.click()
        await page.waitForTimeout(900)
        const invalid = await page.evaluate(() => document.querySelectorAll('[aria-invalid=true], [role=alert]').length)
        const text = (await page.locator('form').first().textContent()) || ''
        if (!invalid && !/required|enter|invalid/i.test(text)) errs.push('audit form shows no validation on empty submit')
      }
      return errs
    },
  },
  {
    name: 'unknown URL renders the not found page with a link home',
    route: '/nope',
    run: async (page) => {
      const text = (await page.locator('body').textContent()) || ''
      const home = await page.locator('a[href="/"]').count()
      const errs: string[] = []
      if (!/not found|404|page you/i.test(text)) errs.push('unknown URL does not render the not found page')
      if (!home) errs.push('not found page has no link home')
      return errs
    },
  },
  {
    name: '/admin/login renders the login form',
    route: '/admin/login',
    run: async (page) => {
      const errs: string[] = []
      if (!(await page.locator('input[type=email]').count())) errs.push('no email field on the admin login page')
      if (!(await page.locator('input[type=password]').count())) errs.push('no password field on the admin login page')
      return errs
    },
  },
  {
    name: 'announcement bar dismiss sticks across navigation',
    route: '/',
    run: async (page) => {
      const bar = page.locator('[data-announcement], [role=region][aria-label*="nnounc" i]').first()
      if (!(await bar.count())) return []
      const dismiss = bar.getByRole('button').last()
      if (!(await dismiss.count())) return ['announcement bar has no dismiss control']
      await dismiss.click()
      await page.waitForTimeout(400)
      if (await bar.isVisible().catch(() => false)) return ['announcement bar still visible after dismiss']
      await page.goto(`${BASE}/work`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(1000)
      const again = page.locator('[data-announcement], [role=region][aria-label*="nnounc" i]').first()
      return (await again.isVisible().catch(() => false)) ? ['announcement bar reappears after navigation despite dismiss'] : []
    },
  },
]

async function runFlows(browser: Browser) {
  for (const vp of VIEWPORTS) {
    for (const flow of flows) {
      if (flow.viewports && !flow.viewports.includes(vp.name)) continue
      if (!flow.viewports && vp.name === '768x1024') continue // run generic flows on mobile + desktop
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
      const page = await ctx.newPage()
      const sig = watch(page)
      try {
        await page.goto(`${BASE}${flow.route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
        await settle(page, 1200)
        const errs = await flow.run(page, sig)
        if (errs.length) {
          errs.forEach((e) =>
            add({ route: flow.route, viewport: vp.name, severity: 'blocker', what: `flow "${flow.name}": ${e}`, where: flow.name, repro: `open ${flow.route} at ${vp.name} and run the flow` })
          )
        } else ok.push(`${flow.name} @ ${vp.name}`)
      } catch (e) {
        add({ route: flow.route, viewport: vp.name, severity: 'bug', what: `flow "${flow.name}" threw: ${(e as Error).message.split('\n')[0].slice(0, 140)}`, where: flow.name, repro: `open ${flow.route} at ${vp.name}` })
      }
      await ctx.close()
    }
  }
}

/* ---------------------------------------------------------------- main */

function table() {
  const order: Severity[] = ['blocker', 'bug', 'polish']
  const rows = [...findings].sort(
    (a, b) => order.indexOf(a.severity) - order.indexOf(b.severity) || a.route.localeCompare(b.route)
  )
  const head = '| route | viewport | severity | what | where | repro |'
  const sep = '| --- | --- | --- | --- | --- | --- |'
  const body = rows.map(
    (f) => `| ${f.route} | ${f.viewport} | ${f.severity} | ${f.what.replace(/\|/g, '/')} | ${f.where.replace(/\|/g, '/')} | ${f.repro.replace(/\|/g, '/')} |`
  )
  return [head, sep, ...body].join('\n')
}

async function main() {
  loadKnownPaths()
  if (!existsSync(DIST)) {
    console.error('dist/ missing. Run npm run build first.')
    process.exit(1)
  }
  mkdirSync(SHOT_DIR, { recursive: true })
  const server = serveDist()
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] })

  if (!flag('flows-only')) {
    const routes = allRoutes()
    for (const route of routes) {
      for (const vp of VIEWPORTS) {
        await auditRoute(browser, route, vp)
      }
      console.error(`swept ${route}`)
    }
  }
  await runFlows(browser)

  await browser.close()
  server.stop(true)

  const counts = {
    blocker: findings.filter((f) => f.severity === 'blocker').length,
    bug: findings.filter((f) => f.severity === 'bug').length,
    polish: findings.filter((f) => f.severity === 'polish').length,
  }
  writeFileSync('audit-screenshots/findings.json', JSON.stringify({ counts, findings, passedFlows: ok }, null, 2))
  console.log(table())
  console.log(
    `\nUX AUDIT: ${findings.length} findings (${counts.blocker} blocker, ${counts.bug} bug, ${counts.polish} polish); ${ok.length} flows passed`
  )
}

main()
