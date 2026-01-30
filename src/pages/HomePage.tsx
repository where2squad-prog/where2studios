'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { ServiceLanePicker } from '@/components/home/ServiceLanePicker'
import { FeaturedWorkStrip } from '@/components/home/FeaturedWorkStrip'
import { ClosingCTA } from '@/components/home/ClosingCTA'
import { Team } from '@/components/Team'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { TrustedBrands } from '@/components/TrustedBrands'
import { Navbar } from '@/components/layout/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <Navbar variant="dark" showServices />
      
      <main className="relative">
        {/* Hero with stats */}
        <HeroSection
          eyebrow="Full Service Media & Marketing Agency"
          title="Building brands people"
          titleAccent="trust."
          subtitle="Creating content that reaches people and builds community"
        />
        
        {/* Trusted Brands */}
        <section className="py-12 sm:py-16 bg-m3-surface-variant">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <TrustedBrands />
          </div>
        </section>
        
        {/* Service Lane Picker */}
        <ServiceLanePicker />
        
        {/* Featured Work Strip */}
        <FeaturedWorkStrip />
        
        {/* Closing CTA with Contact Form */}
        <ClosingCTA />
        
        {/* Team */}
        <Team />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  )
}
