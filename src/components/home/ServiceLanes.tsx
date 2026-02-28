'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Video, Mic, CalendarDays, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'launch-videos',
    title: 'Launch Videos',
    icon: Video,
    href: '/services/launch-videos',
    moment: "You're launching a product, fundraising, or hiring.",
    deliverables: 'Launch film, product demo, founder story, social cutdowns, pitch deck insert',
    promise: 'Build credibility fast with a launch video that tells your story and drives ROI.',
    deadline: '1–3 weeks',
  },
  {
    id: 'podcasts',
    title: 'Podcasts',
    icon: Mic,
    href: '/services/podcasts',
    moment: 'You need a content campaign that builds authority week after week.',
    deliverables: 'Full episode, social clips, audiograms, thumbnails, show notes',
    promise: 'Launch an episode every week. You talk, we handle the rest.',
    deadline: 'Weekly or bi-weekly batches',
  },
  {
    id: 'event-recaps',
    title: 'Event Recaps',
    icon: CalendarDays,
    href: '/services/event-recaps',
    moment: "You're hosting a demo day, conference, or launch party.",
    deliverables: 'Recap film, speaker clips, social cutdowns, next-day teaser, sponsor reels',
    promise: 'Extend your event ROI and drive attendance to the next one.',
    deadline: '24hr teaser · 1–2 week recap',
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
            Choose what you need
          </h2>
          <p className="text-m3-on-surface/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            Tell us the goal. We'll plan the deliverables, set the timeline, and ship on your deadline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={service.href}
                className="group block h-full m3-outlined-card p-6 sm:p-8 hover:border-m3-primary/40 
                           hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-m3-primary" />
                  </div>
                  <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                    {service.title}
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                      The moment
                    </p>
                    <p className="text-sm text-m3-on-surface/80">
                      {service.moment}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                      Deliverables
                    </p>
                    <p className="text-sm text-m3-on-surface/80">
                      {service.deliverables}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                      Timeline
                    </p>
                    <p className="text-sm text-m3-primary font-medium">
                      {service.deadline}
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
