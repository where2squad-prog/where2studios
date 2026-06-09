/**
 * Helpers for handling YouTube and direct video URLs in case study cards.
 */

export function isYouTubeUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return /(?:youtube\.com|youtu\.be)/i.test(url)
}

export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return shortMatch[1]
  const longMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (longMatch) return longMatch[1]
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
  if (embedMatch) return embedMatch[1]
  return null
}

export function getYouTubeEmbedUrl(
  url: string | null | undefined,
  options: { autoplay?: boolean; mute?: boolean; loop?: boolean; controls?: boolean } = {}
): string | null {
  const id = getYouTubeVideoId(url)
  if (!id) return null
  const params = new URLSearchParams()
  params.set('rel', '0')
  params.set('modestbranding', '1')
  if (options.autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1')
  }
  if (options.loop) {
    params.set('loop', '1')
    params.set('playlist', id)
  }
  if (options.controls === false) params.set('controls', '0')
  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}

export function getYouTubeThumbnail(url: string | null | undefined): string | null {
  const id = getYouTubeVideoId(url)
  if (!id) return null
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}