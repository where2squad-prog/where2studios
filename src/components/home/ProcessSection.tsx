'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Target, Clapperboard, Share2, BarChart3 } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

const processSteps = [
  {
    step: 1,
    title: 'Plan',
    icon: Target,
    detail: 'Goals, scope, timeline.',
  },
  {
    step: 2,
    title: 'Produce',
    icon: Clapperboard,
    detail: 'Crew, gear, story.',
  },
  {
    step: 3,
    title: 'Publish',
    icon: Share2,
    detail: 'Edits made to perform.',
  },
  {
    step: 4,
    title: 'Optimize',
    icon: BarChart3,
    detail: 'Data in. Better content out.',
  },
]

export function ProcessSection() {
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

  const renderCard = (item: typeof processSteps[number]) => (
    <div className="m3-elevated-card p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-m3-primary flex items-center justify-center text-m3-on-primary font-bold">
          {item.step}
        </div>
        <item.icon className="w-5 h-5 text-m3-primary" />
      </div>

      <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface mb-1">
        {item.title}
      </h3>

      <p className="text-sm text-m3-on-surface/70">
        {item.detail}
      </p>
    </div>
  )

  return (
    <section className="py-16 sm:py-20 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface">
            How we work
          </h2>
        </motion.div>

        {/* Mobile: swipe carousel */}
        <div className="sm:hidden -mx-4">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: false, duration: reduce ? 0 : 25 }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {processSteps.map((item, index) => (
                <CarouselItem
                  key={item.step}
                  className={`basis-[88%] pr-3 ${index === 0 ? 'pl-4' : 'pl-0'}`}
                >
                  {renderCard(item)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {processSteps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to step ${index + 1} of ${processSteps.length}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 ${
                  activeIndex === index ? 'w-6 bg-m3-primary' : 'w-2 bg-m3-on-surface/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-m3-outline" />
              )}

              {renderCard(item)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
