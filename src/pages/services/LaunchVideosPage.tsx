'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, Zap, Clock, Target, Rocket, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies'

const useCases = [
  { title: 'Product Demos', description: 'Show your product in action with a polished walkthrough that converts' },
  { title: 'Explainer Videos', description: 'Break down complex ideas into clear, compelling visuals' },
  { title: 'Pitch Deck Videos', description: 'Elevate your investor pitch with cinematic storytelling' },
  { title: 'Founder Stories', description: 'Build trust by sharing the why behind your company' },
  { title: 'Launch Announcements', description: 'Generate buzz for product launches with high-impact video' },
  { title: 'Customer Testimonials', description: 'Let your users tell the story in their own words' },
]

const howWeWork = [
  {
    icon: Target,
    title: 'Startup Native',
    description: 'We understand the pace. No bloated timelines or unnecessary processes.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: '1-3 week typical timelines. Rush delivery available for launches.',
  },
  {
    icon: Zap,
    title: 'Launch Ready',
    description: 'Multi-format exports optimized for your website, social, and investor decks.',
  },
  {
    icon: Rocket,
    title: 'Growth Focused',
    description: 'Content designed to convert, not just look pretty.',
  },
]

export default function LaunchVideosPage() {
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
              <Video className="w-5 h-5 text-m3-primary" />
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Launch Videos
              </span>
            </div>
            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface">
              Make your launch{' '}
              <span className="text-m3-primary">impossible to ignore</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
              Cinematic product videos, explainers, and founder stories that help startups build credibility and drive growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                Book a Startup Call
              </button>
              <Link to="/work" className="m3-outlined-button">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 sm:py-16 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Use Cases
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
              What we create for startups
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="m3-tonal-card p-5"
              >
                <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-m3-on-surface/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-12 sm:py-16 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              How We Work
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
              Built for fast-moving founders
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {howWeWork.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="m3-elevated-card p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-m3-primary" />
                </div>
                <div>
                  <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-m3-on-surface/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCaseStudies />

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-m3-surface-dark">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-dark">
            Ready to launch with video?
          </h2>
          <p className="mt-4 text-m3-on-dark/70 max-w-xl mx-auto">
            Let's discuss your product and create a video that makes people pay attention.
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
