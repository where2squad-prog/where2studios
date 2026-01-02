'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import logo from '@/assets/where2studios-logo.png'

export function Hero() {
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50) // Show background after 50px scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
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
      {/* Video Background - slightly blurred for text focus */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-background.mp4?v=3" type="video/mp4" />
      </video>
      
      {/* Dark overlay for text readability - increased opacity */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Full-Width Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div 
          className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <img src={logo} alt="Where2Studios" className="h-24 sm:h-28 lg:h-40 w-auto drop-shadow-2xl" />
            </motion.div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-3">
              <a 
                href="#services" 
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow text-sm font-medium transition-all"
              >
                <span>🎬</span> Services
              </a>
              <a 
                href="#team" 
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow text-sm font-medium transition-all"
              >
                <span>👥</span> Team
              </a>
              <a 
                href="#contact" 
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow text-sm font-medium transition-all"
              >
                <span>📞</span> Contact
              </a>
            </div>

            {/* Right Side - CTA + Mobile Menu */}
            <div className="flex items-center space-x-3 relative">
              
              {/* CTA Button - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hidden sm:block bg-golden-yellow text-near-black font-fredoka font-semibold text-sm px-6 py-3 rounded-full hover:bg-orange-accent gentle-animation ml-4 cursor-pointer"
              >
                Book a Call
              </motion.button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer z-[120] relative"
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
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-md z-[80] cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black/90 backdrop-blur-xl border-l border-white/10 z-[90] mobile-menu-panel pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Close Button at the top */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3 text-white">
              <a 
                href="#services" 
                className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-golden-yellow/30 rounded-xl text-white hover:text-golden-yellow font-medium text-lg transition-all active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🎬</span> Services
              </a>
              <a 
                href="#team" 
                className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-golden-yellow/30 rounded-xl text-white hover:text-golden-yellow font-medium text-lg transition-all active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>👥</span> Team
              </a>
              <a 
                href="#contact" 
                className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-golden-yellow/30 rounded-xl text-white hover:text-golden-yellow font-medium text-lg transition-all active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📞</span> Contact
              </a>
            </div>

            {/* Mobile CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
                setIsMobileMenuOpen(false)
              }}
              className="bg-golden-yellow text-near-black font-fredoka font-semibold px-6 py-3 rounded-full hover:bg-orange-accent gentle-animation mt-8 cursor-pointer"
            >
              Book a Call
            </motion.button>
          </div>
        </div>
      </motion.div>



      {/* Hero Content - Lower Left */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-28 sm:bottom-20 lg:bottom-16 left-6 sm:left-8 lg:left-16 z-40"
      >
        {/* Frosted glass card for text contrast */}
        <div className="max-w-3xl bg-black/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10">
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-golden-yellow font-fredoka text-lg sm:text-xl font-semibold tracking-wide uppercase mb-4"
          >
            Turn views into customers.
          </motion.p>
          
          <h1 className="font-fredoka font-semibold leading-[1.05] text-white drop-shadow-lg">
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Story driven video that converts
            </span>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-golden-yellow font-bold leading-none mt-2" 
            >
              and delivers fast.
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg text-white/90 drop-shadow-md max-w-xl font-medium"
          >
            Where2Studios creates high performing short form content, commercials, and event films, built to drive growth, capture moments, and ship on tight timelines.
          </motion.p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(224, 158, 36, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-golden-yellow text-near-black font-fredoka font-semibold text-lg px-8 py-4 rounded-full hover:bg-orange-accent gentle-animation cursor-pointer shadow-lg squish-hover"
            >
              Book a Call
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.href = '/work'
              }}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 font-fredoka font-semibold text-lg px-8 py-4 rounded-full hover:bg-white/20 gentle-animation cursor-pointer"
            >
              See Our Work
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Social Proof Stats Bar - Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 right-4 sm:right-6 lg:right-12 z-40 hidden lg:block max-w-[200px]"
      >
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/10">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="font-fredoka text-2xl font-bold text-golden-yellow">8,472+</div>
              <div className="text-cream-highlight text-sm">Projects Delivered</div>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="text-center">
              <div className="font-fredoka text-2xl font-bold text-golden-yellow">287M+</div>
              <div className="text-cream-highlight text-sm">Total Views</div>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="text-center">
              <div className="font-fredoka text-2xl font-bold text-golden-yellow">127</div>
              <div className="text-cream-highlight text-sm">Brands Served</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Proof Stats Bar - Mobile (horizontal) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 left-4 right-4 z-40 lg:hidden"
      >
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="font-fredoka text-lg sm:text-xl font-bold text-golden-yellow">8,472+</div>
              <div className="text-cream-highlight text-[10px] sm:text-xs">Projects</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="font-fredoka text-lg sm:text-xl font-bold text-golden-yellow">287M+</div>
              <div className="text-cream-highlight text-[10px] sm:text-xs">Views</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="font-fredoka text-lg sm:text-xl font-bold text-golden-yellow">127</div>
              <div className="text-cream-highlight text-[10px] sm:text-xs">Brands</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient transition to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #14180A 100%)'
        }}
      />
    </div>
  )
}