'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export interface PhotoItem {
  id: string
  title: string
  url: string
  width?: number | null
  height?: number | null
}

interface PhotoLightboxProps {
  photos: PhotoItem[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

/** Shared full screen photo viewer. Always shows the original, full size file. */
export function PhotoLightbox({ photos, activeIndex, onClose, onNavigate }: PhotoLightboxProps) {
  const active = activeIndex === null ? null : photos[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate((activeIndex + 1) % photos.length)
      if (event.key === 'ArrowLeft') onNavigate((activeIndex - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, photos.length, onClose, onNavigate])

  if (!active) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={active.title}
      onClick={onClose}
      className="fixed inset-0 z-[190] bg-m3-surface-dark/95 flex items-center justify-center p-4"
    >
      <button
        type="button"
        onClick={onClose}
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
  )
}
