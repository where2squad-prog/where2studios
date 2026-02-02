import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface CaseStudy {
  id: string
  slug: string | null
  title: string
  category: string
  video_url: string | null
  thumbnail_url: string | null
  result: string | null
  description: string | null
  client_name: string | null
  location: string | null
  services: string[] | null
  challenge: string | null
  approach: string | null
  deliverables: string[] | null
  metrics_json: Record<string, unknown> | null
  images: string[] | null
  featured: boolean
  published: boolean
  display_order: number
  created_at: string
}

export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ['case-study', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      return data as CaseStudy
    },
    enabled: !!slug,
  })
}

export function useFeaturedCaseStudies(limit = 3) {
  return useQuery({
    queryKey: ['featured-case-studies', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .eq('published', true)
        .order('display_order', { ascending: true })
        .limit(limit)

      if (error) throw error
      return data as CaseStudy[]
    },
  })
}

export function useAllProjects(options?: { category?: string }) {
  return useQuery({
    queryKey: ['all-projects', options?.category],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })

      if (options?.category && options.category !== 'all') {
        query = query.eq('category', options.category)
      }

      const { data, error } = await query

      if (error) throw error
      return data as CaseStudy[]
    },
  })
}
