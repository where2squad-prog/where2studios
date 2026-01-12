'use client'

import { motion } from 'framer-motion'

export function Services() {
  const useCases = [
    { 
      id: 'brand-growth', 
      title: "Visual Branding", 
      icon: "📱",
      description: "Short-form content and commercials designed to introduce your brand and turn curiosity into customers."
    },
    { 
      id: 'corporate', 
      title: "Corporate Events", 
      icon: "🎬",
      description: "High-energy recap films that capture the people, the atmosphere, and the moment."
    },
    { 
      id: 'weddings', 
      title: "Life Events", 
      icon: "💍",
      description: "Cinematic, story-driven films that feel honest and personal. Real memories, told well."
    }
  ]

  const processSteps = [
    {
      number: "1",
      title: "Clarify",
      icon: "🎯",
      description: "We start by listening. Your story, your audience, and what success looks like."
    },
    {
      number: "2", 
      title: "Capture",
      icon: "🎥",
      description: "Small, intentional crews focused on real moments with purpose."
    },
    {
      number: "3",
      title: "Deliver",
      icon: "🚀",
      description: "Thoughtful edits and platform-ready content built to last."
    }
  ]

  const whyItWorks = [
    { icon: "📖", text: "Story before strategy" },
    { icon: "⚡", text: "Collaborative process" },
    { icon: "✅", text: "Clear goals, real outcomes" },
    { icon: "♾️", text: "Content that lives on" }
  ]

  return (
    <section id="services" className="relative py-10 sm:py-12 bg-near-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* What We Do Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-golden-yellow uppercase tracking-widest"
          >
            What We Do
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 mb-3"
          >
            Your stories. Shared to grow your brand.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-white/70 max-w-xl mx-auto"
          >
            From social content to once-in-a-lifetime moments, we focus on clarity and emotion.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
            >
              <div className="text-3xl mb-3">{useCase.icon}</div>
              <h3 className="text-base font-semibold text-white mb-2">
                {useCase.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold text-white"
          >
            How It Works
          </motion.h3>
        </div>

        {/* Process Steps - Consistent 1, 2, 3 format */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/5 border border-white/10 rounded-xl p-5 text-center"
            >
              {/* Step Number Circle */}
              <div className="w-8 h-8 bg-golden-yellow text-near-black rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                {step.number}
              </div>
              
              {/* Icon + Title */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl">{step.icon}</span>
                <h4 className="text-base font-semibold text-golden-yellow">
                  {step.title}
                </h4>
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-lg font-bold text-white text-center mb-4">
            Why It Works
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {whyItWorks.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-white/80 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Positioning Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-8 max-w-xl mx-auto"
        >
          <p className="text-white/60 text-sm leading-relaxed">
            We're built for brands who care about meaning as much as momentum.
          </p>
        </motion.div>

      </div>
    </section>
  )
}