import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface InstagramPost {
  id: string
  client_id: string
  shortcode: string
  permalink: string
  media_type: string | null
  caption_snippet: string | null
  posted_at: string | null
  thumbnail_url: string | null
  public_views: number | null
  public_likes: number | null
  public_comments: number | null
  captured_at: string | null
  is_pinned: boolean
}

export interface InstagramClient {
  id: string
  name: string
  ig_handle: string
  profile_url: string
}

export interface RankedPost {
  post: InstagramPost
  client: InstagramClient
  score: number
  rank: number
}

// Fetch global top rankings with post and client details
export function useGlobalSocialRankings(limit = 20) {
  return useQuery({
    queryKey: ['ig-global-rankings', limit],
    queryFn: async (): Promise<RankedPost[]> => {
      // First fetch rankings
      const { data: rankings, error: rankingsError } = await supabase
        .from('ig_social_global_rankings')
        .select('post_id, score, rank')
        .order('rank', { ascending: true })
        .limit(limit)

      if (rankingsError) throw rankingsError
      if (!rankings || rankings.length === 0) return []

      const postIds = rankings.map(r => r.post_id)

      // Fetch posts
      const { data: posts, error: postsError } = await supabase
        .from('ig_public_posts')
        .select('*')
        .in('id', postIds)

      if (postsError) throw postsError

      // Get unique client IDs
      const clientIds = [...new Set((posts || []).map(p => p.client_id))]

      // Fetch clients
      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .in('id', clientIds)

      if (clientsError) throw clientsError

      const postMap = new Map((posts || []).map(p => [p.id, p]))
      const clientMap = new Map((clients || []).map(c => [c.id, c]))

      return rankings
        .map(r => {
          const post = postMap.get(r.post_id)
          if (!post) return null
          const client = clientMap.get(post.client_id)
          if (!client) return null

          return {
            post: post as InstagramPost,
            client: client as InstagramClient,
            score: Number(r.score),
            rank: r.rank,
          }
        })
        .filter((r): r is RankedPost => r !== null)
    },
  })
}

// Fetch per-client rankings
export function useClientSocialRankings(clientId?: string) {
  return useQuery({
    queryKey: ['ig-client-rankings', clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<RankedPost[]> => {
      if (!clientId) return []

      const { data: rankings, error: rankingsError } = await supabase
        .from('ig_social_rankings')
        .select('post_id, score, rank')
        .eq('client_id', clientId)
        .order('rank', { ascending: true })

      if (rankingsError) throw rankingsError
      if (!rankings || rankings.length === 0) return []

      const postIds = rankings.map(r => r.post_id)

      const { data: posts, error: postsError } = await supabase
        .from('ig_public_posts')
        .select('*')
        .in('id', postIds)

      if (postsError) throw postsError

      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single()

      if (clientError) throw clientError

      const postMap = new Map((posts || []).map(p => [p.id, p]))

      return rankings
        .map(r => {
          const post = postMap.get(r.post_id)
          if (!post) return null

          return {
            post: post as InstagramPost,
            client: client as InstagramClient,
            score: Number(r.score),
            rank: r.rank,
          }
        })
        .filter((r): r is RankedPost => r !== null)
    },
  })
}

// Fetch all active clients
export function useInstagramClients() {
  return useQuery({
    queryKey: ['ig-clients'],
    queryFn: async (): Promise<InstagramClient[]> => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (error) throw error
      return (data || []) as InstagramClient[]
    },
  })
}

// Helper to format large numbers
export function formatCount(count: number | null): string {
  if (count === null || count === undefined) return ''
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toLocaleString()
}

// Helper to get thumbnail with fallback
export function getInstagramThumbnail(post: InstagramPost): string {
  if (post.thumbnail_url) return post.thumbnail_url
  // Fallback placeholder that matches theme
  return 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=800&fit=crop'
}
