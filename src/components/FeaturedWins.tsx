'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'
import { TrustedBrands } from './TrustedBrands'

export function FeaturedWins() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const featuredWork = [
    {
      id: 1,
      client: "Fine Dining",
      result: "3x weekend reservations",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop",
    },
    {
      id: 2,
      client: "Taco Shop",
      result: "45% more foot traffic",
      thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=800&fit=crop",
    },
    {
      id: 3,
      client: "Sushi Bar",
      result: "3.1M views in 30 days",
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=800&fit=crop",
    },
    {
      id: 4,
      client: "Brunch Spot",
      result: "2-hour wait times",
      thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=800&fit=crop",
    },
    {
      id: 5,
      client: "Craft Brewery",
      result: "Sold out taproom events",
      thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=800&fit=crop",
    }
  ]

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      })
      setCurrentSlide(index)
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      const scrollPosition = carouselRef.current.scrollLeft
      const newSlide = Math.round(scrollPosition / slideWidth)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
      }
    }
  }

  return (
    <section className="relative py-12 sm:py-16 bg-m3-surface-variant overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Trusted Brands - Passive Logo Strip */}
        <TrustedBrands />
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="label text-m3-secondary"
          >
            Featured Work
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-on-surface mt-2 mb-3"
          >
            What Happens When People Care
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-m3-on-surface/60"
          >
            Captured moments that resonated. And why they worked.
          </motion.p>
        </div>

        {/* Featured Work Carousel - Mobile */}
        <div className="lg:hidden relative mb-8">
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredWork.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full snap-center px-4"
              >
                {/* M3 Elevated Card */}
                <div className="m3-elevated-card overflow-hidden aspect-[3/4] max-w-sm mx-auto">
                  <div className="relative w-full h-full">
                    <img
                      src={item.thumbnail}
                      alt={item.client}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-m3-surface-dark/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-m3-on-dark text-lg font-bold mb-1">{item.client}</h3>
                      <p className="text-m3-primary text-sm font-medium">{item.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredWork.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-m3-on-surface w-6' 
                    : 'bg-m3-on-surface/30 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-m3-surface rounded-full flex items-center justify-center shadow-md transition-opacity ${
              currentSlide === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-m3-on-surface" />
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(featuredWork.length - 1, currentSlide + 1))}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-m3-surface rounded-full flex items-center justify-center shadow-md transition-opacity ${
              currentSlide === featuredWork.length - 1 ? 'opacity-30 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-m3-on-surface" />
          </button>
        </div>

        {/* Featured Work Grid - Desktop with M3 Elevated Cards */}
        <div className="hidden lg:grid grid-cols-5 gap-4 max-w-6xl mx-auto mb-8">
          {featuredWork.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="m3-elevated-card overflow-hidden aspect-[9/14]">
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnail}
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-m3-surface-dark/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-m3-on-dark text-sm font-semibold truncate">{item.client}</p>
                    <p className="text-m3-primary text-xs">{item.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
