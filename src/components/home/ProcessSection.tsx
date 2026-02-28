'use client'

import { motion } from 'framer-motion'
import { Target, Clapperboard, Share2, BarChart3 } from 'lucide-react'

const processSteps = [
  {
    step: 1,
    title: 'Strategy',
    icon: Target,
    description: 'You share your goal and deadline. We build a brief with deliverables, formats, and a timeline you can hold us to.',
    details: 'Clear milestones tied to your launch date.',
  },
  {
    step: 2,
    title: 'Produce',
    icon: Clapperboard,
    description: 'Fast, focused shoots with a small senior crew. One point of contact, no wasted days, no 47-person email chain.',
    details: 'Cinematic quality without the overhead.',
  },
  {
    step: 3,
    title: 'Ship',
    icon: Share2,
    description: 'You get the main asset plus clips and cutdowns for every format — website, social, pitch deck, investor update. One delivery.',
    details: 'All formats delivered, ready to post.',
  },
  {
    step: 4,
    title: 'Iterate',
    icon: BarChart3,
    description: 'We review what performed, refine the next round, and ship again. Your content gets sharper every cycle.',
    details: 'Ship and iterate, every cycle.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
            Four steps. One deadline. Deliverables shipped.
          </h2>
          <p className="text-m3-on-surface/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            You tell us the moment and the deadline. We handle strategy, production, and delivery.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-m3-outline" />
              )}

              <div className="m3-elevated-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-m3-primary flex items-center justify-center text-m3-on-primary font-bold">
                    {item.step}
                  </div>
                  <item.icon className="w-5 h-5 text-m3-primary" />
                </div>

                <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-m3-on-surface/70 mb-3">
                  {item.description}
                </p>

                <p className="text-xs text-m3-primary font-medium">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
