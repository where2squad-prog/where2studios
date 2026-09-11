/**
 * Time boxed UX audit of the production build in dist/.
 *
 * Hard limits: every page load and action gets 10 seconds, the whole run must
 * finish inside 15 minutes, no screenshots. If Chromium cannot launch within
 * 2 minutes the script falls back to static jsdom style checks on dist/ and
 * says so.
 *
 * Run: npm run build && bun scripts/ux-audit.ts
 */
import http from 'node:http'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = join(process.cwd(), 'dist')
const PORT = 4477
const ORIGIN = `http://localhost:${PORT}`
const ACTION_TIMEOUT = 10_000
const CLICK_TIMEOUT = 4_000
const RUN_BUDGET_MS = 15 * 60 * 1000
const START = Date.now()

const ROUTES = [
  '/',
  '/work',
  '/work?view=photos',
  '/work/the-agent-open-san-francisco',
  '/work/dataiku-brand-hq-build-montage',
  '/work/linkedin-feature',
  '/sf-tech-week',
  '/conventions',
  '/conventions/dreamforce',
  '/why-a-dedicated-crew',
  '/services',
  '/contact',
  '/backyard-bayou-socials',
  '/socials',
  '/nope',
]

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]

type Severity = 'blocker' | 'bug' | 'polish'
interface Finding {
  route: string
  viewport: string
  severity: Severity
  what: string
  selector: string
}
const findings: Finding[] = []
const add = (route: string, viewport: string, severity: Severity, what: string, selector = '') =>
  findings.push({ route, viewport, severity, what, selector })

const budgetLeft = () => RUN_BUDGET_MS - (Date.now() - START)

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
}

function resolveFile(pathname: string) {
  const candidates = [
    pathname,
    `${pathname}/index.html`,
    `${pathname.replace(/\/$/, '')}/index.html`,
  ]
  for (const candidate of candidates) {
    const file = join(DIST, candidate)
    if (existsSync(file) && statSync(file).isFile()) return file
  }
  return null
}

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent((req.url ?? '/').split('?')[0])
    const file = resolveFile(pathname)
    if (!file) {
      // Unknown deep links behave like the host does: serve the 404 document.
      const notFound = resolveFile('/404')
      if (notFound) {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(readFileSync(notFound))
        return
      }
      res.writeHead(404)
      res.end('not found')
      return
    }
    const ext = file.slice(file.lastIndexOf('.'))
    res.writeHead(200, { 'content-type': MIME[ext] ?? 'application/octet-stream' })
    res.end(readFileSync(file))
  })
  return new Promise<http.Server>((resolve) => server.listen(PORT, () => resolve(server)))
}

/** Routes that really exist as static documents, used to validate links. */
function knownRoutes() {
  const set = new Set<string>(['/'])
  const sitemap = join(process.cwd(), 'public/sitemap.xml')
  if (existsSync(sitemap)) {
    for (const match of readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const path = new URL(match[1]).pathname.replace(/\/$/, '') || '/'
      set.add(path)
    }
  }
  for (const extra of ['/socials', '/404', '/admin/login', '/admin/social', '/admin/portfolio']) {
    set.add(extra)
  }
  return set
}

async function withTimeout<T>(label: string, work: Promise<T>): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      work,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`timeout: ${label}`)), ACTION_TIMEOUT)
      }),
    ])
  } catch {
    return null
  } finally {
    if (timer) clearTimeout(timer)
  }
}

function printTable() {
  const rows = findings.map((f) => [f.route, f.viewport, f.severity, f.what, f.selector])
  const header = ['route', 'viewport', 'severity', 'what', 'selector']
  const widths = header.map((h, i) =>
    Math.min(60, Math.max(h.length, ...rows.map((r) => (r[i] ?? '').length))),
  )
  const line = (cells: string[]) =>
    '| ' +
    cells.map((c, i) => (c ?? '').slice(0, widths[i]).padEnd(widths[i])).join(' | ') +
    ' |'
  console.log(line(header))
  console.log('|' + widths.map((w) => '-'.repeat(w + 2)).join('|') + '|')
  for (const row of rows) console.log(line(row))
  const count = (s: Severity) => findings.filter((f) => f.severity === s).length
  console.log(
    `\nUX AUDIT: ${findings.length} findings (${count('blocker')} blocker, ${count('bug')} bug, ${count('polish')} polish) in ${Math.round((Date.now() - START) / 1000)}s`,
  )
  writeFileSync('audit-findings.json', JSON.stringify(findings, null, 2))
}

