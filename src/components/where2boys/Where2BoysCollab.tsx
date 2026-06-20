'use client'

import { CalendarClock, UtensilsCrossed, Building2, Users } from 'lucide-react'
import { useWhere2BoysSheet } from '@/contexts/Where2BoysSheetContext'

const collabTypes = [
  { icon: CalendarClock, title: 'Event coverage', desc: 'Pop-ups, openings, festivals' },
  { icon: UtensilsCrossed, title: 'Restaurant features', desc: 'Menu drops, soft openings' },
  { icon: Building2, title: 'Brand partnerships', desc: 'Paid posts, integrations, takeovers' },
  { icon: Users, title: 'Creator partnerships', desc: 'We collab with other creators too' },
]

export function Where2BoysCollab() {
  const { openSheet } = useWhere2BoysSheet()
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-m3-surface-dark text-m3-on-dark">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#E84228' }}>
          Ways to work with us
        </p>
        <h2 className="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl mb-10 leading-tight">
          Brands, restaurants, creators. We're open to it.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {collabTypes.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.title} className="rounded-2xl border border-m3-on-dark/15 bg-m3-on-dark/5 p-5 sm:p-6 flex gap-4 items-start">
                <Icon className="w-6 h-6 flex-shrink-0" style={{ color: '#E09E24' }} />
                <div>
                  <h3 className="font-fredoka font-semibold text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-m3-on-dark/70">{c.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={openSheet}
          className="mt-8 sm:mt-10 block w-full text-center text-m3-on-dark font-fredoka font-semibold text-base sm:text-lg py-3.5 sm:py-4 rounded-full hover:opacity-90 transition-opacity"
          style={{ background: '#E84228' }}
        >
          Let's work together
        </button>
      </div>
    </section>
  )
}