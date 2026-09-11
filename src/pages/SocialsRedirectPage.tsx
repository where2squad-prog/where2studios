'use client'

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { SEOHead } from '@/components/SEOHead'

const TARGET = '/backyard-bayou-socials'

/** Old /socials URL. Keeps people and crawlers moving to the new landing page. */
export default function SocialsRedirectPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(TARGET, { replace: true })
  }, [navigate])

  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background flex items-center justify-center px-6">
      <SEOHead
        title="Social Media Marketing in Union City, CA | Where2Socials"
        description="This page moved. Social media marketing and management for Union City and Union Landing businesses is now at /backyard-bayou-socials."
        canonical={TARGET}
        robots="noindex, follow"
      />
      <Helmet>
        <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      </Helmet>
      <p className="text-center text-m3-on-background/70">
        This page moved.{' '}
        <Link to={TARGET} className="underline hover:text-m3-primary">
          Go to Where2Socials
        </Link>
      </p>
    </div>
  )
}
