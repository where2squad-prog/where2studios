import { QueryClient } from '@tanstack/react-query'

// Shared across the app and reused during build time prerendering so the
// static HTML contains real data instead of empty loading states.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // The prerendered cache is handed to the client, so the first render
      // matches the static HTML instead of a loading state. A short stale time
      // stops an instant refetch from swapping content under the user.
      staleTime: 60_000,
    },
  },
})
