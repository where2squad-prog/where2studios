'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Phone, Clock } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { FloatingCTA } from '@/components/FloatingCTA'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="light" />
      
      {/* Hero */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="label text-m3-secondary mb-4 block">Contact</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-m3-on-surface mb-6">
              Let's create something amazing
            </h1>
            <p className="text-xl text-m3-on-surface/70">
              Ready to start your project? Book a discovery call or send us a message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-16 sm:py-24 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Left - Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Discovery Call */}
              <div className="m3-elevated-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-m3-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-m3-on-surface mb-1">Discovery Call</h3>
                    <p className="text-m3-on-surface/60 text-sm mb-3">
                      30-minute video call to discuss your project, goals, and timeline.
                    </p>
                    <a
                      href="https://cal.com/where2-studios-tvdbun/discovery-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="m3-text-button text-m3-primary text-sm p-0"
                    >
                      Book directly on Cal.com →
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="m3-elevated-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-m3-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-m3-on-surface mb-1">Bay Area Based</h3>
                    <p className="text-m3-on-surface/60 text-sm">
                      Serving clients locally and nationwide. We're available for travel for larger productions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="m3-elevated-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-m3-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-m3-on-surface mb-1">Quick Response</h3>
                    <p className="text-m3-on-surface/60 text-sm">
                      We respond to all inquiries within one business day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="m3-elevated-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-m3-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-m3-on-surface mb-1">Email Us</h3>
                    <p className="text-m3-on-surface/60 text-sm mb-2">
                      For general inquiries and press.
                    </p>
                    <a
                      href="mailto:contact@where2studios.com"
                      className="text-m3-primary text-sm font-medium"
                    >
                      contact@where2studios.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <ContactForm showBookCall />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cal.com Inline Embed */}
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-m3-on-surface mb-2">
              Or book directly below
            </h2>
            <p className="text-m3-on-surface/60">
              Pick a time that works for you.
            </p>
          </motion.div>

          <div className="m3-elevated-card overflow-hidden">
            <iframe
              src="https://cal.com/where2-studios-tvdbun/discovery-call?embed=true&layout=month_view&theme=light"
              width="100%"
              height="600"
              frameBorder="0"
              className="w-full"
              title="Book a Discovery Call"
            />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
