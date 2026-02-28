// App entry point with providers
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AuthProvider } from './hooks/useAuth'
import { AdminRoute } from './components/auth/AdminRoute'
import { BookingSheetProvider } from './contexts/BookingSheetContext'
import { BookingFormSheet } from './components/booking/BookingFormSheet'
import { CookieConsent } from './components/CookieConsent'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'
import ServicesPage from './pages/ServicesPage'
import SocialMediaWorkPage from './pages/SocialMediaWorkPage'
import ProductionsWorkPage from './pages/ProductionsWorkPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import StartupsPage from './pages/StartupsPage'
import LaunchVideosPage from './pages/services/LaunchVideosPage'
import PodcastsPage from './pages/services/PodcastsPage'
import EventsPage from './pages/services/EventsPage'
import NotFoundPage from './pages/NotFoundPage'
import SocialAdminPage from './pages/admin/SocialAdminPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BookingSheetProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/:slug" element={<CaseStudyPage />} />
                <Route path="/work/social-media" element={<SocialMediaWorkPage />} />
                <Route path="/work/productions" element={<ProductionsWorkPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/launch-videos" element={<LaunchVideosPage />} />
                <Route path="/services/podcasts" element={<PodcastsPage />} />
                <Route path="/services/event-recaps" element={<EventsPage />} />
                <Route path="/startups" element={<StartupsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/who-we-are" element={<TeamPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
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
              <CookieConsent />
            </BrowserRouter>
          </BookingSheetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
