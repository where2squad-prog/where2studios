'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'

import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { SEOHead } from '@/components/SEOHead'
import { SkipLink } from '@/components/layout/SkipLink'
import { deliverables } from '@/data/deliverables'

export default function ServicesPage() {
  const { openSheet } = useBookingSheet()

  return (
    <>
      <SkipLink />
      <SEOHead
        title="Convention Week Video Services | Where2Studios"
        description="Activation recaps, exec clips for LinkedIn, same week social cutdowns and full week crew coverage for convention week brand headquarters in San Francisco."
      />
      <div className="min-h-screen bg-m3-surface-variant">
        <Navbar variant="light" />
        <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero */}
        <section className="pt-28 pb-12 sm:pt-40 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Services
              </span>
              <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2">
                Four things we deliver for convention week.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                You have the venue and the activation. We make sure the week still exists on Monday.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 mt-6">
                <button
                  onClick={openSheet}
                  className="m3-filled-button text-sm px-6 py-3"
                >
                  Book a Call
                </button>
                <Link
                  to="/work"
                  className="m3-outlined-button text-sm px-6 py-3"
                >
                  See Our Work
                </Link>
              </div>

              <p className="text-m3-on-surface/50 text-xs mt-3">
                Free 30 minute strategy call, we reply within 1 business day.
              </p>
              <Link
                to="/why-a-dedicated-crew"
                className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm mt-4"
              >
                Why a dedicated crew
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 grid gap-6 sm:grid-cols-2">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                id={item.id}
                style={{ scrollMarginTop: 'var(--nav-h, 80px)' }}
              >
                <div className="h-full m3-elevated-card p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-m3-primary" />
                    </div>
                    <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface">
                      {item.title}
                    </h2>
                  </div>
                  <p className="text-m3-on-surface/80 text-sm sm:text-base">{item.line}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-4 sm:px-8 lg:px-12 mt-8">
            <Link
              to="/event-recap-videos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-m3-brick-red hover:text-m3-brick-red/80 transition-colors"
            >
              See how our event recap videos work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-m3-on-surface/60 max-w-xl mx-auto">
              Book a strategy call. Tell us the goal and the timeline. We'll build a plan with deliverables and budget.
            </p>
            <p className="mt-2 text-m3-on-surface/40 text-sm">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>
            <div className="mt-8">
              <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                Book a Call
              </button>
            </div>
          </div>
        </section>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
