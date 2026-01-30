import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-m3-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-m3-on-dark/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login, preserving the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (!isAdmin) {
    // User is logged in but not an admin
    return (
      <div className="min-h-screen bg-m3-surface-dark flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-m3-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-m3-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-fredoka text-2xl font-semibold text-m3-on-dark mb-2">Access Denied</h1>
          <p className="text-m3-on-dark/60 mb-6">
            You don't have admin permissions to access this page.
          </p>
          <a href="/" className="m3-filled-button inline-block">
            Go to Homepage
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
