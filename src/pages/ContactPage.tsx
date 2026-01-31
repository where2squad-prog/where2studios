'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
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
              className="lg:col-span-2 space-y-4 order-2 lg:order-1"
            >
              {/* Free Discovery Call */}
              <div className="m3-elevated-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-m3-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-m3-on-surface mb-1 text-sm sm:text-base">Free Discovery Call</h3>
                    <p className="text-m3-on-surface/60 text-xs sm:text-sm">
                      30-minute video call to discuss your project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="m3-elevated-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-m3-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-m3-on-surface mb-1 text-sm sm:text-base">San Francisco Bay Area</h3>
                    <p className="text-m3-on-surface/60 text-xs sm:text-sm">
                      Available for travel.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <ContactForm showBookCall />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
