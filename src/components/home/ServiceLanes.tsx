'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Clapperboard, Megaphone, ArrowRight } from 'lucide-react'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

const services = [
  {
    id: 'strategy',
    title: 'Brand and Growth Strategy',
    icon: Target,
    oneLiner: 'Direction before execution, so every asset has a purpose.',
    bullets: [
      'Brand positioning',
      'Campaign planning',
      'Content strategy',
      'Funnels and conversion focus',
    ],
    ctaLabel: 'Book a Strategy Call',
    ctaAction: 'sheet' as const,
  },
  {
    id: 'production',
    title: 'High Impact Media Production',
    icon: Clapperboard,
    oneLiner: 'Premium media that makes you look established instantly.',
    bullets: [
      'Cinematic brand and launch videos',
      'Podcast production',
      'Photography',
      'Event coverage and recaps',
    ],
    ctaLabel: 'See Our Work',
    ctaAction: 'link' as const,
    ctaHref: '/startups',
  },
  {
    id: 'marketing',
    title: 'Full Service Marketing Execution',
    icon: Megaphone,
    oneLiner: 'We do not just hand you content, we help it perform.',
    bullets: [
      'Social media management',
      'Paid ads management',
      'Email marketing',
      'Distribution and campaign management',
    ],
    ctaLabel: 'Start Your Project',
    ctaAction: 'link' as const,
    ctaHref: '/contact',
  },
]

export function ServiceLanes() {
  const { openSheet } = useBookingSheet()

  return (
    <section className="py-16 sm:py-20 bg-m3-surface-variant">
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
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
            Your 3 pillars for growth
          </h2>
          <p className="text-m3-on-surface/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            You don't need more content. You need content that converts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-full m3-outlined-card p-6 sm:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-m3-primary" />
                  </div>
                  <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm text-m3-on-surface/80 mb-4">
                  {service.oneLiner}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-m3-on-surface/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-1.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {service.ctaAction === 'sheet' ? (
                  <button
                    onClick={openSheet}
                    className="flex items-center gap-2 text-m3-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {service.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={service.ctaHref!}
                    className="flex items-center gap-2 text-m3-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {service.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
