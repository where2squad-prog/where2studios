'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { ContactForm } from '../ContactForm';
export function ClosingCTA() {
  return <section className="py-16 sm:py-24 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-10">
          <span className="text-m3-secondary text-xs font-semibold uppercase tracking-widest">Get Started</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-m3-on-surface mt-2">
            Ready to ship your next project?
          </h2>
          <p className="text-m3-on-surface/60 text-sm sm:text-base mt-2 max-w-lg mx-auto">Share the goal and the deadline, we'll reply within 1 business day.</p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left - Info Cards */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="lg:col-span-2 space-y-4 order-2 lg:order-1">
            {/* Free Discovery Call Card */}
            <div className="m3-tonal-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-m3-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-m3-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-m3-on-surface mb-1">Free Discovery Call</h3>
                  <p className="text-m3-on-surface/60 text-sm">30-minute call to discuss your launch, deadlines, and deliverables</p>
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
                  <h3 className="font-semibold text-m3-on-surface mb-1">San Francisco Bay Area</h3>
                  <p className="text-m3-on-surface/60 text-sm">Available for travel</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="lg:col-span-3 order-1 lg:order-2">
            <ContactForm showBookCall />
          </motion.div>
        </div>
      </div>
    </section>;
}
