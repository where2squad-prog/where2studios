'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import logo from '@/assets/where2studios-logo.png'

export function Hero() {
  const [isMuted, setIsMuted] = useState(true)
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

  // Ensure video is muted immediately on load to prevent any audio
  useEffect(() => {
    if (videoRef.current) {
      console.log('Video element found, setting up...')
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      
      // Add event listeners for debugging
      videoRef.current.addEventListener('loadstart', () => console.log('Video: loadstart'))
      videoRef.current.addEventListener('loadedmetadata', () => console.log('Video: loadedmetadata'))
      videoRef.current.addEventListener('canplay', () => console.log('Video: canplay'))
      videoRef.current.addEventListener('playing', () => console.log('Video: playing'))
      videoRef.current.addEventListener('error', (e) => console.error('Video error:', e))
      
      // Force mute on play
      videoRef.current.addEventListener('play', () => {
        if (videoRef.current) {
          console.log('Video play event fired')
          videoRef.current.muted = isMuted
          videoRef.current.volume = isMuted ? 0 : 0.7
        }
      })
      
      // Try to play the video
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Video autoplay successful'))
          .catch(error => console.error('Video autoplay failed:', error))
      }
    }
  }, [])

  // Update video mute state when isMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

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
      {/* Brand Color Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-near-black via-near-black to-brick-red/30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-golden-yellow/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-brick-red/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden-yellow/10 rounded-full blur-3xl" />

      {/* Full-Width Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
              <img src={logo} alt="Where2Studios" className="h-20 sm:h-28 lg:h-36 w-auto drop-shadow-2xl" />
            </motion.div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#services" 
                className="text-white/90 hover:text-white text-sm font-medium tracking-tight gentle-animation"
              >
                Services
              </a>
              <a 
                href="#team" 
                className="text-white/90 hover:text-white text-sm font-medium tracking-tight gentle-animation"
              >
                Team
              </a>
              <a 
                href="#contact" 
                className="text-white/90 hover:text-white text-sm font-medium tracking-tight gentle-animation"
              >
                Contact
              </a>
            </div>

            {/* Right Side - Video Controls + CTA + Mobile Menu */}
            <div className="flex items-center space-x-3 relative">
              {/* Video Controls with Sound On indicator */}
              <div className="relative">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                {/* Sound On indicator - only show when muted */}
                {isMuted && (
                  <div className="absolute -bottom-10 right-0 flex items-center text-white/80">
                    <span className="whitespace-nowrap font-medium text-sm mr-2">Sound On</span>
                    <span className="text-lg">↗</span>
                  </div>
                )}
              </div>
              
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
            <div className="flex flex-col space-y-4 text-white">
              <a 
                href="#services" 
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#team" 
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </a>
              <a 
                href="#contact" 
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-16 left-6 sm:left-8 lg:left-16 z-40"
      >
        <div className="max-w-3xl">
          <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-white drop-shadow-lg">
            <span className="block">We Turn Short-Form</span>
            <span className="block">Content Into</span>
            <span className="block text-golden-yellow">Customers.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white drop-shadow-md max-w-xl font-medium bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
            Strategy, filming, editing, posting, partnerships. Built as a repeatable system, not random posts.
          </p>
          
          {/* Target Audience Tag */}
          <p className="mt-4 text-sm text-white font-medium tracking-wide bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 inline-block">
            Best for restaurants, food brands & hospitality businesses
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-golden-yellow text-near-black font-fredoka font-semibold text-lg px-8 py-4 rounded-full hover:bg-orange-accent gentle-animation cursor-pointer shadow-lg"
            >
              Book a Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const servicesSection = document.getElementById('services')
                servicesSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 font-fredoka font-semibold text-lg px-8 py-4 rounded-full hover:bg-white/20 gentle-animation cursor-pointer"
            >
              See How It Works
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Social Proof Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-16 right-6 sm:right-8 lg:right-16 z-40 hidden lg:block"
      >
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <div className="font-fredoka text-3xl font-bold text-golden-yellow">10,000+</div>
              <div className="text-white/70 text-sm">Videos Shipped</div>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="text-center">
              <div className="font-fredoka text-3xl font-bold text-golden-yellow">300M+</div>
              <div className="text-white/70 text-sm">Views in 2024</div>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="text-center">
              <div className="font-fredoka text-3xl font-bold text-golden-yellow">100+</div>
              <div className="text-white/70 text-sm">Clients Served</div>
            </div>
          </div>
        </div>
      </motion.div>


    </div>
  )
}