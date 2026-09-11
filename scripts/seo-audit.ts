/**
 * SEO + AEO audit of the prerendered output in dist/.
 * Run with: bun scripts/seo-audit.ts
 */

import { readdirSync, readFileSync, statSync } from 'fs'
import { join, relative, sep } from 'path'

const DIST = 'dist'
const SITE = 'https://where2studios.com'

const NOINDEX_ROUTES = ['/privacy', '/terms', '/accessibility', '/404', '/admin/login', '/admin/social', '/admin/portfolio']
const ANSWER_ROUTES = (route: string) =>
  route === '/' ||
  route === '/event-recap-videos' ||
  route === '/sf-tech-week' ||
  route === '/why-a-dedicated-crew' ||
  /^\/conventions\/[^/]+$/.test(route)

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (entry === 'index.html') out.push(p)
  }
  return out
}

function routeOf(file: string) {
  const rel = relative(DIST, file).split(sep).slice(0, -1).join('/')
  return rel ? `/${rel}` : '/'
}

function attr(tag: string, name: string) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'))
  return m ? (m[2] ?? m[3] ?? '') : undefined
}

function tags(html: string, tagName: string) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || []
}

function metaByName(html: string, name: string) {
  for (const t of tags(html, 'meta')) {
    if ((attr(t, 'name') || '').toLowerCase() === name.toLowerCase()) return attr(t, 'content')
  }
}

function metaByProperty(html: string, prop: string) {
  for (const t of tags(html, 'meta')) {
    if ((attr(t, 'property') || '').toLowerCase() === prop.toLowerCase()) return attr(t, 'content')
  }
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function mainHtml(html: string) {
  const m = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)
  return m ? m[1] : ''
}

function textOf(html: string) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim()
}

function wordCount(text: string) {
  return text ? text.split(/\s+/).length : 0
}

type Row = {
  route: string
  fails: string[]
  words: number
  schemas: string[]
}

const files = walk(DIST)
const titles = new Map<string, string[]>()
const descs = new Map<string, string[]>()
const rows: Row[] = []

/** Intentional noindex redirect stubs for old URLs. Not real pages. */
const REDIRECT_ROUTES = ['/socials']

