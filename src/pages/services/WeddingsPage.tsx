'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="dark" showServices />
      <ServicePageTemplate
        category="Weddings"
        title="Wedding Films"
        subtitle="Cinematic stories of your most important day, told with heart."
        description="We create wedding films that feel honest and personal. Real moments, real emotions, told beautifully."
        whatYouGet={[
          'Full ceremony coverage',
          'Couples sessions',
          'Family moments',
          'Reception highlights',
          'Drone footage',
          'Audio vows recording',
        ]}
        howItWorks={[
          {
            step: 1,
            title: 'Consultation',
            description: 'We learn your story, vision, and what matters most to you.',
          },
          {
            step: 2,
            title: 'Your Day',
            description: 'Discreet filming that captures authentic moments without intrusion.',
          },
          {
            step: 3,
            title: 'Your Film',
            description: 'A cinematic edit you\'ll want to watch again and again.',
          },
        ]}
        deliverables={[
          'Feature-length film',
          'Highlight reel',
          'Social media teaser',
          'Full ceremony edit',
          'Raw footage',
          'USB delivery',
        ]}
      />
      <Footer />
      <FloatingCTA />
    </div>
  )
}
