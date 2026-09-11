'use client'

import { motion } from 'framer-motion'
import { deliverables } from '@/data/deliverables'

export function WhatWeDeliverSection() {
  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface text-center mb-10">
          What we do
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="m3-outlined-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-m3-primary" />
                </div>
                <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-m3-on-surface/80">{item.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
