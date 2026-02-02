'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function CommercialsPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="dark" />
      <ServicePageTemplate
        category="Commercials"
        title="Commercials & Ads"
        subtitle="Broadcast-quality video ads that drive action."
        description="From concept to final cut, we produce commercials that work across TV, digital, and social platforms. Built to convert."
        whatYouGet={[
          'Creative concepting',
          'Script development',
          'Talent coordination',
          'Location scouting',
          'Professional production',
          'Color grading',
        ]}
        howItWorks={[
          {
            step: 1,
            title: 'Creative Brief',
            description: 'We define the message, audience, and creative direction.',
          },
          {
            step: 2,
            title: 'Production',
            description: 'Full-service filming with professional crew and equipment.',
          },
          {
            step: 3,
            title: 'Post-Production',
            description: 'Editing, sound design, and delivery in all required formats.',
          },
        ]}
        deliverables={[
          'Hero commercial',
          'Multiple cut lengths',
          'Social adaptations',
          'Sound design',
          'Color grade',
          'Format conversions',
        ]}
      />
      <Footer />
      <FloatingCTA />
    </div>
  )
}
