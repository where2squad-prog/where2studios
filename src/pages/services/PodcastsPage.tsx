'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="dark" />
      <ServicePageTemplate
        category="Podcasts"
        title="Podcast Production"
        subtitle="Full-service podcast production that builds your authority and grows your audience."
        description="From recording to distribution, we handle every aspect of your podcast so you can focus on the conversation."
        whatYouGet={[
          'Studio or remote recording',
          'Professional audio editing',
          'Video podcast production',
          'Guest coordination',
          'Show branding & intros',
          'Social media clips',
        ]}
        howItWorks={[
          {
            step: 1,
            title: 'Strategy',
            description: 'We define your show format, target audience, and content roadmap.',
          },
          {
            step: 2,
            title: 'Record',
            description: 'Professional recording with quality audio and optional video.',
          },
          {
            step: 3,
            title: 'Distribute',
            description: 'Edited episodes, social clips, and distribution across all platforms.',
          },
        ]}
        deliverables={[
          'Full episodes',
          'Video podcast cuts',
          'Social media clips',
          'Show notes',
          'Audiograms',
          'Platform distribution',
        ]}
      />
      <Footer />
      <FloatingCTA />
    </div>
  )
}
