'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ServicePageTemplate } from '@/components/ServicePageTemplate'

import { SEOHead } from '@/components/SEOHead'

export default function PodcastsPage() {
  return (
    <>
      <SEOHead
        title="Podcast Production | Where2Studios"
        description="Full-service podcast production — recording, editing, clips, thumbnails, and publishing. Ship an episode every week without the overhead."
      />
      <div className="min-h-screen bg-m3-background">
        <Navbar variant="dark" />
        <ServicePageTemplate
          category="Podcasts"
          title="Ship an episode every week without the overhead"
          subtitle="You need a content campaign that builds authority week after week. We handle the full production — you show up and talk, we ship the episode with clips included."
          description="Whether you're launching a new show or shipping episodes for an existing one, we handle the entire production pipeline so you can focus on the conversation and the ROI."
          whatYouGet={[
            'Studio or remote recording setup',
            'Professional audio editing and mixing',
            'Video podcast production (optional)',
            'Guest coordination and scheduling',
            'Social clips (vertical + square)',
            'Episode thumbnails and cover art',
            'Show notes and timestamps',
            'Publishing across platforms',
          ]}
          howItWorks={[
            {
              step: 1,
              title: 'Show Strategy',
              description: 'We define your format, audience, and episode cadence. You get a content plan for the first season.',
            },
            {
              step: 2,
              title: 'Record',
              description: 'Studio or remote sessions with pro-grade audio. We coordinate guests and handle the tech — you just talk.',
            },
            {
              step: 3,
              title: 'Ship',
              description: 'Edited episode, social clips, thumbnails, and publishing across Spotify, Apple, YouTube, and more.',
            },
          ]}
          deliverables={[
            'Full episode (audio)',
            'Video episode (optional)',
            'Social clips (3–5 per episode)',
            'Audiograms',
            'Episode thumbnail',
            'Show notes',
            'Platform publishing',
            'Guest coordination',
          ]}
        />
        <Footer />
        
      </div>
    </>
  )
}
