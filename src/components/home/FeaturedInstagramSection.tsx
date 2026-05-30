'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGlobalSocialRankings } from '@/hooks/useInstagramRankings'
import { InstagramPostCard } from '@/components/social/InstagramPostCard'

export function FeaturedInstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: rankings, isLoading } = useGlobalSocialRankings(8)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (isLoading) {
    return (
      <section id="featured-social" className="py-16 sm:py-20 bg-m3-surface scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[9/16] bg-m3-surface-variant rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!rankings || rankings.length === 0) {
    return null
  }

  return (
    <section id="featured-social" className="py-16 sm:py-20 bg-m3-surface scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8"
        >
          <div>
            <span className="label text-m3-secondary text-sm font-semibold uppercase tracking-wider">Social Media</span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-m3-on-surface mt-2">
              Social Media Highlights
            </h2>
            <p className="text-m3-on-surface/60 mt-2 max-w-md">
              Recent posts, reels, and campaigns built for growth.
            </p>
          </div>

          {/* Navigation arrows - desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-m3-surface-variant hover:bg-m3-primary/10 
                         transition-colors border border-m3-outline"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-m3-on-surface" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-m3-surface-variant hover:bg-m3-primary/10 
                         transition-colors border border-m3-outline"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-m3-on-surface" />
            </button>
          </div>
        </motion.div>

        {/* Desktop: Horizontal scroll carousel */}
        <div className="hidden sm:block">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          >
            {rankings.map((item, index) => (
              <InstagramPostCard key={item.post.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile: 2-column grid */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {rankings.slice(0, 6).map((item, index) => (
            <InstagramPostCard key={item.post.id} item={item} index={index} variant="compact" />
          ))}
        </div>

        {/* Disclaimer note */}
        <p className="text-xs text-m3-on-surface/50 mt-6 text-center">
          Ranked by publicly visible counts. Counts may be hidden on some posts.
        </p>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link 
            to="/work?category=social-clips" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
                       border-2 border-m3-secondary text-m3-secondary font-semibold
                       hover:bg-m3-secondary hover:text-m3-on-secondary transition-colors"
          >
            View all Social Media
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
