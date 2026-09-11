'use client'

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { isTechWeekPromoLive } from '@/lib/techWeek'
import { useTechWeekPhase } from '@/hooks/useTechWeekPhase'

/** Homepage band, sits directly under the hero. */
export function TechWeekHomeBlock() {
  const phase = useTechWeekPhase()
  if (!isTechWeekPromoLive(phase)) return null

  const heading =
    phase.kind === 'live'
      ? 'We are on the ground at Tech Week this week. Clips back the next morning.'
      : 'We cover Tech Week side events and send the first clip back the next morning.'

  return (
    <section
      data-techweek-promo
      className="bg-m3-surface-dark border-y border-m3-on-dark/10 py-8 sm:py-10"
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
        <p className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
          SF Tech Week, October 5 to 11, 2026
        </p>
        <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-dark mt-2">
          {heading}
        </h2>
        <Link to="/sf-tech-week" className="m3-filled-button text-sm px-6 py-3 mt-5 inline-flex items-center gap-2">
          See Tech Week coverage
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

/** Compact inline callout for other pages. */
export function TechWeekInlineCallout() {
  const phase = useTechWeekPhase()
  if (!isTechWeekPromoLive(phase)) return null

  return (
    <div data-techweek-promo className="container mx-auto px-4 sm:px-8 lg:px-12">
      <Link
        to="/sf-tech-week"
        className="m3-outlined-card flex items-center justify-between gap-3 p-4 max-w-3xl hover:border-m3-primary transition-colors"
      >
        <span className="text-sm text-m3-on-surface/80">
          <span className="font-semibold text-m3-on-surface">SF Tech Week, Oct 5 to 11.</span> Next
          morning recaps for side events and sponsors.
        </span>
        <ArrowRight className="w-4 h-4 text-m3-primary shrink-0" />
      </Link>
    </div>
  )
}
