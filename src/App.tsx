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
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import NotFoundPage from './pages/NotFoundPage'
import SocialAdminPage from './pages/admin/SocialAdminPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import Where2BoysPage from './pages/Where2BoysPage'
import AccessibilityPage from './pages/AccessibilityPage'
import SocialsPage from './pages/SocialsPage'

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
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/who-we-are" element={<TeamPage />} />
                <Route path="/socials" element={<SocialsPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/where2boys" element={<Where2BoysPage />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
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
