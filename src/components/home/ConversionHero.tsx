'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBookingSheet } from '@/contexts/BookingSheetContext';
import heroVideoAsset from '@/assets/hero-background.mp4.asset.json';

export function ConversionHero() {
  const { openSheet } = useBookingSheet();
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-m3-surface-dark">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center sm:blur-[2px] sm:scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="auto">

          <source src={heroVideoAsset.url} type="video/mp4" />
        </video>
      </div>

      {/* Overlay for text readability — vertical on mobile, directional on desktop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/45 sm:to-black/10" />

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
              Where2Studios
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-[1.1] sm:leading-tight md:leading-tight mb-3 sm:mb-4 md:mb-6">
              We capture the events that{' '}
              <span className="text-m3-primary">build your brand.</span>
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-md sm:max-w-lg md:max-w-2xl leading-snug sm:leading-relaxed md:leading-relaxed mb-4 sm:mb-6 md:mb-8">
              From conference recaps to brand films. Strategy, production, and content that performs.
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3">
              <button onClick={openSheet}
              className="h-12 inline-flex items-center justify-center rounded-lg bg-m3-primary text-m3-on-primary font-semibold text-base px-7 shadow-sm hover:brightness-110 transition-all">

                Book a Call
              </button>
              <Link
                to="/work"
                className="h-12 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur font-medium text-base px-7 hover:bg-white/15 transition-all">

                See Our Work
              </Link>
            </div>

            {/* Helper line */}
            <p className="text-white/50 text-xs sm:text-sm mt-2 sm:mt-3 mb-4 sm:mb-5">
              Free 30 min strategy call. 1 business day reply.
            </p>
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