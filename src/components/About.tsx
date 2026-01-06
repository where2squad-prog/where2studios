'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: "Dreaming",
    description: "We start with bold ideas and the courage to try them in public.",
    icon: "✦"
  },
  {
    title: "Making Things Happen",
    description: "Execution, consistency, shipping. No theory-only marketing.",
    icon: "→"
  },
  {
    title: "Community",
    description: "Collaboration over clout. We build with people, not just for views.",
    icon: "◎"
  },
  {
    title: "Creativity",
    description: "We make things that feel alive. Not templated, not corporate.",
    icon: "◇"
  }
]

export function About() {
  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Welcome Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          
          {/* Big Welcome */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-foreground"
          >
            Where2Studios
          </motion.h2>
          
          {/* Clear Value Prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            We partner with premium brands to create content that drives measurable growth.
          </motion.p>
        </div>
        
        {/* Values Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-6 hover:bg-card/80 hover:border-golden-yellow gentle-animation"
              >
                {/* Icon */}
                <div className="text-3xl mb-4 text-teal opacity-80 group-hover:opacity-100 gentle-animation">
                  {value.icon}
                </div>
                
                {/* Title */}
                <h4 className="font-fredoka text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  )
}
