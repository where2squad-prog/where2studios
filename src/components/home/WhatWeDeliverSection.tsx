'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

export function WhatWeDeliverSection() {
  const views = useCountUp({ end: 259, duration: 2000, suffix: 'M+' })

  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div 
            className="m3-elevated-card bg-m3-surface-dark/90 backdrop-blur-md px-8 py-8 sm:px-12 sm:py-10 border border-m3-on-dark/10 rounded-2xl"
            ref={views.ref}
          >
            <p className="text-m3-on-dark/60 text-xs sm:text-sm uppercase tracking-widest font-medium mb-6 text-center">
              Trusted by brands, founders, and teams across the Bay Area
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-m3-primary tabular-nums">
                  632+
                </div>
                <div className="text-m3-on-dark/70 text-sm sm:text-base font-medium mt-1">
                  Projects
                </div>
              </div>
              
              <div className="text-center border-x border-m3-on-dark/20">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-m3-primary tabular-nums">
                  {views.formatted}
                </div>
                <div className="text-m3-on-dark/70 text-sm sm:text-base font-medium mt-1">
                  Views
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-m3-primary tabular-nums">
                  100+
                </div>
                <div className="text-m3-on-dark/70 text-sm sm:text-base font-medium mt-1">
                  Brands
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
