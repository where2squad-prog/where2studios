'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedInstagramSection } from '@/components/home/FeaturedInstagramSection'
import { FeaturedProductions } from '@/components/home/FeaturedProductions'
import { ClosingCTA } from '@/components/home/ClosingCTA'
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
          title="Building brands"
          titleAccent="TRUST"
          subtitle="Creating content that reaches people and builds community"
        />
        
        {/* Trusted Brands */}
        <section className="py-10 sm:py-12 bg-m3-surface-variant">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <TrustedBrands />
          </div>
        </section>
        
        {/* Featured Instagram Section (powered by ig_social_global_rankings) */}
        <FeaturedInstagramSection />
        
        {/* Featured Productions Section */}
        <FeaturedProductions />
        
        {/* Closing CTA with Contact Form */}
        <ClosingCTA />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  )
}
