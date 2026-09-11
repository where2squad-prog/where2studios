'use client'

import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { ConversionHero } from '@/components/home/ConversionHero'
import { TrustedBrands } from '@/components/TrustedBrands'
import { TechWeekHomeBlock } from '@/components/techweek/TechWeekCallout'
import { ServiceLanes } from '@/components/home/ServiceLanes'
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies'
import { ProcessSection } from '@/components/home/ProcessSection'
import { Team } from '@/components/Team'

import { FinalCTA } from '@/components/home/FinalCTA'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'

import { SEOHead, organizationSchema } from '@/components/SEOHead'

/*
 * Pass 7 salvage notes — content migrated from deleted /startups route (StartupsPage.tsx).
 * Review before Pass 9 copy compression to decide what (if anything) belongs on the homepage.
 *
 * Headline (from StartupsPage hero):
 *   "We help ambitious brands look established, credible, and unforgettable."
 *
 * "Why Us" bullets (from StartupsPage):
 *   - Strategy first — every project starts with a plan
 *   - Built for startups, scaling brands, and ambitious teams
 *   - Deliverables shipped on your timeline, not ours
 *   - Content built to drive growth, not just look good
 *   - One producer, one point of contact, zero confusion
 *   - Clips, cutdowns, and formats included with every project
 */

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <SEOHead
        title="Convention Week Video Coverage in San Francisco | Where2Studios"
        description="Where2Studios covers convention week brand headquarters in San Francisco. Cloudflare at RSA Conference, Google Pixel House, Immuta at Snowflake Summit, OwnBackup at Dreamforce."
        url="https://where2studios.com/"
        schema={organizationSchema}
      />
      <div className="min-h-screen bg-m3-background text-m3-on-background">
      <Navbar variant="dark" />
      
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        <ConversionHero />
        <TechWeekHomeBlock />
        <TrustedBrands />
        <ServiceLanes />
        <FeaturedCaseStudies />
        <Team limit={4} />
        <ProcessSection />
        
        <FinalCTA />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
    </>
  )
}
