'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBookingSheet } from '@/contexts/BookingSheetContext';
import { Zap, Eye, Share2 } from 'lucide-react';

const proofChips = [
{ icon: Zap, text: 'Strategy before production' },
{ icon: Eye, text: 'Premium media that builds trust' },
{ icon: Share2, text: 'Execution that drives growth' }];


export function ConversionHero() {
  const { openSheet } = useBookingSheet();

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
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

      {/* Hero Content */}
      <div className="relative z-40 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[640px]">

            {/* Eyebrow */}
            <p className="text-m3-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Your Growth Team, On Demand
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-[1.1] mb-4">
              Shaping culture through{' '}
              <span className="text-m3-primary">your stories.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed mb-7">We help startups, small businesses, and scaling brands build authority, attract customers, and grow through strategy and premium media production

            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-3">
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
            <p className="text-white/50 text-xs mb-5">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>

            {/* Proof Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {proofChips.map((chip) =>
              <div
                key={chip.text}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur">

                  <chip.icon className="w-3.5 h-3.5 text-m3-primary" />
                  <span className="text-white/80 text-sm">{chip.text}</span>
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