import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://where2studios.com'

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
  'event recap video',
  'conference video production',
  'event videography',
  'highlight reel',
  'speaker reel',
  'brand activation video',
]

const BUSINESS_DESCRIPTION =
  'Where2Studios produces event recap videos for conferences, summits and brand activations in San Francisco, San Jose and across the Bay Area. Next day teasers, speaker clips, full recap edits.'

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

interface SEOHeadProps {
  title: string
  description: string
  image?: string
  url?: string
  canonical?: string
  robots?: string
  type?: 'website' | 'article'
  schema?: object | object[]
}

export function SEOHead({
  title,
  description,
  image = '/og-image.png',
  url,
  canonical,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1',
  type = 'website',
  schema,
}: SEOHeadProps) {
  const location = useLocation()
  const fullTitle = title.includes('Where2Studios') ? title : `${title} | Where2Studios`
  const pageUrl = absoluteUrl(canonical || url || location.pathname || '/')
  const imageUrl = absoluteUrl(image)
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Where2Studios" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
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
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
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
  // Paste the real Instagram, YouTube, LinkedIn and TikTok profile URLs here.
  sameAs: [],
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
  image: `${SITE_URL}/og-image.png`,
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
  // Paste the real Instagram, YouTube, LinkedIn and TikTok profile URLs here.
  sameAs: [],
}
