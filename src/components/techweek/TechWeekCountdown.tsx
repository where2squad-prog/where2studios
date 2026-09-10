'use client'

import { useEffect, useState } from 'react'
import { getCountdownState, type CountdownState } from '@/lib/techWeek'

export function TechWeekCountdown({ className = '' }: { className?: string }) {
  const [state, setState] = useState<CountdownState | null>(null)

  useEffect(() => {
    const tick = () => setState(getCountdownState())
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  if (!state || state.kind === 'hidden') return null

  return (
    <p className={`font-fredoka font-semibold text-m3-primary ${className}`} aria-live="polite">
      {state.kind === 'live'
        ? 'Tech Week is live'
        : `${state.days} ${state.days === 1 ? 'day' : 'days'} until Tech Week`}
    </p>
  )
}
