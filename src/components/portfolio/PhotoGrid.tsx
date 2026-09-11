'use client'

import { useState } from 'react'
import { PhotoLightbox, type PhotoItem } from '@/components/portfolio/PhotoLightbox'
import { portfolioImageSrcSet, portfolioImageUrl } from '@/lib/portfolioMedia'

export type { PhotoItem }

export function PhotoGrid({ photos }: { photos: PhotoItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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
              src={portfolioImageUrl(photo.url, 900)}
              srcSet={portfolioImageSrcSet(photo.url)}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

      <PhotoLightbox
        photos={photos}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  )
}
