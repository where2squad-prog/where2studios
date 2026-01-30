'use client'

import { motion } from 'framer-motion'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function QuickJumpRow() {
  return (
    <section className="py-8 sm:py-12 bg-m3-background">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <span className="text-m3-on-background/60 text-sm font-medium">Jump to:</span>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('featured-social')}
              className="px-6 py-3 rounded-2xl bg-m3-secondary text-m3-on-secondary font-semibold text-sm 
                         hover:bg-m3-secondary/90 transition-all duration-300 
                         shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Social Media Work
            </button>
            <button
              onClick={() => scrollToSection('featured-productions')}
              className="px-6 py-3 rounded-2xl bg-m3-primary text-m3-on-primary font-semibold text-sm 
                         hover:bg-m3-primary/90 transition-all duration-300 
                         shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Productions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
