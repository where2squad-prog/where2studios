'use client'

import { Link } from 'react-router-dom'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

export function Footer() {
  const { openSheet } = useBookingSheet()

  const links = [
    { label: 'Our Work', href: '/startups' },
    { label: 'Services', href: '/services' },
    { label: 'Who We Are', href: '/who-we-are' },
    { label: 'Contact', href: '/contact' },
  ]

  const services = [
    { label: 'Brand and Growth Strategy', href: '/services/strategy' },
    { label: 'High Impact Media Production', href: '/services/production' },
    { label: 'Full Service Marketing Execution', href: '/services/marketing' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ]

  return (
    <footer className="relative py-12 sm:py-16 pb-24 sm:pb-28 bg-m3-surface-dark text-m3-on-dark">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto mb-12">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-fredoka text-m3-primary text-xl font-medium mb-3">
              Where2Studios
            </div>
            <p className="text-m3-on-dark/60 text-sm mb-1 max-w-xs">
              Your Growth Team, On Demand.
            </p>
            <p className="text-m3-on-dark/50 text-xs mb-4 max-w-xs">
              Strategy first, premium media production, full service marketing execution.
            </p>
            <p className="text-m3-on-dark/40 text-xs mb-4">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>
            <button
              onClick={openSheet}
              className="m3-filled-button text-sm"
            >
              Book a Strategy Call
            </button>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-fredoka text-sm font-medium text-m3-on-dark mb-4">Links</h4>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href} 
                  className="text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-fredoka text-sm font-medium text-m3-on-dark mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              {services.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href} 
                  className="text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-fredoka text-sm font-medium text-m3-on-dark mb-4">Legal</h4>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href} 
                  className="text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-m3-on-dark/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-m3-on-dark/50">
              © 2026 Where2Studios. All rights reserved.
            </p>
            <p className="text-xs text-m3-on-dark/40">
              San Francisco Bay Area
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
