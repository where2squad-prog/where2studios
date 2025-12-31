'use client'

import { motion } from 'framer-motion'
import { Play, Eye, Heart, Share2 } from 'lucide-react'

export function FeaturedWins() {
  const featuredVideos = [
    {
      id: 1,
      client: "Fine Dining Restaurant",
      industry: "Restaurant",
      views: "2.4M",
      engagement: "15%",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop",
      whyItWorked: [
        "Hook in first 0.5 seconds with plating shot",
        "Behind-the-scenes chef authenticity",
        "Posted during peak dinner decision time"
      ]
    },
    {
      id: 2,
      client: "Local Taco Shop",
      industry: "Quick Service",
      views: "1.8M",
      engagement: "22%",
      thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=700&fit=crop",
      whyItWorked: [
        "ASMR sizzle audio hook",
        "POV ordering experience format",
        "Shared by local food influencers"
      ]
    },
    {
      id: 3,
      client: "Craft Brewery",
      industry: "Beverage",
      views: "890K",
      engagement: "18%",
      thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=700&fit=crop",
      whyItWorked: [
        "Satisfying pour shot opening",
        "Brewer personality feature",
        "Timed with local event weekend"
      ]
    },
    {
      id: 4,
      client: "Brunch Spot",
      industry: "Cafe",
      views: "1.2M",
      engagement: "25%",
      thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop",
      whyItWorked: [
        "Pancake stack reveal hook",
        "UGC-style authentic filming",
        "Collaborated with lifestyle creator"
      ]
    }
  ]

  return (
    <section className="relative pt-8 pb-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-golden-yellow rounded-full" />
            <span className="font-fredoka text-sm font-medium text-golden-yellow uppercase tracking-widest">
              Real Results
            </span>
            <div className="w-3 h-3 bg-brick-red rounded-full" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-semibold text-near-black mb-6"
          >
            Proof, Not Promises
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-near-black/70 max-w-2xl mx-auto"
          >
            What we've done, and why it worked.
          </motion.p>
        </div>

        {/* Featured Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Video Card */}
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted border border-border hover:border-golden-yellow/30 transition-all duration-300">
                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.client}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-golden-yellow/90 flex items-center justify-center">
                    <Play className="w-7 h-7 text-near-black fill-near-black ml-1" />
                  </div>
                </div>
                
                {/* Stats Badge */}
                <div className="absolute top-3 right-3 bg-near-black/90 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/10">
                  <Eye className="w-4 h-4 text-golden-yellow" />
                  <span className="text-white text-sm font-semibold">{video.views}</span>
                </div>
                
                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-golden-yellow/20 text-golden-yellow text-xs font-medium rounded-full mb-2">
                      {video.industry}
                    </span>
                    <h3 className="font-fredoka text-lg font-semibold text-cream-highlight">
                      {video.client}
                    </h3>
                  </div>
                  
                  {/* Why It Worked - Shows on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden bg-near-black/80 backdrop-blur-sm rounded-lg p-3 -mx-1 mt-2">
                    <p className="text-golden-yellow text-xs font-semibold uppercase tracking-wide mb-2">Why it worked:</p>
                    <ul className="space-y-1">
                      {video.whyItWorked.map((reason, i) => (
                        <li key={i} className="text-white text-xs flex items-start gap-2">
                          <span className="text-golden-yellow mt-0.5">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Work Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-golden-yellow text-near-black font-fredoka font-semibold rounded-full hover:bg-orange-accent transition-colors duration-300"
          >
            See All Our Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
