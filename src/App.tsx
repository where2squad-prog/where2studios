import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AuthProvider } from './hooks/useAuth'
import { AdminRoute } from './components/auth/AdminRoute'
import { BookingSheetProvider } from './contexts/BookingSheetContext'
import { BookingFormSheet } from './components/booking/BookingFormSheet'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import SocialMediaWorkPage from './pages/SocialMediaWorkPage'
import ProductionsWorkPage from './pages/ProductionsWorkPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import CorporatePage from './pages/services/CorporatePage'
import EventsPage from './pages/services/EventsPage'
import WeddingsPage from './pages/services/WeddingsPage'
import SocialMediaPage from './pages/services/SocialMediaPage'
import CommercialsPage from './pages/services/CommercialsPage'
import NotFoundPage from './pages/NotFoundPage'
import SocialAdminPage from './pages/admin/SocialAdminPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookingSheetProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/social-media" element={<SocialMediaWorkPage />} />
              <Route path="/work/productions" element={<ProductionsWorkPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/weddings" element={<WeddingsPage />} />
              <Route path="/social-media" element={<SocialMediaPage />} />
              <Route path="/commercials" element={<CommercialsPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/social"
                element={
                  <AdminRoute>
                    <SocialAdminPage />
                  </AdminRoute>
                }
              />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <BookingFormSheet />
          </BrowserRouter>
        </BookingSheetProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
