'use client'

import { motion } from 'framer-motion'

export function Services() {
  const services = [
    { id: 'strategy', title: "Strategy", subtitle: "Positioning + messaging", icon: "📊" },
    { id: 'production', title: "Production", subtitle: "Video, photo, creative", icon: "🎬" },
    { id: 'distribution', title: "Distribution", subtitle: "Posting + optimization", icon: "📱" },
    { id: 'partnerships', title: "Partnerships", subtitle: "Creators + brands", icon: "🤝" },
    { id: 'analytics', title: "Performance", subtitle: "Data + iteration", icon: "📈" }
  ]

  return (
    <section id="services" className="relative py-12 bg-near-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Compact Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <div className="w-2 h-2 bg-golden-yellow rounded-full" />
            <span className="font-fredoka text-xs font-medium text-golden-yellow uppercase tracking-widest">
              What We Do
            </span>
            <div className="w-2 h-2 bg-brick-red rounded-full" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-fredoka text-3xl sm:text-4xl font-semibold text-cream-highlight"
          >
            Full-Service Creative
          </motion.h2>
        </div>

        {/* Compact Services Grid - 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-cream-highlight/5 border border-cream-highlight/10 rounded-xl p-4 hover:border-golden-yellow/30 hover:bg-cream-highlight/10 transition-all duration-300 text-center"
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <h3 className="font-fredoka text-sm font-semibold text-cream-highlight mb-1 group-hover:text-golden-yellow transition-colors">
                {service.title}
              </h3>
              <p className="text-golden-yellow/60 text-xs">
                {service.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Compact Process */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
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
