'use client'

import { motion } from 'framer-motion'
import { Play, Eye, Heart, Image } from 'lucide-react'

export function FeaturedWins() {
  const reels = [
    {
      id: 1,
      client: "Fine Dining",
      views: "2.4M",
      likes: "184K",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop",
      whyItWorked: "Hook in 0.5s. Chef authenticity. Peak posting time."
    },
    {
      id: 2,
      client: "Taco Shop",
      views: "1.8M",
      likes: "156K",
      thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=600&fit=crop",
      whyItWorked: "ASMR audio hook. POV format. Influencer shares."
    },
    {
      id: 3,
      client: "Craft Brewery",
      views: "890K",
      likes: "72K",
      thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=600&fit=crop",
      whyItWorked: "Satisfying pour shot. Personality feature. Event timing."
    },
    {
      id: 4,
      client: "Brunch Spot",
      views: "1.2M",
      likes: "98K",
      thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop",
      whyItWorked: "Food reveal hook. UGC style. Creator collab."
    },
    {
      id: 5,
      client: "Sushi Bar",
      views: "3.1M",
      likes: "245K",
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=600&fit=crop",
      whyItWorked: "Knife skills ASMR. Clean aesthetic. Trending audio."
    }
  ]

  const photos = [
    {
      id: 1,
      client: "Artisan Bakery",
      likes: "45.2K",
      thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
      whyItWorked: "Golden hour lighting. Hero composition. Seasonal hashtags."
    },
    {
      id: 2,
      client: "Coffee Roasters",
      likes: "38.7K",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      whyItWorked: "Steam movement. Warm palette. Morning posting."
    },
    {
      id: 3,
      client: "Wine Bar",
      likes: "52.1K",
      thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
      whyItWorked: "Lifestyle framing. Moody lighting. Weekend timing."
    },
    {
      id: 4,
      client: "Farm to Table",
      likes: "29.8K",
      thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=400&fit=crop",
      whyItWorked: "Fresh close-up. Local sourcing story. Farm tags."
    },
    {
      id: 5,
      client: "Dessert Shop",
      likes: "67.3K",
      thumbnail: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop",
      whyItWorked: "Cheese pull moment. Playful styling. Carousel format."
    }
  ]

  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-2 h-2 bg-golden-yellow rounded-full" />
            <span className="font-fredoka text-xs font-medium text-golden-yellow uppercase tracking-widest">
              Real Results
            </span>
            <div className="w-2 h-2 bg-brick-red rounded-full" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-near-black mb-3"
          >
            Proof, Not Promises
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg text-near-black/70"
          >
            What we've done, and why it worked.
          </motion.p>
        </div>

        {/* Reels Row */}
        <div className="mb-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="w-4 h-4 text-brick-red fill-brick-red" />
            <span className="font-fredoka text-sm font-semibold text-near-black">Reels</span>
          </div>
          
          <div 
            className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory justify-start lg:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex-shrink-0 snap-start"
              >
                <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md w-[140px] aspect-[9/14]">
                  <img
                    src={item.thumbnail}
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/20 to-transparent" />
                  
                  <div className="absolute top-2 right-2 bg-near-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span className="text-white text-[10px] font-semibold">{item.views}</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs font-semibold truncate">{item.client}</p>
                    <p className="text-white/70 text-[10px]">{item.likes} likes</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-near-black/90 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center">
                    <p className="text-golden-yellow text-[10px] font-semibold uppercase tracking-wide mb-1">Why it worked</p>
                    <p className="text-white text-[11px] leading-relaxed">{item.whyItWorked}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photos Row */}
        <div className="mb-10 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image className="w-4 h-4 text-golden-yellow" />
            <span className="font-fredoka text-sm font-semibold text-near-black">Photos</span>
          </div>
          
          <div 
            className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory justify-start lg:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {photos.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex-shrink-0 snap-start"
              >
                <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md w-[140px] aspect-square">
                  <img
                    src={item.thumbnail}
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/20 to-transparent" />
                  
                  <div className="absolute top-2 right-2 bg-near-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-white" />
                    <span className="text-white text-[10px] font-semibold">{item.likes}</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs font-semibold truncate">{item.client}</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-near-black/90 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center">
                    <p className="text-golden-yellow text-[10px] font-semibold uppercase tracking-wide mb-1">Why it worked</p>
                    <p className="text-white text-[11px] leading-relaxed">{item.whyItWorked}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
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
