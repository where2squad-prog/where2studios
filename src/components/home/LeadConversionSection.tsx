'use client'

import { motion } from 'framer-motion'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

export function LeadConversionSection() {
  const { openSheet } = useBookingSheet()

  return (
    <section className="py-16 sm:py-20 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Is this you?
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-3 mb-4">
            For founders and marketing directors
          </h2>
          <p className="text-m3-on-surface/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            If you're launching soon, struggling to stand out, inconsistent with content, investing in marketing without ROI, or ready to elevate your brand presence — let's fix that.
          </p>

          <button
            onClick={openSheet}
            className="m3-filled-button text-base sm:text-lg px-8 py-4 mb-3"
          >
            Book a Call
          </button>

          <p className="text-m3-on-surface/50 text-sm">
            Free 30 minute strategy call — you'll walk away with clarity whether we work together or not.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
