'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FloatingCTAProps {
  showHomeButton?: boolean
}

export function FloatingCTA({ showHomeButton = false }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Flush bottom bar */}
          <div className="bg-near-black/95 backdrop-blur-xl border-t border-cream-highlight/10">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <div className="flex items-center justify-between h-16 sm:h-18">
                {/* Left side - Home button on Work page */}
                {showHomeButton ? (
                  <a
                    href="/"
                    className="flex items-center gap-2 text-white hover:text-golden-yellow transition-colors text-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">Home</span>
                  </a>
                ) : (
                  <span className="text-white text-xs sm:text-sm hidden sm:block px-3 py-1.5 bg-white/10 rounded-full">
                    Ready to grow?
                  </span>
                )}
                
                {/* Right side - CTA */}
                <a
                  href="/#contact"
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-golden-yellow text-near-black font-fredoka font-semibold text-sm rounded-full hover:bg-orange-accent transition-all active:scale-95"
                >
                  <span>{showHomeButton ? "Let's Talk" : "Get Started"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
