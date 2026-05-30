'use client'

import { motion } from 'framer-motion'

export function PositioningSection() {
  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface">
            We make events that earn their reach.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
