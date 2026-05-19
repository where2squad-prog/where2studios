'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBookingSheet } from '@/contexts/BookingSheetContext';
import { Zap, Eye, Share2 } from 'lucide-react';

const proofChips = [
{ icon: Zap, text: 'Strategy before production' },
{ icon: Eye, text: 'Premium media that builds trust' },
{ icon: Share2, text: 'Execution that drives growth' }];


export function ConversionHero() {
  const { openSheet } = useBookingSheet();
  const reduce = useReducedMotion();

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
          preload="auto">

          <source src="/videos/hero-background.mp4?v=4" type="video/mp4" />
        </video>
      </div>

      {/* Directional overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20 sm:from-black/70 sm:via-black/45 sm:to-black/10" />

      {/* Hero Content */}
      <div className="relative z-40 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-24 lg:py-32">
          <motion.div
            initial={reduce ? false : { y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[640px]">

            {/* Eyebrow */}
            <p className="text-m3-primary text-xs font-semibold tracking-widest uppercase mb-2 sm:mb-3 md:mb-4">
              Your Growth Team, On Demand
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-[1.1] sm:leading-tight md:leading-tight mb-3 sm:mb-4 md:mb-6">
              Shaping culture through{' '}
              <span className="text-m3-primary">your stories</span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-md sm:max-w-lg md:max-w-2xl leading-snug sm:leading-relaxed md:leading-relaxed mb-4 sm:mb-6 md:mb-8">
              We help startups and growing brands build authority and attract customers. Strategy plus premium production makes it happen
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3">
              <button onClick={openSheet}
              className="h-12 inline-flex items-center justify-center rounded-lg bg-m3-primary text-m3-on-primary font-semibold text-base px-7 shadow-sm hover:brightness-110 transition-all">

                Book a Strategy Call
              </button>
              <Link
                to="/startups"
                className="h-12 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur font-medium text-base px-7 hover:bg-white/15 transition-all">

                See Our Work
              </Link>
            </div>

            {/* Helper line */}
            <p className="text-white/50 text-xs sm:text-sm mt-2 sm:mt-3 mb-4 sm:mb-5">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>

            {/* Proof Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
              {proofChips.map((chip) =>
              <div
                key={chip.text}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur">

                  <chip.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-m3-primary" />
                  <span className="text-white/80 text-xs sm:text-sm">{chip.text}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-30"
        style={{
          background:
          'linear-gradient(180deg, transparent 0%, hsl(var(--m3-surface-variant) / 0.7) 100%)'
        }} />

    </div>);

}