/** Static fallback when the browser cannot start. */
function staticFallback() {
  console.log('Playwright could not launch, falling back to static checks on dist/.')
  const routes = knownRoutes()
  for (const route of ROUTES) {
    const path = route.split('?')[0]
    const file = resolveFile(path)
    if (!file) {
      if (path !== '/nope') add(route, 'static', 'blocker', 'no prerendered HTML in dist')
      continue
    }
    const html = readFileSync(file, 'utf8')
    if (!/<h1[\s>]/.test(html)) add(route, 'static', 'bug', 'no h1 in static HTML', 'h1')
    for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
      const target = match[1].split('?')[0].replace(/\/$/, '') || '/'
      if (!routes.has(target) && !existsSync(join(DIST, target))) {
        add(route, 'static', 'bug', `link to unknown route ${target}`, `a[href="${match[1]}"]`)
      }
    }
  }
  printTable()
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found. Run npm run build first.')
    process.exit(1)
  }
  const server = await startServer()
  const routes = knownRoutes()

  let chromium: typeof import('playwright-core').chromium
  let browser: import('playwright-core').Browser | null = null
  try {
    chromium = (await import('playwright-core')).chromium
    browser = await Promise.race([
      chromium.launch({
        executablePath: process.env.CHROMIUM_PATH ?? '/bin/chromium',
        args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
      }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 120_000)),
    ])
  } catch {
    browser = null
  }
  if (!browser) {
    staticFallback()
    server.close()
    return
  }

  for (const viewport of VIEWPORTS) {
    const vp = `${viewport.width}x${viewport.height}`
    for (const route of ROUTES) {
      if (budgetLeft() < 45_000) {
        console.log(`\nStopped early to stay inside the 15 minute budget (${route} ${vp}).`)
        break
      }
      const context = await browser.newContext({ viewport, ignoreHTTPSErrors: true })
      const page = await context.newPage()
      const consoleErrors: string[] = []
      const badRequests: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 140))
      })
      page.on('pageerror', (err) => consoleErrors.push(`exception: ${err.message.slice(0, 140)}`))
      page.on('response', (res) => {
        const status = res.status()
        if (status >= 400 && new URL(res.url()).host === `localhost:${PORT}`) {
          badRequests.push(`${status} ${new URL(res.url()).pathname}`)
        }
      })

      const loaded = await withTimeout(
        `load ${route}`,
        page.goto(ORIGIN + route, { waitUntil: 'domcontentloaded', timeout: ACTION_TIMEOUT }),
      )
      if (!loaded) add(route, vp, 'blocker', 'page did not load within 10s')
      await page.waitForTimeout(800)

      for (const text of new Set(consoleErrors)) {
        // External players are blocked in this sandbox, so they are not app bugs.
        if (/vimeo|youtube|cloudflare|401|ERR_/i.test(text)) continue
        add(route, vp, /exception/.test(text) ? 'blocker' : 'bug', `console: ${text}`, 'window')
      }
      for (const req of new Set(badRequests)) {
        if (route === '/nope') continue
        add(route, vp, 'bug', `failed request ${req}`, 'network')
      }

      // Horizontal overflow
      const overflow = await withTimeout(
        'overflow',
        page.evaluate((w) => {
          if (document.documentElement.scrollWidth <= w + 1) return null
          for (const el of Array.from(document.querySelectorAll('body *'))) {
            const r = el.getBoundingClientRect()
            if (r.width > 0 && r.right > w + 1) {
              return `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ').slice(0, 3).join('.')}`
            }
          }
          return 'unknown element'
        }, viewport.width),
      )
      if (overflow) add(route, vp, 'bug', 'horizontal overflow', overflow)

      // Internal links resolve
      const links = await withTimeout(
        'links',
        page.evaluate(() =>
          Array.from(document.querySelectorAll('a'))
            .filter((a) => a.getBoundingClientRect().width > 0)
            .map((a) => ({
              href: a.getAttribute('href') ?? '',
              rel: a.getAttribute('rel') ?? '',
              target: a.getAttribute('target') ?? '',
              text: (a.textContent ?? '').trim().slice(0, 30),
            })),
        ),
      )
      for (const link of links ?? []) {
        if (!link.href || link.href === '#') {
          add(route, vp, 'bug', `placeholder or empty href on "${link.text}"`, 'a')
          continue
        }
        if (link.target === '_blank' && !link.rel.includes('noopener')) {
          add(route, vp, 'bug', `target=_blank without rel=noopener on "${link.text}"`, 'a')
        }
        if (link.href.startsWith('/')) {
          const target = link.href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/'
          if (!routes.has(target) && !resolveFile(target)) {
            add(route, vp, 'bug', `link to unknown route ${target}`, `a[href="${link.href}"]`)
          }
        }
      }

      // Buttons: accessible name and tap target
      const buttons = await withTimeout(
        'buttons',
        page.evaluate(() =>
          Array.from(document.querySelectorAll('button,[role=button]'))
            .filter((b) => b.getBoundingClientRect().width > 0)
            .map((b) => {
              const r = b.getBoundingClientRect()
              return {
                name: (
                  b.getAttribute('aria-label') ||
                  (b.textContent ?? '').trim() ||
                  b.querySelector('img')?.getAttribute('alt') ||
                  ''
                ).slice(0, 40),
                w: Math.round(r.width),
                h: Math.round(r.height),
                cls: (b.className || '').toString().split(' ').slice(0, 2).join('.'),
              }
            }),
        ),
      )
      for (const button of buttons ?? []) {
        if (!button.name) add(route, vp, 'bug', 'button without accessible name', `button.${button.cls}`)
        if (viewport.width === 390 && (button.w < 40 || button.h < 40)) {
          add(
            route,
            vp,
            'polish',
            `tap target ${button.w}x${button.h} under 40x40 ("${button.name}")`,
            `button.${button.cls}`,
          )
        }
      }

      await runFlows(route, vp, page)
      await context.close()
    }
  }

  await browser.close()
  server.close()
  printTable()
}

