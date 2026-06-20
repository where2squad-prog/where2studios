'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface Where2BoysSheetContextType {
  isOpen: boolean
  openSheet: () => void
  closeSheet: () => void
}

const Where2BoysSheetContext = createContext<Where2BoysSheetContextType | undefined>(undefined)

export function Where2BoysSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Where2BoysSheetContext.Provider
      value={{
        isOpen,
        openSheet: () => setIsOpen(true),
        closeSheet: () => setIsOpen(false),
      }}
    >
      {children}
    </Where2BoysSheetContext.Provider>
  )
}

export function useWhere2BoysSheet() {
  const ctx = useContext(Where2BoysSheetContext)
  if (!ctx) throw new Error('useWhere2BoysSheet must be used inside Where2BoysSheetProvider')
  return ctx
}