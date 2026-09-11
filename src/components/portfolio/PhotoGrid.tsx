'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export interface PhotoItem {
  id: string
  title: string
  url: string
  width?: number | null
  height?: number | null
}

export function PhotoGrid({ photos }: { photos: PhotoItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex === null ? null : photos[activeIndex]

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length))
      if (event.key === 'ArrowLeft')
        setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, photos.length])

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="mb-6 block w-full overflow-hidden rounded-2xl m3-elevated-card group focus:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary"
          >
            <img
              src={photo.url}
              alt={photo.title}
              width={photo.width ?? undefined}
              height={photo.height ?? undefined}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[190] bg-m3-surface-dark/95 flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close photo"
            className="absolute top-4 right-4 p-2 rounded-full bg-m3-surface/90 text-m3-on-surface"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={active.url}
            alt={active.title}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-full w-auto object-contain rounded-xl"
          />
        </div>
      )}
    </>
  )
}
