'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { SEOHead, organizationSchema } from '@/components/SEOHead'
import { SkipLink } from '@/components/layout/SkipLink'

export default function ContactPage() {
  return (
    <>
      <SkipLink />
      <SEOHead
        title="Contact Us | Where2Studios"
        description="For press, partnerships, or general questions. Hiring inquiries? Use Book a Call."
        schema={organizationSchema}
      />

      <div className="min-h-screen bg-m3-background">
        <Navbar variant="light" />
        <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="pt-28 pb-8 sm:pt-40 sm:pb-12 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mb-4">
                Get in touch
              </h1>
              <p className="text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                For press, partnerships, or general questions. Hiring inquiries → use Book a Call.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="inquiry-form" className="py-12 sm:py-20 bg-m3-surface-variant scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="m3-elevated-card p-6 sm:p-8">
                <ContactForm showBookCall />
              </div>
            </motion.div>
          </div>
        </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
