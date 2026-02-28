'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, Mic, CalendarDays, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

const services = [
  {
    id: 'launch-videos',
    title: 'Launch Videos',
    icon: Video,
    href: '/services/launch-videos',
    description: 'Product demos, explainer videos, pitch decks, founder stories',
    forWho: 'Founders, product teams, investor relations',
  },
  {
    id: 'podcasts',
    title: 'Podcasts',
    icon: Mic,
    href: '/services/podcasts',
    description: 'Full production, editing, clips, guest coordination, show branding',
    forWho: 'Founders, thought leaders, startup communities',
  },
  {
    id: 'event-recaps',
    title: 'Event Recaps',
    icon: CalendarDays,
    href: '/services/event-recaps',
    description: 'Teasers, recaps, speaker clips, sponsor reels, social cuts',
    forWho: 'Event producers, demo days, meetup organizers',
  },
]

export default function ServicesPage() {
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
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              What We Do
            </span>
            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2">
              Services
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
              Cinematic media production built for startups. From launch day to Series A and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={service.href}
                  className="group block h-full m3-elevated-card p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-m3-primary" />
                  </div>

                  <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2 group-hover:text-m3-primary transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-sm text-m3-on-surface/70 mb-4">
                    {service.description}
                  </p>

                  <p className="text-xs text-m3-on-surface/50 mb-4">
                    <span className="font-semibold">For:</span> {service.forWho}
                  </p>

                  <div className="flex items-center gap-2 text-m3-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
            Not sure what you need?
          </h2>
          <p className="mt-4 text-m3-on-surface/60 max-w-xl mx-auto">
            Book a startup call and we'll help you figure out the best approach for your launch.
          </p>
          <div className="mt-8">
            <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
              Book a Startup Call
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
