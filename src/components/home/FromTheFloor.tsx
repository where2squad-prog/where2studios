'use client'

import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { usePhotoProjects, useUploadedVideoProjects, type CaseStudy } from '@/hooks/useCaseStudy'
import { PhotoLightbox, type PhotoItem } from '@/components/portfolio/PhotoLightbox'
import { portfolioImageSrcSet, portfolioImageUrl } from '@/lib/portfolioMedia'

const PHOTO_COUNT = 8

/** Plays the mp4 only while the card is on screen. Reduced motion keeps the poster. */
function FloorVideo({ project }: { project: CaseStudy }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setVisible(entry.isIntersecting)
        const video = videoRef.current
        if (!video || reduce) return
        if (entry.isIntersecting) {
          video.muted = true
          video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])

  const poster = project.thumbnail_url ?? undefined

  return (
    <div ref={wrapRef} className="aspect-video overflow-hidden rounded-2xl bg-m3-surface-dark">
      <video
        ref={videoRef}
        src={visible || reduce ? project.video_url ?? undefined : undefined}
        poster={poster}
        title={project.title}
        aria-label={project.title}
        preload={visible ? 'metadata' : 'none'}
        playsInline
        muted
        loop
        onMouseEnter={(event) => {
          if (!reduce) return
          event.currentTarget.muted = true
          event.currentTarget.play().catch(() => undefined)
        }}
        onMouseLeave={(event) => {
          if (!reduce) return
          event.currentTarget.pause()
        }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export function FromTheFloor() {
  const { data: videos } = useUploadedVideoProjects(4)
  const { data: allPhotos } = usePhotoProjects()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const ordered = [
    ...(allPhotos ?? []).filter((p) => p.featured),
    ...(allPhotos ?? []).filter((p) => !p.featured),
  ]
  const photos: PhotoItem[] = ordered.slice(0, PHOTO_COUNT).map((photo) => ({
    id: photo.id,
    title: photo.title,
    url: photo.thumbnail_url || '',
    width: photo.width,
    height: photo.height,
  }))

  const gallerySchema =
    photos.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          '@id': 'https://where2studios.com/#event-photography',
          name: 'Event photography from the floor',
          associatedMedia: photos.map((photo) => ({
            '@type': 'ImageObject',
            contentUrl: photo.url,
            name: photo.title,
            width: photo.width ?? undefined,
            height: photo.height ?? undefined,
            creator: { '@id': 'https://where2studios.com/#business' },
            copyrightHolder: { '@id': 'https://where2studios.com/#business' },
            contentLocation: 'San Francisco, CA',
            license: 'https://where2studios.com/terms',
            acquireLicensePage: 'https://where2studios.com/contact',
            creditText: 'Where2Studios',
          })),
        }
      : null

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-m3-background">
      {gallerySchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(gallerySchema)}</script>
        </Helmet>
      )}
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-m3-secondary text-xs font-semibold uppercase tracking-widest">
            Photo and video
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-background mt-2 mb-3">
            Stills and build montages from the floor
          </h2>
          <p className="text-m3-on-background/70">
            Photo selects and build films ship with every conference booking.
          </p>

        </div>

        {videos && videos.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
            {videos.map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.slug || project.id}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary rounded-2xl"
              >
                <FloorVideo project={project} />
                <p className="mt-2 text-xs sm:text-sm text-m3-on-background/70 line-clamp-2 group-hover:text-m3-primary transition-colors">
                  {project.title}
                </p>
              </Link>
            ))}
          </div>
        )}

        {photos.length > 0 && (
          <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open photo, ${photo.title}`}
                className="shrink-0 basis-[46%] sm:basis-auto snap-start overflow-hidden rounded-2xl aspect-square focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary"
              >
                <img
                  src={portfolioImageUrl(photo.url, 900)}
                  srcSet={portfolioImageSrcSet(photo.url)}
                  sizes="(min-width: 640px) 25vw, 46vw"
                  alt={`${photo.title}, event photography by Where2Studios in San Francisco`}
                  width={photo.width ?? undefined}
                  height={photo.height ?? undefined}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/work?view=photos"
            className="m3-outlined-button inline-flex items-center gap-2 text-sm"
          >
            See all photos and films
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <PhotoLightbox
        photos={photos}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  )
}
