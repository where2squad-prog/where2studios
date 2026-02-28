import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  schema?: object
}

export function SEOHead({ 
  title, 
  description, 
  image = '/og-image.png',
  url,
  type = 'website',
  schema
}: SEOHeadProps) {
  const fullTitle = title.includes('Where2Studios') ? title : `${title} | Where2Studios`
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}
      
      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

// Common schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Where2Studios",
  "description": "Your Growth Team, On Demand. Strategy first, premium media production, and full service marketing execution for ambitious brands.",
  "url": "https://where2studios.com",
  "logo": "https://where2studios.com/og-image.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "contact@where2studios.com"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Francisco Bay Area",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "sameAs": []
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Where2Studios",
  "description": "Your Growth Team, On Demand. Strategy first, premium media production, and full service marketing execution for ambitious brands.",
  "url": "https://where2studios.com",
  "image": "https://where2studios.com/og-image.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "priceRange": "$$",
  "telephone": "",
  "email": "contact@where2studios.com"
}
