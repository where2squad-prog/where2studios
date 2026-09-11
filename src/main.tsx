import { ViteReactSSG } from 'vite-react-ssg'
import { dehydrate, hydrate } from '@tanstack/react-query'
import { routes } from './routes'
import { queryClient } from './lib/queryClient'
import { prefetchForRoute } from './lib/prerenderData'
import './index.css'

// Admin screens are private, so they never get a static HTML file.
const EXCLUDED_PREFIXES = ['/admin']

export const includedRoutes = (paths: string[]) =>
  paths.filter((route) => {
    const normalized = route.startsWith('/') ? route : `/${route}`
    if (normalized.includes(':') || normalized.includes('*')) return false
    return !EXCLUDED_PREFIXES.some(
      (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
    )
  })

export const createRoot = ViteReactSSG(
  { routes },
  async ({ isClient, routePath, initialState }) => {
    if (!isClient) {
      const route = routePath ?? '/'
      await prefetchForRoute(queryClient, route)
      // The build renders several routes at once against one cache, so a page
      // only ships the case study it is actually about.
      const slug = route.match(/^\/work\/(.+)$/)?.[1]
      initialState.reactQuery = dehydrate(queryClient, {
        shouldDehydrateQuery: (query) =>
          query.queryKey[0] === 'case-study' ? query.queryKey[1] === slug : true,
      })
      return

    }

    // The data that produced the static HTML, so the first client render is
    // identical and hydration does not throw the whole page away.
    if (initialState.reactQuery) {
      hydrate(queryClient, initialState.reactQuery)
    }
  },
)
