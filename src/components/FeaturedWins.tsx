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
      views: "2.4M",
      likes: "184K",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop",
      description: "Chef authenticity meets peak timing."
    },
    {
      id: 2,
      client: "Taco Shop",
      views: "1.8M",
      likes: "156K",
      thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=800&fit=crop",
      description: "ASMR audio hook with POV format."
    },
    {
      id: 3,
      client: "Sushi Bar",
      views: "3.1M",
      likes: "245K",
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=800&fit=crop",
      description: "Knife skills ASMR with trending audio."
    },
    {
      id: 4,
      client: "Brunch Spot",
      views: "1.2M",
      likes: "98K",
      thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=800&fit=crop",
      description: "UGC style creator collaboration."
    },
    {
      id: 5,
      client: "Craft Brewery",
      views: "890K",
      likes: "72K",
      thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=800&fit=crop",
      description: "Satisfying pour shot with personality."
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
    <section className="relative py-10 sm:py-12 bg-golden-yellow overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Trusted Brands - Above Section Header */}
        <TrustedBrands />
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-brick-red uppercase tracking-widest"
          >
            Featured Work
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-near-black mt-2 mb-2"
          >
            What Happens When People Care
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-near-black/70"
          >
            Captured moments that resonated, and why they worked.
          </motion.p>
        </div>

        {/* Featured Work Carousel - Mobile */}
        <div className="lg:hidden relative mb-8">
          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredWork.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full snap-center px-4"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-lg">
                  <img
                    src={item.thumbnail}
                    alt={item.client}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/30 to-transparent" />
                  
                  {/* Stats badge */}
                  <div className="absolute top-3 right-3 bg-near-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                    <span className="text-white text-xs font-semibold">{item.views} views</span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-bold mb-1">{item.client}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
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
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-near-black w-6' 
                    : 'bg-near-black/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Optional Arrow Navigation */}
          <button
            onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-opacity ${
              currentSlide === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-near-black" />
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(featuredWork.length - 1, currentSlide + 1))}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md transition-opacity ${
              currentSlide === featuredWork.length - 1 ? 'opacity-30 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-near-black" />
          </button>
        </div>

        {/* Featured Work Grid - Desktop */}
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
              <div className="relative rounded-xl overflow-hidden aspect-[9/14] shadow-md">
                <img
                  src={item.thumbnail}
                  alt={item.client}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/20 to-transparent" />
                
                <div className="absolute top-2 right-2 bg-near-black/70 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-white text-[10px] font-semibold">{item.views}</span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-semibold truncate">{item.client}</p>
                  <p className="text-golden-yellow/80 text-xs">{item.likes} likes</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-near-black text-white font-semibold text-sm rounded-full hover:bg-near-black/90 transition-colors"
          >
            See All Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}