'use client'

import { motion } from 'framer-motion'

export function PositioningSection() {
  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Our goal is to tell stories worth sharing
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-3 mb-4">
            Content with a job
          </h2>
          <p className="text-m3-on-surface/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We combine strategy, storytelling, and execution to help ambitious brands grow with clarity and confidence. Whether you're launching, scaling, or repositioning, we become an extension of your team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
