'use client'

import { useEffect, useState } from 'react'
import {
  getConventionStatus,
  type Convention,
  type ConventionEdition,
  type ConventionPhase,
} from '@/lib/conventions'

declare const __BUILD_TIME__: string | undefined

const BUILD_TIME: string | undefined =
  typeof __BUILD_TIME__ === 'string' ? __BUILD_TIME__ : undefined

/** The clock every convention component shares: build time first, then the real clock. */
export function useConventionClock(): Date {
  const [now, setNow] = useState<Date>(() => (BUILD_TIME ? new Date(BUILD_TIME) : new Date()))

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 60000)
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return now
}

export function useConventionStatus(convention: Convention): {
  edition: ConventionEdition | null
  phase: ConventionPhase
  now: Date
} {
  const now = useConventionClock()
  return { ...getConventionStatus(convention, now), now }
}
