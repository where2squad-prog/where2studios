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
import { crewExtras, photoPricing, whatYouGet, plannerFaqs } from '@/data/services'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { KeepReading } from '@/components/layout/KeepReading'

export default function ServicesPage() {
  const { openSheet } = useBookingSheet()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: plannerFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <SkipLink />
      <SEOHead
        title="Event Recap Videos and Event Photography for Tech Conferences | Where2Studios"
        description="Event recap videos for tech conference week: clips by 10am the next day, the full recap within 5 business days, and event photography from the same crew. San Francisco and the Bay Area."
        schema={faqSchema}
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
                Event recap videos for tech conference week.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                Clips by 10am the next day, the full recap within 5 business days, and event photos
                from the same crew.
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
                15 minute call. Pick a time that works.
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

        {/* Also from the same crew */}
        <section className="py-12 sm:py-16 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              Also from the same crew
            </h2>
            <p className="mt-2 text-sm sm:text-base text-m3-on-surface/70 max-w-2xl">
              One team on site means one point of contact and one invoice.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 mt-8">
              {crewExtras.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  style={{ scrollMarginTop: 'var(--nav-h, 80px)' }}
                  className="h-full m3-elevated-card p-6 sm:p-8 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-m3-primary" />
                    </div>
                    <h3 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-m3-on-surface/80 text-sm sm:text-base">{item.line}</p>
                  {item.id === 'photography' ? (
                    <dl className="mt-5 grid gap-2 text-sm">
                      <div className="flex justify-between gap-4 border-t border-m3-on-surface/10 pt-2">
                        <dt className="text-m3-on-surface/70">Half day</dt>
                        <dd className="font-semibold text-m3-on-surface">
                          Starting at ${photoPricing.halfDay.toLocaleString('en-US')}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-m3-on-surface/10 pt-2">
                        <dt className="text-m3-on-surface/70">Full day</dt>
                        <dd className="font-semibold text-m3-on-surface">
                          Starting at ${photoPricing.fullDay.toLocaleString('en-US')}
                        </dd>
                      </div>
                      {photoPricing.nextDay.map((tier) => (
                        <div
                          key={tier.photos}
                          className="flex justify-between gap-4 border-t border-m3-on-surface/10 pt-2"
                        >
                          <dt className="text-m3-on-surface/70">
                            Next day, {tier.photos} photos
                          </dt>
                          <dd className="font-semibold text-m3-on-surface">
                            +${tier.add.toLocaleString('en-US')}
                          </dd>
                        </div>
                      ))}
                      <p className="text-xs text-m3-on-surface/60 pt-2">
                        Edited photos included, delivered in {photoPricing.standardTurnaround}.
                        Headshots can be part of any photo day.
                      </p>
                    </dl>
                  ) : (
                    <p className="text-xs text-m3-on-surface/60 mt-5">Quoted per project.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-4xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              What you get
            </h2>
            <dl className="mt-6 m3-elevated-card divide-y divide-m3-on-surface/10">
              {whatYouGet.map((row) => (
                <div
                  key={row.label}
                  className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-5 sm:px-6 py-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-widest text-m3-primary pt-0.5">
                    {row.label}
                  </dt>
                  <dd className="text-sm sm:text-base text-m3-on-surface/85">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Planner FAQ */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              Questions event teams ask us
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {plannerFaqs.map((faq, i) => (
                <AccordionItem key={`svc-faq-${i}`} value={`svc-faq-${i}`}>
                  <AccordionTrigger
                    data-faq-question
                    className="text-left text-sm sm:text-base text-m3-on-surface"
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-m3-on-surface/70">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-m3-on-surface/60 max-w-xl mx-auto">
              Tell us the dates and what you are running. We scope it on a 15 minute call.
            </p>

            <div className="mt-8">
              <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                Book a Call
              </button>
            </div>
          </div>
        </section>
        <KeepReading />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
