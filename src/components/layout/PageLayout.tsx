'use client'

import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'

interface PageLayoutProps {
  children: ReactNode
  navVariant?: 'light' | 'dark'
  showFloatingCTA?: boolean
}

export function PageLayout({
  children,
  navVariant = 'dark',
  showFloatingCTA = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <Navbar variant={navVariant} />
      <main className="relative">{children}</main>
      <Footer />
      {showFloatingCTA && <FloatingCTA />}
    </div>
  )
}
