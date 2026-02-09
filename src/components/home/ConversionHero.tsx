'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBookingSheet } from '@/contexts/BookingSheetContext';
import { Check, Shield, Zap } from 'lucide-react';
const trustBullets = [{
  icon: Zap,
  text: 'Fast, organized production'
}, {
  icon: Shield,
  text: 'Brand safe execution'
}, {
  icon: Check,
  text: 'Content that lives beyond the event'
}];
export function ConversionHero() {
  const {
    openSheet
  } = useBookingSheet();
  return <div className="relative min-h-screen w-full overflow-hidden bg-m3-surface-dark">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video className="absolute inset-0 w-full h-[120%] object-cover blur-[2px] scale-105" autoPlay muted loop playsInline preload="auto">
          <source src="/videos/hero-background.mp4?v=4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-m3-surface-dark/65" />

      {/* Hero Content */}
      <div className="relative z-40 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-32">
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }} className="max-w-3xl">
            {/* Eyebrow */}
            <p className="text-m3-primary text-xs font-semibold tracking-widest uppercase mb-4">
              Full Service Media & Marketing
            </p>

            {/* H1 - Clear positioning */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-m3-on-dark font-bold leading-[1.1] mb-5">
              High-end content systems for{' '}
              <span className="text-m3-primary">corporate & events</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-m3-on-dark/80 max-w-xl leading-relaxed mb-8">We plan, produce, and distribute cinematic media that drives real bookings and brand trust</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <button onClick={openSheet} className="m3-filled-button text-center text-base sm:text-lg px-8 py-4">
                Book a Discovery Call
              </button>
              <Link to="/work" className="m3-outlined-button text-m3-on-dark border-m3-on-dark/40 hover:bg-m3-on-dark/10 text-center px-6 py-3">
                View Work
              </Link>
            </div>

            {/* Trust Bullets */}
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {trustBullets.map(bullet => <div key={bullet.text} className="flex items-center gap-2.5">
                  <bullet.icon className="w-4 h-4 text-m3-primary" />
                  <span className="text-m3-on-dark/70 text-sm">{bullet.text}</span>
                </div>)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-30" style={{
      background: 'linear-gradient(180deg, transparent 0%, hsl(var(--m3-surface-variant)) 100%)'
    }} />
    </div>;
}