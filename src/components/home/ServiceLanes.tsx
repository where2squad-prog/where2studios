'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { deliverables } from '@/data/deliverables'

export function ServiceLanes() {
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

  const renderCard = (item: typeof deliverables[number]) => (
    <div className="h-full m3-outlined-card p-6 sm:p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-m3-primary/10 flex items-center justify-center">
          <item.icon className="w-6 h-6 text-m3-primary" />
        </div>
        <h3 className="font-fredoka text-lg sm:text-xl font-semibold text-m3-on-surface">
          {item.title}
        </h3>
      </div>

      <p className="text-sm text-m3-on-surface/80">{item.line}</p>
    </div>
  )

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface">
            What we do
          </h2>
        </motion.div>

        {/* Mobile: swipe carousel */}
        <div className="md:hidden -mx-4 sm:-mx-8">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: false, duration: reduce ? 0 : 25 }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {deliverables.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className={`basis-[88%] sm:basis-[80%] pr-3 ${index === 0 ? 'pl-4 sm:pl-8' : 'pl-0'}`}
                >
                  {renderCard(item)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {deliverables.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to item ${index + 1} of ${deliverables.length}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 ${
                  activeIndex === index ? 'w-6 bg-m3-primary' : 'w-2 bg-m3-on-surface/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {renderCard(item)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
