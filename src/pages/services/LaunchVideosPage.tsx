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
        description="Product demos, explainer videos, founder stories, and pitch videos that help startups build credibility and close investors. Launch-ready in 1–3 weeks."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Launch Videos"
          title="Videos that launch products and close rounds"
          subtitle="Cinematic product demos, explainers, and founder stories that make investors lean in and customers click buy."
          description="We produce launch-ready video for startups at every stage — from your first product demo to your Series A sizzle reel. Fast turnarounds, founder-friendly process, no fluff."
          whatYouGet={[
            'Launch film (60–90s hero video)',
            'Product demo with screen capture',
            'Founder story / origin video',
            'Cutdowns for social (15s, 30s, 60s)',
            'Versions optimized for organic',
            'Versions optimized for paid ads',
            'Pitch deck video insert',
            'Thumbnail and poster frames',
          ]}
          howItWorks={[
            {
              step: 1,
              title: 'Strategy Call',
              description: 'We learn your product, audience, and launch timeline. You walk away with a creative brief and shot list.',
            },
            {
              step: 2,
              title: 'Produce',
              description: 'Fast, focused shoot day with a senior crew. We handle everything — gear, location, talent coordination.',
            },
            {
              step: 3,
              title: 'Deliver',
              description: 'Polished edits in all formats — hero video, social cutdowns, paid versions. Two rounds of revisions included.',
            },
          ]}
          deliverables={[
            'Launch film',
            'Product demo',
            'Founder story',
            '15s cutdown',
            '30s cutdown',
            '60s cutdown',
            'Organic versions',
            'Paid ad versions',
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
