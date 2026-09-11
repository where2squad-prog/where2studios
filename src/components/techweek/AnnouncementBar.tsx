'use client'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { isTechWeekPromoLive, type TechWeekPhase } from '@/lib/techWeek'
import { useTechWeekPhase } from '@/hooks/useTechWeekPhase'
import { useConventionClock } from '@/hooks/useConventionStatus'
import {
  conventionHref,
  conventions,
  getConventionStatus,
  type Convention,
  type ConventionPhase,
} from '@/lib/conventions'

const STORAGE_KEY = 'w2s-techweek-bar-dismissed'
const WINDOW_DAYS = 21

function techWeekCopy(phase: TechWeekPhase) {
  if (phase.kind === 'live') {
    return `Tech Week is live, day ${phase.day} of 7. Same day crews still available`
  }
  if (phase.kind === 'countdown') {
    if (phase.days === 1) return 'SF Tech Week starts tomorrow. Last crew nights open'
    if (phase.days <= 7) return `SF Tech Week starts in ${phase.days} days. Crew nights are filling up`
    return 'SF Tech Week, Oct 5 to 11. Next morning recaps. Book your date'
  }
  return null
}

function conventionCopy(convention: Convention, phase: ConventionPhase) {
  if (phase.kind === 'live') {
    return `${convention.name} is live, day ${phase.day} of ${phase.totalDays}. Same day crews available`
  }
  if (phase.kind === 'countdown') {
    if (phase.days === 1) return `${convention.name} starts tomorrow. Standby crews open`
    return `${convention.name} starts in ${phase.days} days. Crews still available. Book your dates`
  }
  return null
}

/** The soonest convention that is live or inside the booking window. */
function pickConvention(now: Date) {
  const candidates = conventions
    .map((convention) => ({ convention, ...getConventionStatus(convention, now) }))
    .filter(({ phase }) => {
      if (phase.kind === 'live') return true
      return phase.kind === 'countdown' && phase.days <= WINDOW_DAYS
    })
    .sort((a, b) => (a.edition?.start ?? '9999').localeCompare(b.edition?.start ?? '9999'))

  return candidates[0] ?? null
}

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const techWeekPhase = useTechWeekPhase()
  const now = useConventionClock()

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setDismissed(true)
    } catch {
      // sessionStorage can be blocked, the bar just stays visible
    }
  }, [])

  const soonest = pickConvention(now)
  const isTechWeek = soonest?.convention.slug === 'sf-tech-week'

  let copy: string | null = null
  let href = '/sf-tech-week'

  if (isTechWeek) {
    copy = isTechWeekPromoLive(techWeekPhase) ? techWeekCopy(techWeekPhase) : null
  } else if (soonest) {
    copy = conventionCopy(soonest.convention, soonest.phase)
    href = conventionHref(soonest.convention)
  }

  if (dismissed || !copy) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  const promoAttrs = isTechWeek
    ? { 'data-techweek-promo': true }
    : { 'data-convention-promo': true }

  return (
    <div {...promoAttrs} className="relative bg-m3-primary text-m3-on-primary">
      <div className="max-w-7xl mx-auto flex items-center gap-2 px-3 sm:px-6 py-2 pr-10">
        <Link
          to={href}
          className="flex items-center gap-1.5 min-w-0 text-[11px] sm:text-sm font-semibold leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary rounded"
        >
          <span className="min-w-0">{copy}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss notice"
        className="absolute right-2 top-1/2 -translate-y-1/2 min-w-10 min-h-10 flex items-center justify-center rounded-full hover:bg-m3-on-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-on-primary"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
