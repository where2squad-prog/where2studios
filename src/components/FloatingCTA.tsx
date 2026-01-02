'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Home } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FloatingCTAProps {
  showHomeButton?: boolean
}

export function FloatingCTA({ showHomeButton = false }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 300px)
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
        >
          {/* Home button - only on Work page */}
          {showHomeButton && (
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-cream-highlight/10 backdrop-blur-xl border border-cream-highlight/20 text-cream-highlight rounded-full shadow-2xl hover:bg-cream-highlight/20 transition-colors"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          )}
          
          {/* Main CTA button - Amazon style */}
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-golden-yellow text-near-black font-fredoka font-semibold text-sm sm:text-base rounded-full shadow-2xl shadow-golden-yellow/30 hover:bg-orange-accent transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Book a Call</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
