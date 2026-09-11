'use client'

import { Link, useLocation } from 'react-router-dom'
import { useTechWeekPhase } from '@/hooks/useTechWeekPhase'
import { isTechWeekPromoLive } from '@/lib/techWeek'

type LinkItem = { label: string; href: string }

const BASE_LINKS: LinkItem[] = [
  { label: 'Conference calendar', href: '/conventions' },
  { label: 'Why a dedicated crew', href: '/why-a-dedicated-crew' },
  { label: 'Our work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

/**
 * In page link row. Lives inside <main> so crawlers see contextual internal
 * links on every route, not only the nav and footer.
 */
export function KeepReading({
  links,
  className = '',
}: {
  links?: LinkItem[]
  className?: string
}) {
  const phase = useTechWeekPhase()
  const { pathname } = useLocation()
  const here = pathname.replace(/\/+$/, '') || '/'
  const all =
    links ??
    (isTechWeekPromoLive(phase)
      ? [...BASE_LINKS, { label: 'SF Tech Week coverage', href: '/sf-tech-week' }]
      : BASE_LINKS)
  // Never link the page the reader is already on.
  const items = all.filter((item) => (item.href.replace(/\/+$/, '') || '/') !== here)

  if (items.length === 0) return null


  return (
    <section className={`py-8 bg-m3-background border-t border-m3-on-surface/10 ${className}`}>
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-m3-on-surface/50">
          Keep reading
        </h2>
        <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-m3-on-surface/75 underline hover:text-m3-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
