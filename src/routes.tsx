import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import { AdminRoute } from './components/auth/AdminRoute'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import EventRecapVideosPage from './pages/EventRecapVideosPage'
import SFTechWeekPage from './pages/SFTechWeekPage'
import CaseStudyPage from './pages/CaseStudyPage'
import ServicesPage from './pages/ServicesPage'
import WhyDedicatedCrewPage from './pages/WhyDedicatedCrewPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import NotFoundPage from './pages/NotFoundPage'
import SocialAdminPage from './pages/admin/SocialAdminPage'
import PortfolioAdminPage from './pages/admin/PortfolioAdminPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import Where2BoysPage from './pages/Where2BoysPage'
import AccessibilityPage from './pages/AccessibilityPage'
import SocialsPage from './pages/SocialsPage'
import ConventionsPage from './pages/ConventionsPage'
import ConventionPage, { getConventionStaticPaths } from './pages/ConventionPage'
import { getPublishedCaseStudyPaths } from './lib/prerenderData'

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'event-recap-videos', element: <EventRecapVideosPage /> },
      { path: 'sf-tech-week', element: <SFTechWeekPage /> },
      { path: 'work', element: <WorkPage /> },
      {
        path: 'work/:slug',
        element: <CaseStudyPage />,
        getStaticPaths: getPublishedCaseStudyPaths,
      },
      { path: 'conventions', element: <ConventionsPage /> },
      {
        path: 'conventions/:slug',
        element: <ConventionPage />,
        getStaticPaths: getConventionStaticPaths,
      },
      { path: 'services', element: <ServicesPage /> },
      { path: 'why-a-dedicated-crew', element: <WhyDedicatedCrewPage /> },
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
      {
        path: 'admin/portfolio',
        element: (
          <AdminRoute>
            <PortfolioAdminPage />
          </AdminRoute>
        ),
      },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
