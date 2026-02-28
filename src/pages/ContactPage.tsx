'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Mail, Clock, CheckCircle2, Rocket, Mic, Video } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { FloatingCTA } from '@/components/FloatingCTA'
import { SEOHead, organizationSchema } from '@/components/SEOHead'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { Link } from 'react-router-dom'

const trustSignals = [
  'We reply within 1 business day',
  'Free 30-minute startup call',
  'No commitment required',
]

const serviceHighlights = [
  { icon: Video, label: 'Launch Videos', href: '/services/launch-videos' },
  { icon: Mic, label: 'Podcasts', href: '/services/podcasts' },
  { icon: Rocket, label: 'Event Recaps', href: '/services/event-recaps' },
]

export default function ContactPage() {
  const { openSheet } = useBookingSheet()

  return (
    <>
      <SEOHead
        title="Contact Us | Where2Studios"
        description="Book a free startup call or send an inquiry. Launch videos, podcasts, and event recaps for startups. We reply within 1 business day."
        schema={organizationSchema}
      />

      <div className="min-h-screen bg-m3-background">
        <Navbar variant="light" />

        {/* Hero */}
        <section className="pt-28 pb-8 sm:pt-40 sm:pb-12 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Let's Talk
              </span>
              <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2 mb-4">
                Ready to tell your startup story?
              </h1>
              <p className="text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                Book a free 30-minute call or send us an inquiry. We'll map out your content plan and get back to you within one business day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Two Paths */}
        <section className="py-8 sm:py-12 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Book a Discovery Call */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <button
                  onClick={openSheet}
                  className="w-full text-left m3-elevated-card p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-m3-primary" />
                  </div>
                  <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2 group-hover:text-m3-primary transition-colors">
                    Book a Discovery Call
                  </h2>
                  <p className="text-sm text-m3-on-surface/70 mb-4">
                    30-minute video call to discuss your launch, content needs, and timeline. No strings attached.
                  </p>
                  <span className="text-m3-primary font-semibold text-sm">
                    Schedule now →
                  </span>
                </button>
              </motion.div>

              {/* Send Inquiry */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href="#inquiry-form"
                  className="block w-full text-left m3-outlined-card p-6 hover:border-m3-primary/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-m3-primary" />
                  </div>
                  <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2 group-hover:text-m3-primary transition-colors">
                    Send an Inquiry
                  </h2>
                  <p className="text-sm text-m3-on-surface/70 mb-4">
                    Tell us about your startup and what you need. We'll reply within 1 business day with a plan.
                  </p>
                  <span className="text-m3-primary font-semibold text-sm">
                    Fill out form →
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Service Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {serviceHighlights.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-m3-surface-variant rounded-full text-sm text-m3-on-surface/70 hover:text-m3-primary hover:bg-m3-primary/5 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section id="inquiry-form" className="py-12 sm:py-20 bg-m3-surface-variant scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Left - Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6 order-2 lg:order-1"
              >
                <div className="m3-elevated-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-m3-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-m3-on-surface mb-1">1 Business Day Reply</h3>
                      <p className="text-m3-on-surface/60 text-sm">
                        Every inquiry gets a personal response, fast
                      </p>
                    </div>
                  </div>
                </div>

                <div className="m3-elevated-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-m3-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-m3-on-surface mb-1">Free Startup Call</h3>
                      <p className="text-m3-on-surface/60 text-sm">
                        30-minute call to map out your content plan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="m3-elevated-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-m3-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-m3-on-surface mb-1">San Francisco Bay Area</h3>
                      <p className="text-m3-on-surface/60 text-sm">
                        Available for travel + remote projects
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="space-y-2 pt-4">
                  {trustSignals.map((signal) => (
                    <div key={signal} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-m3-primary" />
                      <span className="text-sm text-m3-on-surface/70">{signal}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 order-1 lg:order-2"
              >
                <div className="m3-elevated-card p-6 sm:p-8">
                  <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-6">
                    Tell us about your startup
                  </h2>
                  <ContactForm showBookCall />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
