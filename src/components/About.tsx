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
              Welcome
            </span>
            <div className="w-12 h-px bg-foreground/30" />
          </motion.div>
          
          {/* Big Welcome */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-8 text-foreground"
          >
            Welcome to Where2.
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
              Is it a social media agency, a creative community, an event host,
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              a nonprofit, or all of it at once?
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
            <p className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground mb-8">
              Maybe it's just a group of people who realized we stopped chasing the things we cared about—
            </p>
            <p className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed text-teal">
              and decided to bring them back to life.
            </p>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="flex justify-center mb-24">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        </div>
        
        {/* The Clarity Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-8">
            We don't know exactly where it goes from here.
          </p>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-12">
            But that's the point.
          </p>
          
          {/* Where2 Logo Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <span className="font-fredoka text-6xl sm:text-7xl lg:text-8xl font-bold text-teal">
              Where2?
            </span>
          </motion.div>
          
          {/* Clear Business Answer */}
          <div className="bg-card/50 backdrop-blur-sm border-2 border-golden-yellow/30 rounded-3xl p-8 sm:p-12">
            <p className="font-fredoka text-lg sm:text-xl text-golden-yellow font-medium mb-4">
              Where2Studios
            </p>
            <p className="font-fredoka text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground">
              The agency engine. We help brands grow through content, strategy, and partnerships that drive real customers.
            </p>
          </div>
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
