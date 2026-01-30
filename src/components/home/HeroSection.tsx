'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCountUp } from '@/hooks/useCountUp'

interface HeroSectionProps {
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle: string
  showStats?: boolean
  showCTAs?: boolean
  videoBackground?: string
}

export function HeroSection({
  eyebrow = 'Full Service Media & Marketing Agency',
  title = 'Building brands people',
  titleAccent = 'TRUST',
  subtitle = 'Creating content that reaches people and builds community',
  showStats = true,
  showCTAs = true,
  videoBackground = '/videos/hero-background.mp4',
}: HeroSectionProps) {
  const views = useCountUp({ end: 259, duration: 2000, suffix: 'M+' })

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-m3-surface-dark">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-[120%] object-cover blur-[2px] scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${videoBackground}?v=4`} type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-m3-surface-dark/60" />

      {/* Hero Content */}
      <div className="relative z-40 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <p className="text-m3-primary text-sm font-semibold tracking-wide uppercase mb-4">
              {eyebrow}
            </p>

            {/* Display Large */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-m3-on-dark font-bold leading-tight mb-6">
              {title}{' '}
              <span className="text-m3-primary">{titleAccent}</span>
            </h1>

            {/* Body */}
            <p className="text-lg sm:text-xl text-m3-on-dark/70 max-w-xl leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            {showCTAs && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="m3-filled-button text-center">
                  Book a Discovery Call
                </Link>
                <Link
                  to="/work"
                  className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10 text-center"
                >
                  View Featured Work
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
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
                <div className="text-xl sm:text-2xl font-bold text-m3-primary tabular-nums">100+</div>
                <div className="text-m3-on-dark/60 text-xs sm:text-sm">Brands</div>
              </div>
              <div className="w-px bg-m3-on-dark/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-m3-primary tabular-nums">5,427+</div>
                <div className="text-m3-on-dark/60 text-xs sm:text-sm">Videos</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--m3-surface-variant)) 100%)',
        }}
      />
    </div>
  )
}
