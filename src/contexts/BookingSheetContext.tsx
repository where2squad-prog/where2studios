'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface BookingPrefill {
  conference?: string
  running?: string
  need?: string
  venue?: string
  source?: string
}

interface BookingSheetContextType {
  isOpen: boolean
  prefill: BookingPrefill
  /** Accepts a prefill object, or an event when passed straight to onClick. */
  openSheet: (prefill?: BookingPrefill | unknown) => void
  closeSheet: () => void
}

const BookingSheetContext = createContext<BookingSheetContextType | undefined>(undefined)

export function BookingSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<BookingPrefill>({})

  // Some call sites pass openSheet straight to onClick, so only keep known string fields.
  const openSheet = (next?: BookingPrefill | unknown) => {
    const clean: BookingPrefill = {}
    if (next && typeof next === 'object') {
      const raw = next as Record<string, unknown>
      for (const key of ['conference', 'running', 'need', 'venue', 'source'] as const) {
        const value = raw[key]
        if (typeof value === 'string' && value) clean[key] = value
      }
    }
    setPrefill(clean)
    setIsOpen(true)
  }
  const closeSheet = () => setIsOpen(false)

  return (
    <BookingSheetContext.Provider value={{ isOpen, prefill, openSheet, closeSheet }}>
      {children}
    </BookingSheetContext.Provider>
  )
}

export function useBookingSheet() {
  const context = useContext(BookingSheetContext)
  if (!context) {
    throw new Error('useBookingSheet must be used within a BookingSheetProvider')
  }
  return context
}
