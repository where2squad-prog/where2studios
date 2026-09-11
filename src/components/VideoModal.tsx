'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getVideoEmbedUrl, isDirectVideoUrl } from '@/lib/video'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string | null
  title?: string
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const isDirect = isDirectVideoUrl(videoUrl)
  const embedUrl = isDirect ? null : getVideoEmbedUrl(videoUrl, { autoplay: true })

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-m3-surface-dark/95 backdrop-blur-xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-m3-on-dark/10 hover:bg-m3-on-dark/20 text-m3-on-dark transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl aspect-video m3-elevated-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isDirect && videoUrl ? (
              <video
                src={videoUrl}
                title={title || 'Video'}
                aria-label={title || 'Video'}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-m3-surface-dark"
              />
            ) : embedUrl ? (
              <iframe
                src={embedUrl}
                title={title || 'Video'}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-m3-surface-dark">
                <p className="text-m3-on-dark/50">Video not available</p>
              </div>
            )}
          </motion.div>

          {/* Title */}
          {title && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-8 text-m3-on-dark text-lg font-medium"
            >
              {title}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
