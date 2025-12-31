'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Services() {
  const [isVisible, setIsVisible] = useState(false)

  const services = [
    {
      id: 'strategy',
      title: "Strategy",
      subtitle: "Positioning + messaging",
      description: "We define what makes you different and turn it into content that converts.",
      icon: "📊"
    },
    {
      id: 'production',
      title: "Production",
      subtitle: "Video, photo, creative",
      description: "High-quality content built for attention and action.",
      icon: "🎬"
    },
    {
      id: 'distribution',
      title: "Distribution",
      subtitle: "Posting + optimization",
      description: "We handle publishing and testing so your content reaches the right people.",
      icon: "📱"
    },
    {
      id: 'partnerships',
      title: "Partnerships",
      subtitle: "Creators + brands",
      description: "Collaborations that expand your reach and credibility.",
      icon: "🤝"
    },
    {
      id: 'analytics',
      title: "Performance",
      subtitle: "Data + iteration",
      description: "We track what works and double down on it.",
      icon: "📈"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="services" className="relative pt-8 pb-24 bg-near-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-golden-yellow rounded-full" />
            <span className="font-fredoka text-sm font-medium text-golden-yellow uppercase tracking-widest">
              What We Do
            </span>
            <div className="w-3 h-3 bg-brick-red rounded-full" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream-highlight mb-6"
          >
            Full-Service Creative
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-golden-yellow font-fredoka font-medium max-w-2xl mx-auto"
          >
            From strategy to execution.
          </motion.p>
        </div>

        {/* Services Grid - 2-row scannable layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-cream-highlight/5 to-cream-highlight/10 border border-cream-highlight/10 rounded-2xl p-8 hover:border-golden-yellow/30 hover:bg-cream-highlight/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-fredoka text-xl font-semibold text-cream-highlight mb-1 group-hover:text-golden-yellow transition-colors">
                {service.title}
              </h3>
              <p className="text-golden-yellow/70 text-sm font-medium mb-3">
                {service.subtitle}
              </p>
              <p className="text-cream-highlight/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-4 bg-cream-highlight/5 border border-cream-highlight/10 rounded-full px-8 py-4">
            <span className="text-cream-highlight font-medium">Our Process:</span>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-golden-yellow font-fredoka font-semibold">Audit</span>
              <span className="text-cream-highlight/40">→</span>
              <span className="text-golden-yellow font-fredoka font-semibold">Plan</span>
              <span className="text-cream-highlight/40">→</span>
              <span className="text-golden-yellow font-fredoka font-semibold">Produce</span>
              <span className="text-cream-highlight/40">→</span>
              <span className="text-golden-yellow font-fredoka font-semibold">Iterate</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
