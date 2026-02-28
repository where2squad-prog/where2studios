'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead } from '@/components/SEOHead'

export default function PodcastsPage() {
  return (
    <>
      <SEOHead
        title="Podcast Production for Startups | Where2Studios"
        description="Full-service podcast production — studio or remote recording, editing, social clips, thumbnails, and publishing support. Build authority on autopilot."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Podcasts"
          title="A podcast that builds your authority on autopilot"
          subtitle="Full-service production from recording to publishing. You show up and talk — we handle everything else."
          description="Whether you're launching a new show or leveling up an existing one, we handle the entire production pipeline so you can focus on the conversation and your audience."
          whatYouGet={[
            'Studio or remote recording setup',
            'Professional audio editing and mixing',
            'Video podcast production (optional)',
            'Guest coordination and scheduling',
            'Social clips (vertical + square)',
            'Episode thumbnails and cover art',
            'Show notes and timestamps',
            'Publishing support across platforms',
          ]}
          howItWorks={[
            {
              step: 1,
              title: 'Show Strategy',
              description: 'We define your format, audience, episode cadence, and visual brand. You get a content roadmap for the first season.',
            },
            {
              step: 2,
              title: 'Record',
              description: 'Studio or remote sessions with pro-grade audio. We coordinate guests and handle all the tech so you just talk.',
            },
            {
              step: 3,
              title: 'Edit & Publish',
              description: 'Tight edits, social clips, thumbnails, and distribution across Spotify, Apple, YouTube, and more.',
            },
          ]}
          deliverables={[
            'Full episode (audio)',
            'Video episode (optional)',
            'Social clips (3–5 per ep)',
            'Audiograms',
            'Episode thumbnail',
            'Show notes',
            'Platform publishing',
            'Guest coordination',
          ]}
        />
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
