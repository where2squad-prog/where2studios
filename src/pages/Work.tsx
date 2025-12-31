'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Eye, ArrowLeft, Filter } from 'lucide-react'
import logo from '@/assets/where2studios-logo.png'

const categories = ['All', 'Restaurants', 'Lifestyle', 'Events', 'Personal Brands']

const portfolioItems = [
  {
    id: 1,
    client: "Fine Dining Restaurant",
    category: "Restaurants",
    views: "2.4M",
    thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop",
    results: "3x increase in weekend reservations",
    description: "Full content strategy and production for upscale dining experience."
  },
  {
    id: 2,
    client: "Local Taco Shop",
    category: "Restaurants",
    views: "1.8M",
    thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=700&fit=crop",
    results: "45% increase in foot traffic",
    description: "Viral ASMR content series featuring signature dishes."
  },
  {
    id: 3,
    client: "Craft Brewery",
    category: "Restaurants",
    views: "890K",
    thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=700&fit=crop",
    results: "Sold out taproom events",
    description: "Behind-the-scenes brewing content and event promotion."
  },
  {
    id: 4,
    client: "Brunch Spot",
    category: "Restaurants",
    views: "1.2M",
    thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop",
    results: "2-hour wait times on weekends",
    description: "UGC-style content featuring signature pancake stacks."
  },
  {
    id: 5,
    client: "Fitness Studio",
    category: "Lifestyle",
    views: "650K",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop",
    results: "200+ new member signups",
    description: "Transformation content and trainer spotlights."
  },
  {
    id: 6,
    client: "Boutique Hotel",
    category: "Lifestyle",
    views: "920K",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=700&fit=crop",
    results: "85% booking increase",
    description: "Luxury experience content and influencer partnerships."
  },
  {
    id: 7,
    client: "Food Festival",
    category: "Events",
    views: "1.5M",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=700&fit=crop",
    results: "Sold out in 48 hours",
    description: "Pre-event hype content and live coverage."
  },
  {
    id: 8,
    client: "Personal Chef",
    category: "Personal Brands",
    views: "780K",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=700&fit=crop",
    results: "Fully booked 3 months ahead",
    description: "Personal brand building and cooking tutorials."
  }
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-near-black/90 backdrop-blur-xl border-b border-cream-highlight/10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="Where2Studios" className="h-12 w-auto" />
            </a>
            
            <a 
              href="/" 
              className="flex items-center gap-2 text-cream-highlight/70 hover:text-cream-highlight transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 bg-near-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-fredoka text-5xl sm:text-6xl lg:text-7xl font-semibold text-cream-highlight mb-6">
              Our Work
            </h1>
            <p className="text-xl text-cream-highlight/70 max-w-2xl mx-auto">
              Real results for real businesses. Here's what we've built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-near-black border-b border-cream-highlight/10 sticky top-20 z-40">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-cream-highlight/50 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-golden-yellow text-near-black'
                    : 'bg-cream-highlight/10 text-cream-highlight/70 hover:bg-cream-highlight/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted border border-border hover:border-golden-yellow/30 transition-all duration-300">
                  <img
                    src={item.thumbnail}
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/30 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-golden-yellow/90 flex items-center justify-center">
                      <Play className="w-7 h-7 text-near-black fill-near-black ml-1" />
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-near-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-golden-yellow" />
                    <span className="text-cream-highlight text-sm font-semibold">{item.views}</span>
                  </div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 bg-golden-yellow/20 text-golden-yellow text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-fredoka text-lg font-semibold text-cream-highlight mb-1">
                      {item.client}
                    </h3>
                    <p className="text-cream-highlight/70 text-sm mb-2">{item.description}</p>
                    <p className="text-golden-yellow text-sm font-semibold">{item.results}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-near-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-fredoka text-4xl sm:text-5xl font-semibold text-cream-highlight mb-6">
              Ready to See Your Business Here?
            </h2>
            <p className="text-xl text-cream-highlight/70 max-w-2xl mx-auto mb-8">
              Let's talk about how we can turn your content into customers.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-golden-yellow text-near-black font-fredoka font-semibold text-lg rounded-full hover:bg-orange-accent transition-colors duration-300"
            >
              Book a Growth Audit
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-near-black border-t border-cream-highlight/10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-cream-highlight/50 text-sm">
            © 2025 Where2Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
