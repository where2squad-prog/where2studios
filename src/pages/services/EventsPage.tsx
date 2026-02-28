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
        title="Event Recaps for Startups | Where2Studios"
        description="Cinematic event coverage — highlight films, speaker moments, social cutdowns, and next-day teasers for demo days, meetups, and launch parties."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Event Recaps"
          title="Cinematic coverage that sells the next event"
          subtitle="Demo days, meetups, launch parties — we capture the energy and turn it into content that keeps working long after the room clears."
          description="Multi-camera coverage, same-day teasers, and polished recaps designed for startups that need to extend event impact and drive attendance to the next one."
          whatYouGet={[
            'Highlight film (2–4 min recap)',
            'Speaker moments and soundbites',
            'Social cutdowns (15s, 30s, 60s)',
            'Next-day teaser option (24hr turnaround)',
            'Sponsor and partner reels',
            'Photo selects from the event',
            'Multi-camera coverage',
            'B-roll and atmosphere footage',
          ]}
          howItWorks={[
            {
              step: 1,
              title: 'Pre-Production',
              description: 'Shot list, schedule coordination, and crew briefing 1–2 weeks before your event. No surprises on show day.',
            },
            {
              step: 2,
              title: 'Show Day',
              description: 'Multi-camera crew captures speakers, crowd energy, and key moments. Optional same-day teaser edit for social.',
            },
            {
              step: 3,
              title: 'Post-Production',
              description: 'Full highlight film, speaker clips, and social cutdowns delivered within 1–2 weeks. Two rounds of revisions included.',
            },
          ]}
          deliverables={[
            'Highlight film',
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
