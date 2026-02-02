import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface Testimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  quote: string
  headshot_url: string | null
  published: boolean
  display_order: number
  created_at: string
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      return data as Testimonial[]
    },
  })
}
