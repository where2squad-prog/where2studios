'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead } from '@/components/SEOHead'

export default function EventRecapsPage() {
  return (
    <>
      <SEOHead
        title="Event Recaps | Where2Studios"
        description="Recap films, speaker clips, and social cutdowns shipped on your timeline. Next-day teasers available. Extend your event ROI and drive attendance to the next one."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Event Recaps"
          title="Ship a recap that drives attendance to the next one"
          subtitle="You're hosting a demo day, conference, or launch party. You need a recap film, speaker clips, and social cutdowns — shipped on your timeline."
          description="Multi-camera coverage, next-day teasers, and polished recap films with clips and cutdowns for every format. Built for brands that want to extend event ROI."
          whatYouGet={[
            'Recap film (2–4 min highlight)',
            'Speaker clips and soundbites',
            'Social cutdowns (15s, 30s, 60s)',
            'Next-day teaser (24hr timeline)',
            'Sponsor and partner reels',
            'Photo selects from the event',
            'Multi-camera coverage',
            'B-roll and atmosphere footage',
          ]}
          howItWorks={[
            {
              step: 1,
              title: 'Pre-Production',
              description: 'Shot list, schedule, and crew briefing 1–2 weeks before your event. No surprises on show day.',
            },
            {
              step: 2,
              title: 'Show Day',
              description: 'Multi-camera crew captures speakers, crowd energy, and key moments. Optional next-day teaser shipped in 24 hours.',
            },
            {
              step: 3,
              title: 'Ship',
              description: 'Recap film, speaker clips, and social cutdowns shipped within 1–2 weeks. Two rounds of revisions included.',
            },
          ]}
          deliverables={[
            'Recap film',
            'Speaker clips',
            'Next-day teaser',
            '15s cutdown',
            '30s cutdown',
            '60s cutdown',
            'Sponsor reels',
            'Photo selects',
            'B-roll package',
          ]}
        />
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
