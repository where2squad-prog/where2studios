'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="dark" showServices />
      <ServicePageTemplate
        category="Social Media"
        title="Social Media Content"
        subtitle="Short-form content that stops the scroll and builds your audience."
        description="Platform-native content designed for TikTok, Instagram Reels, and YouTube Shorts. We know what performs because we test, learn, and iterate."
        whatYouGet={[
          'Platform strategy',
          'Content calendars',
          'Short-form videos',
          'Trending audio integration',
          'Caption optimization',
          'Performance tracking',
        ]}
        howItWorks={[
          {
            step: 1,
            title: 'Strategy',
            description: 'We analyze your brand and audience to create a content roadmap.',
          },
          {
            step: 2,
            title: 'Creation',
            description: 'Batch production of platform-optimized content.',
          },
          {
            step: 3,
            title: 'Optimization',
            description: 'We review performance and refine the approach.',
          },
        ]}
        deliverables={[
          'Monthly content packages',
          'TikTok/Reels/Shorts',
          'Stories content',
          'Carousels',
          'Thumbnails',
          'Analytics reports',
        ]}
      />
      <Footer />
      <FloatingCTA />
    </div>
  )
}
