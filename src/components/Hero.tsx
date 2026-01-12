'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import logo from '@/assets/where2studios-logo.png'
import { useCountUp } from '@/hooks/useCountUp'

export function Hero() {
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only views gets animated count-up (climbing feel)
  const views = useCountUp({ end: 259, duration: 2000, suffix: 'M+' })

  // Scroll detection + parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
      setScrollY(scrollTop)
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
    <div className="relative h-screen w-full overflow-hidden bg-near-black">
      {/* Video Background - slightly blurred with parallax effect */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
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
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Full-Width Navbar - Condensed */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div 
          className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'py-2 bg-black/95 backdrop-blur-xl border-b border-white/10' 
              : 'py-3 lg:py-4 bg-gradient-to-b from-black/70 via-black/40 to-transparent'
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo with scroll-based scale animation */}
            <motion.div
              animate={{ 
                scale: isScrolled ? 0.75 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center cursor-pointer origin-left"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <img 
                src={logo} 
                alt="Where2Studios" 
                className={`w-auto drop-shadow-2xl transition-all duration-300 ${
                  isScrolled ? 'h-12 sm:h-14 lg:h-16' : 'h-16 sm:h-20 lg:h-24'
                }`} 
              />
            </motion.div>

            {/* Navigation Menu - Desktop */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <a 
                href="#services" 
                className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Services
              </a>
              <a 
                href="#team" 
                className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Team
              </a>
              <a 
                href="#contact" 
                className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Contact
              </a>
              
              {/* Primary CTA - Always visible */}
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="ml-2 bg-golden-yellow text-near-black font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-orange-accent transition-colors cursor-pointer"
              >
                Book a Call
              </button>
            </div>

            {/* Right Side - Mobile */}
            <div className="flex items-center gap-3 md:hidden">
              {/* CTA Button - Always visible on mobile */}
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-golden-yellow text-near-black font-semibold text-xs px-4 py-2 rounded-full hover:bg-orange-accent transition-colors cursor-pointer"
              >
                Contact Us
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-64 bg-near-black/95 backdrop-blur-xl border-l border-white/10 z-[90]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1">
              <a 
                href="#services" 
                className="px-4 py-3 text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#team" 
                className="px-4 py-3 text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </a>
              <a 
                href="#contact" 
                className="px-4 py-3 text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>

            {/* Mobile CTA Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
                setIsMobileMenuOpen(false)
              }}
              className="mt-6 bg-golden-yellow text-near-black font-semibold px-6 py-3 rounded-full hover:bg-orange-accent transition-colors cursor-pointer"
            >
              Book a Call
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hero Content - Lower Left */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-24 sm:bottom-20 lg:bottom-16 left-4 sm:left-8 lg:left-16 z-40"
      >
        {/* Subtle glass card for text contrast */}
        <div className="max-w-lg lg:max-w-xl bg-black/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
          {/* Eyebrow */}
          <p className="text-golden-yellow text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
            Stories worth telling.
          </p>
          
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight mb-4">
            Creating content that reaches people and builds <span className="text-golden-yellow">community.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed mb-6">
            A collective of visual storytellers helping brands get seen through short-form content, commercials, and event films.
          </p>
          
          {/* CTA Buttons - Side by side on desktop, stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-golden-yellow text-near-black font-semibold text-base px-6 py-3 rounded-full hover:bg-orange-accent transition-colors cursor-pointer"
            >
              Book a Call
            </button>
            <button
              onClick={() => {
                window.location.href = '/work'
              }}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 font-semibold text-base px-6 py-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              See Our Work
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Social Proof Stats Bar - Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 right-16 z-40 hidden lg:block"
      >
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10" ref={views.ref}>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-golden-yellow tabular-nums">632+</div>
              <div className="text-white/60 text-xs">Projects</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-xl font-bold text-golden-yellow tabular-nums">{views.formatted}</div>
              <div className="text-white/60 text-xs">Views</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-xl font-bold text-golden-yellow tabular-nums">68+</div>
              <div className="text-white/60 text-xs">Brands</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Proof Stats Bar - Mobile (horizontal) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 left-4 right-4 z-40 lg:hidden"
      >
        <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="text-lg font-bold text-golden-yellow tabular-nums">632+</div>
              <div className="text-white/60 text-[10px]">Projects</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-lg font-bold text-golden-yellow tabular-nums">{views.formatted}</div>
              <div className="text-white/60 text-[10px]">Views</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-lg font-bold text-golden-yellow tabular-nums">68+</div>
              <div className="text-white/60 text-[10px]">Brands</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          const servicesSection = document.getElementById('featured-wins') || document.getElementById('services')
          servicesSection?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #14180A 100%)'
        }}
      />
    </div>
  )
}