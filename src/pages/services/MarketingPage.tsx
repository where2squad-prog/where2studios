'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead } from '@/components/SEOHead'

export default function MarketingPage() {
  return (
    <>
      <SEOHead
        title="Full Service Marketing Execution | Where2Studios"
        description="Execution that makes your media perform. We manage distribution, campaigns, and optimization so your content drives measurable growth."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Full Service Marketing Execution"
          title="Execution that makes your media perform"
          subtitle="We manage distribution, campaigns, and optimization so your content drives measurable growth."
          description="We don't just hand you content — we help it perform. Distribution, ads, email, and campaign management under one roof."
          whatYouGet={[
            'Social media management',
            'Paid ads',
            'Email marketing',
            'Distribution and campaign management',
            'Analytics and optimization',
          ]}
          howItWorks={[
            { step: 1, title: 'Align on KPI and offer', description: 'We define the metric that matters and the offer that converts.' },
            { step: 2, title: 'Build the content system', description: 'We create the assets, calendar, and distribution plan.' },
            { step: 3, title: 'Launch campaigns', description: 'We go live across channels with tracking in place.' },
            { step: 4, title: 'Report, learn, improve', description: 'We share results and refine the next cycle.' },
          ]}
          deliverables={[
            'Social content calendar',
            'Ad creatives',
            'Email sequences',
            'Campaign reports',
            'Distribution plan',
            'Performance dashboard',
          ]}
          bottomCtaHeadline="Stop guessing"
          bottomCtaSubheadline="Book a strategy call — we'll tell you what to run and why."
          bottomCtaPrimary="Book a Strategy Call"
          bottomCtaSecondary="Start Your Project"
          bottomCtaSecondaryHref="/contact"
        />
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
