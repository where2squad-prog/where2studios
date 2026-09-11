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
  openSheet: (prefill?: BookingPrefill) => void
  closeSheet: () => void
}

const BookingSheetContext = createContext<BookingSheetContextType | undefined>(undefined)

export function BookingSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<BookingPrefill>({})

  // Some call sites pass openSheet straight to onClick, so only keep known string fields.
  const openSheet = (next?: BookingPrefill) => {
    const clean: BookingPrefill = {}
    if (next && typeof next === 'object') {
      for (const key of ['conference', 'running', 'need', 'venue', 'source'] as const) {
        const value = next[key]
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
