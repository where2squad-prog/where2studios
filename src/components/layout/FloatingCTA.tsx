'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

interface FloatingCTAProps {
  label?: string
  /** Element id that hides the pill when it scrolls into view. */
  hideWhenVisibleId?: string
  /** When set, the pill smooth-scrolls to this element id instead of opening the booking sheet. */
  scrollToId?: string
  /** Only show on mobile viewports. */
  mobileOnly?: boolean
}

export function FloatingCTA({
  label = 'Book a Call',
  hideWhenVisibleId = 'contact',
  scrollToId,
  mobileOnly = false,
}: FloatingCTAProps) {
  const { openSheet } = useBookingSheet()
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const target = document.getElementById(hideWhenVisibleId)
    if (!target) return
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [hideWhenVisibleId])

  const handleClick = () => {
    if (scrollToId) {
      document.getElementById(scrollToId)?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
      return
    }
    openSheet()
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={{
        opacity: hidden ? 0 : 1,
        y: reduce ? 0 : (hidden ? 20 : 0),
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      transition={{ duration: reduce ? 0 : 0.3 }}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
      className={`m3-filled-button fixed sm:!bottom-6 sm:!right-6 z-50 rounded-full shadow-lg px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary focus-visible:ring-offset-2 ${
        mobileOnly ? 'md:hidden' : ''
      }`}
      aria-label={label}>
      {label}
    </motion.button>
  )
}
