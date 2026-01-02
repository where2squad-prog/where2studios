'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, ArrowLeft } from 'lucide-react'
import logo from '@/assets/where2studios-logo.png'

const categories = [
  { id: 'all', label: 'All Work', emoji: '✨' },
  { id: 'restaurants', label: 'Restaurants', emoji: '🍽️' },
  { id: 'lifestyle', label: 'Lifestyle', emoji: '✨' },
  { id: 'events', label: 'Events', emoji: '🎉' },
  { id: 'personal', label: 'Personal Brands', emoji: '👤' }
]

const portfolioItems = [
  {
    id: 1,
    client: "Fine Dining Restaurant",
    category: "restaurants",
    views: "2.4M",
    thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop",
    results: "3x increase in weekend reservations",
    description: "Full content strategy and production for upscale dining experience."
  },
  {
    id: 2,
    client: "Local Taco Shop",
    category: "restaurants",
    views: "1.8M",
    thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=700&fit=crop",
    results: "45% increase in foot traffic",
    description: "Viral ASMR content series featuring signature dishes."
  },
  {
    id: 3,
    client: "Craft Brewery",
    category: "restaurants",
    views: "890K",
    thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=700&fit=crop",
    results: "Sold out taproom events",
    description: "Behind-the-scenes brewing content and event promotion."
  },
  {
    id: 4,
    client: "Brunch Spot",
    category: "restaurants",
    views: "1.2M",
    thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop",
    results: "2-hour wait times on weekends",
    description: "UGC-style content featuring signature pancake stacks."
  },
  {
    id: 5,
    client: "Fitness Studio",
    category: "lifestyle",
    views: "650K",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop",
    results: "200+ new member signups",
    description: "Transformation content and trainer spotlights."
  },
  {
    id: 6,
    client: "Boutique Hotel",
    category: "lifestyle",
    views: "920K",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=700&fit=crop",
    results: "85% booking increase",
    description: "Luxury experience content and influencer partnerships."
  },
  {
    id: 7,
    client: "Food Festival",
    category: "events",
    views: "1.5M",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=700&fit=crop",
    results: "Sold out in 48 hours",
    description: "Pre-event hype content and live coverage."
  },
  {
    id: 8,
    client: "Personal Chef",
    category: "personal",
    views: "780K",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=700&fit=crop",
    results: "Fully booked 3 months ahead",
    description: "Personal brand building and cooking tutorials."
  }
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  const activeCount = filteredItems.length

  return (
    <div className="min-h-screen bg-near-black">
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-near-black/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-28 border-b border-cream-highlight/10">
            <a href="/" className="flex items-center gap-2 sm:gap-4 group">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-cream-highlight/50 group-hover:text-cream-highlight transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-16 sm:h-32 w-auto" />
            </a>
            
            <a 
              href="/#contact" 
              className="inline-flex px-4 sm:px-6 py-2 sm:py-3 bg-golden-yellow text-near-black font-fredoka font-semibold text-sm sm:text-base rounded-full hover:bg-orange-accent transition-colors active:scale-95"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple style large typography */}
      <section className="pt-28 pb-6 sm:pt-44 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="font-fredoka text-4xl sm:text-7xl lg:text-8xl font-semibold text-cream-highlight tracking-tight leading-[0.9]">
              Our Work.
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/70 max-w-xl">
              Real results for real businesses. Content that converts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apple-style Category Pills - Horizontally scrollable on mobile */}
      <section className="sticky top-20 sm:top-28 z-40 py-3 sm:py-4 bg-near-black/90 backdrop-blur-xl border-b border-cream-highlight/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          {/* Scrollable container for mobile */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-cream-highlight text-near-black'
                      : 'bg-cream-highlight/10 text-cream-highlight hover:bg-cream-highlight/20 active:bg-cream-highlight/20'
                  }`}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span>{category.emoji}</span>
                    <span>{category.label}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Results count */}
          <motion.p 
            key={activeCount}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-3 text-xs sm:text-sm text-cream-highlight/40"
          >
            {activeCount} project{activeCount !== 1 ? 's' : ''}
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid - Optimized for mobile */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="relative aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-cream-highlight/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-golden-yellow/10">
                    <img
                      src={item.thumbnail}
                      alt={item.client}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    {/* Play button on hover - hidden on mobile */}
                    <div className="absolute inset-0 hidden sm:flex items-center justify-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 rounded-full bg-cream-highlight/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                      >
                        <Play className="w-6 h-6 text-near-black fill-near-black ml-0.5" />
                      </motion.div>
                    </div>
                    
                    {/* Views badge */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-near-black/70 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1">
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cream-highlight/70" />
                      <span className="text-cream-highlight text-[10px] sm:text-xs font-semibold">{item.views}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                      <p className="text-golden-yellow text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-2 line-clamp-1">
                        {item.results}
                      </p>
                      <h3 className="font-fredoka text-sm sm:text-xl font-semibold text-cream-highlight mb-0.5 sm:mb-1 line-clamp-1">
                        {item.client}
                      </h3>
                      <p className="text-white/60 text-[10px] sm:text-sm leading-relaxed line-clamp-2 hidden sm:block">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section - Minimal, Apple-style */}
      <section className="py-16 sm:py-32">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-cream-highlight tracking-tight">
              Ready to be next?
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/60 max-w-xl mx-auto">
              Let's talk about turning your content into customers.
            </p>
            <div className="mt-8 sm:mt-10">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-golden-yellow text-near-black font-fredoka font-semibold text-base sm:text-lg rounded-full hover:bg-orange-accent transition-all duration-300 hover:shadow-lg hover:shadow-golden-yellow/20 active:scale-95"
              >
                Book a Growth Audit
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 sm:py-8 border-t border-cream-highlight/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <img src={logo} alt="Where2Studios" className="h-10 sm:h-12 w-auto opacity-50" />
            <p className="text-cream-highlight/40 text-xs sm:text-sm">
              © 2025 Where2Studios. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
