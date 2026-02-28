'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { Clock, Rocket, Users } from 'lucide-react'

const trustSignals = [
  { icon: Clock, text: 'We reply within 1 business day' },
  { icon: Rocket, text: 'Dedicated producer per project' },
  { icon: Users, text: 'Built for fast-moving teams' },
]

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
            Ready to Launch?
          </span>
          
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-dark mt-3 mb-4">
            Let's make your startup impossible to ignore
          </h2>
          
          <p className="text-m3-on-dark/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Book a startup call or send us an inquiry. We'll get back to you within one business day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={openSheet}
              className="m3-filled-button text-base sm:text-lg px-8 py-4"
            >
              Book a Startup Call
            </button>
            <Link
              to="/contact"
              className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10"
            >
              Send an Inquiry
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.text} className="flex items-center gap-2">
                <signal.icon className="w-4 h-4 text-m3-primary" />
                <span className="text-m3-on-dark/60 text-sm">{signal.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
