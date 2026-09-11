import type { QueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

// Build time data loading. Every query key here must match the key used by the
// matching hook, otherwise the page renders an empty state into the static HTML.

async function publishedProjects(category?: string) {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) throw error
  return data
}

/**
 * Slugs of every published film or case study, read at build time.
 * Photos and hidden rows are excluded so we do not prerender thin pages.
 */
export async function getPublishedCaseStudyPaths(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('slug')
    .eq('published', true)
    .eq('show_on_main_site', true)
    .neq('media_type', 'photo')
    .not('slug', 'is', null)

  if (error) {
    console.warn('[prerender] could not read project slugs:', error.message)
    return []
  }

  return (data ?? [])
    .map((row) => row.slug)
    .filter((slug): slug is string => !!slug)
    .map((slug) => `/work/${slug}`)
}

export async function prefetchForRoute(queryClient: QueryClient, routePath: string) {
  const tasks: Promise<unknown>[] = []

  const prefetch = (queryKey: unknown[], queryFn: () => Promise<unknown>) => {
    tasks.push(queryClient.prefetchQuery({ queryKey, queryFn }))
  }

  // Lists used by /work, /event-recap-videos, /services and the homepage.
  prefetch(['all-projects', undefined], () => publishedProjects())
  prefetch(['all-projects', 'event-recaps'], () => publishedProjects('event-recaps'))
  prefetch(['all-projects', 'events'], () => publishedProjects('events'))
  prefetch(['projects', {}], async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw error
    return data
  })
  prefetch(['featured-case-studies', 5], async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('display_order', { ascending: true })
      .limit(5)
    if (error) throw error
    return data
  })
  // Homepage "from the floor" rows. Keys must match the hooks exactly.
  prefetch(['photo-projects'], async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('media_type', 'photo')
      .eq('published', true)
      .eq('show_on_main_site', true)
      .order('display_order', { ascending: true })
    if (error) throw error
    return data
  })
  prefetch(['uploaded-video-projects', 4], async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('source', 'upload')
      .eq('media_type', 'video')
      .eq('published', true)
      .eq('show_on_main_site', true)
      .order('display_order', { ascending: true })
      .limit(4)
    if (error) throw error
    return data
  })
  prefetch(['testimonials'], async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
    if (error) throw error
    return data
  })

  const caseStudyMatch = routePath.match(/^\/work\/(.+)$/)
  if (caseStudyMatch) {
    const slug = caseStudyMatch[1]
    prefetch(['case-study', slug], async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
      if (error) throw error
      return data
    })
  }

  const results = await Promise.allSettled(tasks)
  results.forEach((result) => {
    if (result.status === 'rejected') {
      console.warn('[prerender] data fetch failed:', result.reason)
    }
  })
}
