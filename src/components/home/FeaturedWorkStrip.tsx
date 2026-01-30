'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFeaturedProjects, getThumbnail } from '@/hooks/useProjects'

export function FeaturedWorkStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: projects, isLoading } = useFeaturedProjects()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 aspect-[9/14] bg-m3-surface-variant rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!projects?.length) return null

  return (
    <section className="py-16 sm:py-24 bg-m3-surface overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-8"
        >
          <div>
            <span className="label text-m3-secondary">Featured Work</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-m3-on-surface mt-2">
              What happens when people care
            </h2>
          </div>

          {/* Navigation arrows - desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-m3-surface-variant hover:bg-m3-primary/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-m3-on-surface" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-m3-surface-variant hover:bg-m3-primary/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-m3-on-surface" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-48 sm:w-56 group cursor-pointer"
              onClick={() => window.location.href = '/work'}
            >
              <div className="m3-elevated-card overflow-hidden aspect-[9/14]">
                <div className="relative w-full h-full">
                  <img
                    src={getThumbnail(project)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-m3-surface-dark/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-m3-primary text-xs font-semibold mb-1">{project.result}</p>
                    <h3 className="text-m3-on-dark text-sm font-semibold truncate">{project.title}</h3>
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
          <Link to="/work" className="m3-outlined-button inline-flex">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
