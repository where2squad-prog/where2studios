'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

export function FloatingCTA() {
  const { openSheet } = useBookingSheet()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('contact')
    if (!target) return
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.button
      onClick={openSheet}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? 20 : 0,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="m3-filled-button fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full shadow-lg px-6 py-3"
      aria-label="Book a Call">
      Book a Call
    </motion.button>
  )
}