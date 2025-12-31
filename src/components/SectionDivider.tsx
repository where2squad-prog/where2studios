'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  from: 'near-black' | 'cream' | 'background'
  to: 'near-black' | 'cream' | 'background'
  variant?: 'wave' | 'dots' | 'blobs'
}

export function SectionDivider({ from, to, variant = 'wave' }: SectionDividerProps) {
  const getColor = (color: string) => {
    switch (color) {
      case 'near-black':
        return '#14180A'
      case 'cream':
        return '#EBC37E'
      case 'background':
        return '#FFFBF5'
      default:
        return '#FFFBF5'
    }
  }

  const fromColor = getColor(from)
  const toColor = getColor(to)

  if (variant === 'dots') {
    return (
      <div 
        className="relative w-full h-32 md:h-40 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`
        }}
      >
        {/* Decorative floating dots */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-1/3 w-4 h-4 bg-golden-yellow rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute left-[25%] top-1/2 w-3 h-3 bg-brick-red rounded-full opacity-50"
        />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[50%] top-1/4 w-5 h-5 bg-golden-yellow rounded-full opacity-40"
        />
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute left-[75%] top-1/3 w-3 h-3 bg-brick-red rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute left-[90%] top-1/2 w-4 h-4 bg-golden-yellow rounded-full opacity-50"
        />
      </div>
    )
  }

  if (variant === 'blobs') {
    return (
      <div 
        className="relative w-full h-40 md:h-56 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`
        }}
      >
        {/* Morphing blobs */}
        <div 
          className="absolute left-[5%] top-1/4 w-24 h-24 bg-golden-yellow/20 blob-morph"
        />
        <div 
          className="absolute right-[10%] top-1/3 w-32 h-32 bg-brick-red/15 blob-morph"
          style={{ animationDelay: '-3s' }}
        />
        <div 
          className="absolute left-[40%] bottom-1/4 w-20 h-20 bg-teal/10 blob-morph"
          style={{ animationDelay: '-5s' }}
        />
      </div>
    )
  }

  // Default wave variant
  return (
    <div 
      className="relative w-full h-24 md:h-32 overflow-hidden"
      style={{ backgroundColor: fromColor }}
    >
      <svg 
        className="absolute bottom-0 w-full h-full" 
        viewBox="0 0 1440 100" 
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ d: "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" }}
          animate={{ 
            d: [
              "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z",
              "M0,60 C360,20 1080,80 1440,40 L1440,100 L0,100 Z",
              "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          fill={toColor}
        />
      </svg>
    </div>
  )
}
