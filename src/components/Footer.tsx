'use client'

import { Link } from 'react-router-dom'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { useTechWeekPhase } from '@/hooks/useTechWeekPhase'
import { isTechWeekPromoLive } from '@/lib/techWeek'

export function Footer() {
  const { openSheet } = useBookingSheet()
  const techWeekPhase = useTechWeekPhase()
  const showTechWeek = isTechWeekPromoLive(techWeekPhase)

  const links = [
    { label: 'Work', href: '/work' },
    { label: 'Conference calendar', href: '/conventions' },
    { label: 'Services', href: '/services' },
    { label: 'Why a dedicated crew', href: '/why-a-dedicated-crew' },
    { label: 'About', href: '/who-we-are' },
    { label: 'Contact', href: '/contact' },
    
  ]

  const services = [
    ...(showTechWeek
      ? [{ label: 'SF Tech Week video coverage', href: '/sf-tech-week', promo: true }]
      : []),
    { label: 'Event recap videos in the Bay Area', href: '/event-recap-videos' },
    { label: 'Activation recap', href: '/services#activation-recap' },
    { label: 'Exec clips for LinkedIn', href: '/services#exec-clips' },
    { label: 'Same week social cutdowns', href: '/services#social-cutdowns' },
    { label: 'Full week coverage', href: '/services#full-week-coverage' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
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
              Video coverage for conference week activations.
            </p>
            <p className="text-m3-on-dark/50 text-xs mb-4 max-w-xs">
              Activation recaps, exec clips and same week social cutdowns, San Francisco.
            </p>
            <p className="text-m3-on-dark/40 text-xs mb-4">
              We reply within 1 business day.
            </p>

            <button
              onClick={openSheet}
              className="m3-filled-button text-sm"
            >
              Book a Call
            </button>
          </div>

          {/* Links Column */}
          <div>
            <h2 className="font-fredoka text-sm font-medium text-m3-on-dark mb-4">Links</h2>
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
            <h2 className="font-fredoka text-sm font-medium text-m3-on-dark mb-4">Services</h2>
            <nav className="flex flex-col gap-2">
              {services.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href} 
                  {...('promo' in link && link.promo ? { 'data-techweek-promo': true } : {})}
                  className="text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h2 className="font-fredoka text-sm font-medium text-m3-on-dark mb-4">Legal</h2>
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
