'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, ArrowLeft } from 'lucide-react'
import logo from '@/assets/where2studios-logo.png'
import { FloatingCTA } from '@/components/FloatingCTA'

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'events', label: 'Events' },
  { id: 'personal', label: 'Personal Brands' }
]

const portfolioItems = [
  { id: 1, client: "Fine Dining Restaurant", category: "restaurants", views: "2.4M", thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop", results: "3x increase in weekend reservations", description: "Full content strategy and production." },
  { id: 2, client: "Local Taco Shop", category: "restaurants", views: "1.8M", thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=700&fit=crop", results: "45% increase in foot traffic", description: "Viral ASMR content series." },
  { id: 3, client: "Craft Brewery", category: "restaurants", views: "890K", thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=700&fit=crop", results: "Sold out taproom events", description: "Behind-the-scenes content." },
  { id: 4, client: "Brunch Spot", category: "restaurants", views: "1.2M", thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop", results: "2-hour wait times", description: "UGC-style content." },
  { id: 5, client: "Fitness Studio", category: "lifestyle", views: "650K", thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop", results: "200+ new member signups", description: "Transformation content." },
  { id: 6, client: "Boutique Hotel", category: "lifestyle", views: "920K", thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=700&fit=crop", results: "85% booking increase", description: "Luxury experience content." },
  { id: 7, client: "Food Festival", category: "events", views: "1.5M", thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=700&fit=crop", results: "Sold out in 48 hours", description: "Pre-event hype content." },
  { id: 8, client: "Personal Chef", category: "personal", views: "780K", thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=700&fit=crop", results: "Fully booked 3 months ahead", description: "Personal brand building." }
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filteredItems = activeCategory === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      {/* M3 Top App Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-28 border-b border-m3-on-dark/10">
            <a href="/" className="flex items-center gap-2 sm:gap-4 group">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-m3-on-dark group-hover:text-m3-primary transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-16 sm:h-32 w-auto" />
            </a>
            <a href="/#contact" className="m3-filled-button text-sm sm:text-base">
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-6 sm:pt-44 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
            <h1 className="font-fredoka text-4xl sm:text-7xl lg:text-8xl font-semibold text-m3-on-dark tracking-tight">Our Work.</h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-m3-on-dark/70 max-w-xl">Real results for real businesses. Content that converts.</p>
          </motion.div>
        </div>
      </section>

      {/* M3 Filter Chips */}
      <section className="sticky top-20 sm:top-28 z-40 py-3 sm:py-4 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`m3-filter-chip ${activeCategory === category.id ? 'm3-filter-chip-active' : 'm3-filter-chip-inactive'}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center mt-3 text-xs sm:text-sm text-m3-on-dark/70">{filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      {/* Portfolio Grid - M3 Elevated Cards */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredItems.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="group cursor-pointer active:scale-95 transition-transform">
                  <div className="m3-elevated-card overflow-hidden aspect-[9/16]">
                    <div className="relative w-full h-full">
                      <img src={item.thumbnail} alt={item.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark via-m3-surface-dark/20 to-transparent opacity-80" />
                      <div className="absolute inset-0 hidden sm:flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-m3-surface flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                          <Play className="w-6 h-6 text-m3-on-surface fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-m3-surface-dark/70 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-m3-on-dark/70" />
                        <span className="text-m3-on-dark text-[10px] sm:text-xs font-semibold">{item.views}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                        <p className="text-m3-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">{item.results}</p>
                        <h3 className="font-fredoka text-sm sm:text-xl font-semibold text-m3-on-dark">{item.client}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA - M3 Surface Variant */}
      <section className="py-16 sm:py-32 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface">Ready to be next?</h2>
          <p className="mt-4 text-m3-on-surface/60">Let's talk about turning your content into customers.</p>
          <div className="mt-8">
            <a href="/#contact" className="m3-filled-button inline-flex items-center gap-2 text-lg">Book a Call</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-m3-on-dark/5 bg-m3-surface-dark">
        <div className="container mx-auto px-4 text-center">
          <a href="/" className="inline-block"><img src={logo} alt="Where2Studios" className="h-20 w-auto opacity-70 hover:opacity-100 transition-opacity mx-auto" /></a>
          <p className="text-m3-on-dark/40 text-xs mt-4">© 2025 Where2Studios. All rights reserved.</p>
        </div>
      </footer>

      <FloatingCTA showHomeButton />
    </div>
  )
}
