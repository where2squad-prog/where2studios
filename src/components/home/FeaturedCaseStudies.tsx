'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { useFeaturedCaseStudies, CaseStudy } from '@/hooks/useCaseStudy'
import { getThumbnail } from '@/hooks/useProjects'

const FILTER_LABELS: Record<string, string> = {
  'launch-videos': 'Launch Video',
  podcasts: 'Podcast',
  'event-recaps': 'Event Recap',
  'founder-story': 'Founder Story',
  'product-demo': 'Product Demo',
}

function CaseStudyCard({ project, index }: { project: CaseStudy; index: number }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project as any)
  const categoryLabel = FILTER_LABELS[project.category] || project.category

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
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
              <div className="w-14 h-14 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-m3-on-primary fill-current ml-0.5" />
              </div>
            </div>
          )}

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-m3-surface/90 text-m3-on-surface text-xs font-semibold shadow-sm">
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface mb-2 line-clamp-1 group-hover:text-m3-primary transition-colors">
            {project.title}
          </h3>
          
          {project.result && (
            <p className="text-sm text-m3-on-surface/70 line-clamp-2 mb-3">
              {project.result}
            </p>
          )}

          <div className="flex items-center gap-2 text-m3-primary font-medium text-sm group-hover:gap-3 transition-all">
            View case study
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedCaseStudies() {
  const { data: projects, isLoading } = useFeaturedCaseStudies(3)

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-m3-surface-variant rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10"
        >
          <div>
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
              Work we've shipped
            </h2>
            <p className="text-m3-on-surface/60 text-sm sm:text-base mt-2 max-w-lg">
              Strategy first, premium production, and deliverables that drive growth.
            </p>
          </div>

          <Link
            to="/startups"
            className="m3-outlined-button hidden sm:inline-flex items-center gap-2"
          >
            See Our Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <CaseStudyCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            to="/startups"
            className="m3-outlined-button inline-flex items-center gap-2"
          >
            See Our Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
