import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { portfolioPathFromUrl, removePortfolioObjects, slugify } from '@/lib/portfolioMedia'

export interface UploadedProject {
  id: string
  slug: string | null
  title: string
  client_name: string | null
  convention_slug: string | null
  category: string
  media_type: string
  source: string
  video_url: string | null
  thumbnail_url: string | null
  file_hash: string | null
  file_size: number | null
  duration_seconds: number | null
  width: number | null
  height: number | null
  featured: boolean
  published: boolean
  show_on_main_site: boolean
  display_order: number
  created_at: string
}

const SELECT =
  'id, slug, title, client_name, convention_slug, category, media_type, source, video_url, thumbnail_url, file_hash, file_size, duration_seconds, width, height, featured, published, show_on_main_site, display_order, created_at'

export function useUploadedProjects() {
  return useQuery({
    queryKey: ['portfolio-uploads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(SELECT)
        .eq('source', 'upload')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as UploadedProject[]
    },
  })
}

/** Returns the ids of files already in the portfolio, keyed by hash. */
export async function findExistingHashes(hashes: string[]) {
  if (hashes.length === 0) return new Map<string, string>()
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, file_hash')
    .in('file_hash', hashes)

  if (error) throw error
  const map = new Map<string, string>()
  for (const row of data ?? []) {
    if (row.file_hash) map.set(row.file_hash, row.title)
  }
  return map
}

export async function buildUniqueSlug(title: string) {
  const base = slugify(title) || 'upload'
  const { data, error } = await supabase.from('projects').select('slug').like('slug', `${base}%`)
  if (error) throw error
  const taken = new Set((data ?? []).map((r) => r.slug))
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}

export function useInsertUploadedProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (row: Record<string, unknown>) => {
      const { data, error } = await supabase.from('projects').insert(row as never).select(SELECT).single()
      if (error) throw error
      return data as UploadedProject
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-uploads'] })
      queryClient.invalidateQueries({ queryKey: ['all-projects'] })
    },
  })
}

export function useUpdateUploadedProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...changes }: { id: string } & Record<string, unknown>) => {
      const { error } = await supabase.from('projects').update(changes as never).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-uploads'] })
      queryClient.invalidateQueries({ queryKey: ['all-projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDeleteUploadedProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (project: UploadedProject) => {
      const paths = [
        portfolioPathFromUrl(project.video_url),
        portfolioPathFromUrl(project.thumbnail_url),
      ].filter((p): p is string => Boolean(p))

      await removePortfolioObjects(paths)

      const { error } = await supabase.from('projects').delete().eq('id', project.id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-uploads'] })
      queryClient.invalidateQueries({ queryKey: ['all-projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
