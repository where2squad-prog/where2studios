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
        title="Services | Where2Studios"
        description="Strategy, production, execution, and creator brand partnerships. Pick the pillar you need or let us be your full growth partner."
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
                Everything we do ladders into growth.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                Pick the pillar you need: strategy, production, execution, or our creator brand. We can run one piece, or be your full growth partner.
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
            </motion.div>
          </div>
        </section>

        {/* Pillar Sections */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                id={pillar.id}
                style={{ scrollMarginTop: 'var(--nav-h, 80px)' }}
              >
                <div className="block m3-elevated-card p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                      <pillar.icon className="w-6 h-6 text-m3-primary" />
                    </div>
                    <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface">
                      {pillar.title}
                    </h2>
                  </div>

                  <p className="text-m3-on-surface/70 text-sm sm:text-base mb-5">
                    {pillar.intro}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mb-5">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-m3-on-surface/80">
                        <CheckCircle2 className="w-4 h-4 text-m3-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-m3-primary font-semibold">
                    {pillar.bestFor}
                  </p>

                  {pillar.linkTo && (
                    <Link
                      to={pillar.linkTo}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-m3-brick-red hover:text-m3-brick-red/80 transition-colors mt-4"
                    >
                      {pillar.linkLabel || 'Learn more'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
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
