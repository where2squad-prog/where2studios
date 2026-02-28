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

const whyStartups = [
  'We move at your pace — no bloated timelines',
  'Founder-friendly pricing and flexible packages',
  'Launch-ready deliverables in days, not months',
  'Content designed to convert, not just look pretty',
  'One producer, one point of contact, zero confusion',
  'Multi-format exports for pitch decks, social, and web',
]

const services = [
  {
    icon: Video,
    title: 'Launch Videos',
    description: 'Product demos, explainers, pitch deck videos, and founder stories that build credibility and attract investors.',
    href: '/services/launch-videos',
  },
  {
    icon: Mic,
    title: 'Podcasts',
    description: 'Full-service podcast production — recording, editing, clips, and distribution to establish thought leadership.',
    href: '/services/podcasts',
  },
  {
    icon: CalendarDays,
    title: 'Event Recaps',
    description: 'Demo days, meetups, launch parties — cinematic coverage that extends your event impact and drives future attendance.',
    href: '/services/event-recaps',
  },
]

export default function StartupsPage() {
  const { openSheet } = useBookingSheet()

  return (
    <>
      <SEOHead
        title="Startups | Where2Studios"
        description="Cinematic media production built for startups. Launch videos, podcasts, and event recaps that help founders build credibility and grow fast."
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
                Your startup deserves{' '}
                <span className="text-m3-primary">cinematic content</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                We help early-stage and growth-stage startups tell their story with launch videos, 
                podcasts, and event recaps that build credibility and drive growth.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                  Book a Discovery Call
                </button>
                <Link to="/work" className="m3-outlined-button">
                  View Our Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Startups Choose Us */}
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
              {whyStartups.map((item, index) => (
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

        {/* Services for Startups */}
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
                What we do for startups
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
              Ready to make your startup impossible to ignore?
            </h2>
            <p className="mt-4 text-m3-on-dark/70 max-w-xl mx-auto">
              Book a free 30-minute startup call. We'll discuss your goals and map out a content plan.
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
