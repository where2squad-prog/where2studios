'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { KeepReading } from '@/components/layout/KeepReading'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-m3-surface-dark flex items-center justify-center px-4">
      <SEOHead
        title="Page Not Found on Where2Studios"
        description="This page does not exist. Head back to Where2Studios for event recap video production in the San Francisco Bay Area."
        robots="noindex, follow"
      />
      <main id="main-content" tabIndex={-1} className="outline-none w-full max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="text-8xl sm:text-9xl font-bold text-m3-primary mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-m3-on-dark mb-4">Page not found</h1>
        <p className="text-m3-on-dark/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="m3-filled-button inline-flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="m3-outlined-button text-m3-on-dark border-m3-on-dark/30 hover:bg-m3-on-dark/10 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
      <KeepReading className="mt-12 bg-transparent border-m3-on-dark/10" />
      </main>
    </div>
  )
}
