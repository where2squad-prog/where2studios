'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowDown, ArrowUp, LogOut, Trash2, UploadCloud, Check, AlertCircle, Save } from 'lucide-react'
import { toast } from 'sonner'
import logo from '@/assets/where2studios-logo.png'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { hashFile } from '@/lib/sha256'
import {
  UPLOAD_ACCEPT,
  UPLOAD_CATEGORIES,
  buildStoragePath,
  detectMediaType,
  extractVideoMeta,
  readImageSize,
  titleFromFilename,
  uploadPortfolioFile,
} from '@/lib/portfolioMedia'
import {
  UploadedProject,
  buildUniqueSlug,
  findExistingHashes,
  useDeleteUploadedProject,
  useInsertUploadedProject,
  useUpdateUploadedProject,
  useUploadedProjects,
} from '@/hooks/usePortfolioUploads'

type QueueStatus = 'queued' | 'hashing' | 'duplicate' | 'uploading' | 'done' | 'error' | 'skipped'

interface QueueItem {
  id: string
  file: File
  mediaType: 'video' | 'photo'
  status: QueueStatus
  progress: number
  message?: string
  projectId?: string
}

function statusLabel(item: QueueItem) {
  switch (item.status) {
    case 'queued':
      return 'Waiting'
    case 'hashing':
      return 'Checking for duplicates'
    case 'duplicate':
      return 'Already in portfolio'
    case 'uploading':
      return 'Uploading'
    case 'done':
      return 'Added, unpublished'
    case 'skipped':
      return item.message || 'Skipped'
    default:
      return item.message || 'Failed'
  }
}

