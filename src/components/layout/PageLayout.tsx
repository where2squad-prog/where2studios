'use client'

import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from '@/components/Footer'
import { SkipLink } from './SkipLink'


interface PageLayoutProps {
  children: ReactNode
  navVariant?: 'light' | 'dark'
  
}

export function PageLayout({
  children,
  navVariant = 'dark',
  
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <SkipLink />
      <Navbar variant={navVariant} />
      <main id="main-content" tabIndex={-1} className="relative outline-none">{children}</main>
      <Footer />
      
    </div>
  )
}
