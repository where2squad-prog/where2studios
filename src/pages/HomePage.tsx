'use client'

import { Navbar } from '@/components/layout/Navbar'
import { ConversionHero } from '@/components/home/ConversionHero'
import { TrustedBrands } from '@/components/TrustedBrands'
import { ServiceLanes } from '@/components/home/ServiceLanes'
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies'
import { ProcessSection } from '@/components/home/ProcessSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead, organizationSchema } from '@/components/SEOHead'

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Where2Studios | Full-Service Media & Marketing Agency"
        description="High-end content systems for corporate and events. We plan, produce, and distribute cinematic media that drives real bookings and brand trust. San Francisco Bay Area."
        schema={organizationSchema}
      />
      <div className="min-h-screen bg-m3-background text-m3-on-background">
      <Navbar variant="dark" />
      
      <main className="relative">
        {/* A. Hero - Clear positioning and CTAs */}
        <ConversionHero />
        
        {/* Trusted Brands Logo Marquee */}
        <TrustedBrands />
        
        {/* B. Service Lane Picker */}
        <ServiceLanes />
        
        {/* D. Featured Case Studies */}
        <FeaturedCaseStudies />
        
        {/* E. Process - Make it feel safe */}
        <ProcessSection />
        
        {/* F. Testimonials */}
        <TestimonialsSection />
        
        {/* G. Final CTA */}
        <FinalCTA />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
    </>
  )
}
