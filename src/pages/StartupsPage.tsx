'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Rocket, Video, Mic, CalendarDays, ArrowRight, Check } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies'
import { SEOHead } from '@/components/SEOHead'

const whyUs = [
  'We move on your deadline — no bloated timelines',
  'Founder-friendly pricing and flexible packages',
  'Deliverables shipped in days, not months',
  'Content built to convert, not just look pretty',
  'One producer, one point of contact, zero confusion',
  'Clips and cutdowns for every format included',
]

const services = [
  {
    icon: Video,
    title: 'Launch Videos',
    description: 'Product demos, founder stories, and pitch videos that build credibility and close investors. Deliverables shipped in 1–3 weeks.',
    href: '/services/launch-videos',
  },
  {
    icon: Mic,
    title: 'Podcasts',
    description: 'Full-service podcast production — recording, editing, clips, and publishing. Launch an episode every week without the overhead.',
    href: '/services/podcasts',
  },
  {
    icon: CalendarDays,
    title: 'Event Recaps',
    description: 'Demo days, meetups, launch parties — cinematic recap films, speaker clips, and social cutdowns shipped on deadline.',
    href: '/services/event-recaps',
  },
]

export default function StartupsPage() {
  const { openSheet } = useBookingSheet()

  return (
    <>
      <SEOHead
        title="Our Work | Where2Studios"
        description="Launch videos, podcasts, and event recaps, shipped fast with clips included. See how we help founders launch, fundraise, and grow."
      />
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
                <Rocket className="w-5 h-5 text-m3-primary" />
                <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                  For Startups
                </span>
              </div>
              <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface">
                Launch videos, podcasts, and event recaps,{' '}
                <span className="text-m3-primary">shipped fast</span> with clips included.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                You're launching, fundraising, or hosting an event. We ship the deliverables on your deadline — with clips and cutdowns ready to post everywhere.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                  Book a Discovery Call
                </button>
                <Link to="/work" className="m3-outlined-button">
                  See Our Work
                </Link>
              </div>
              <p className="mt-3 text-m3-on-surface/50 text-xs">
                Share the goal and the deadline, we'll reply within 1 business day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-12 sm:py-16 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Why Us
              </span>
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
                Built for founders, not Fortune 500s
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {whyUs.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-4 m3-tonal-card"
                >
                  <Check className="w-5 h-5 text-m3-primary flex-shrink-0" />
                  <span className="text-sm text-m3-on-surface">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-12 sm:py-16 bg-m3-surface-variant">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Services
              </span>
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
                Choose what you need
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
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
                    <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2 group-hover:text-m3-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-m3-on-surface/70 mb-4">
                      {service.description}
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

        {/* Featured Work */}
        <FeaturedCaseStudies />

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-m3-surface-dark">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-dark">
              Ready to ship your next launch?
            </h2>
            <p className="mt-4 text-m3-on-dark/70 max-w-xl mx-auto">
              Book a free 30-minute discovery call. Tell us the moment, the deadline, and what you need — we'll map out the deliverables.
            </p>
            <p className="mt-2 text-m3-on-dark/50 text-sm">
              Share the goal and the deadline, we'll reply within 1 business day.
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
    </>
  )
}
