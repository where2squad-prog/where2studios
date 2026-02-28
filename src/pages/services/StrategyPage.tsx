'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead } from '@/components/SEOHead'

export default function StrategyPage() {
  return (
    <>
      <SEOHead
        title="Brand and Growth Strategy | Where2Studios"
        description="Strategy that makes content convert. We define the goal, the message, and the plan so production and marketing move faster."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Brand and Growth Strategy"
          title="Strategy that makes content convert"
          subtitle="We define the goal, the message, and the plan — so production and marketing move faster."
          description="Direction before execution. We build the strategic foundation so every asset you create has a clear purpose and measurable outcome."
          whatYouGet={[
            'Brand positioning and messaging',
            'Campaign planning',
            'Content strategy and channel plan',
            'Funnel and conversion focus',
          ]}
          howItWorks={[
            { step: 1, title: 'Goal and audience', description: "We align on who you're reaching and what success looks like." },
            { step: 2, title: 'Positioning and plan', description: 'We define your message, channels, and campaign structure.' },
            { step: 3, title: 'Deliverables and timeline', description: 'We map every asset to a deadline you can plan around.' },
            { step: 4, title: 'Launch and measure', description: 'We ship, track performance, and refine the next round.' },
          ]}
          deliverables={[
            'Brand positioning deck',
            'Campaign plan',
            'Content calendar',
            'Channel strategy',
            'Funnel map',
            'KPI framework',
          ]}
          bottomCtaHeadline="Start with clarity"
          bottomCtaSubheadline="Book a free 30 minute strategy call — we'll map the fastest path forward."
          bottomCtaPrimary="Book a Strategy Call"
          bottomCtaSecondary="Start Your Project"
          bottomCtaSecondaryHref="/contact"
        />
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
