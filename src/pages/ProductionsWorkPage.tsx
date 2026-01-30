'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/where2studios-logo.png'
import { useProjects } from '@/hooks/useProjects'
import { ProjectGrid } from '@/components/ProjectGrid'
import { FloatingCTA } from '@/components/FloatingCTA'
import { Footer } from '@/components/Footer'

const PRODUCTION_CATEGORIES = ['corporate', 'events', 'weddings', 'commercials']
const FILTER_LABELS: Record<string, string> = {
  all: 'All',
  corporate: 'Corporate',
  events: 'Events',
  weddings: 'Weddings',
  commercials: 'Commercials',
}

export default function ProductionsWorkPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const { data: allProjects, isLoading } = useProjects()

  // Filter projects that belong to production categories
  const productionProjects = useMemo(() => {
    if (!allProjects) return []
    return allProjects.filter(p => PRODUCTION_CATEGORIES.includes(p.category))
  }, [allProjects])

  // Apply category filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return productionProjects
    }
    return productionProjects.filter(p => p.category === activeFilter)
  }, [productionProjects, activeFilter])

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      {/* Top App Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-28 border-b border-m3-on-dark/10">
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="p-2 -ml-2 hover:bg-m3-on-dark/10 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-m3-on-dark" />
              </button>
              <Link to="/">
                <img src={logo} alt="Where2Studios" className="h-14 sm:h-20 w-auto" />
              </Link>
            </div>
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
            <span className="inline-block px-4 py-2 rounded-full bg-m3-primary/20 text-m3-primary text-sm font-semibold mb-4">
              Productions
            </span>
            <h1 className="font-fredoka text-4xl sm:text-7xl lg:text-8xl font-semibold text-m3-on-dark tracking-tight">
              Productions
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-m3-on-dark/70 max-w-xl">
              Corporate videos, events, weddings, and commercials. Premium quality for every occasion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Chips */}
      <section className="sticky top-20 sm:top-28 z-40 py-3 sm:py-4 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
              {['all', ...PRODUCTION_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${activeFilter === cat 
                      ? 'bg-m3-primary/20 text-m3-on-dark border border-m3-primary/40' 
                      : 'bg-m3-on-dark/5 text-m3-on-dark/90 border border-m3-on-dark/20 hover:bg-m3-on-dark/10'
                    }`}
                >
                  {FILTER_LABELS[cat] || cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center mt-3 text-xs sm:text-sm text-m3-on-dark/70">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}>
              <ProjectGrid projects={filteredProjects} isLoading={isLoading} aspectRatio="horizontal" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-32 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface">
            Ready to create something amazing?
          </h2>
          <p className="mt-4 text-m3-on-surface/60">
            Let's bring your vision to life with premium video production.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="m3-filled-button inline-flex items-center gap-2 text-lg">
              Book a Discovery Call
            </Link>
            <Link to="/work/social-media" className="m3-outlined-button inline-flex items-center gap-2">
              View Social Media
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
