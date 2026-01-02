'use client'

import { motion } from 'framer-motion'

export function Services() {
  const useCases = [
    { 
      id: 'brand-growth', 
      title: "Brand Growth Content", 
      icon: "📱",
      description: "Short form content and commercials designed to turn attention into customers."
    },
    { 
      id: 'corporate', 
      title: "Corporate Events and Recaps", 
      icon: "🎬",
      description: "High energy recap films that capture the moment, highlight the brand, and are delivered fast while the event still matters."
    },
    { 
      id: 'weddings', 
      title: "Weddings and Life Events", 
      icon: "💍",
      description: "Cinematic, story first films that feel personal, emotional, and timeless, not generic."
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Clarify",
      description: "We lock the story, the audience, and the outcome before we ever hit record."
    },
    {
      number: "02", 
      title: "Capture",
      description: "Lean crews, intentional shots, and real moments, filmed with speed and purpose."
    },
    {
      number: "03",
      title: "Deliver",
      description: "Fast turnaround, platform ready edits, and content that is ready to post, share, or sell."
    }
  ]

  const whyItWorks = [
    "Story first, not random footage",
    "Fast turnaround without sacrificing quality",
    "Clear outcomes, not just pretty videos",
    "Content that lives beyond one post or one day"
  ]

  return (
    <section id="services" className="relative py-16 sm:py-24 bg-near-black overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-golden-yellow/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brick-red/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* What We Do Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-golden-yellow rounded-full" 
            />
            <span className="font-fredoka text-xs font-medium text-golden-yellow uppercase tracking-widest">
              What We Do
            </span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 bg-brick-red rounded-full" 
            />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-cream-highlight mb-6"
          >
            Story driven video for results and speed.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-cream-highlight/70 text-base sm:text-lg max-w-2xl mx-auto"
          >
            From social content and commercials to corporate events and weddings, we focus on clarity, emotion, and fast turnaround.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group cursor-pointer bg-cream-highlight/5 border border-cream-highlight/10 rounded-2xl p-6 transition-all duration-300 hover:border-golden-yellow/30 hover:bg-cream-highlight/10 active:scale-95"
            >
              <motion.div 
                className="text-4xl mb-4"
              >
                {useCase.icon}
              </motion.div>
              <h3 className="font-fredoka text-lg sm:text-xl font-semibold mb-3 text-cream-highlight group-hover:text-golden-yellow transition-colors">
                {useCase.title}
              </h3>
              <p className="text-cream-highlight/70 text-sm sm:text-base leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="w-16 h-px bg-cream-highlight/20" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-golden-yellow rounded-full" 
          />
          <div className="w-16 h-px bg-cream-highlight/20" />
        </div>

        {/* How It Works */}
        <div className="text-center mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-fredoka text-2xl sm:text-3xl font-semibold text-cream-highlight mb-2"
          >
            How It Works
          </motion.h3>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-cream-highlight/5 border border-cream-highlight/10 rounded-2xl p-6 text-center"
            >
              {/* Connection line for desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-golden-yellow/50 to-transparent" />
              )}
              
              <div className="text-golden-yellow/60 font-fredoka text-xs font-bold mb-3">
                {step.number}
              </div>
              <h4 className="font-fredoka text-xl font-semibold text-golden-yellow mb-3">
                {step.title}
              </h4>
              <p className="text-cream-highlight/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-fredoka text-xl sm:text-2xl font-semibold text-cream-highlight text-center mb-6">
            Why It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-cream-highlight/5 border border-cream-highlight/10 rounded-xl px-4 py-3"
              >
                <div className="w-2 h-2 bg-golden-yellow rounded-full flex-shrink-0" />
                <span className="text-cream-highlight/90 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Positioning Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-cream-highlight/60 text-sm sm:text-base leading-relaxed">
            We are built for brands and clients who value clarity, speed, and results.
            <br className="hidden sm:block" />
            <span className="text-cream-highlight/40"> If you are looking for slow timelines or vague creative, we are not the right fit.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}