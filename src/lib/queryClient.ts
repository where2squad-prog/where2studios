import { QueryClient } from '@tanstack/react-query'

// Shared across the app and reused during build time prerendering so the
// static HTML contains real data instead of empty loading states.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
