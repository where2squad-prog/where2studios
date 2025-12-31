'use client'

import { motion } from 'framer-motion'

export function Awards() {
  // Placeholder for real brand logos - to be replaced with actual client logos
  const brandPlaceholders = [
    { name: "Your Brand", placeholder: true },
    { name: "Your Brand", placeholder: true },
    { name: "Your Brand", placeholder: true },
    { name: "Your Brand", placeholder: true },
    { name: "Your Brand", placeholder: true },
    { name: "Your Brand", placeholder: true },
  ]

  return (
    <section id="trusted" className="relative pt-8 pb-16 bg-cream-highlight">
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="font-fredoka text-sm font-medium text-near-black/60 uppercase tracking-widest">
            Trusted By Growing Brands
          </span>
        </motion.div>

        {/* Brands Grid - Ready for real logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12 max-w-5xl mx-auto"
        >
          {brandPlaceholders.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex items-center justify-center w-36 h-16 rounded-lg bg-near-black/5 border border-near-black/10 hover:border-golden-yellow/50 hover:bg-golden-yellow/10 transition-all duration-300"
            >
              {/* Replace this span with <img> tags when you have real logos */}
              <span className="font-fredoka text-sm text-near-black/30 group-hover:text-near-black/50 transition-colors">
                Logo
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-near-black/50 mt-8 font-fredoka"
        >
          Your brand could be next →
        </motion.p>

      </div>
      
    </section>
  )
}