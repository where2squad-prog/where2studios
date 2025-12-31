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
    description: "Execution, consistency, shipping—no theory-only marketing.",
    icon: "→"
  },
  {
    title: "Community",
    description: "Collaboration over clout. We build with people, not just for views.",
    icon: "◎"
  },
  {
    title: "Creativity",
    description: "We make things that feel alive—not templated, not corporate.",
    icon: "◇"
  }
]

export function About() {
  return (
    <section id="about" className="relative py-32 bg-background overflow-hidden">
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Welcome Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          
          {/* Big Welcome */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-8 text-foreground"
          >
            Welcome to Where2.
          </motion.h2>
          
          {/* The Hook */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <p className="font-fredoka text-2xl sm:text-3xl font-medium leading-relaxed text-foreground">
              We parked our dreams somewhere along the way.
            </p>
            <p className="font-fredoka text-2xl sm:text-3xl font-semibold leading-relaxed text-teal mt-4">
              Now we're bringing them back to life.
            </p>
          </motion.div>
          
          {/* Where2 + Clear Answer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-bold text-teal block mb-8">
              Where2?
            </span>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Where2Studios is the agency engine—content, strategy, and partnerships that drive real growth.
            </p>
          </motion.div>
        </div>
        
        {/* Values Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-12"
          >
            Our Values
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl p-8 hover:bg-card/80 hover:border-golden-yellow gentle-animation"
              >
                {/* Icon */}
                <div className="text-4xl mb-6 text-teal opacity-80 group-hover:opacity-100 gentle-animation">
                  {value.icon}
                </div>
                
                {/* Title */}
                <h4 className="font-fredoka text-xl font-semibold text-foreground mb-3">
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
        
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mt-24 pt-24 border-t-2 border-golden-yellow/30"
        >
          <p className="font-fredoka text-lg sm:text-xl text-teal font-medium mb-4">
            Our Mission
          </p>
          <p className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground">
            Help creators and brands bring their vision to life through content, community, and momentum.
          </p>
        </motion.div>
        
      </div>
    </section>
  )
}
