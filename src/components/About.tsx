'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: "Dreaming",
    description: "We never stopped believing in the impossible",
    icon: "✦"
  },
  {
    title: "Making Things Happen",
    description: "Ideas are nothing without execution",
    icon: "→"
  },
  {
    title: "Community",
    description: "We rise by lifting others",
    icon: "◎"
  },
  {
    title: "Creativity",
    description: "The currency of the future",
    icon: "◇"
  }
]

export function About() {
  return (
    <section id="about" className="relative py-32 bg-background overflow-hidden">
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-px bg-foreground/30" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              The Question
            </span>
            <div className="w-12 h-px bg-foreground/30" />
          </motion.div>
          
          {/* Big Question */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 text-foreground"
          >
            What is Where2?
          </motion.h2>
          
          {/* Identity Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2 mb-12"
          >
            <p className="text-xl sm:text-2xl text-muted-foreground">
              A social media agency?
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              A creative community?
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              An event host? A non-profit?
            </p>
          </motion.div>
          
          {/* The Real Answer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground mb-8">
              Or are we just a bunch of dreamers who realized at some point in life we gave up on our dreams—
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-relaxed text-foreground">
              and now we're ready to make them come alive?
            </p>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="flex justify-center mb-24">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        </div>
        
        {/* The Journey */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-8">
            This is our first step into making all of those things a reality.
          </p>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-12">
            Not sure exactly where these dreams are gonna take us.
          </p>
          <p className="text-2xl sm:text-3xl text-foreground font-medium leading-relaxed">
            But that's the exciting question, isn't it?
          </p>
          
          {/* Where2 Logo Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <span className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
              Where2?
            </span>
          </motion.div>
        </motion.div>
        
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
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/80 hover:border-border gentle-animation"
              >
                {/* Icon */}
                <div className="text-4xl mb-6 opacity-60 group-hover:opacity-100 gentle-animation">
                  {value.icon}
                </div>
                
                {/* Title */}
                <h4 className="text-xl font-semibold text-foreground mb-3">
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
          className="max-w-4xl mx-auto text-center mt-24 pt-24 border-t border-border/30"
        >
          <p className="text-lg sm:text-xl text-muted-foreground mb-4">
            Our Mission
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground">
            To empower dreamers with result-driven marketing and creative community—turning "what if" into "what's next."
          </p>
        </motion.div>
        
      </div>
    </section>
  )
}
