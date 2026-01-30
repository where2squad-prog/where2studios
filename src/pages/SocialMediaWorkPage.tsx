'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '@/assets/where2studios-logo.png'
import { useProjects } from '@/hooks/useProjects'
import { ProjectGrid } from '@/components/ProjectGrid'
import { FloatingCTA } from '@/components/FloatingCTA'
import { Footer } from '@/components/Footer'

export default function SocialMediaWorkPage() {
  const { data: projects, isLoading } = useProjects({ category: 'social-media' })

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      {/* Top App Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-28 border-b border-m3-on-dark/10">
            <Link to="/" className="flex items-center gap-2 sm:gap-4 group">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-m3-on-dark group-hover:text-m3-primary transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-14 sm:h-20 w-auto" />
            </Link>
            <Link to="/contact" className="m3-filled-button text-sm sm:text-base">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-6 sm:pt-44 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-m3-secondary/20 text-m3-secondary text-sm font-semibold mb-4">
              Social Media
            </span>
            <h1 className="font-fredoka text-4xl sm:text-7xl lg:text-8xl font-semibold text-m3-on-dark tracking-tight">
              Social Media Work
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-m3-on-dark/70 max-w-xl">
              Reels, posts, and campaigns built for growth and engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Count */}
      <section className="py-3 sm:py-4 border-b border-m3-on-dark/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <p className="text-center text-xs sm:text-sm text-m3-on-dark/70">
            {projects?.length || 0} project{projects?.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <ProjectGrid projects={projects || []} isLoading={isLoading} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-32 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface">
            Ready to grow your social presence?
          </h2>
          <p className="mt-4 text-m3-on-surface/60">
            Let's create content that builds your community and drives results.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="m3-filled-button inline-flex items-center gap-2 text-lg">
              Book a Discovery Call
            </Link>
            <Link to="/work/productions" className="m3-outlined-button inline-flex items-center gap-2">
              View Productions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
