import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://where2studios.com'

/** Build date, baked into the static HTML at prerender time. */
export const BUILD_DATE = new Date().toISOString().slice(0, 10)

export const areaServed = [
  { '@type': 'City', name: 'San Francisco' },
  { '@type': 'City', name: 'Oakland' },
  { '@type': 'City', name: 'San Jose' },
  { '@type': 'City', name: 'Sunnyvale' },
  { '@type': 'City', name: 'Berkeley' },
  { '@type': 'City', name: 'Union City' },
  { '@type': 'City', name: 'Fremont' },
  { '@type': 'City', name: 'Santa Clara' },
  { '@type': 'City', name: 'Palo Alto' },
  { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
]

const knowsAbout = [
  'convention week video coverage',
  'brand headquarters film',
  'event recap video',
  'conference video production',
  'event videography',
  'highlight reel',
  'speaker reel',
  'brand activation video',
  'Event Photography',
]

const BUSINESS_DESCRIPTION =
  'Where2Studios produces event recap videos for conferences, summits and brand activations in San Francisco, San Jose and across the Bay Area. Next day teasers, speaker clips, full recap edits.'

/** Profiles linked in the site navigation. Add YouTube and TikTok here once those handles are confirmed. */
export const sameAs = [
  'https://www.instagram.com/where2studios/',
  'https://www.linkedin.com/company/where2studios/',
]

const LOGO_URL = `${SITE_URL}/email-assets/logo-circle.png`
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const BRAND_SUFFIX = ' | Where2Studios'

/** Keeps <title> inside the 35 to 62 character window search results render. */
export function normalizeTitle(raw: string) {
  let base = raw.replace(/\s*\|\s*Where2Studios(\s+Case Study)?\s*$/i, '').trim()

  // Drop trailing keyword segments until the branded title fits.
  while (base.length + BRAND_SUFFIX.length > 62 && base.includes(' | ')) {
    base = base.slice(0, base.lastIndexOf(' | ')).trim()
  }

  let full = base.length + BRAND_SUFFIX.length <= 62 ? `${base}${BRAND_SUFFIX}` : base
  if (full.length > 62) {
    full = full.slice(0, 62)
    const cut = full.lastIndexOf(' ')
    if (cut > 40) full = full.slice(0, cut)
    full = full.replace(/[,;:.\-\s|]+$/, '')
  }
  return full
}

const DESCRIPTION_TAIL =
  ' Where2Studios covers convention week brand headquarters, suites and side events in San Francisco.'

/** Keeps meta description inside the 90 to 158 character window. */
export function normalizeDescription(raw: string) {
  let d = raw.replace(/\s+/g, ' ').trim()

  if (d.length < 90) {
    d = `${d}${d.endsWith('.') ? '' : '.'}${DESCRIPTION_TAIL}`.trim()
  }

  if (d.length > 158) {
    const sentenceEnd = d.lastIndexOf('. ', 158)
    if (sentenceEnd >= 90) {
      d = d.slice(0, sentenceEnd + 1)
    } else {
      d = d.slice(0, 158)
      const cut = d.lastIndexOf(' ')
      if (cut > 90) d = d.slice(0, cut)
      d = d.replace(/[,;:\-\s]+$/, '')
    }
  }
  return d
}

const SEGMENT_LABELS: Record<string, string> = {
  work: 'Work',
  conventions: 'Convention calendar',
  services: 'Services',
  contact: 'Contact',
  socials: 'Social media management',
  'who-we-are': 'About',
  'sf-tech-week': 'SF Tech Week',
  'event-recap-videos': 'Event recap videos',
  'why-a-dedicated-crew': 'Why a dedicated crew',
  where2boys: 'Where2Boys',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  accessibility: 'Accessibility',
  '404': 'Page not found',
  admin: 'Admin',
  login: 'Login',
}

function humanize(segment: string) {
  return (
    SEGMENT_LABELS[segment] ??
    segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

function buildBreadcrumb(pathname: string, leafName: string) {
  const segments = pathname.split('/').filter(Boolean)
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }]
  let acc = ''
  segments.forEach((segment, index) => {
    acc += `/${segment}`
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: index === segments.length - 1 ? leafName : humanize(segment),
      item: `${SITE_URL}${acc}`,
    })
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

interface SEOHeadProps {
  title: string
  description: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  url?: string
  canonical?: string
  robots?: string
  type?: 'website' | 'article'
  schema?: object | object[]
  /** Page carries an #answer paragraph: emit a WebPage node with speakable. */
  answer?: boolean
  /** Overrides the auto generated breadcrumb leaf label. */
  breadcrumbName?: string
}

export function SEOHead({
  title,
  description,
  image = '/og-image.png',
  imageWidth = 1200,
  imageHeight = 630,
  url,
  canonical,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1',
  type = 'website',
  schema,
  answer,
  breadcrumbName,
}: SEOHeadProps) {
  const location = useLocation()
  const fullTitle = normalizeTitle(title)
  const metaDescription = normalizeDescription(description)
  const rawPath = canonical || url || location.pathname || '/'
  const absolute = absoluteUrl(rawPath)
  const pageUrl = absolute === `${SITE_URL}/` ? absolute : absolute.replace(/\/$/, '')
  const imageUrl = absoluteUrl(image)
  const pathname = pageUrl.replace(SITE_URL, '') || '/'

  const provided = schema ? (Array.isArray(schema) ? schema : [schema]) : []
  const schemas = [...provided]

  const hasBreadcrumb = provided.some((item: any) => {
    const t = item?.['@type']
    return Array.isArray(t) ? t.includes('BreadcrumbList') : t === 'BreadcrumbList'
  })
  if (!hasBreadcrumb && pathname !== '/') {
    schemas.push(buildBreadcrumb(pathname, breadcrumbName || fullTitle.replace(BRAND_SUFFIX, '')))
  }

  if (answer) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: fullTitle,
      description: metaDescription,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      dateModified: BUILD_DATE,
      primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#answer'],
      },
    })
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Where2Studios" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />

      {/* Schema.org */}
      {schemas.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}

// Common schemas
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: 'Where2Studios',
  url: SITE_URL,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  description: BUSINESS_DESCRIPTION,
  email: 'contact@where2studios.com',
  priceRange: '$$$',
  // Replace with the real street address and postal code once the Google Business Profile is set up,
  // and keep geo.position in index.html in sync with it.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco Bay Area',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed,
  knowsAbout,
  sameAs,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Video production services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Recap Video Production' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conference and Summit Coverage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Speaker and Panel Clips' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Activation Films' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Photography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Content and Management' } },
    ],
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: 'Where2Studios',
  url: SITE_URL,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  description: BUSINESS_DESCRIPTION,
  email: 'contact@where2studios.com',
  priceRange: '$$$',
  // Replace with the real street address and postal code once the Google Business Profile is set up,
  // and keep geo.position in index.html in sync with it.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco Bay Area',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed,
  knowsAbout,
  sameAs,
}
