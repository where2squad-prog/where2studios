import { ViteReactSSG } from 'vite-react-ssg'
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

export const createRoot = ViteReactSSG({ routes }, async ({ isClient, routePath }) => {
  if (!isClient) {
    await prefetchForRoute(queryClient, routePath ?? '/')
  }
})
