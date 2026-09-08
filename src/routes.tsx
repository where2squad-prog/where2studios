import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import { AdminRoute } from './components/auth/AdminRoute'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import EventRecapVideosPage from './pages/EventRecapVideosPage'
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
import { getPublishedCaseStudyPaths } from './lib/prerenderData'

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'event-recap-videos', element: <EventRecapVideosPage /> },
      { path: 'work', element: <WorkPage /> },
      {
        path: 'work/:slug',
        element: <CaseStudyPage />,
        getStaticPaths: getPublishedCaseStudyPaths,
      },
      { path: 'services', element: <ServicesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'who-we-are', element: <TeamPage /> },
      { path: 'socials', element: <SocialsPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'where2boys', element: <Where2BoysPage /> },
      { path: 'accessibility', element: <AccessibilityPage /> },
      { path: 'admin/login', element: <AdminLoginPage /> },
      {
        path: 'admin/social',
        element: (
          <AdminRoute>
            <SocialAdminPage />
          </AdminRoute>
        ),
      },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
