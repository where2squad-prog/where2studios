'use client'

import { motion } from 'framer-motion'
import { Play, Eye, Heart } from 'lucide-react'
import { useRef } from 'react'

export function FeaturedWins() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const featuredWork = [
    {
      id: 1,
      client: "Fine Dining",
      views: "2.4M",
      likes: "184K",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop",
      type: "reel",
      whyItWorked: "Hook in 0.5s. Chef authenticity. Peak posting time."
    },
    {
      id: 2,
      client: "Taco Shop",
      views: "1.8M",
      likes: "156K",
      thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=600&fit=crop",
      type: "reel",
      whyItWorked: "ASMR audio hook. POV format. Influencer shares."
    },
    {
      id: 3,
      client: "Craft Brewery",
      views: "890K",
      likes: "72K",
      thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=600&fit=crop",
      type: "reel",
      whyItWorked: "Satisfying pour shot. Personality feature. Event timing."
    },
    {
      id: 4,
      client: "Brunch Spot",
      views: "1.2M",
      likes: "98K",
      thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop",
      type: "reel",
      whyItWorked: "Food reveal hook. UGC style. Creator collab."
    },
    {
      id: 5,
      client: "Sushi Bar",
      views: "3.1M",
      likes: "245K",
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=600&fit=crop",
      type: "reel",
      whyItWorked: "Knife skills ASMR. Clean aesthetic. Trending audio."
    },
    {
      id: 6,
      client: "Coffee Roasters",
      likes: "38.7K",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      type: "photo",
      whyItWorked: "Steam movement. Warm palette. Morning posting."
    },
    {
      id: 7,
      client: "Wine Bar",
      likes: "52.1K",
      thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
      type: "photo",
      whyItWorked: "Lifestyle framing. Moody lighting. Weekend timing."
    }
  ]

  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-near-black mb-3"
          >
            Real Results
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-near-black/70"
          >
            Hover to see why it worked.
          </motion.p>
        </div>

        {/* Horizontal Scroll Feed */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredWork.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-start"
            >
              {/* Compact Card */}
              <div className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-md ${
                item.type === 'reel' ? 'w-[160px] aspect-[9/14]' : 'w-[180px] aspect-square'
              }`}>
                <img
                  src={item.thumbnail}
                  alt={item.client}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/20 to-transparent" />
                
                {/* Play icon for reels */}
                {item.type === 'reel' && (
                  <div className="absolute top-2 left-2">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
                
                {/* Stats Badge */}
                <div className="absolute top-2 right-2 bg-near-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
                  {item.views ? (
                    <>
                      <Eye className="w-3 h-3 text-white" />
                      <span className="text-white text-[10px] font-semibold">{item.views}</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3 h-3 text-white" />
                      <span className="text-white text-[10px] font-semibold">{item.likes}</span>
                    </>
                  )}
                </div>
                
                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white text-xs font-semibold truncate">{item.client}</p>
                  {item.likes && item.views && (
                    <p className="text-white/70 text-[10px]">{item.likes} likes</p>
                  )}
                </div>
                
                {/* Why It Worked - Hover */}
                <div className="absolute inset-0 bg-near-black/90 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center">
                  <p className="text-golden-yellow text-[10px] font-semibold uppercase tracking-wide mb-2">Why it worked</p>
                  <p className="text-white text-xs leading-relaxed">{item.whyItWorked}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-golden-yellow text-near-black font-fredoka font-semibold text-sm rounded-full hover:bg-orange-accent transition-colors"
          >
            See All Work
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