function formatSize(bytes: number | null) {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`
}

export default function PortfolioAdminPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [busy, setBusy] = useState(false)

  const { data: uploads, isLoading } = useUploadedProjects()
  const insertProject = useInsertUploadedProject()
  const updateProject = useUpdateUploadedProject()
  const deleteProject = useDeleteUploadedProject()

  const totalProgress = useMemo(() => {
    const active = queue.filter((i) => i.status !== 'skipped')
    if (active.length === 0) return 0
    const sum = active.reduce(
      (acc, i) => acc + (i.status === 'done' || i.status === 'duplicate' ? 1 : i.progress),
      0
    )
    return Math.round((sum / active.length) * 100)
  }, [queue])

  const patch = useCallback((id: string, changes: Partial<QueueItem>) => {
    setQueue((prev) => prev.map((item) => (item.id === id ? { ...item, ...changes } : item)))
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const processFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return

      const items: QueueItem[] = files.map((file) => {
        const mediaType = detectMediaType(file)
        return {
          id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
          file,
          mediaType: mediaType ?? 'video',
          status: mediaType ? 'queued' : 'skipped',
          progress: 0,
          message: mediaType ? undefined : 'Unsupported file type',
        }
      })

      setQueue((prev) => [...prev, ...items])
      setBusy(true)

      for (const item of items) {
        if (item.status === 'skipped') continue

        try {
          patch(item.id, { status: 'hashing', progress: 0.02 })
          const hash = await hashFile(item.file, (f) => patch(item.id, { progress: f * 0.15 }))

          const existing = await findExistingHashes([hash])
          if (existing.has(hash)) {
            patch(item.id, { status: 'duplicate', progress: 1, message: 'Already in portfolio' })
            continue
          }

          patch(item.id, { status: 'uploading' })
          const title = titleFromFilename(item.file.name)
          const slug = await buildUniqueSlug(title)

          let videoUrl: string | null = null
          let thumbnailUrl: string | null = null
          let duration: number | null = null
          let width: number | null = null
          let height: number | null = null

          if (item.mediaType === 'video') {
            const meta = await extractVideoMeta(item.file).catch(() => ({
              duration: null,
              width: null,
              height: null,
              poster: null,
            }))
            duration = meta.duration
            width = meta.width
            height = meta.height

            videoUrl = await uploadPortfolioFile(
              buildStoragePath('videos', item.file.name),
              item.file,
              item.file.type || 'video/mp4',
              (f) => patch(item.id, { progress: 0.15 + f * 0.75 })
            )

            if (meta.poster) {
              const posterName = item.file.name.replace(/\.[^.]+$/, '') + '.jpg'
              thumbnailUrl = await uploadPortfolioFile(
                buildStoragePath('posters', posterName),
                meta.poster,
                'image/jpeg'
              )
            }
          } else {
            const size = await readImageSize(item.file)
            width = size.width
            height = size.height
            const url = await uploadPortfolioFile(
              buildStoragePath('photos', item.file.name),
              item.file,
              item.file.type || 'image/jpeg',
              (f) => patch(item.id, { progress: 0.15 + f * 0.8 })
            )
            videoUrl = null
            thumbnailUrl = url
          }

          const inserted = await insertProject.mutateAsync({
            title,
            slug,
            category: item.mediaType === 'photo' ? 'photos' : 'convention-week',
            media_type: item.mediaType,
            source: 'upload',
            video_url: videoUrl,
            thumbnail_url: thumbnailUrl,
            file_hash: hash,
            file_size: item.file.size,
            duration_seconds: duration,
            width,
            height,
            published: false,
            show_on_main_site: true,
            featured: false,
            display_order: 0,
          })

          patch(item.id, { status: 'done', progress: 1, projectId: inserted.id })
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Upload failed'
          patch(item.id, { status: 'error', message })
        }
      }

      setBusy(false)
      toast.success('Upload run finished. Everything new is unpublished.')
    },
    [insertProject, patch]
  )

  const onDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    setDragActive(false)

    const items = Array.from(event.dataTransfer.items ?? [])
    const entries = items
      .map((item) => (typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null))
      .filter((entry): entry is FileSystemEntry => Boolean(entry))

    if (entries.length === 0) {
      processFiles(visibleFiles(Array.from(event.dataTransfer.files)))
      return
    }

    const collected: File[] = []
    for (const entry of entries) collected.push(...(await readEntry(entry)))
    processFiles(visibleFiles(collected))
  }

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      <nav className="sticky top-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-4 group">
              <ArrowLeft className="w-5 h-5 text-m3-on-dark group-hover:text-m3-primary transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-10 sm:h-14 w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/admin/social"
                className="hidden sm:inline text-sm text-m3-on-dark/70 hover:text-m3-on-dark transition-colors"
              >
                Social Admin
              </Link>
              <h1 className="font-fredoka text-lg sm:text-xl font-semibold text-m3-on-dark">
                Portfolio Uploads
              </h1>
              <span className="hidden sm:inline text-sm text-m3-on-dark/60">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-m3-on-dark/70 hover:text-m3-on-dark hover:bg-m3-surface-variant/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-10">
        {/* Dropzone */}
        <section>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
            }}
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 sm:p-16 text-center transition-colors
              ${dragActive ? 'border-m3-primary bg-m3-primary/10' : 'border-m3-on-dark/20 hover:border-m3-primary/60'}`}
          >
            <UploadCloud className="w-10 h-10 mx-auto text-m3-primary mb-4" />
            <p className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-dark">
              Drop videos and photos here
            </p>
            <p className="mt-2 text-sm text-m3-on-dark/60">
              mp4, mov, webm, jpg, png, heic, webp. Many files at once. Large videos resume if the
              connection drops.
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={UPLOAD_ACCEPT}
              className="hidden"
              onChange={(e) => {
                processFiles(Array.from(e.target.files ?? []))
                e.target.value = ''
              }}
            />
          </div>

          {queue.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Progress value={totalProgress} className="h-2 flex-1" />
                <span className="text-sm text-m3-on-dark/70 w-12 text-right">{totalProgress}%</span>
                {!busy && (
                  <Button variant="ghost" size="sm" onClick={() => setQueue([])}>
                    Clear
                  </Button>
                )}
              </div>

              {queue.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-m3-surface-variant/20 border border-m3-on-dark/10 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-m3-on-dark truncate">{item.file.name}</p>
                    <span className="flex items-center gap-1.5 text-xs text-m3-on-dark/70 whitespace-nowrap">
                      {item.status === 'done' && <Check className="w-3.5 h-3.5 text-m3-primary" />}
                      {(item.status === 'error' || item.status === 'duplicate') && (
                        <AlertCircle className="w-3.5 h-3.5 text-m3-secondary" />
                      )}
                      {statusLabel(item)}
                    </span>
                  </div>
                  {(item.status === 'hashing' || item.status === 'uploading') && (
                    <Progress value={Math.round(item.progress * 100)} className="h-1.5 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Library */}
        <section>
          <h2 className="font-fredoka text-xl font-semibold text-m3-on-dark mb-4">
            Uploaded media
          </h2>
          {isLoading ? (
            <p className="text-m3-on-dark/60 text-sm">Loading...</p>
          ) : !uploads || uploads.length === 0 ? (
            <p className="text-m3-on-dark/60 text-sm">Nothing uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {uploads.map((project, index) => (
                <UploadRow
                  key={project.id}
                  project={project}
                  isFirst={index === 0}
                  isLast={index === uploads.length - 1}
                  onSave={(changes) =>
                    updateProject
                      .mutateAsync({ id: project.id, ...changes })
                      .then(() => toast.success('Saved'))
                      .catch((e: Error) => toast.error(e.message))
                  }
                  onMove={(direction) => {
                    const swapWith = uploads[index + direction]
                    if (!swapWith) return
                    Promise.all([
                      updateProject.mutateAsync({
                        id: project.id,
                        display_order: swapWith.display_order,
                      }),
                      updateProject.mutateAsync({
                        id: swapWith.id,
                        display_order: project.display_order,
                      }),
                    ]).catch((e: Error) => toast.error(e.message))
                  }}
                  onDelete={() => {
                    if (!window.confirm(`Delete "${project.title}" and its files?`)) return
                    deleteProject
                      .mutateAsync(project)
                      .then(() => toast.success('Deleted'))
                      .catch((e: Error) => toast.error(e.message))
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function UploadRow({
  project,
  isFirst,
  isLast,
  onSave,
  onMove,
  onDelete,
}: {
  project: UploadedProject
  isFirst: boolean
  isLast: boolean
  onSave: (changes: Record<string, unknown>) => void
  onMove: (direction: 1 | -1) => void
  onDelete: () => void
}) {
  const [title, setTitle] = useState(project.title)
  const [clientName, setClientName] = useState(project.client_name ?? '')
  const [category, setCategory] = useState(project.category)
  const [published, setPublished] = useState(project.published)
  const [onMainSite, setOnMainSite] = useState(project.show_on_main_site)
  const [featured, setFeatured] = useState(project.featured)

  return (
    <div className="rounded-2xl bg-m3-surface-variant/20 border border-m3-on-dark/10 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-40 shrink-0">
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full aspect-video object-cover rounded-lg bg-m3-surface-dark"
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-video rounded-lg bg-m3-surface-dark" />
          )}
          <p className="mt-1 text-xs text-m3-on-dark/50">
            {project.media_type === 'photo' ? 'Photo' : 'Video'} {formatSize(project.file_size)}
          </p>
        </div>

        <div className="flex-1 grid sm:grid-cols-2 gap-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client name"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {UPLOAD_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap items-center gap-4 text-sm text-m3-on-dark/80">
            <label className="flex items-center gap-2">
              <Switch checked={published} onCheckedChange={setPublished} />
              Published
            </label>
            <label className="flex items-center gap-2">
              <Switch checked={onMainSite} onCheckedChange={setOnMainSite} />
              Main site
            </label>
            <label className="flex items-center gap-2">
              <Switch checked={featured} onCheckedChange={setFeatured} />
              Featured
            </label>
          </div>
        </div>

        <div className="flex lg:flex-col items-center gap-2">
          <Button
            size="sm"
            onClick={() =>
              onSave({
                title,
                client_name: clientName || null,
                category,
                published,
                show_on_main_site: onMainSite,
                featured,
              })
            }
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" disabled={isFirst} onClick={() => onMove(-1)} aria-label="Move up">
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled={isLast} onClick={() => onMove(1)} aria-label="Move down">
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete} aria-label="Delete">
            <Trash2 className="w-4 h-4 text-m3-secondary" />
          </Button>
        </div>
      </div>
    </div>
  )
}
