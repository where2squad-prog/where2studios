'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Play, ArrowUpDown, Grid3X3 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { SkipLink } from '@/components/layout/SkipLink'
import { SEOHead } from '@/components/SEOHead'

import { useAllProjects, usePhotoProjects, CaseStudy } from '@/hooks/useCaseStudy'
import { getThumbnail } from '@/hooks/useProjects'
import { isUploadedVideo } from '@/lib/portfolioMedia'
import { UploadVideo } from '@/components/portfolio/UploadVideo'
import { PhotoGrid } from '@/components/portfolio/PhotoGrid'
import { KeepReading } from '@/components/layout/KeepReading'

const CATEGORIES = ['all', 'convention-week', 'event-recaps', 'brand-films']
const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  'convention-week': 'Conference Activations',
  'event-recaps': 'Event Recaps',
  'brand-films': 'Brand Films',
  photos: 'Photos',
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

function getCorporateLabel(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('recap')) return 'Recap'
  if (lower.includes('montage')) return 'Montage'
  if (lower.includes('interview')) return 'Recap'
  return 'Corporate'
}

function ProjectCard({ project, index }: { project: CaseStudy; index: number }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project as any)
  const categoryLabel = project.category === 'corporate'
    ? getCorporateLabel(project.title)
    : (CATEGORY_LABELS[project.category] || project.category)

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
          {isUploadedVideo(project) && project.video_url ? (
            <UploadVideo
              src={project.video_url}
              poster={thumbnail}
              title={project.title}
              hoverPreview
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={thumbnail}
              alt={`Event recap video for ${project.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" />

          {project.video_url && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
          <h2 className="font-fredoka text-base font-semibold text-m3-on-surface mb-1 line-clamp-1 group-hover:text-m3-primary transition-colors">
            {project.title}
          </h2>
          
          {project.result && (
            <p className="text-sm text-m3-on-surface/60 line-clamp-2 mb-2">
              {project.result}
            </p>
          )}

          <div className="flex items-center gap-1 text-m3-primary font-medium text-sm group-hover:gap-2 transition-all">
            Watch the film
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get('view')
  // The static HTML is built without a view param, so the first client render
  // ignores it too and the filter is applied straight after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const requested =
    viewParam && [...CATEGORIES, 'photos'].includes(viewParam) ? viewParam : 'all'
  const activeCategory = mounted ? requested : 'all'
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const setActiveCategory = (category: string) => {
    const next = new URLSearchParams(searchParams)
    if (category === 'all') next.delete('view')
    else next.set('view', category)
    setSearchParams(next, { replace: true })
  }
  
  const { data: projects, isLoading } = useAllProjects({ 
    category: activeCategory === 'all' ? undefined : activeCategory 
  })
  const { data: photos } = usePhotoProjects()
  const hasPhotos = (photos?.length ?? 0) > 0
  const visibleCategories = hasPhotos ? [...CATEGORIES, 'photos'] : CATEGORIES
  const showPhotos = activeCategory === 'photos'

  // Sort projects
  const sortedProjects = projects
    ?.filter((project) => project.media_type !== 'photo')
    .slice()
    .sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return (a.display_order ?? 0) - (b.display_order ?? 0)
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return (
    <div className="min-h-screen bg-m3-surface-variant">
      <SkipLink />
      <SEOHead
        title="Event Recap Video Portfolio | Bay Area Event Films | Where2Studios"
        description="See our event recap videos: conference recaps, summit coverage, brand activations and corporate event films shot across San Francisco, San Jose and the Bay Area."
        url="https://where2studios.com/work"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Event Recap Video Portfolio',
          url: 'https://where2studios.com/work',
          description:
            'Event recap videos, conference and summit coverage, brand activation films and corporate event videography by Where2Studios in the San Francisco Bay Area.',
          isPartOf: { '@id': 'https://where2studios.com/#website' },
          about: { '@id': 'https://where2studios.com/#event-recap-video-production' },
        }}
      />
      <Navbar variant="light" />
      <main id="main-content" tabIndex={-1} className="outline-none">
      {/* Hero */}
      <section className="pt-28 pb-8 sm:pt-40 sm:pb-12 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2">
              Event recap videos and brand films we've shipped
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
              Recaps from conferences, summits, brand activations and corporate events across San Francisco, San Jose and the Bay Area.
            </p>
            <p className="mt-3">
              <Link
                to="/event-recap-videos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-m3-primary hover:gap-2 transition-all"
              >
                How our event recap video production works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="sticky top-[var(--nav-h)] z-50 bg-m3-surface-variant backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((cat) => (
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
          {showPhotos ? (
            <PhotoGrid
              photos={(photos ?? []).map((photo) => ({
                id: photo.id,
                title: photo.title,
                url: photo.thumbnail_url || '',
                width: photo.width,
                height: photo.height,
              }))}
            />
          ) : isLoading ? (
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
              <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2">
                Coming Soon
              </h2>
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
              Book a Call
            </Link>
          </div>
        </div>
      </section>
  <KeepReading />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
