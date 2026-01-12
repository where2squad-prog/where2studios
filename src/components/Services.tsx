'use client'

import { motion } from 'framer-motion'
import { Palette, Video, Heart, Target, Camera, Rocket, BookOpen, Zap, CheckCircle, Infinity } from 'lucide-react'

export function Services() {
  const useCases = [
    { 
      id: 'brand-growth', 
      title: "Visual Branding", 
      icon: Palette,
      description: "Short-form content and commercials designed to introduce your brand and turn curiosity into customers."
    },
    { 
      id: 'corporate', 
      title: "Corporate Events", 
      icon: Video,
      description: "High-energy recap films that capture the people, the atmosphere, and the moment."
    },
    { 
      id: 'weddings', 
      title: "Life Events", 
      icon: Heart,
      description: "Cinematic, story-driven films that feel honest and personal. Real memories, told well."
    }
  ]

  const processSteps = [
    {
      number: "1",
      title: "Clarify",
      icon: Target,
      description: "We start by listening. Your story, your audience, and what success looks like."
    },
    {
      number: "2", 
      title: "Capture",
      icon: Camera,
      description: "Small, intentional crews focused on real moments with purpose."
    },
    {
      number: "3",
      title: "Deliver",
      icon: Rocket,
      description: "Thoughtful edits and platform-ready content built to last."
    }
  ]

  const whyItWorks = [
    { icon: BookOpen, text: "Story before strategy" },
    { icon: Zap, text: "Collaborative process" },
    { icon: CheckCircle, text: "Clear goals, real outcomes" },
    { icon: Infinity, text: "Content that lives on" }
  ]

  return (
    <section id="services" className="relative py-12 sm:py-16 bg-m3-surface-dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* What We Do Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="label text-m3-primary"
          >
            What We Do
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-on-dark mt-2 mb-3"
          >
            Your stories. Shared to grow your brand.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-m3-on-dark/60 max-w-xl mx-auto"
          >
            From social content to once-in-a-lifetime moments, we focus on clarity and emotion.
          </motion.p>
        </div>

        {/* Use Cases - M3 Filled Tonal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="m3-tonal-card p-6 text-center"
            >
              <useCase.icon className="w-8 h-8 text-m3-primary mx-auto mb-4" />
              <h3 className="text-base font-semibold text-m3-on-surface mb-2">
                {useCase.title}
              </h3>
              <p className="text-m3-on-surface/60 text-sm leading-relaxed">
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
            className="text-xl sm:text-2xl font-bold text-m3-on-dark"
          >
            How It Works
          </motion.h3>
        </div>

        {/* Process Steps - M3 Outlined Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="m3-outlined-card p-6 text-center border-m3-on-dark/10"
            >
              {/* Step Number - M3 Circular Badge */}
              <div className="w-10 h-10 bg-m3-primary text-m3-on-primary rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                {step.number}
              </div>
              
              {/* Icon + Title */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <step.icon className="w-5 h-5 text-m3-primary" />
                <h4 className="text-base font-semibold text-m3-primary">
                  {step.title}
                </h4>
              </div>
              
              <p className="text-m3-on-dark/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why It Works - Icon List (not cards) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-lg font-bold text-m3-on-dark text-center mb-6">
            Why It Works
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {whyItWorks.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3"
              >
                <item.icon className="w-5 h-5 text-m3-primary flex-shrink-0" />
                <span className="text-m3-on-dark/80 text-sm font-medium">{item.text}</span>
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
          className="text-center mt-10 max-w-xl mx-auto"
        >
          <p className="text-m3-on-dark/50 text-sm leading-relaxed">
            We're built for brands who care about meaning as much as momentum.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
