'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'

import { SEOHead } from '@/components/SEOHead'

export default function ProductionPage() {
  return (
    <>
      <SEOHead
        title="High Impact Media Production | Where2Studios"
        description="Premium media that builds trust fast. Cinematic video, photography, podcasts, and event coverage — built to look established and feel unforgettable."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="High Impact Media Production"
          title="Premium media that builds trust fast"
          subtitle="Cinematic video, photography, podcasts, and event coverage — built to look established and feel unforgettable."
          description="Premium content that makes your brand look as powerful as it is. One team, one process, every format you need."
          whatYouGet={[
            'Brand and launch videos',
            'Product and lifestyle photography',
            'Podcast production',
            'Event coverage and recaps',
          ]}
          howItWorks={[
            { step: 1, title: 'Goal and creative direction', description: 'We align on the story, the tone, and the outcome.' },
            { step: 2, title: 'Plan the shoot and deliverables', description: 'Shot list, schedule, crew, and asset breakdown confirmed.' },
            { step: 3, title: 'Production day', description: 'Senior crew, efficient shoot, no wasted time.' },
            { step: 4, title: 'Edit and deliver', description: 'Assets delivered ready to post — every format, every platform.' },
          ]}
          deliverables={[
            'Hero video',
            'Social cutdowns',
            'Photo selects',
            'Podcast episodes',
            'Event recap',
            'B-roll package',
          ]}
          bottomCtaHeadline="Tell us what you're making"
          bottomCtaSubheadline="We'll confirm deliverables, timeline, and what success looks like."
          bottomCtaPrimary="Book a Strategy Call"
          bottomCtaSecondary="See Our Work"
          bottomCtaSecondaryHref="/work"
        />
        <Footer />
        
      </div>
    </>
  )
}
