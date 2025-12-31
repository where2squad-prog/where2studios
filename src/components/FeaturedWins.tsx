'use client'

import { motion } from 'framer-motion'
import { Play, Eye, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import { useRef } from 'react'

export function FeaturedWins() {
  const reelsScrollRef = useRef<HTMLDivElement>(null)
  const photosScrollRef = useRef<HTMLDivElement>(null)

  const featuredReels = [
    {
      id: 1,
      client: "Fine Dining Restaurant",
      handle: "@finedining",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      views: "2.4M",
      likes: "184K",
      comments: "2.3K",
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
      handle: "@tacoshop",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      views: "1.8M",
      likes: "156K",
      comments: "4.1K",
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
      handle: "@craftbrew",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      views: "890K",
      likes: "72K",
      comments: "1.8K",
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
      handle: "@brunchspot",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      views: "1.2M",
      likes: "98K",
      comments: "3.2K",
      thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop",
      whyItWorked: [
        "Pancake stack reveal hook",
        "UGC-style authentic filming",
        "Collaborated with lifestyle creator"
      ]
    },
    {
      id: 5,
      client: "Sushi Bar",
      handle: "@sushibar",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      views: "3.1M",
      likes: "245K",
      comments: "5.6K",
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=700&fit=crop",
      whyItWorked: [
        "Mesmerizing knife skills ASMR",
        "Clean aesthetic matches brand",
        "Trending audio integration"
      ]
    }
  ]

  const featuredPhotos = [
    {
      id: 1,
      client: "Artisan Bakery",
      handle: "@artisanbakery",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      likes: "45.2K",
      comments: "892",
      thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
      whyItWorked: [
        "Golden hour lighting perfection",
        "Product hero composition",
        "Seasonal hashtag strategy"
      ]
    },
    {
      id: 2,
      client: "Coffee Roasters",
      handle: "@coffeeroasters",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
      likes: "38.7K",
      comments: "634",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
      whyItWorked: [
        "Steam rising creates movement",
        "Warm color palette on brand",
        "Posted at morning coffee time"
      ]
    },
    {
      id: 3,
      client: "Wine Bar",
      handle: "@winebar",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      likes: "52.1K",
      comments: "1.2K",
      thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=600&fit=crop",
      whyItWorked: [
        "Lifestyle aspirational framing",
        "Moody ambient lighting",
        "Weekend evening posting"
      ]
    },
    {
      id: 4,
      client: "Farm to Table",
      handle: "@farmtotable",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      likes: "29.8K",
      comments: "445",
      thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=600&fit=crop",
      whyItWorked: [
        "Fresh ingredients close-up",
        "Story about local sourcing",
        "Tagged local farms for reach"
      ]
    },
    {
      id: 5,
      client: "Dessert Shop",
      handle: "@dessertshop",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      likes: "67.3K",
      comments: "2.1K",
      thumbnail: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop",
      whyItWorked: [
        "Drool-worthy cheese pull",
        "Bright playful styling",
        "Carousel format for engagement"
      ]
    }
  ]

  return (
    <section className="relative pt-8 pb-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
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

        {/* Reels Carousel */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Play className="w-5 h-5 text-brick-red fill-brick-red" />
            <h3 className="font-fredoka text-2xl font-semibold text-near-black">Reels</h3>
          </motion.div>
          
          <div 
            ref={reelsScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
              >
                {/* Social Media Post Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={reel.avatar} 
                        alt={reel.client}
                        className="w-9 h-9 rounded-full object-cover border-2 border-brick-red"
                      />
                      <div>
                        <p className="font-semibold text-near-black text-sm">{reel.handle}</p>
                        <p className="text-xs text-gray-500">{reel.client}</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  {/* Video Thumbnail */}
                  <div className="relative aspect-[9/16] group cursor-pointer">
                    <img
                      src={reel.thumbnail}
                      alt={reel.client}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-7 h-7 text-near-black fill-near-black ml-1" />
                      </div>
                    </div>
                    
                    {/* Views Badge */}
                    <div className="absolute top-3 right-3 bg-near-black/80 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-semibold">{reel.views}</span>
                    </div>
                    
                    {/* Why It Worked Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-near-black via-near-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-golden-yellow text-xs font-semibold uppercase tracking-wide mb-2">Why it worked:</p>
                      <ul className="space-y-1">
                        {reel.whyItWorked.map((reason, i) => (
                          <li key={i} className="text-white text-xs flex items-start gap-2">
                            <span className="text-golden-yellow mt-0.5">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Post Actions */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <Heart className="w-6 h-6 text-near-black hover:text-brick-red cursor-pointer transition-colors" />
                        <MessageCircle className="w-6 h-6 text-near-black hover:text-gray-600 cursor-pointer transition-colors" />
                        <Send className="w-6 h-6 text-near-black hover:text-gray-600 cursor-pointer transition-colors" />
                      </div>
                      <Bookmark className="w-6 h-6 text-near-black hover:text-gray-600 cursor-pointer transition-colors" />
                    </div>
                    <p className="font-semibold text-near-black text-sm">{reel.likes} likes</p>
                    <p className="text-gray-500 text-xs mt-1">{reel.comments} comments</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photos Carousel */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-5 h-5 rounded border-2 border-golden-yellow" />
            <h3 className="font-fredoka text-2xl font-semibold text-near-black">Photos</h3>
          </motion.div>
          
          <div 
            ref={photosScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[300px] sm:w-[340px] snap-start"
              >
                {/* Social Media Post Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={photo.avatar} 
                        alt={photo.client}
                        className="w-9 h-9 rounded-full object-cover border-2 border-golden-yellow"
                      />
                      <div>
                        <p className="font-semibold text-near-black text-sm">{photo.handle}</p>
                        <p className="text-xs text-gray-500">{photo.client}</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  {/* Photo */}
                  <div className="relative aspect-square group cursor-pointer">
                    <img
                      src={photo.thumbnail}
                      alt={photo.client}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Why It Worked Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-near-black via-near-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-golden-yellow text-xs font-semibold uppercase tracking-wide mb-2">Why it worked:</p>
                      <ul className="space-y-1">
                        {photo.whyItWorked.map((reason, i) => (
                          <li key={i} className="text-white text-xs flex items-start gap-2">
                            <span className="text-golden-yellow mt-0.5">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Post Actions */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <Heart className="w-6 h-6 text-near-black hover:text-brick-red cursor-pointer transition-colors" />
                        <MessageCircle className="w-6 h-6 text-near-black hover:text-gray-600 cursor-pointer transition-colors" />
                        <Send className="w-6 h-6 text-near-black hover:text-gray-600 cursor-pointer transition-colors" />
                      </div>
                      <Bookmark className="w-6 h-6 text-near-black hover:text-gray-600 cursor-pointer transition-colors" />
                    </div>
                    <p className="font-semibold text-near-black text-sm">{photo.likes} likes</p>
                    <p className="text-gray-500 text-xs mt-1">{photo.comments} comments</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
