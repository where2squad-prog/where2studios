'use client'

import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, LogIn, AlertCircle } from 'lucide-react'
import logo from '@/assets/where2studios-logo.png'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, isLoading: authLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Get the page they were trying to access
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/social'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password')
      setIsLoading(false)
      return
    }

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError.message || 'Invalid credentials')
      setIsLoading(false)
      return
    }

    // Redirect to the page they were trying to access
    navigate(from, { replace: true })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-m3-surface-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-m3-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-m3-surface-dark flex flex-col">
      {/* Header */}
      <nav className="border-b border-m3-on-dark/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-4 group">
              <ArrowLeft className="w-5 h-5 text-m3-on-dark group-hover:text-m3-primary transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-10 sm:h-14 w-auto" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-m3-surface rounded-2xl p-8 border border-m3-outline shadow-xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-m3-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-7 h-7 text-m3-primary" />
              </div>
              <h1 className="font-fredoka text-2xl font-semibold text-m3-on-surface">
                Admin Login
              </h1>
              <p className="text-m3-on-surface/60 mt-2 text-sm">
                Sign in to access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-m3-secondary/10 text-m3-secondary text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-m3-on-surface mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-m3-surface-variant border-m3-outline"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-m3-on-surface mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-m3-surface-variant border-m3-outline"
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-m3-primary text-m3-on-primary hover:bg-m3-primary/90 h-11 font-semibold"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-m3-on-primary border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-m3-on-dark/40 text-xs mt-6">
            Only authorized administrators can access this area.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
