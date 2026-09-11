'use client'

import { useEffect, useState } from 'react'
import { getTechWeekPhase, type TechWeekPhase } from '@/lib/techWeek'

declare const __BUILD_TIME__: string | undefined

const buildTime: string | undefined =
  typeof __BUILD_TIME__ === 'string' ? __BUILD_TIME__ : undefined
const BUILD_TIME = buildTime

/**
 * The first render uses the build time, so hydration matches the prerendered
 * HTML exactly. After mount the phase is recomputed from the real clock, every
 * minute, and whenever the tab becomes visible again.
 */
export function useTechWeekPhase(): TechWeekPhase {
  const [phase, setPhase] = useState<TechWeekPhase>(() =>
    getTechWeekPhase(BUILD_TIME ? new Date(BUILD_TIME) : new Date())
  )

  useEffect(() => {
    const tick = () => setPhase(getTechWeekPhase(new Date()))
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

  return phase
}
