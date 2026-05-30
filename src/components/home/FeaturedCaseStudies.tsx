'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { useFeaturedCaseStudies, CaseStudy } from '@/hooks/useCaseStudy'
import { getThumbnail } from '@/hooks/useProjects'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

const FILTER_LABELS: Record<string, string> = {
  'launch-videos': 'Launch Video',
  podcasts: 'Podcast',
  'event-recaps': 'Event Recap',
  events: 'Events',
  corporate: 'Corporate',
  'founder-story': 'Founder Story',
  'product-demo': 'Product Demo',
}

function getCorporateLabel(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('recap')) return 'Recap'
  if (lower.includes('montage')) return 'Montage'
  if (lower.includes('interview')) return 'Recap'
  return 'Corporate'
}

function getCategoryLabel(project: CaseStudy): string {
  return project.category === 'corporate'
    ? getCorporateLabel(project.title)
    : (FILTER_LABELS[project.category] || project.category)
}

function isPacbioProject(p: CaseStudy): boolean {
  return (
    !!p.client_name?.toLowerCase().includes('pacbio') ||
    !!p.slug?.toLowerCase().includes('pacbio') ||
    !!p.title?.toLowerCase().includes('pacbio')
  )
}

function MediaBlock({ project }: { project: CaseStudy }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project as any)
  return (
    <div className="relative w-full h-full overflow-hidden bg-m3-surface-dark">
      <img
        src={thumbnail}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/60 via-transparent to-transparent" />
      {project.video_url && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-16 h-16 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg">
            <Play className="w-7 h-7 text-m3-on-primary fill-current ml-0.5" />
          </div>
        </div>
      )}
    </div>
  )
}

function FlagshipCard({ project }: { project: CaseStudy }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.6 }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <Link
        to={`/work/${project.slug || project.id}`}
        aria-label={`Read the ${project.title} case study`}
        className="group block m3-elevated-card overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-background"
      >
        <div className="grid lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3 aspect-video lg:aspect-auto lg:min-h-[420px]">
            <MediaBlock project={project} />
          </div>
          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center gap-4">
            <span className="text-m3-secondary text-xs font-semibold uppercase tracking-widest">
              {getCategoryLabel(project)}
            </span>
            {project.client_name && (
              <span className="inline-flex self-start px-3 py-1 rounded-full bg-m3-surface-variant text-m3-on-surface text-xs font-semibold">
                {project.client_name}
              </span>
            )}
            <h3 className="font-fredoka text-3xl lg:text-4xl font-semibold text-m3-on-surface group-hover:text-m3-primary transition-colors">
              {project.title}
            </h3>
            {project.result && (
              <p className="text-m3-on-surface/70 text-base lg:text-lg">{project.result}</p>
            )}
            <span className="m3-filled-button inline-flex items-center gap-2 self-start mt-2">
              See the breakdown
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SupportingCard({ project, index }: { project: CaseStudy; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1 * index }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <Link
        to={`/work/${project.slug || project.id}`}
        aria-label={`Read the ${project.title} case study`}
        className="group block m3-elevated-card overflow-hidden h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-background"
      >
        <div className="aspect-video">
          <MediaBlock project={project} />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <span className="text-m3-secondary text-xs font-semibold uppercase tracking-widest">
            {getCategoryLabel(project)}
          </span>
          <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface group-hover:text-m3-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          {project.result && (
            <p className="text-sm text-m3-on-surface/70 line-clamp-2">{project.result}</p>
          )}
          <span className="inline-flex items-center gap-2 text-m3-primary font-medium text-sm mt-1">
            See the breakdown
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function CaseStudyCardInner({ project }: { project: CaseStudy }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project as any)
  const categoryLabel = project.category === 'corporate'
    ? getCorporateLabel(project.title)
    : (FILTER_LABELS[project.category] || project.category)

  return (
    <Link
      to={`/work/${project.slug || project.id}`}
      className="group block m3-elevated-card overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
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
            See the plan
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
    </Link>
  )
}

function CaseStudyCard({ project, index }: { project: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <CaseStudyCardInner project={project} />
    </motion.div>
  )
}

export function FeaturedCaseStudies() {
  const { data: projects, isLoading } = useFeaturedCaseStudies(5)
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

  const flagship =
    projects.find((p) => isPacbioProject(p)) ?? projects[0]
  const supporting = projects.filter((p) => p.id !== flagship?.id).slice(0, 2)
  const mobileProjects = projects.slice(0, 3)

  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10"
        >
          <div>
            <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface">
              Work
            </h2>
            <p className="text-m3-on-surface/60 text-sm sm:text-base mt-2 max-w-lg">
              Recent work for brands that take their reach seriously.
            </p>
          </div>

          <Link
            to="/work"
            className="m3-outlined-button hidden sm:inline-flex items-center gap-2"
          >
            See Our Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="md:hidden -mx-4 sm:-mx-8">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: false, duration: reduce ? 0 : 25 }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {mobileProjects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className={`basis-[88%] sm:basis-[80%] pr-3 ${index === 0 ? 'pl-4 sm:pl-8' : 'pl-0'}`}
                >
                  <CaseStudyCardInner project={project} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {mobileProjects.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to project ${index + 1} of ${mobileProjects.length}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 ${
                  activeIndex === index ? 'w-6 bg-m3-primary' : 'w-2 bg-m3-on-surface/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 1 flagship + 2 supporting */}
        <div className="hidden md:flex md:flex-col gap-6">
          {flagship && <FlagshipCard project={flagship} />}
          {supporting.length > 0 && (
            <div className={`grid gap-6 ${supporting.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
              {supporting.map((p, i) => (
                <SupportingCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            to="/work"
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
