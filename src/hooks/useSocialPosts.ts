import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface SocialClient {
  id: string
  name: string
  ig_handle: string
  created_at: string
}

export interface SocialPost {
  id: string
  client_id: string
  permalink: string
  title: string | null
  thumbnail_url: string | null
  pinned: boolean
  excluded: boolean
  created_at: string
  updated_at: string
}

export interface SocialPostWithClient extends SocialPost {
  client: SocialClient
}

// Fetch all social clients
export function useSocialClients() {
  return useQuery({
    queryKey: ['social-clients'],
    queryFn: async (): Promise<SocialClient[]> => {
      const { data, error } = await supabase
        .from('social_clients')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      return data || []
    },
  })
}

// Fetch social posts (public - excludes excluded posts)
export function useSocialPosts(limit?: number, clientId?: string) {
  return useQuery({
    queryKey: ['social-posts', limit, clientId],
    queryFn: async (): Promise<SocialPostWithClient[]> => {
      let query = supabase
        .from('social_posts')
        .select('*')
        .eq('excluded', false)
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (clientId) {
        query = query.eq('client_id', clientId)
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data: posts, error: postsError } = await query

      if (postsError) throw postsError
      if (!posts || posts.length === 0) return []

      // Fetch clients
      const clientIds = [...new Set(posts.map(p => p.client_id))]
      const { data: clients, error: clientsError } = await supabase
        .from('social_clients')
        .select('*')
        .in('id', clientIds)

      if (clientsError) throw clientsError

      const clientMap = new Map((clients || []).map(c => [c.id, c]))

      return posts
        .map(post => {
          const client = clientMap.get(post.client_id)
          if (!client) return null
          return { ...post, client } as SocialPostWithClient
        })
        .filter((p): p is SocialPostWithClient => p !== null)
    },
  })
}

// Fetch ALL social posts for admin (includes excluded)
export function useAdminSocialPosts() {
  return useQuery({
    queryKey: ['admin-social-posts'],
    queryFn: async (): Promise<SocialPostWithClient[]> => {
      const { data: posts, error: postsError } = await supabase
        .from('social_posts')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (postsError) throw postsError
      if (!posts || posts.length === 0) return []

      const clientIds = [...new Set(posts.map(p => p.client_id))]
      const { data: clients, error: clientsError } = await supabase
        .from('social_clients')
        .select('*')
        .in('id', clientIds)

      if (clientsError) throw clientsError

      const clientMap = new Map((clients || []).map(c => [c.id, c]))

      return posts
        .map(post => {
          const client = clientMap.get(post.client_id)
          if (!client) return null
          return { ...post, client } as SocialPostWithClient
        })
        .filter((p): p is SocialPostWithClient => p !== null)
    },
  })
}

// Create social post
export function useCreateSocialPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: {
      client_id: string
      permalink: string
      title?: string
      thumbnail_url?: string
      pinned?: boolean
      excluded?: boolean
    }) => {
      const { data, error } = await supabase
        .from('social_posts')
        .insert(post)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin-social-posts'] })
    },
  })
}

// Update social post
export function useUpdateSocialPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SocialPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('social_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin-social-posts'] })
    },
  })
}

// Delete social post
export function useDeleteSocialPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('social_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin-social-posts'] })
    },
  })
}

// Helper to get thumbnail with fallback
export function getSocialThumbnail(post: SocialPost): string {
  if (post.thumbnail_url) return post.thumbnail_url
  return 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=800&fit=crop'
}
