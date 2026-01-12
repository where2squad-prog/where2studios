'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import logo from '@/assets/where2studios-logo.png'
import { useCountUp } from '@/hooks/useCountUp'

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only views gets animated count-up
  const views = useCountUp({ end: 259, duration: 2000, suffix: 'M+' })

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-m3-surface-dark">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-[120%] object-cover blur-[2px] scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-background.mp4?v=4" type="video/mp4" />
        </video>
      </div>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-m3-surface-dark/60" />

      {/* M3 Top App Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div 
          className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'py-2 bg-m3-surface-dark/95 backdrop-blur-xl border-b border-m3-on-dark/10' 
              : 'py-3 lg:py-4 bg-gradient-to-b from-m3-surface-dark/70 via-m3-surface-dark/40 to-transparent'
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              animate={{ scale: isScrolled ? 0.75 : 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center cursor-pointer origin-left"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src={logo} 
                alt="Where2Studios" 
                className={`w-auto drop-shadow-2xl transition-all duration-300 ${
                  isScrolled ? 'h-12 sm:h-14 lg:h-16' : 'h-16 sm:h-20 lg:h-24'
                }`} 
              />
            </motion.div>

            {/* Desktop Navigation - M3 Text Buttons */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <a 
                href="/work" 
                className="m3-text-button text-m3-on-dark/80 hover:text-m3-on-dark"
              >
                Our Work
              </a>
              <a 
                href="#team" 
                className="m3-text-button text-m3-on-dark/80 hover:text-m3-on-dark"
              >
                Team
              </a>
              
              {/* M3 Filled Button - Primary CTA */}
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="ml-2 m3-filled-button text-sm cursor-pointer"
              >
                Book a Call
              </button>
            </div>

            {/* Mobile - M3 Filled Button + Menu */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="m3-filled-button text-xs px-4 py-2 cursor-pointer"
              >
                Book a Call
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-m3-on-dark hover:bg-m3-on-dark/10 active:bg-m3-on-dark/20 transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-m3-surface-dark/60 backdrop-blur-sm z-[80] cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-64 bg-m3-surface-dark/95 backdrop-blur-xl border-l border-m3-on-dark/10 z-[90]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-m3-on-dark hover:bg-m3-on-dark/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-col px-6 pb-6 h-full">
                  <nav className="flex flex-col gap-1">
                    <a 
                      href="/work" 
                      className="px-4 py-3 text-m3-on-dark hover:bg-m3-on-dark/10 rounded-lg text-base font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Work
                    </a>
                    <a 
                      href="#team" 
                      className="px-4 py-3 text-m3-on-dark hover:bg-m3-on-dark/10 rounded-lg text-base font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Team
                    </a>
                  </nav>

                  <button
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      contactSection?.scrollIntoView({ behavior: 'smooth' })
                      setIsMobileMenuOpen(false)
                    }}
                    className="mt-6 m3-filled-button cursor-pointer"
                  >
                    Book a Call
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Content - M3 Split Layout */}
      <div className="relative z-40 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <p className="text-m3-primary text-sm font-semibold tracking-wide uppercase mb-4">
                Stories worth telling.
              </p>
              
              {/* Display Large */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-m3-on-dark font-bold leading-tight mb-6">
                Creating content that reaches people and builds{' '}
                <span className="text-m3-primary">community.</span>
              </h1>
              
              {/* Body */}
              <p className="text-base sm:text-lg text-m3-on-dark/70 max-w-lg leading-relaxed mb-8">
                A collective of visual storytellers helping brands get seen through short-form content, commercials, and event films.
              </p>
              
              {/* CTA Buttons - M3 Filled + Outlined */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    contactSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="m3-filled-button cursor-pointer"
                >
                  Book a Call
                </button>
                <button
                  onClick={() => window.location.href = '/work'}
                  className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10 cursor-pointer"
                >
                  See Our Work
                </button>
              </div>
            </motion.div>

            {/* Right Column - Video Card (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="m3-elevated-card overflow-hidden aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/hero-background.mp4?v=4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Stats - M3 Surface Variant Card (Separate Section) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-4 right-4 sm:left-8 sm:right-8 lg:left-auto lg:right-16 lg:w-auto z-40"
        ref={views.ref}
      >
        <div className="m3-elevated-card bg-m3-surface-dark/80 backdrop-blur-md p-4 sm:p-5 border border-m3-on-dark/10">
          <div className="flex justify-around lg:justify-start gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-m3-primary tabular-nums">632+</div>
              <div className="text-m3-on-dark/60 text-xs sm:text-sm">Projects</div>
            </div>
            <div className="w-px bg-m3-on-dark/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-m3-primary tabular-nums">{views.formatted}</div>
              <div className="text-m3-on-dark/60 text-xs sm:text-sm">Views</div>
            </div>
            <div className="w-px bg-m3-on-dark/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-m3-primary tabular-nums">68+</div>
              <div className="text-m3-on-dark/60 text-xs sm:text-sm">Brands</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #14180A 100%)'
        }}
      />
    </div>
  )
}
