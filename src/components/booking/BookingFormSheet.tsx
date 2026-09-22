'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { BookingFlow, stepTitles } from '@/components/booking/BookingFlow'
import { CALL_LENGTH_LABEL } from '@/lib/booking'

/**
 * The one booking sheet behind every "Book a call" button.
 * Pick a topic (skipped when the page already knows it), pick a time, done.
 */
export function BookingFormSheet() {
  const { isOpen, closeSheet, prefill } = useBookingSheet()
  const [title, setTitle] = useState(stepTitles.topic)
  // Remount the flow each time the sheet opens so it starts fresh with the new prefill.
  const [openCount, setOpenCount] = useState(0)

  useEffect(() => {
    if (isOpen) setOpenCount((n) => n + 1)
  }, [isOpen])

  // Prevent body scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    closeSheet()
  }, [closeSheet])

  // Escape closes the sheet, same as the close button
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        handleClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, handleClose])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 z-[140]"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-sheet-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-m3-surface-variant z-[145] shadow-2xl flex flex-col"
          >
            <div className="flex-shrink-0 px-5 pt-5 pb-3 relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 hover:bg-m3-surface rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-m3-on-surface/70" />
              </button>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-m3-primary">
                Book a {CALL_LENGTH_LABEL}
              </p>
              <h2
                id="booking-sheet-title"
                className="font-fredoka text-2xl font-semibold text-m3-on-surface mt-1 pr-10"
              >
                {title}
              </h2>
            </div>

            <div
              className="flex-1 overflow-y-auto px-5 pt-2"
              style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            >
              <BookingFlow
                key={openCount}
                prefill={prefill}
                variant="sheet"
                onStepChange={(step) => setTitle(stepTitles[step])}
                onClose={handleClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
