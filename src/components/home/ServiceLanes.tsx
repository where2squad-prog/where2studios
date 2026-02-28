'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, Mic, CalendarDays, ArrowRight } from 'lucide-react'

const serviceLanes = [
  {
    id: 'launch-videos',
    title: 'Launch Videos',
    icon: Video,
    href: '/services/launch-videos',
    whatWeDeliver: 'Product demos, explainer videos, pitch decks, founder stories',
    whatItSolves: 'Build credibility, explain your product, and attract investors',
    turnaround: '1-3 weeks typical',
  },
  {
    id: 'podcasts',
    title: 'Podcasts',
    icon: Mic,
    href: '/services/podcasts',
    whatWeDeliver: 'Full production, editing, clips, guest coordination, show branding',
    whatItSolves: 'Establish thought leadership and grow your audience on autopilot',
    turnaround: 'Weekly or bi-weekly episodes',
  },
  {
    id: 'event-recaps',
    title: 'Event Recaps',
    icon: CalendarDays,
    href: '/services/event-recaps',
    whatWeDeliver: 'Teasers, recaps, speaker clips, sponsor reels, social cuts',
    whatItSolves: 'Extend event impact and drive attendance to the next one',
    turnaround: '24hr teaser, 1-2 week full recap',
  },
]

export function ServiceLanes() {
  return (
    <section className="py-16 sm:py-20 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Services
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
            What does your startup need?
          </h2>
          <p className="text-m3-on-surface/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            Pick your lane. We'll handle the production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {serviceLanes.map((lane, index) => (
            <motion.div
              key={lane.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={lane.href}
                className="group block h-full m3-outlined-card p-6 sm:p-8 hover:border-m3-primary/40 
                           hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                    <lane.icon className="w-6 h-6 text-m3-primary" />
                  </div>
                  <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                    {lane.title}
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                      What we deliver
                    </p>
                    <p className="text-sm text-m3-on-surface/80">
                      {lane.whatWeDeliver}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                      What it solves
                    </p>
                    <p className="text-sm text-m3-on-surface/80">
                      {lane.whatItSolves}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                      Typical turnaround
                    </p>
                    <p className="text-sm text-m3-primary font-medium">
                      {lane.turnaround}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-m3-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
