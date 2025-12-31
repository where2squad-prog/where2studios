'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Services() {
  const [activeService, setActiveService] = useState<string | null>(null)

  const services = [
    { 
      id: 'strategy', 
      title: "Strategy", 
      subtitle: "Positioning + messaging", 
      icon: "📊",
      description: "We define what makes you different and turn it into content that converts."
    },
    { 
      id: 'production', 
      title: "Production", 
      subtitle: "Video, photo, creative", 
      icon: "🎬",
      description: "High-quality content built for attention and action."
    },
    { 
      id: 'distribution', 
      title: "Distribution", 
      subtitle: "Posting + optimization", 
      icon: "📱",
      description: "We handle publishing and testing so your content reaches the right people."
    },
    { 
      id: 'partnerships', 
      title: "Partnerships", 
      subtitle: "Creators + brands", 
      icon: "🤝",
      description: "Collaborations that expand your reach and credibility."
    },
    { 
      id: 'analytics', 
      title: "Performance", 
      subtitle: "Data + iteration", 
      icon: "📈",
      description: "We track what works and double down on it."
    }
  ]

  return (
    <section id="services" className="relative py-12 bg-near-black overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-golden-yellow/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brick-red/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Compact Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 mb-3"
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
            className="font-fredoka text-3xl sm:text-4xl font-semibold text-cream-highlight"
          >
            Full-Service Creative
          </motion.h2>
        </div>

        {/* Interactive Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mb-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              className={`group cursor-pointer bg-cream-highlight/5 border rounded-2xl p-4 transition-all duration-300 text-center ${
                activeService === service.id 
                  ? 'border-golden-yellow bg-cream-highlight/15 shadow-lg shadow-golden-yellow/10' 
                  : 'border-cream-highlight/10 hover:border-golden-yellow/30 hover:bg-cream-highlight/10'
              }`}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={activeService === service.id ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {service.icon}
              </motion.div>
              <h3 className={`font-fredoka text-sm font-semibold mb-1 transition-colors ${
                activeService === service.id ? 'text-golden-yellow' : 'text-cream-highlight group-hover:text-golden-yellow'
              }`}>
                {service.title}
              </h3>
              <p className="text-cream-highlight/90 text-xs">
                {service.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Expandable Description */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="bg-cream-highlight/10 border border-golden-yellow/20 rounded-xl px-6 py-4 text-center">
                <p className="text-cream-highlight/90 text-sm leading-relaxed">
                  {services.find(s => s.id === activeService)?.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm">
            <span className="text-cream-highlight/60">Process:</span>
            <span className="text-golden-yellow font-fredoka font-medium">Audit</span>
            <span className="text-cream-highlight/30">→</span>
            <span className="text-golden-yellow font-fredoka font-medium">Plan</span>
            <span className="text-cream-highlight/30">→</span>
            <span className="text-golden-yellow font-fredoka font-medium">Produce</span>
            <span className="text-cream-highlight/30">→</span>
            <span className="text-golden-yellow font-fredoka font-medium">Iterate</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
