'use client'

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useConventionClock } from '@/hooks/useConventionStatus'
import {
  conventionHref,
  conventions,
  formatEditionRange,
  getConventionStatus,
  nextUnknownYear,
  statusChip,
} from '@/lib/conventions'

export function UpcomingConventions() {
  const now = useConventionClock()

  const next = conventions
    .map((convention) => ({ convention, ...getConventionStatus(convention, now) }))
    .sort((a, b) => (a.edition?.start ?? '9999').localeCompare(b.edition?.start ?? '9999'))
    .slice(0, 3)

  return (
    <section className="py-10 sm:py-14 bg-m3-background">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
            Coming up near Moscone
          </h2>
          <Link
            to="/conventions"
            className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm"
          >
            Full calendar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {next.map(({ convention, edition, phase }) => (
            <Link
              key={convention.slug}
              to={conventionHref(convention)}
              className="m3-outlined-card p-4 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-fredoka font-semibold text-m3-on-surface">
                  {convention.name}
                </span>
                <span className="shrink-0 rounded-full bg-m3-primary/15 text-m3-primary text-[10px] font-semibold px-2.5 py-1">
                  {statusChip(convention, phase)}
                </span>
              </div>
              <p className="text-sm text-m3-on-surface/70 mt-1.5">
                {edition
                  ? formatEditionRange(edition)
                  : `${nextUnknownYear(convention)} dates to be announced`}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
