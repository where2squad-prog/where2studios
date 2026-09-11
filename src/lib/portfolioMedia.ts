import { supabase } from '@/integrations/supabase/client'
import * as tus from 'tus-js-client'

export const PORTFOLIO_BUCKET = 'portfolio'
export const RESUMABLE_THRESHOLD = 6 * 1024 * 1024

export const VIDEO_EXTENSIONS = ['mp4', 'mov', 'webm', 'm4v']
export const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'heic', 'heif', 'webp']

export const UPLOAD_ACCEPT =
  'video/mp4,video/quicktime,video/webm,image/jpeg,image/png,image/heic,image/heif,image/webp,.mp4,.mov,.webm,.jpg,.jpeg,.png,.heic,.heif,.webp'

export type PortfolioMediaType = 'video' | 'photo'

export function fileExtension(name: string): string {
  const parts = name.split('.')
  return parts.length > 1 ? parts.pop()!.toLowerCase() : ''
}

export function detectMediaType(file: File): PortfolioMediaType | null {
  const ext = fileExtension(file.name)
  if (file.type.startsWith('video/') || VIDEO_EXTENSIONS.includes(ext)) return 'video'
  if (file.type.startsWith('image/') || PHOTO_EXTENSIONS.includes(ext)) return 'photo'
  return null
}

/** "Cloudflare_RSAC_2025_v2.mp4" becomes "Cloudflare RSAC 2025" */
export function titleFromFilename(name: string): string {
  let base = name.replace(/\.[^.]+$/, '')
  base = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
  base = base.replace(/\s+(?:v|ver|version)\s?\d+$/i, '')
  base = base.replace(/\s+(?:final|draft|copy|export|edit|render)$/i, '')
  base = base.replace(/\s+\(\d+\)$/, '')
  return base.trim()
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function buildStoragePath(folder: 'videos' | 'posters' | 'photos', filename: string): string {
  const ext = fileExtension(filename)
  const base = slugify(titleFromFilename(filename)) || 'media'
  const stamp = Date.now().toString(36)
  const rand = Math.random().toString(36).slice(2, 8)
  return `${folder}/${base}-${stamp}${rand}${ext ? `.${ext}` : ''}`
}

export function getPortfolioPublicUrl(path: string): string {
  return supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(path).data.publicUrl
}

/** Recovers the object path from a stored portfolio URL. */
export function portfolioPathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const marker = `/storage/v1/object/public/${PORTFOLIO_BUCKET}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return null
  return decodeURIComponent(url.slice(idx + marker.length).split('?')[0])
}

export function isUploadedVideo(project: {
  source?: string | null
  media_type?: string | null
}): boolean {
  return project.source === 'upload' && (project.media_type ?? 'video') === 'video'
}

export function isPhoto(project: { media_type?: string | null }): boolean {
  return project.media_type === 'photo'
}

/** Reads duration and pixel dimensions, and grabs a poster frame near 1 second. */
export async function extractVideoMeta(file: File): Promise<{
  duration: number | null
  width: number | null
  height: number | null
  poster: Blob | null
}> {
  const url = URL.createObjectURL(file)
  const video = document.createElement('video')
  video.preload = 'auto'
  video.muted = true
  video.playsInline = true
  video.crossOrigin = 'anonymous'
  video.src = url

  try {
    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error('metadata timeout')), 20000)
      video.onloadedmetadata = () => {
        window.clearTimeout(timer)
        resolve()
      }
      video.onerror = () => {
        window.clearTimeout(timer)
        reject(new Error('cannot read video'))
      }
    })

    const duration = Number.isFinite(video.duration) ? video.duration : null
    const width = video.videoWidth || null
    const height = video.videoHeight || null

    let poster: Blob | null = null
    try {
      const target = duration && duration > 1.2 ? 1 : 0.1
      await new Promise<void>((resolve, reject) => {
        const timer = window.setTimeout(() => reject(new Error('seek timeout')), 20000)
        video.onseeked = () => {
          window.clearTimeout(timer)
          resolve()
        }
        video.currentTime = target
      })
      const canvas = document.createElement('canvas')
      canvas.width = width || 1280
      canvas.height = height || 720
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        poster = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.82)
        )
      }
    } catch {
      poster = null
    }

    return { duration, width, height, poster }
  } finally {
    URL.revokeObjectURL(url)
    video.removeAttribute('src')
  }
}

export async function readImageSize(file: File): Promise<{ width: number | null; height: number | null }> {
  const url = URL.createObjectURL(file)
  try {
    return await new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve({ width: img.naturalWidth || null, height: img.naturalHeight || null })
      img.onerror = () => resolve({ width: null, height: null })
      img.src = url
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function simpleUpload(path: string, body: Blob, contentType: string) {
  const { error } = await supabase.storage.from(PORTFOLIO_BUCKET).upload(path, body, {
    contentType,
    upsert: false,
  })
  if (error) throw error
}

async function resumableUpload(
  path: string,
  file: Blob,
  contentType: string,
  onProgress?: (fraction: number) => void
) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error('You need to be signed in to upload.')

  const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/upload/resumable`

  await new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint,
      retryDelays: [0, 1000, 3000, 6000, 12000],
      headers: {
        authorization: `Bearer ${token}`,
        'x-upsert': 'false',
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: PORTFOLIO_BUCKET,
        objectName: path,
        contentType,
        cacheControl: '3600',
      },
      chunkSize: 6 * 1024 * 1024,
      onError: (error) => reject(error),
      onProgress: (sent, total) => onProgress?.(total ? sent / total : 0),
      onSuccess: () => resolve(),
    })
    upload.start()
  })
}

/** Uploads to the portfolio bucket, using resumable transfers for anything large. */
export async function uploadPortfolioFile(
  path: string,
  body: Blob,
  contentType: string,
  onProgress?: (fraction: number) => void
): Promise<string> {
  if (body.size > RESUMABLE_THRESHOLD) {
    await resumableUpload(path, body, contentType, onProgress)
  } else {
    await simpleUpload(path, body, contentType)
    onProgress?.(1)
  }
  return getPortfolioPublicUrl(path)
}

export async function removePortfolioObjects(paths: string[]) {
  const clean = paths.filter(Boolean)
  if (clean.length === 0) return
  const { error } = await supabase.storage.from(PORTFOLIO_BUCKET).remove(clean)
  if (error) throw error
}

export const UPLOAD_CATEGORIES: { value: string; label: string }[] = [
  { value: 'convention-week', label: 'Convention Week HQ' },
  { value: 'event-recaps', label: 'Event Recaps' },
  { value: 'brand-films', label: 'Brand Films' },
  { value: 'photos', label: 'Photos' },
]

/**
 * Storage image transforms are available on this project, so large originals
 * are served resized. Falls back to the original URL for anything that is not
 * a public portfolio object.
 */
export function portfolioImageUrl(url: string, width: number, quality = 75): string {
  if (!url) return url
  const marker = '/storage/v1/object/public/'
  if (!url.includes(marker)) return url
  const rendered = url.replace(marker, '/storage/v1/render/image/public/')
  return `${rendered}?width=${width}&quality=${quality}`
}

export const PORTFOLIO_IMAGE_WIDTHS = [600, 900, 1200]

export function portfolioImageSrcSet(url: string): string | undefined {
  if (!url || !url.includes('/storage/v1/object/public/')) return undefined
  return PORTFOLIO_IMAGE_WIDTHS.map((w) => `${portfolioImageUrl(url, w)} ${w}w`).join(', ')
}
