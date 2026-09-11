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

  const openSheet = (next?: BookingPrefill) => {
    setPrefill(next ?? {})
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
