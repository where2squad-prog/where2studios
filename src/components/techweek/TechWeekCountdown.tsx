'use client'

import { useTechWeekPhase } from '@/hooks/useTechWeekPhase'

export function TechWeekCountdown({ className = '' }: { className?: string }) {
  const phase = useTechWeekPhase()

  let text: string | null = null
  if (phase.kind === 'live') text = `Tech Week is live, day ${phase.day} of 7`
  else if (phase.kind === 'countdown')
    text =
      phase.days === 1
        ? 'SF Tech Week starts tomorrow'
        : `${phase.days} days until SF Tech Week`

  if (!text) return null

  return (
    <p className={`font-fredoka font-semibold text-m3-primary ${className}`} aria-live="polite">
      {text}
    </p>
  )
}
