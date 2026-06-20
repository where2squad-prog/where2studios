'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Instagram, ArrowRight } from 'lucide-react'
import where2boysLogo from '@/assets/where2boys-logo.png.asset.json'
import { useWhere2BoysSheet } from '@/contexts/Where2BoysSheetContext'

export function Where2BoysHero() {
  const reduce = useReducedMotion()
  const { openSheet } = useWhere2BoysSheet()

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32" style={{ background: '#F5EDDF' }}>
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-xl mb-8 flex items-center justify-center"
            style={{ background: '#E84228' }}
          >
            <img
              src={where2boysLogo.url}
              alt="Where2Boys logo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-fredoka font-semibold text-2xl sm:text-3xl mb-2 inline-block"
            style={{ color: '#E84228', transform: 'rotate(-2deg)' }}
          >
            C'mon now!
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-fredoka font-bold text-5xl sm:text-6xl lg:text-7xl text-m3-on-surface tracking-tight mb-5"
          >
            Where 2 next?
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg sm:text-xl text-m3-on-surface/70 max-w-xl mb-8 leading-relaxed"
          >
            Bay Area food, spots, culture. We travel for the right invite.
          </motion.p>

          <button
            type="button"
            onClick={openSheet}
            className="inline-flex items-center gap-2 bg-m3-surface-dark text-m3-on-dark font-fredoka font-semibold text-base px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Let's work together
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="mt-5 text-sm text-m3-on-surface/60">
            <a
              href="https://www.instagram.com/where2boys/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-m3-on-surface transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @where2boys
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}