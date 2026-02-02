'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Play, Image } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/where2studios-logo.png'
import { FloatingCTA } from '@/components/FloatingCTA'
import { Footer } from '@/components/Footer'

const workCategories = [
  {
    id: 'social-media',
    title: 'Social Media',
    subtitle: 'Vertical content for TikTok, Reels & Shorts',
    description: 'Scroll-stopping vertical videos optimized for social platforms.',
    icon: Image,
    href: '/work/social-media',
    aspectRatio: '9:16',
    gradient: 'from-m3-primary/20 to-m3-secondary/10',
  },
  {
    id: 'productions',
    title: 'Productions',
    subtitle: 'Horizontal content for YouTube & Web',
    description: 'Professional productions for corporate, events, weddings, and commercials.',
    icon: Play,
    href: '/work/productions',
    aspectRatio: '16:9',
    gradient: 'from-m3-secondary/20 to-m3-primary/10',
  },
]

export default function WorkPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      {/* Top App Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-m3-surface-dark/90 backdrop-blur-xl">
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
      <section className="pt-28 pb-8 sm:pt-44 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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

      {/* Category Cards */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {workCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={category.href}
                  className={`group block p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${category.gradient} 
                             border border-m3-on-dark/10 hover:border-m3-primary/40 
                             transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-m3-primary/20 flex items-center justify-center">
                      <category.icon className="w-7 h-7 text-m3-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-m3-primary uppercase tracking-wider">
                        {category.aspectRatio} Aspect Ratio
                      </span>
                      <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark mt-1">
                        {category.title}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-m3-on-dark/90 font-medium mb-2">
                    {category.subtitle}
                  </p>
                  <p className="text-m3-on-dark/60 text-sm mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-m3-primary font-semibold group-hover:gap-3 transition-all">
                    View Projects
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
