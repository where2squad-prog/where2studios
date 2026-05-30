'use client';

import { motion } from 'framer-motion';
import { useBookingSheet } from '@/contexts/BookingSheetContext';
import { Clock, MessageSquare, ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const { openSheet } = useBookingSheet();

  return (
    <section id="contact" className="py-16 sm:py-24 bg-m3-surface-dark">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto text-center">

          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Next Step
          </span>
          
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-dark mt-3 mb-4">If you're building something worth sharing, we'll help the world see it

          </h2>
          <p className="text-m3-on-dark/50 text-sm mb-8">
            We reply within 1 business day.
          </p>

          <div className="mb-10">
            <button
              onClick={openSheet}
              className="m3-filled-button text-base sm:text-lg px-8 py-4">
              Book a Call
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-m3-primary" />
              <span className="text-m3-on-dark/60 text-sm">Reply within 1 business day</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-m3-primary" />
              <span className="text-m3-on-dark/60 text-sm">Free 30-min strategy call</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-m3-primary" />
              <span className="text-m3-on-dark/60 text-sm">Walk away with a real plan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}