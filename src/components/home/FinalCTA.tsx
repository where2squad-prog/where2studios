'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { Clock, MessageSquare, ArrowRight } from 'lucide-react'

export function FinalCTA() {
  const { openSheet } = useBookingSheet()

  return (
    <section className="py-16 sm:py-24 bg-m3-surface-dark">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Next Step
          </span>
          
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-dark mt-3 mb-4">
            30-minute call. Zero pressure. Real plan.
          </h2>
          
          <p className="text-m3-on-dark/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Book a free startup call and we'll map out exactly what content 
            you need for your next launch. We reply within one business day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={openSheet}
              className="m3-filled-button text-base sm:text-lg px-8 py-4"
            >
              Book a Discovery Call
            </button>
            <Link
              to="/contact"
              className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10"
            >
              Send an Inquiry
            </Link>
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
              <span className="text-m3-on-dark/60 text-sm">Walk away with a content plan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
