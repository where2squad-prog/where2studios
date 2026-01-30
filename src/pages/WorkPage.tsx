'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '@/assets/where2studios-logo.png'
import { useProjects, useProjectCategories } from '@/hooks/useProjects'
import { ProjectGrid } from '@/components/ProjectGrid'
import { FloatingCTA } from '@/components/FloatingCTA'
import { Footer } from '@/components/Footer'

const categoryLabels: Record<string, string> = {
  all: 'All Work',
  restaurants: 'Restaurants',
  corporate: 'Corporate',
  events: 'Events',
  weddings: 'Weddings',
  'social-media': 'Social Media',
  commercials: 'Commercials',
  lifestyle: 'Lifestyle',
  personal: 'Personal Brands',
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { data: projects, isLoading } = useProjects({ category: activeCategory === 'all' ? undefined : activeCategory })
  const { data: categories } = useProjectCategories()

  const allCategories = ['all', ...(categories || [])]

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
            <h1 className="font-fredoka text-4xl sm:text-7xl lg:text-8xl font-semibold text-m3-on-dark tracking-tight">
              Our Work.
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-m3-on-dark/70 max-w-xl">
              Real results for real businesses. Content that converts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Chips */}
      <section className="sticky top-20 sm:top-28 z-40 py-3 sm:py-4 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`m3-filter-chip ${
                    activeCategory === cat ? 'm3-filter-chip-active' : 'm3-filter-chip-inactive'
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center mt-3 text-xs sm:text-sm text-m3-on-dark/70">
            {projects?.length || 0} project{projects?.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}>
              <ProjectGrid projects={projects || []} isLoading={isLoading} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-32 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface">
            Ready to be next?
          </h2>
          <p className="mt-4 text-m3-on-surface/60">
            Let's talk about turning your content into customers.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="m3-filled-button inline-flex items-center gap-2 text-lg">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