for (const file of files) {
  const route = routeOf(file)
  if (REDIRECT_ROUTES.includes(route)) continue
  const html = readFileSync(file, 'utf8')
  const head = html.slice(0, html.toLowerCase().indexOf('</head>') + 7)
  const main = mainHtml(html)
  const mainText = textOf(main)
  const fails: string[] = []

  // 1 title
  const titleMatches = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1]).trim())
  const title = titleMatches[titleMatches.length - 1] || ''
  if (!title) fails.push('title:missing')
  else {
    if (title.length < 35 || title.length > 65) fails.push(`title:len=${title.length}`)
    titles.set(title, [...(titles.get(title) || []), route])
  }

  // 2 description
  const descAll = tags(head, 'meta')
    .filter((t) => (attr(t, 'name') || '').toLowerCase() === 'description')
    .map((t) => decode(attr(t, 'content') || '').trim())
  const desc = descAll[descAll.length - 1] || ''
  if (!desc) fails.push('desc:missing')
  else {
    if (desc.length < 90 || desc.length > 158) fails.push(`desc:len=${desc.length}`)
    descs.set(desc, [...(descs.get(desc) || []), route])
  }

  // 3 h1
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  if (h1s.length !== 1) fails.push(`h1:count=${h1s.length}`)

  // 4 canonical
  const canonTags = tags(head, 'link').filter((t) => (attr(t, 'rel') || '').toLowerCase() === 'canonical')
  const canon = canonTags.length ? attr(canonTags[canonTags.length - 1], 'href') || '' : ''
  const expected = route === '/' ? `${SITE}/` : `${SITE}${route}`
  if (!canon) fails.push('canonical:missing')
  else if (canonTags.length > 1) fails.push(`canonical:duplicate=${canonTags.length}`)
  else if (canon !== expected) fails.push(`canonical:${canon}!=${expected}`)

  // 5 robots
  const robotsAll = tags(head, 'meta')
    .filter((t) => (attr(t, 'name') || '').toLowerCase() === 'robots')
    .map((t) => attr(t, 'content') || '')
  const robots = robotsAll[robotsAll.length - 1] || ''
  if (!robots) fails.push('robots:missing')
  const shouldNoindex = NOINDEX_ROUTES.includes(route)
  if (shouldNoindex && !/noindex/i.test(robots)) fails.push('robots:should-be-noindex')
  if (!shouldNoindex && /noindex/i.test(robots)) fails.push('robots:unexpected-noindex')

  // 6 social
  const og = {
    title: metaByProperty(head, 'og:title'),
    description: metaByProperty(head, 'og:description'),
    image: metaByProperty(head, 'og:image'),
    url: metaByProperty(head, 'og:url'),
  }
  for (const [k, v] of Object.entries(og)) if (!v) fails.push(`og:${k}:missing`)
  if (og.image && !/^https?:\/\//i.test(og.image)) fails.push('og:image:not-absolute')
  if (!metaByName(head, 'twitter:card')) fails.push('twitter:card:missing')
  if (!metaByName(head, 'twitter:image')) fails.push('twitter:image:missing')

  // 7 JSON-LD
  const ldBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  )
  const schemas: string[] = []
  let faqQuestionCount = 0
  for (const block of ldBlocks) {
    let parsed: any
    try {
      parsed = JSON.parse(decode(block))
    } catch {
      fails.push('jsonld:parse-error')
      continue
    }
    const nodes: any[] = Array.isArray(parsed) ? parsed : parsed['@graph'] ? parsed['@graph'] : [parsed]
    for (const node of nodes) {
      const t = node['@type']
      const list = Array.isArray(t) ? t : [t]
      for (const x of list) if (x) schemas.push(x)
      if (list.includes('FAQPage')) faqQuestionCount += (node.mainEntity || []).length
    }
  }

  // FAQ in DOM: accordion triggers or explicit data attribute
  const domFaq = (main.match(/data-faq-question/g) || []).length
  if (domFaq > 0 && !schemas.includes('FAQPage')) fails.push('faq:dom-without-schema')
  if (domFaq > 0 && schemas.includes('FAQPage') && domFaq !== faqQuestionCount)
    fails.push(`faq:count-mismatch dom=${domFaq} schema=${faqQuestionCount}`)

  // 8 BreadcrumbList
  if (route !== '/' && !schemas.includes('BreadcrumbList')) fails.push('breadcrumb:missing')

  // 9 images alt
  for (const t of tags(html, 'img')) {
    const alt = attr(t, 'alt')
    if (alt === undefined) fails.push('img:alt-missing')
    else if (alt.trim() === '' && !/aria-hidden/i.test(t)) fails.push('img:empty-alt-without-aria-hidden')
  }

  // 10 internal links in main
  const mainLinks = new Set<string>()
  for (const t of tags(main, 'a')) {
    const href = attr(t, 'href') || ''
    if (href.startsWith('/') && !href.startsWith('//')) mainLinks.add(href.split('#')[0])
    else if (href.startsWith(SITE)) mainLinks.add(href.slice(SITE.length) || '/')
  }
  if (mainLinks.size < 3) fails.push(`internal-links:${mainLinks.size}`)

  // 11 answer paragraph
  if (ANSWER_ROUTES(route)) {
    const m = html.match(/<[a-z]+[^>]*id=["']answer["'][^>]*>([\s\S]*?)<\/[a-z]+>/i)
    if (!m) fails.push('answer:missing')
    else {
      const w = wordCount(textOf(m[1]))
      if (w < 24 || w > 70) fails.push(`answer:words=${w}`)
    }
    if (!schemas.includes('WebPage')) fails.push('answer:webpage-schema-missing')
  }

  // 12 empty states
  if (/coming soon/i.test(mainText)) fails.push('content:coming-soon')
  if (/\bloading\b/i.test(mainText)) fails.push('content:loading')

  // 13 heading skip h1 -> h3
  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]))
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i - 1] > 1) fails.push(`heading-skip:h${headings[i - 1]}->h${headings[i]}`)
  }

  rows.push({ route, fails: [...new Set(fails)], words: wordCount(mainText), schemas: [...new Set(schemas)] })
}

// uniqueness
for (const [t, rs] of titles) if (rs.length > 1) for (const r of rs) rows.find((x) => x.route === r)!.fails.push(`title:duplicate(${rs.length})`)
for (const [d, rs] of descs) if (rs.length > 1) for (const r of rs) rows.find((x) => x.route === r)!.fails.push(`desc:duplicate(${rs.length})`)

rows.sort((a, b) => a.route.localeCompare(b.route))

const pad = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s.padEnd(n))
console.log(pad('ROUTE', 44) + pad('WORDS', 7) + pad('SCHEMAS', 46) + 'FAILURES')
console.log('-'.repeat(160))
for (const r of rows) {
  console.log(
    pad(r.route, 44) + pad(String(r.words), 7) + pad(r.schemas.join(','), 46) + (r.fails.length ? r.fails.join(' | ') : 'OK')
  )
}
const failing = rows.filter((r) => r.fails.length)
console.log('-'.repeat(160))
console.log(`${rows.length} routes, ${failing.length} with failures, ${rows.length - failing.length} clean`)
if (failing.length) process.exitCode = 1
