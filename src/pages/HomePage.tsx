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

import { SEOHead, organizationSchema } from '@/components/SEOHead'

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
      
    </div>
    </>
  )
}
