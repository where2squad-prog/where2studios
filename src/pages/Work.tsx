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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-near-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24 sm:h-28 border-b border-cream-highlight/10">
            <a href="/" className="flex items-center gap-4 group">
              <ArrowLeft className="w-6 h-6 text-cream-highlight/50 group-hover:text-cream-highlight transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-24 sm:h-32 w-auto" />
            </a>
            
            <a 
              href="/#contact" 
              className="hidden sm:inline-flex px-6 py-3 bg-golden-yellow text-near-black font-fredoka font-semibold text-base rounded-full hover:bg-orange-accent transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple style large typography */}
      <section className="pt-36 pb-8 sm:pt-44 sm:pb-12">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="font-fredoka text-5xl sm:text-7xl lg:text-8xl font-semibold text-cream-highlight tracking-tight leading-[0.9]">
              Our Work.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl">
              Real results for real businesses. Content that converts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apple-style Category Pills - Centered, clean */}
      <section className="sticky top-16 z-40 py-4 bg-near-black/80 backdrop-blur-xl border-b border-cream-highlight/5">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-cream-highlight text-near-black'
                    : 'bg-cream-highlight/10 text-cream-highlight hover:bg-cream-highlight/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{category.emoji}</span>
                  <span>{category.label}</span>
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Results count */}
          <motion.p 
            key={activeCount}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-sm text-cream-highlight/40"
          >
            {activeCount} project{activeCount !== 1 ? 's' : ''}
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid - Cleaner, more spacious */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-cream-highlight/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-golden-yellow/10">
                    <img
                      src={item.thumbnail}
                      alt={item.client}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    {/* Play button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 rounded-full bg-cream-highlight/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                      >
                        <Play className="w-6 h-6 text-near-black fill-near-black ml-0.5" />
                      </motion.div>
                    </div>
                    
                    {/* Views badge */}
                    <div className="absolute top-4 right-4 bg-near-black/70 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-cream-highlight/70" />
                      <span className="text-cream-highlight text-xs font-semibold">{item.views}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-golden-yellow text-xs font-semibold uppercase tracking-wider mb-2">
                        {item.results}
                      </p>
                      <h3 className="font-fredoka text-xl font-semibold text-cream-highlight mb-1">
                        {item.client}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
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
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream-highlight tracking-tight">
              Ready to be next?
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl mx-auto">
              Let's talk about turning your content into customers.
            </p>
            <div className="mt-10">
              <a
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-golden-yellow text-near-black font-fredoka font-semibold text-lg rounded-full hover:bg-orange-accent transition-all duration-300 hover:shadow-lg hover:shadow-golden-yellow/20"
              >
                Book a Growth Audit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-cream-highlight/5">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <img src={logo} alt="Where2Studios" className="h-8 w-auto opacity-50" />
            <p className="text-cream-highlight/40 text-sm">
              © 2025 Where2Studios. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
