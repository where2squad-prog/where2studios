'use client';

import { motion } from 'framer-motion';
import { useBookingSheet } from '@/contexts/BookingSheetContext';

export function FinalCTA() {
  const { openSheet } = useBookingSheet();

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-m3-surface-dark">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto text-center">

          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-dark mb-3">
            Let's make something worth watching.
          </h2>
          <p className="text-m3-on-dark/50 text-sm mb-8">
            We reply within 1 business day.
          </p>

          <div>
            <button
              onClick={openSheet}
              className="m3-filled-button text-base sm:text-lg px-8 py-4">
              Book a Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>);

}