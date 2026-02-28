'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { useProjects, getThumbnail } from '@/hooks/useProjects'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

interface ServicePageTemplateProps {
  category: string
  title: string
  subtitle: string
  description: string
  whatYouGet: string[]
  howItWorks: { step: number; title: string; description: string }[]
  deliverables: string[]
  bottomCtaHeadline?: string
  bottomCtaSubheadline?: string
  bottomCtaPrimary?: string
  bottomCtaSecondary?: string
  bottomCtaSecondaryHref?: string
}

export function ServicePageTemplate({
  category,
  title,
  subtitle,
  description,
  whatYouGet,
  howItWorks,
  deliverables,
  bottomCtaHeadline = 'Ready to start?',
  bottomCtaSubheadline = 'Book a free 30 minute strategy call. Tell us the goal and the timeline — we\'ll build a plan with deliverables and budget.',
  bottomCtaPrimary = 'Book a Strategy Call',
  bottomCtaSecondary,
  bottomCtaSecondaryHref = '/contact',
}: ServicePageTemplateProps) {
  const { data: projects, isLoading } = useProjects({ category })
  const { openSheet } = useBookingSheet()

  return (
    <div className="min-h-screen bg-m3-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-m3-surface-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-m3-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest mb-4 block">{category}</span>
            <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-dark mb-6">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-m3-on-dark/80 mb-4 max-w-xl">{subtitle}</p>
            <p className="text-m3-on-dark/50 text-sm mb-8">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={openSheet} className="m3-filled-button text-center text-lg px-8 py-4">
                Book a Strategy Call
              </button>
              <Link
                to="/startups"
                className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10 text-center"
              >
                See Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Deliverables
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2 mb-4">
              Everything included
            </h2>
            <p className="text-m3-on-surface/60 mb-8">{description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {whatYouGet.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 m3-tonal-card"
                >
                  <Check className="w-5 h-5 text-m3-primary flex-shrink-0" />
                  <span className="text-m3-on-surface">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Process
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2">
              How it works
            </h2>
          </motion.div>
          <div className={`grid gap-6 max-w-4xl mx-auto ${howItWorks.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="m3-outlined-card p-6 text-center"
              >
                <div className="w-12 h-12 bg-m3-primary text-m3-on-primary rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-fredoka font-semibold text-m3-on-surface mb-2">{step.title}</h3>
                <p className="text-m3-on-surface/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Deliverables
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mt-2 mb-8 text-center">
              What we can ship
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {deliverables.map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-m3-primary/10 text-m3-on-surface rounded-full text-sm font-medium"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini Portfolio */}
      {!isLoading && projects && projects.length > 0 && (
        <section className="py-16 sm:py-24 bg-m3-surface-variant">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
                Recent {title} Projects
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => window.location.href = '/startups'}
                >
                  <div className="m3-elevated-card overflow-hidden aspect-[9/14]">
                    <img
                      src={getThumbnail(project)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/startups" className="m3-outlined-button inline-flex items-center gap-2">
                See Our Work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24 bg-m3-surface-dark">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-fredoka text-3xl sm:text-4xl font-semibold text-m3-on-dark mb-4">
              {bottomCtaHeadline}
            </h2>
            <p className="text-m3-on-dark/75 mb-4">
              {bottomCtaSubheadline}
            </p>
            <p className="text-m3-on-dark/50 text-sm mb-8">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={openSheet} className="m3-filled-button inline-flex items-center gap-2 text-lg px-8 py-4">
                {bottomCtaPrimary}
                <ArrowRight className="w-4 h-4" />
              </button>
              {bottomCtaSecondary && (
                <Link
                  to={bottomCtaSecondaryHref}
                  className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10 text-center"
                >
                  {bottomCtaSecondary}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
