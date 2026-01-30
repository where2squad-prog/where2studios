import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface Project {
  id: string
  title: string
  category: string
  video_url: string | null
  thumbnail_url: string | null
  result: string | null
  description: string | null
  featured: boolean
  display_order: number
  created_at: string
}

interface UseProjectsOptions {
  category?: string
  featured?: boolean
}

// Extract YouTube video ID from URL
export function getYouTubeVideoId(url: string | null): string | null {
  if (!url) return null
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(videoUrl: string | null): string | null {
  const videoId = getYouTubeVideoId(videoUrl)
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Get thumbnail with fallback
export function getThumbnail(project: Project): string {
  if (project.thumbnail_url) return project.thumbnail_url
  const ytThumbnail = getYouTubeThumbnail(project.video_url)
  if (ytThumbnail) return ytThumbnail
  return 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop'
}

export function useProjects(options: UseProjectsOptions = {}) {
  return useQuery({
    queryKey: ['projects', options],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (options.category && options.category !== 'all') {
        query = query.eq('category', options.category)
      }

      if (options.featured !== undefined) {
        query = query.eq('featured', options.featured)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Project[]
    },
  })
}

export function useFeaturedProjects() {
  return useProjects({ featured: true })
}

export function useProjectCategories() {
  return useQuery({
    queryKey: ['project-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('category')

      if (error) throw error

      const categories = [...new Set(data.map((p) => p.category))]
      return categories
    },
  })
}
