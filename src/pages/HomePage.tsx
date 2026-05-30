'use client'

import { Navbar } from '@/components/layout/Navbar'
import { ConversionHero } from '@/components/home/ConversionHero'
import { TrustedBrands } from '@/components/TrustedBrands'
import { ServiceLanes } from '@/components/home/ServiceLanes'
import { PositioningSection } from '@/components/home/PositioningSection'
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies'
import { ProcessSection } from '@/components/home/ProcessSection'

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
      <SEOHead
        title="Where2Studios | Your Growth Team, On Demand"
        description="Your Growth Team, On Demand. Strategy first, premium media production, and full service marketing execution for ambitious brands. San Francisco Bay Area."
        schema={organizationSchema}
      />
      <div className="min-h-screen bg-m3-background text-m3-on-background">
      <Navbar variant="dark" />
      
      <main className="relative">
        <ConversionHero />
        <TrustedBrands />
        <ServiceLanes />
        <PositioningSection />
        <FeaturedCaseStudies />
        <ProcessSection />
        
        <FinalCTA />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
    </>
  )
}
