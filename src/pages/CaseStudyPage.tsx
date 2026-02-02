'use client'

import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Play, ExternalLink, CheckCircle2, Target, Lightbulb, Package } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import { useCaseStudy } from '@/hooks/useCaseStudy'
import { getThumbnail, getYouTubeVideoId } from '@/hooks/useProjects'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { Helmet } from 'react-helmet-async'

const CATEGORY_LABELS: Record<string, string> = {
  corporate: 'Corporate',
  events: 'Events',
  weddings: 'Weddings',
  commercials: 'Commercials',
  social: 'Social',
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { openSheet } = useBookingSheet()
  const { data: project, isLoading, error } = useCaseStudy(slug || '')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-m3-surface-variant">
        <Navbar variant="light" showServices />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-m3-surface rounded mb-4" />
              <div className="h-12 w-96 bg-m3-surface rounded mb-8" />
              <div className="aspect-video bg-m3-surface rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-m3-surface-variant">
        <Navbar variant="light" showServices />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center">
            <h1 className="font-fredoka text-3xl font-semibold text-m3-on-surface mb-4">
              Project Not Found
            </h1>
            <p className="text-m3-on-surface/60 mb-8">
              This project doesn't exist or has been removed.
            </p>
            <Link to="/work" className="m3-filled-button">
              Back to Work
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const thumbnail = project.thumbnail_url || getThumbnail(project as any)
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category
  const videoId = getYouTubeVideoId(project.video_url)

  // Parse challenge and approach into bullet points
  const challengePoints = project.challenge?.split('\n').filter(Boolean) || []
  const approachPoints = project.approach?.split('\n').filter(Boolean) || []

  return (
    <>
      <Helmet>
        <title>{project.title} | Where2Studios Case Study</title>
        <meta name="description" content={project.result || project.description || `${project.title} - A ${categoryLabel} project by Where2Studios`} />
        <meta property="og:title" content={`${project.title} | Where2Studios`} />
        <meta property="og:description" content={project.result || project.description || ''} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": project.video_url ? "VideoObject" : "CreativeWork",
            "name": project.title,
            "description": project.result || project.description,
            "thumbnailUrl": thumbnail,
            "author": {
              "@type": "Organization",
              "name": "Where2Studios"
            },
            ...(project.video_url && {
              "embedUrl": project.video_url
            })
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-m3-surface-variant">
        <Navbar variant="light" showServices />

        {/* Hero Section */}
        <section className="pt-28 pb-8 sm:pt-36 sm:pb-12">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-m3-on-surface/70 hover:text-m3-on-surface mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Work</span>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Main content */}
              <div className="lg:col-span-2">
                <span className="inline-block px-3 py-1 rounded-full bg-m3-primary/10 text-m3-primary text-xs font-semibold mb-4">
                  {categoryLabel}
                </span>
                <h1 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-m3-on-surface mb-4">
                  {project.title}
                </h1>
                {project.result && (
                  <p className="text-lg text-m3-on-surface/70 max-w-2xl">
                    {project.result}
                  </p>
                )}
              </div>

              {/* Meta sidebar */}
              <div className="lg:col-span-1">
                <div className="m3-tonal-card p-5 space-y-4">
                  {project.client_name && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                        Client
                      </p>
                      <p className="text-sm font-medium text-m3-on-surface">
                        {project.client_name}
                      </p>
                    </div>
                  )}
                  
                  {project.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-m3-primary mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-1">
                          Location
                        </p>
                        <p className="text-sm text-m3-on-surface">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.services && project.services.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface/50 mb-2">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-m3-surface rounded text-xs text-m3-on-surface"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video/Image Hero */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              {videoId ? (
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <img
                  src={thumbnail}
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Challenge */}
              {challengePoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-m3-secondary" />
                    <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                      The Challenge
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {challengePoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-m3-secondary mt-1 flex-shrink-0" />
                        <span className="text-m3-on-surface/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Approach */}
              {approachPoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-m3-primary" />
                    <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                      Our Approach
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {approachPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-m3-primary/10 text-m3-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-m3-on-surface/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Deliverables */}
              {project.deliverables && project.deliverables.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-5 h-5 text-m3-primary" />
                    <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                      Deliverables
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-m3-surface-variant rounded-full text-sm text-m3-on-surface"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Description */}
              {project.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-m3-on-surface/80 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="py-12 bg-m3-surface-variant">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-6 text-center">
                Gallery
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.slice(0, 12).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-video rounded-xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${project.title} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-m3-surface-dark">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-2xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark mb-4">
              Want this for your team?
            </h2>
            <p className="text-m3-on-dark/70 mb-8">
              Let's discuss how we can create similar results for your brand.
            </p>
            <button
              onClick={openSheet}
              className="m3-filled-button text-lg px-8 py-4"
            >
              Book a Discovery Call
            </button>
          </div>
        </section>

        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
