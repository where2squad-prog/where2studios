'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: "01",
    title: "Diagnose",
    description: "Goals, audience, offer—what success means for your brand.",
    icon: "🔍"
  },
  {
    number: "02",
    title: "Build the Plan",
    description: "Content pillars, hooks, posting cadence, campaign strategy.",
    icon: "📐"
  },
  {
    number: "03",
    title: "Produce",
    description: "Shoot day, editing pipeline, deliverables that stop thumbs.",
    icon: "🎬"
  },
  {
    number: "04",
    title: "Publish & Iterate",
    description: "Captions, SEO keywords, retention fixes based on data.",
    icon: "📈"
  },
  {
    number: "05",
    title: "Scale",
    description: "Partnerships, campaigns, repeatable growth systems.",
    icon: "🚀"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 bg-muted/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-foreground/30" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Our Process
            </span>
            <div className="w-12 h-px bg-foreground/30" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-8 text-foreground"
          >
            How It Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            From strategy to scale—we build a repeatable engine, not one-off posts.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Connection line for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-gradient-to-r from-golden-yellow/50 to-transparent z-0" />
                )}
                
                <div className="relative bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-6 hover:bg-card hover:border-golden-yellow gentle-animation h-full">
                  
                  {/* Step Number */}
                  <div className="text-4xl mb-4">
                    {step.icon}
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 text-xs font-bold text-golden-yellow/60 bg-golden-yellow/10 px-2 py-1 rounded-full">
                    {step.number}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-fredoka text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            We don't just make content—we build momentum.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-golden-yellow text-near-black font-fredoka font-semibold text-lg px-8 py-4 rounded-full hover:bg-orange-accent gentle-animation cursor-pointer"
          >
            Start Your Engine
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
