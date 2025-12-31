'use client'

interface SectionDividerProps {
  from: 'near-black' | 'cream' | 'background'
  to: 'near-black' | 'cream' | 'background'
}

export function SectionDivider({ from, to }: SectionDividerProps) {
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

  return (
    <div 
      className="relative w-full h-40 md:h-56"
      style={{
        background: `linear-gradient(180deg, ${fromColor} 0%, ${fromColor} 10%, ${toColor} 90%, ${toColor} 100%)`
      }}
    />
  )
}
