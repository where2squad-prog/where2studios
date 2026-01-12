'use client'

interface SectionDividerProps {
  from: 'surface-dark' | 'surface' | 'surface-variant' | 'background'
  to: 'surface-dark' | 'surface' | 'surface-variant' | 'background'
}

export function SectionDivider({ from, to }: SectionDividerProps) {
  const getColor = (color: string) => {
    switch (color) {
      case 'surface-dark':
        return '#14180A'
      case 'surface':
        return '#FFFFFF'
      case 'surface-variant':
        return '#FFF8EE'
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
      className="relative w-full h-16 sm:h-24"
      style={{
        background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`
      }}
    />
  )
}
