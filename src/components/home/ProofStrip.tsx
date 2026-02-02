'use client'

import { motion } from 'framer-motion'
import { useFeaturedCaseStudies } from '@/hooks/useCaseStudy'
import { Film, Mic, Camera, Video, Sparkles, Clapperboard } from 'lucide-react'

const proofCards = [
  { icon: Clapperboard, metric: '24hr', label: 'Teaser turnaround' },
  { icon: Film, metric: '4K', label: 'Cinematic quality' },
  { icon: Mic, metric: 'Same-day', label: 'Social clips' },
  { icon: Camera, metric: '100+', label: 'Events covered' },
  { icon: Video, metric: '5,427+', label: 'Videos delivered' },
  { icon: Sparkles, metric: '259M+', label: 'Total views' },
]

export function ProofStrip() {
  return (
    <section className="py-12 sm:py-16 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            What We Deliver
          </span>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {proofCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="m3-tonal-card p-4 sm:p-5 text-center group hover:shadow-md transition-all duration-200"
            >
              <card.icon className="w-6 h-6 text-m3-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <div className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-1">
                {card.metric}
              </div>
              <div className="text-xs sm:text-sm text-m3-on-surface/60 font-medium">
                {card.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
