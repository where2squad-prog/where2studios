// Root layout: providers shared by every route. Rendered by src/routes.tsx.
import { Outlet } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AuthProvider } from './hooks/useAuth'
import { BookingSheetProvider } from './contexts/BookingSheetContext'
import { BookingFormSheet } from './components/booking/BookingFormSheet'
import { CookieConsent } from './components/CookieConsent'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/queryClient'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookingSheetProvider>
          <ScrollToTop />
          <Outlet />
          <BookingFormSheet />
          <CookieConsent />
          <Toaster />
        </BookingSheetProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
