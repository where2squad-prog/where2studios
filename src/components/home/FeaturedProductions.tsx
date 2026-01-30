'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjects, getThumbnail, Project } from '@/hooks/useProjects'
import { VideoModal } from '@/components/VideoModal'

const PRODUCTION_CATEGORIES = ['corporate', 'events', 'weddings', 'commercials']
const FILTER_LABELS: Record<string, string> = {
  all: 'All',
  corporate: 'Corporate',
  events: 'Events',
  weddings: 'Weddings',
  commercials: 'Commercials',
}

interface ProductionCardProps {
  project: Project
  index: number
  onPlay: (project: Project) => void
}

function ProductionCard({ project, index, onPlay }: ProductionCardProps) {
  const thumbnail = getThumbnail(project)
  const categoryLabel = FILTER_LABELS[project.category] || project.category

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-[300px] sm:w-[360px] group cursor-pointer"
      onClick={() => onPlay(project)}
    >
      <div className="m3-elevated-card overflow-hidden rounded-2xl bg-m3-surface 
                      hover:ring-2 hover:ring-m3-primary/50 transition-all duration-300
                      hover:shadow-xl">
        <div className="relative aspect-video">
          <img
            src={thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-m3-on-primary fill-current ml-0.5" />
            </div>
          </div>

          {/* Category tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-m3-surface/90 text-m3-on-surface text-xs font-semibold shadow-sm">
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface line-clamp-1">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

function FilterChip({ 
  label, 
  active, 
  onClick 
}: { 
  label: string
  active: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-m3-primary text-m3-on-primary shadow-md' 
          : 'bg-m3-surface-variant text-m3-on-surface hover:bg-m3-primary/10 border border-m3-outline'
        }`}
    >
      {label}
    </button>
  )
}

export function FeaturedProductions() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { data: allProjects, isLoading } = useProjects()

  // Filter projects: only featured AND production categories
  const productionProjects = useMemo(() => {
    if (!allProjects) return []
    return allProjects.filter(p => 
      PRODUCTION_CATEGORIES.includes(p.category) && p.featured === true
    )
  }, [allProjects])

  // Apply category filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return productionProjects.slice(0, 8)
    }
    return productionProjects.filter(p => p.category === activeFilter).slice(0, 8)
  }, [productionProjects, activeFilter])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (isLoading) {
    return (
      <section id="featured-productions" className="py-16 sm:py-20 bg-m3-surface-variant scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] sm:w-[360px] aspect-video bg-m3-surface rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show section even when empty - individual filter results may show "Coming Soon"

  return (
    <section id="featured-productions" className="py-16 sm:py-20 bg-m3-surface-variant scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6"
        >
          <div>
            <span className="label text-m3-primary text-sm font-semibold uppercase tracking-wider">Productions</span>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-m3-on-surface mt-2">
              Featured Productions
            </h2>
            <p className="text-m3-on-surface/60 mt-2 max-w-md">
              Corporate, events, weddings, and commercials.
            </p>
          </div>

          {/* Navigation arrows - desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-m3-surface hover:bg-m3-primary/10 
                         transition-colors border border-m3-outline"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-m3-on-surface" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-m3-surface hover:bg-m3-primary/10 
                         transition-colors border border-m3-outline"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-m3-on-surface" />
            </button>
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <FilterChip
            label="All"
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          />
          {PRODUCTION_CATEGORIES.map(cat => (
            <FilterChip
              key={cat}
              label={FILTER_LABELS[cat]}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
            />
          ))}
        </motion.div>

        {/* Desktop: Horizontal scroll carousel */}
        <div className="hidden sm:block">
          {filteredProjects.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProductionCard key={project.id} project={project} index={index} onPlay={setSelectedProject} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center py-16"
            >
              <div className="text-center">
                <span className="font-fredoka text-2xl font-semibold text-m3-on-surface">
                  Coming Soon!
                </span>
                <p className="mt-2 text-m3-on-surface/60 text-sm">
                  New projects are on the way.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="sm:hidden">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {filteredProjects.slice(0, 6).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="rounded-xl overflow-hidden bg-m3-surface shadow-md 
                                    hover:ring-2 hover:ring-m3-primary/50 transition-all">
                      <div className="relative aspect-video">
                        <img
                          src={getThumbnail(project)}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-m3-surface/90 text-m3-on-surface text-[10px] font-semibold mb-1">
                            {FILTER_LABELS[project.category] || project.category}
                          </span>
                          <h3 className="font-fredoka text-xs font-semibold text-m3-on-dark line-clamp-2">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="text-center">
                <span className="font-fredoka text-xl font-semibold text-m3-on-surface">
                  Coming Soon!
                </span>
                <p className="mt-2 text-m3-on-surface/60 text-sm">
                  New projects are on the way.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Video Modal */}
        <VideoModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          videoUrl={selectedProject?.video_url || null}
          title={selectedProject?.title}
        />

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link 
            to="/work/productions" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
                       bg-m3-primary text-m3-on-primary font-semibold
                       hover:bg-m3-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            View all Productions
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
