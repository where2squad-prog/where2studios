'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

interface FloatingCTAProps {
  showHomeButton?: boolean
}

export function FloatingCTA({ showHomeButton = false }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { openSheet } = useBookingSheet()

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
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 left-0 right-0 z-[100]"
        >
          {/* M3 Surface Dark */}
          <div className="bg-m3-surface-dark/95 backdrop-blur-xl border-t border-m3-on-dark/10">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                {/* Left side */}
                {showHomeButton ? (
                  <a
                    href="/"
                    className="flex items-center gap-2 text-m3-on-dark/70 hover:text-m3-on-dark transition-colors text-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">Home</span>
                  </a>
                ) : (
                  <span className="text-m3-primary text-xs font-medium">
                    Your Growth Team, On Demand.
                  </span>
                )}
                
                {/* Right side - M3 Filled Button */}
                <button
                  onClick={openSheet}
                  className="m3-filled-button flex items-center gap-2 text-xs sm:text-sm px-4 py-2"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
