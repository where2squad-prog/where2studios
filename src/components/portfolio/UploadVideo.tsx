'use client'

import { useRef } from 'react'

interface UploadVideoProps {
  src: string
  poster?: string | null
  title: string
  /** Card mode: muted autoplay preview on hover, no controls until clicked. */
  hoverPreview?: boolean
  className?: string
}

/**
 * Native player for videos hosted in our own media store.
 * Vimeo and YouTube rows keep their iframe embeds.
 */
export function UploadVideo({ src, poster, title, hoverPreview = false, className = '' }: UploadVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  const handleEnter = () => {
    if (!hoverPreview) return
    const video = ref.current
    if (!video) return
    video.muted = true
    video.play().catch(() => undefined)
  }

  const handleLeave = () => {
    if (!hoverPreview) return
    const video = ref.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster ?? undefined}
      title={title}
      aria-label={title}
      preload="none"
      playsInline
      muted={hoverPreview}
      controls={!hoverPreview}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={(event) => {
        if (!hoverPreview) return
        const video = event.currentTarget
        video.controls = true
        video.muted = false
        video.play().catch(() => undefined)
      }}
      className={className || 'w-full h-full object-cover'}
    />
  )
}
