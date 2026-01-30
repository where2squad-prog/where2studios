'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Phone } from 'lucide-react'
import { ContactForm } from '../ContactForm'

export function ClosingCTA() {
  return (
    <section className="py-16 sm:py-24 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label text-m3-secondary">Get Started</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-m3-on-surface mt-2">
            Ready to build something real?
          </h2>
          <p className="text-m3-on-surface/60 mt-3 max-w-xl mx-auto">
            Let's talk about your project. Book a discovery call or send us a message.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left - Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Discovery Call Card */}
            <div className="m3-tonal-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-m3-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-m3-on-surface mb-1">Discovery Call</h3>
                  <p className="text-m3-on-surface/60 text-sm mb-3">
                    30-minute video call to discuss your project and goals.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-m3-on-surface/50">
                    <Clock className="w-4 h-4" />
                    <span>Usually responds within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="m3-tonal-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-m3-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-m3-on-surface mb-1">Bay Area Based</h3>
                  <p className="text-m3-on-surface/60 text-sm">
                    Serving clients locally and nationwide. Available for travel.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="m3-tonal-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-m3-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-m3-on-surface mb-1">Quick Response</h3>
                  <p className="text-m3-on-surface/60 text-sm">
                    We respond to all inquiries within one business day.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <ContactForm showBookCall />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
