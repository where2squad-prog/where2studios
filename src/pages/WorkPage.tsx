'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, ArrowUpDown, Grid3X3 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { useAllProjects, CaseStudy } from '@/hooks/useCaseStudy'
import { getThumbnail } from '@/hooks/useProjects'

const CATEGORIES = ['all', 'launch-videos', 'brand-videos', 'podcasts', 'photography', 'event-recaps', 'social-clips']
const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  'launch-videos': 'Launch Videos',
  'brand-videos': 'Brand Videos',
  podcasts: 'Podcasts',
  photography: 'Photography',
  'event-recaps': 'Event Recaps',
  'social-clips': 'Social Clips',
}

type SortOption = 'featured' | 'recent'

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-m3-primary text-m3-on-primary shadow-md' 
          : 'bg-m3-surface text-m3-on-surface hover:bg-m3-primary/10 border border-m3-outline'
        }`}
    >
      {label}
    </button>
  )
}

function ProjectCard({ project, index }: { project: CaseStudy; index: number }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project as any)
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/work/${project.slug || project.id}`}
        className="group block m3-elevated-card overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" />
          
          {project.video_url && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-12 h-12 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-m3-on-primary fill-current ml-0.5" />
              </div>
            </div>
          )}

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-m3-surface/90 text-m3-on-surface text-xs font-semibold shadow-sm">
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-fredoka text-base font-semibold text-m3-on-surface mb-1 line-clamp-1 group-hover:text-m3-primary transition-colors">
            {project.title}
          </h3>
          
          {project.result && (
            <p className="text-sm text-m3-on-surface/60 line-clamp-2 mb-2">
              {project.result}
            </p>
          )}

          <div className="flex items-center gap-1 text-m3-primary font-medium text-sm group-hover:gap-2 transition-all">
            See the plan
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  
  const { data: projects, isLoading } = useAllProjects({ 
    category: activeCategory === 'all' ? undefined : activeCategory 
  })

  // Sort projects
  const sortedProjects = projects?.slice().sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return (a.display_order ?? 0) - (b.display_order ?? 0)
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return (
    <div className="min-h-screen bg-m3-surface-variant">
      <Navbar variant="light" />

      {/* Hero */}
      <section className="pt-28 pb-8 sm:pt-40 sm:pb-12 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2">
              Work we've shipped
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
              Strategy led, premium production, execution that performs. Built for startups, trusted across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="sticky top-20 sm:top-24 z-50 bg-m3-surface-variant backdrop-blur-sm py-4 -mt-px">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <FilterChip
                  key={cat}
                  label={CATEGORY_LABELS[cat]}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-m3-on-surface/50" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-m3-surface border border-m3-outline rounded-lg px-3 py-2 text-sm text-m3-on-surface"
              >
                <option value="featured">Featured</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-m3-surface rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : sortedProjects && sortedProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Grid3X3 className="w-12 h-12 text-m3-on-surface/30 mx-auto mb-4" />
              <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2">
                Coming Soon
              </h3>
              <p className="text-m3-on-surface/60 max-w-md mx-auto">
                New projects are on the way. Check back soon or contact us to discuss your project.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
            Ready to be next?
          </h2>
          <p className="mt-4 text-m3-on-surface/60">
            Book a strategy call and we'll map deliverables, timeline, and budget.
          </p>
          <p className="mt-2 text-m3-on-surface/40 text-sm">
            Free 30 minute strategy call, we reply within 1 business day.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="m3-filled-button inline-flex items-center gap-2 text-lg">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
