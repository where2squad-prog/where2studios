'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Clapperboard, Megaphone, ArrowRight } from 'lucide-react'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

const services = [
  {
    id: 'strategy',
    title: 'Brand and Growth Strategy',
    icon: Target,
    oneLiner: 'Direction before execution, so every asset has a purpose.',
    bullets: [
      'Brand positioning',
      'Campaign planning',
      'Content strategy',
      'Funnels and conversion focus',
    ],
    ctaLabel: 'Book a Strategy Call',
    ctaAction: 'sheet' as const,
  },
  {
    id: 'production',
    title: 'High Impact Media Production',
    icon: Clapperboard,
    oneLiner: 'Premium media that makes you look established instantly.',
    bullets: [
      'Cinematic brand and launch videos',
      'Podcast production',
      'Photography',
      'Event coverage and recaps',
    ],
    ctaLabel: 'See Our Work',
    ctaAction: 'link' as const,
    ctaHref: '/startups',
  },
  {
    id: 'marketing',
    title: 'Full Service Marketing Execution',
    icon: Megaphone,
    oneLiner: 'We do not just hand you content, we help it perform.',
    bullets: [
      'Social media management',
      'Paid ads management',
      'Email marketing',
      'Distribution and campaign management',
    ],
    ctaLabel: 'Start Your Project',
    ctaAction: 'link' as const,
    ctaHref: '/contact',
  },
]

export function ServiceLanes() {
  const { openSheet } = useBookingSheet()
  const reduce = useReducedMotion()
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    setActiveIndex(api.selectedScrollSnap())
    const onSelect = () => setActiveIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const renderCard = (service: typeof services[number]) => (
    <div className="h-full m3-outlined-card p-6 sm:p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
          <service.icon className="w-6 h-6 text-m3-primary" />
        </div>
        <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface">
          {service.title}
        </h3>
      </div>

      <p className="text-sm text-m3-on-surface/80 mb-4">
        {service.oneLiner}
      </p>

      <ul className="space-y-2 mb-6 flex-1">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-m3-on-surface/70">
            <span className="w-1.5 h-1.5 rounded-full bg-m3-primary mt-1.5 shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>

      {service.ctaAction === 'sheet' ? (
        <button
          onClick={openSheet}
          className="flex items-center gap-2 text-m3-primary font-semibold text-sm hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 rounded"
        >
          {service.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <Link
          to={service.ctaHref!}
          className="flex items-center gap-2 text-m3-primary font-semibold text-sm hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 rounded"
        >
          {service.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )

  return (
    <section className="py-16 sm:py-20 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-10"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Services
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
            Your 3 pillars for growth
          </h2>
          <p className="text-m3-on-surface/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            You don't need more content. You need content that converts.
          </p>
        </motion.div>

        {/* Mobile: swipe carousel */}
        <div className="md:hidden -mx-4 sm:-mx-8">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: false, duration: reduce ? 0 : 25 }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {services.map((service, index) => (
                <CarouselItem
                  key={service.id}
                  className={`basis-[88%] sm:basis-[80%] pr-3 ${index === 0 ? 'pl-4 sm:pl-8' : 'pl-0'}`}
                >
                  {renderCard(service)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to service ${index + 1} of ${services.length}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 ${
                  activeIndex === index ? 'w-6 bg-m3-primary' : 'w-2 bg-m3-on-surface/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {renderCard(service)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
