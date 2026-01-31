'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingSheetContextType {
  isOpen: boolean
  openSheet: () => void
  closeSheet: () => void
}

const BookingSheetContext = createContext<BookingSheetContextType | undefined>(undefined)

export function BookingSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSheet = () => setIsOpen(true)
  const closeSheet = () => setIsOpen(false)

  return (
    <BookingSheetContext.Provider value={{ isOpen, openSheet, closeSheet }}>
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
