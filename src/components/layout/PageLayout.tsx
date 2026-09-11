'use client'

import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from '@/components/Footer'
import { SkipLink } from './SkipLink'
import { KeepReading } from './KeepReading'


interface PageLayoutProps {
  children: ReactNode
  navVariant?: 'light' | 'dark'
  /** Set false to skip the in page "Keep reading" link row. */
  keepReading?: boolean
}

export function PageLayout({
  children,
  navVariant = 'dark',
  keepReading = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <SkipLink />
      <Navbar variant={navVariant} />
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        {children}
        {keepReading && <KeepReading />}
      </main>
      <Footer />
      
    </div>
  )
}
