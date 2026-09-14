'use client'

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useConventionStatus } from '@/hooks/useConventionStatus'
import { RSAC, rsacCountdownLine, rsacDateLine } from '@/lib/rsaConference'

/**
 * Homepage band under the hero. Rolls to the next edition on its own, so it
 * never expires the way the Tech Week promo does.
 */
export function RSACHomeBlock() {
  const { edition, phase, now } = useConventionStatus(RSAC)
  const dateLine = rsacDateLine(now)
  const countdown = rsacCountdownLine(phase)

  return (
    <section
      data-rsac-promo
      className="bg-m3-surface-dark border-y border-m3-on-dark/10 py-8 sm:py-10"
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
        <p className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
          RSA CONFERENCE {edition?.year ?? ''}
        </p>
        <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-dark mt-2">
          We have shot RSAC week four times.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-m3-on-dark/75">
          {dateLine} at Moscone. Security vendors lock activation budgets months out, so this is the
          moment to plan the footage.
        </p>
        {countdown && (
          <p className="mt-3 font-fredoka font-semibold text-m3-primary" aria-live="polite">
            {countdown}
          </p>
        )}
        <Link
          to="/rsa-conference-video"
          className="m3-filled-button text-sm px-6 py-3 mt-5 inline-flex items-center gap-2"
        >
          RSAC coverage
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
