'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="dark" showServices />
      <ServicePageTemplate
        category="Corporate"
        title="Corporate Content"
        subtitle="Professional video production for businesses that want to stand out."
        description="From internal communications to external marketing, we create polished video content that represents your brand at its best."
        whatYouGet={[
          'Brand story videos',
          'Company culture films',
          'Executive interviews',
          'Product demonstrations',
          'Training content',
          'Investor presentations',
        ]}
        howItWorks={[
          {
            step: 1,
            title: 'Discovery',
            description: 'We learn your brand, goals, and audience to create a tailored strategy.',
          },
          {
            step: 2,
            title: 'Production',
            description: 'Professional filming with our experienced crew and equipment.',
          },
          {
            step: 3,
            title: 'Delivery',
            description: 'Polished edits optimized for your platforms and use cases.',
          },
        ]}
        deliverables={[
          'Full-length feature video',
          'Social media cuts',
          'Behind-the-scenes content',
          'Raw footage',
          'Usage rights',
          'Platform optimization',
        ]}
      />
      <Footer />
      <FloatingCTA />
    </div>
  )
}
