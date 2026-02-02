'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarDays, Zap, Clock, Camera, Video, Users, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies'

const deliverables = [
  { title: 'Teaser in 24hrs', description: 'Same-day or next-day teaser for social' },
  { title: 'Recap Video', description: 'Full event highlight reel within 1-2 weeks' },
  { title: 'Speaker Clips', description: 'Individual session recordings and soundbites' },
  { title: 'Sponsor Reels', description: 'Custom content for your event sponsors' },
  { title: 'Photo Gallery', description: 'Professional event photography' },
  { title: 'Social Cuts', description: 'Vertical video optimized for TikTok, Reels, Shorts' },
]

const timeline = [
  {
    phase: 'Pre-Production',
    time: '1-2 weeks before',
    tasks: ['Shot list creation', 'Schedule coordination', 'Crew briefing', 'Equipment prep'],
  },
  {
    phase: 'Show Day',
    time: 'Event day',
    tasks: ['Multi-camera coverage', 'Speaker recording', 'B-roll capture', 'Same-day teaser edit'],
  },
  {
    phase: 'Post-Production',
    time: '1-2 weeks after',
    tasks: ['Full recap edit', 'Speaker clips', 'Social cuts', 'Final delivery'],
  },
]

export default function EventsPage() {
  const { openSheet } = useBookingSheet()

  return (
    <div className="min-h-screen bg-m3-surface-variant">
      <Navbar variant="light" />

      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-40 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-m3-primary" />
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Events
              </span>
            </div>
            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface">
              Cinematic coverage that{' '}
              <span className="text-m3-primary">sells the next event</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
              Extend your event's impact long after it ends. Content that drives attendance to your next one.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                Book a Discovery Call
              </button>
              <Link to="/work" className="m3-outlined-button">
                View Event Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables Matrix */}
      <section className="py-12 sm:py-16 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Deliverables
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
              What you get
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="m3-tonal-card p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-m3-primary" />
                  <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-m3-on-surface/70 pl-7">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Timeline
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
              How event coverage works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector */}
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-m3-outline z-0" />
                )}
                
                <div className="m3-elevated-card p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-m3-primary flex items-center justify-center text-m3-on-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface">
                        {phase.phase}
                      </h3>
                      <p className="text-xs text-m3-primary font-medium">
                        {phase.time}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-m3-on-surface/70">
                        <CheckCircle2 className="w-4 h-4 text-m3-primary mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <FeaturedCaseStudies />

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-m3-surface-dark">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-dark">
            Ready to capture your next event?
          </h2>
          <p className="mt-4 text-m3-on-dark/70 max-w-xl mx-auto">
            Let's discuss your event and create a coverage plan that extends its impact.
          </p>
          <div className="mt-8">
            <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
              Book a Discovery Call
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
