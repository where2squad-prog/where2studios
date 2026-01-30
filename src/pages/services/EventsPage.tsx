'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="dark" showServices />
      <ServicePageTemplate
        category="Events"
        title="Event Coverage"
        subtitle="Capture the energy, people, and moments that make your events unforgettable."
        description="Whether it's a conference, launch party, or community gathering, we document your events in a way that extends their impact long after they end."
        whatYouGet={[
          'Full event documentation',
          'Highlight reels',
          'Speaker coverage',
          'Attendee interviews',
          'Social media content',
          'Live streaming support',
        ]}
        howItWorks={[
          {
            step: 1,
            title: 'Pre-Event',
            description: 'We coordinate logistics, scout locations, and plan shot lists.',
          },
          {
            step: 2,
            title: 'Event Day',
            description: 'Our crew captures every important moment with minimal disruption.',
          },
          {
            step: 3,
            title: 'Post-Event',
            description: 'Fast turnaround on highlight content with full edits to follow.',
          },
        ]}
        deliverables={[
          'Same-day social clips',
          'Full highlight reel',
          'Individual session recordings',
          'Photo gallery',
          'Raw footage archive',
          'Multi-platform exports',
        ]}
      />
      <Footer />
      <FloatingCTA />
    </div>
  )
}
