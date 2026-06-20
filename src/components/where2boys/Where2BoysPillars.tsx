'use client'

import { useState } from 'react'
import { MapPin, UtensilsCrossed, Plane, Globe, BookOpen, type LucideIcon } from 'lucide-react'

type Pillar = {
  icon: LucideIcon
  label: string
  description: string
}

const pillars: Pillar[] = [
  {
    icon: MapPin,
    label: 'Spots',
    description:
      "The Bay Area's best places, and who they're for. We seek out hidden gems, viral picks, and neighborhood mainstays. Every feature comes with the angle that makes you want to go. Locals looking for the next favorite, visitors looking for the move. For business owners, that means the right crowd showing up, not just the most.",
  },
  {
    icon: UtensilsCrossed,
    label: 'Food',
    description:
      "Restaurants, pop-ups, and dishes worth the trip. We capture the flavor, the room, and the people in it. The post tells you what to order and who you're going to enjoy it with. From soft openings to viral menu drops, we frame it so people show up hungry.",
  },
  {
    icon: Plane,
    label: 'Travel',
    description:
      "Destinations worth flying for. We frame the moments worth planning a trip around. Bay Area first, anywhere next. If a hotel, destination, or tourism board wants the right audience to see it, we cover it the way we'd cover our own next vacation.",
  },
  {
    icon: Globe,
    label: 'Culture',
    description:
      'Bay Area moments and the people behind them. Festivals, communities, neighborhoods. We post what makes a place feel like itself, not just a feed item. Brands and events with a real connection to a community get featured the way they deserve.',
  },
  {
    icon: BookOpen,
    label: 'Stories',
    description:
      "The context behind the spot, the chef, the founder. The reason this is worth a visit, not just a picture. We turn a feature into a story worth sharing. That's what gets people to actually show up, and it's what brands hire us for.",
  },
]

export function Where2BoysPillars() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = pillars[activeIndex]
  const ActiveIcon = active.icon

  return (
    <section className="py-20 sm:py-24 lg:py-28" style={{ background: '#F5EDDF' }}>
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: '#E84228' }}>
          What we cover
        </p>
        <h2 className="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl text-m3-on-surface text-center mb-10">
          Pick a lane.
        </h2>

        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-8">
          {pillars.map((p, i) => {
            const Icon = p.icon
            const isActive = i === activeIndex
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={isActive}
                className={`rounded-2xl border p-2 sm:p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-m3-surface-dark text-m3-on-dark border-m3-surface-dark'
                    : 'bg-m3-surface text-m3-on-surface border-m3-outline hover:border-m3-on-surface/30'
                }`}
                style={{ ['--tw-ring-color' as never]: '#E84228' }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5" />
                <div className="font-fredoka font-semibold text-xs sm:text-sm">
                  {p.label}
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-3xl bg-m3-surface border border-m3-outline p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <ActiveIcon className="w-6 h-6" style={{ color: '#E84228' }} />
            <h3 className="font-fredoka font-bold text-2xl sm:text-3xl text-m3-on-surface">
              {active.label}
            </h3>
          </div>
          <p className="text-base sm:text-lg text-m3-on-surface/75 leading-relaxed">
            {active.description}
          </p>
        </div>

        <p className="text-xs text-m3-on-surface/50 text-center mt-4">Tap a card to see more.</p>
      </div>
    </section>
  )
}