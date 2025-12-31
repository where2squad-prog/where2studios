'use client'

interface SectionDividerProps {
  from: 'near-black' | 'cream' | 'background'
  to: 'near-black' | 'cream' | 'background'
  flip?: boolean
}

export function SectionDivider({ from, to, flip = false }: SectionDividerProps) {
  const getColor = (color: string) => {
    switch (color) {
      case 'near-black':
        return 'hsl(var(--near-black))'
      case 'cream':
        return 'hsl(var(--cream-highlight))'
      case 'background':
        return 'hsl(var(--background))'
      default:
        return 'hsl(var(--background))'
    }
  }

  const fromColor = getColor(from)
  const toColor = getColor(to)

  return (
    <div 
      className={`relative w-full h-24 md:h-32 ${flip ? 'rotate-180' : ''}`}
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} 20%, ${toColor} 80%, ${toColor} 100%)`
      }}
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Curved wave overlay for organic feel */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1200 100" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,50 C300,80 400,20 600,50 C800,80 900,20 1200,50 L1200,100 L0,100 Z" 
          fill={toColor}
          opacity="0.5"
        />
        <path 
          d="M0,60 C200,40 500,90 700,60 C900,30 1000,70 1200,60 L1200,100 L0,100 Z" 
          fill={toColor}
          opacity="0.3"
        />
      </svg>

      {/* Decorative accent dots */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-golden-yellow/20 blur-sm" />
      <div className="absolute right-1/3 top-1/3 w-1.5 h-1.5 rounded-full bg-brick-red/20 blur-sm" />
    </div>
  )
}
