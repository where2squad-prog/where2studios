'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead } from '@/components/SEOHead'

export default function LaunchVideosPage() {
  return (
    <>
      <SEOHead
        title="Launch Videos for Startups | Where2Studios"
        description="Product demos, founder stories, and pitch videos shipped in 1–3 weeks. Clips and cutdowns for every format included."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Launch Videos"
          title="Ship a launch video that builds credibility and closes rounds"
          subtitle="You're launching a product, fundraising, or hiring. You need a video that makes people pay attention. We ship it on your deadline with clips included."
          description="We produce launch-ready video for founders at every stage — from your first product demo to your Series A sizzle reel. Fast deadlines, one point of contact, deliverables that ship."
          whatYouGet={[
            'Launch film (60–90s hero video)',
            'Product demo with screen capture',
            'Founder story / origin video',
            'Social cutdowns (15s, 30s, 60s)',
            'Formats for organic distribution',
            'Formats for paid ads',
            'Pitch deck video insert',
            'Thumbnail and poster frames',
          ]}
          howItWorks={[
            {
              step: 1,
              title: 'Strategy Call',
              description: 'You share your product, audience, and deadline. We build a brief and shot list you can hold us to.',
            },
            {
              step: 2,
              title: 'Produce',
              description: 'Fast, focused shoot day with a senior crew. We handle gear, location, and coordination — you show up.',
            },
            {
              step: 3,
              title: 'Ship',
              description: 'Launch film, social cutdowns, and paid formats delivered on deadline. Two rounds of revisions included.',
            },
          ]}
          deliverables={[
            'Launch film',
            'Product demo',
            'Founder story',
            '15s cutdown',
            '30s cutdown',
            '60s cutdown',
            'Organic formats',
            'Paid ad formats',
            'Pitch deck insert',
            'Poster frames',
          ]}
        />
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