type Page = import('playwright-core').Page

const bodyLocked = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).overflow === 'hidden')

async function runFlows(route: string, vp: string, page: Page) {
  const isMobile = vp.startsWith('390')
  const fail = (what: string, selector = '') => add(route, vp, 'blocker', what, selector)

  try {
    // Mobile hamburger
    if (isMobile) {
      const burger = page.locator('button[aria-label="Open menu"]').first()
      if (await burger.count()) {
        await burger.click({ timeout: CLICK_TIMEOUT })
        const menuLink = page.locator('a', { hasText: 'Work' }).last()
        if (!(await menuLink.isVisible().catch(() => false))) fail('mobile menu did not open')
        if (!(await bodyLocked(page))) add(route, vp, 'bug', 'body scroll not locked with menu open')
        const close = page.locator('button[aria-label="Close menu"]').last()
        await close.click({ timeout: CLICK_TIMEOUT }).catch(() => fail('menu close button failed'))
        await page.waitForTimeout(500)
        if (await bodyLocked(page)) fail('body scroll not restored after closing menu')
      }
    }

    // Announcement bar
    const dismiss = page.locator('[data-announcement-dismiss], button[aria-label*="Dismiss" i]').first()
    if (await dismiss.count()) {
      await dismiss.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
      await page.waitForTimeout(300)
      if (await dismiss.isVisible().catch(() => false)) {
        add(route, vp, 'bug', 'announcement bar dismiss did not hide it', 'announcement bar')
      }
    }

    // Booking sheet from any Book a Call
    const bookButton = page.getByRole('button', { name: /book a call|book coverage like this/i }).first()
    if (await bookButton.count()) {
      await bookButton.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
      await page.waitForTimeout(700)
      const sheet = page.locator('form').filter({ has: page.locator('#booking-name') }).first()
      const nameField = page.locator('#booking-name')
      if (!(await nameField.isVisible().catch(() => false))) {
        fail('Book a Call does not open the booking sheet')
      } else {
        if (route.startsWith('/work/')) {
          // Only projects tied to a conference can prefill it, every case study
          // prefills the deliverable.
          const need = await page
            .locator('#booking-service')
            .inputValue()
            .catch(() => '')
          if (!need) add(route, vp, 'bug', 'booking sheet opened without a prefilled need', '#booking-service')
        }
        const sheetForm = page.locator('form').filter({ has: page.locator('#booking-name') }).first()
        const submit = sheetForm.locator('button[type=submit]').first()
        await submit.scrollIntoViewIfNeeded({ timeout: CLICK_TIMEOUT }).catch(() => {})
        if (isMobile && (await submit.count())) {
          const box = await submit.boundingBox()
          if (box) {
            const covered = await page.evaluate(
              ({ x, y }) => {
                const el = document.elementFromPoint(x, y)
                return el ? !el.closest('form') : true
              },
              { x: box.x + box.width / 2, y: box.y + box.height / 2 },
            )
            if (covered) fail('sheet submit button covered at 390 wide', 'submit button')
          } else {
            fail('sheet submit button not reachable at 390 wide', 'submit button')
          }
        }
        if (await submit.count()) {
          await submit.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
          await page.waitForTimeout(600)
          const invalid = await page.locator('[aria-invalid="true"], [role=alert], form :invalid').count()
          if (!invalid) add(route, vp, 'bug', 'booking sheet shows no validation on empty submit', 'form')
        }
        await page.keyboard.press('Escape')
        await page.waitForTimeout(600)
        if (await nameField.isVisible().catch(() => false)) fail('Escape does not close the booking sheet')
        if (await bodyLocked(page)) fail('body scroll not restored after closing the sheet')
        void sheet
      }
    }

    if (route === '/') {
      // Photo tile opens the lightbox
      const tile = page.locator('button:has(img)').last()
      if (await tile.count()) {
        await tile.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(700)
        const lightbox = page.locator('[role=dialog]').first()
        if (await lightbox.isVisible().catch(() => false)) {
          await page.keyboard.press('Escape')
          await page.waitForTimeout(500)
          if (await lightbox.isVisible().catch(() => false)) fail('lightbox does not close on Escape', '[role=dialog]')
        } else {
          add(route, vp, 'bug', 'photo tile did not open the lightbox', 'button:has(img)')
        }
      }
      // See all photos and films
      const seeAll = page.getByRole('link', { name: /see all photos and films/i }).first()
      if (await seeAll.count()) {
        await seeAll.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(1500)
        if (!page.url().includes('/work')) fail('"See all photos and films" does not land on /work')
        else if (!page.url().includes('view=photos')) {
          add(route, vp, 'bug', '"See all photos and films" does not activate the Photos filter')
        }
        await page.goBack({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(800)
      }
    }

    if (route === '/work') {
      const chip = page.getByRole('button', { name: /photos/i }).first()
      if (!(await chip.count())) fail('no Photos filter chip on /work')
      else {
        const before = await page.locator('main img, main video').count()
        await chip.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(800)
        if (!page.url().includes('view=photos')) fail('filter chip does not update the URL', 'filter chip')
        const after = await page.locator('main img, main video').count()
        if (after === before) add(route, vp, 'bug', 'filter chip did not change the grid', 'filter chip')
      }
    }

    if (route === '/sf-tech-week' || route === '/conventions/dreamforce') {
      const proof = page.locator('main button:has(img), main [role=button]:has(img)').first()
      if (!(await proof.count())) fail('no proof cards', 'main button:has(img)')
      else {
        await proof.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(900)
        const modal = page.locator('iframe, video').first()
        if (!(await modal.isVisible().catch(() => false))) fail('proof card does not open the video modal')
        await page.keyboard.press('Escape')
        await page.waitForTimeout(500)
      }
      if (route === '/sf-tech-week') {
        const quote = page.getByRole('button', { name: /request a quote/i }).first()
        if (await quote.count()) {
          await quote.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
          await page.waitForTimeout(900)
          const pkg = await page
            .locator('select')
            .last()
            .inputValue()
            .catch(() => '')
          if (!pkg) add(route, vp, 'bug', '"Request a quote" does not preselect the package', 'select')
        }
      }
      const formSubmit = page.locator('main form button[type=submit]').first()
      if (await formSubmit.count()) {
        await formSubmit.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(700)
        const invalid = await page.locator('main [aria-invalid="true"], main [role=alert], main form :invalid').count()
        if (!invalid) fail('page form shows no validation on empty submit', 'main form')
      }
      const faq = page.locator('main details summary, main button[aria-expanded]').first()
      if (await faq.count()) {
        const expandedBefore = await faq.getAttribute('aria-expanded')
        await faq.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(500)
        const expandedAfter = await faq.getAttribute('aria-expanded')
        const openNow = await page.locator('main details[open]').count()
        if (expandedBefore === expandedAfter && !openNow) {
          add(route, vp, 'bug', 'FAQ accordion does not toggle', 'FAQ item')
        }
      }
    }

    if (route === '/contact') {
      const submit = page.locator('form button[type=submit]').first()
      if (await submit.count()) {
        await submit.click({ timeout: CLICK_TIMEOUT }).catch(() => {})
        await page.waitForTimeout(700)
        const invalid = await page.locator('[aria-invalid="true"], [role=alert], form :invalid').count()
        if (!invalid) fail('contact form shows no validation on empty submit', 'form')
      }
    }

    if (route === '/socials') {
      if (!page.url().includes('/backyard-bayou-socials')) {
        fail('/socials does not redirect to /backyard-bayou-socials')
      }
    }

    if (route === '/nope') {
      const text = (await page.locator('body').innerText().catch(() => '')) ?? ''
      if (!/not found|404/i.test(text)) fail('unknown URL does not show the 404 page', 'body')
    }

    if (route.startsWith('/work/')) {
      const media = await page.locator('main video, main iframe').count()
      if (!media) add(route, vp, 'bug', 'no video or embed on the case study', 'main')
    }
  } catch (error) {
    add(route, vp, 'polish', `flow aborted: ${(error as Error).message.slice(0, 80)}`, 'flow')
  }
}

await main()
