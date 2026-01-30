'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjects, getThumbnail, Project } from '@/hooks/useProjects'

function SocialCard({ project, index }: { project: Project; index: number }) {
  const thumbnail = getThumbnail(project)

  const handleClick = () => {
    if (project.video_url) {
      window.open(project.video_url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer"
      onClick={handleClick}
    >
      <div className="m3-elevated-card overflow-hidden rounded-2xl bg-m3-surface 
                      hover:ring-2 hover:ring-m3-primary/50 transition-all duration-300
                      hover:shadow-xl">
        <div className="relative aspect-[9/16]">
          <img
            src={thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-transparent to-transparent" />
          
          {/* Category tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-m3-primary/90 text-m3-on-primary text-xs font-semibold">
              Social Media
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {project.result && (
              <p className="text-m3-primary text-xs font-semibold mb-1">{project.result}</p>
            )}
            <h3 className="font-fredoka text-lg font-semibold text-m3-on-dark mb-3 line-clamp-2">
              {project.title}
            </h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                               bg-m3-secondary text-m3-on-secondary text-sm font-medium
                               hover:bg-m3-secondary/90 transition-colors">
              <span>View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedSocialMedia() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: projects, isLoading } = useProjects({ category: 'social-media' })

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Take up to 8 items
  const displayProjects = projects?.slice(0, 8) || []

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

  if (!displayProjects.length) {
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
            {displayProjects.map((project, index) => (
              <SocialCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile: 2-column grid */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {displayProjects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => project.video_url && window.open(project.video_url, '_blank', 'noopener,noreferrer')}
            >
              <div className="rounded-xl overflow-hidden bg-m3-surface shadow-md 
                              hover:ring-2 hover:ring-m3-primary/50 transition-all">
                <div className="relative aspect-[9/16]">
                  <img
                    src={getThumbnail(project)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-m3-primary/90 text-m3-on-primary text-[10px] font-semibold mb-1">
                      Social
                    </span>
                    <h3 className="font-fredoka text-sm font-semibold text-m3-on-dark line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link 
            to="/work?category=social-media" 
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
