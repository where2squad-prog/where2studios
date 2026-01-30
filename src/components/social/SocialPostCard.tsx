'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Pin } from 'lucide-react'
import { SocialPostWithClient, getSocialThumbnail } from '@/hooks/useSocialPosts'

interface SocialPostCardProps {
  post: SocialPostWithClient
  index: number
  variant?: 'default' | 'compact'
}

export function SocialPostCard({ post, index, variant = 'default' }: SocialPostCardProps) {
  const thumbnail = getSocialThumbnail(post)

  const handleClick = () => {
    window.open(post.permalink, '_blank', 'noopener,noreferrer')
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        viewport={{ once: true }}
        className="group cursor-pointer"
        onClick={handleClick}
      >
        <div className="rounded-xl overflow-hidden bg-m3-surface shadow-md 
                        hover:ring-2 hover:ring-m3-primary/50 transition-all">
          <div className="relative aspect-[9/16]">
            <img
              src={thumbnail}
              alt={post.title || post.client.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-transparent to-transparent" />
            
            {/* Pinned badge */}
            {post.pinned && (
              <div className="absolute top-2 right-2">
                <Pin className="w-4 h-4 text-m3-primary fill-m3-primary" />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="inline-block px-2 py-0.5 rounded-full bg-m3-primary/90 text-m3-on-primary text-[10px] font-semibold mb-1">
                @{post.client.ig_handle}
              </span>
              <h3 className="font-fredoka text-sm font-semibold text-m3-on-dark line-clamp-2">
                {post.title || post.client.name}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer"
      onClick={handleClick}
    >
      <div className="m3-elevated-card overflow-hidden rounded-2xl bg-m3-surface 
                      hover:ring-2 hover:ring-m3-primary/50 transition-all duration-300
                      hover:shadow-xl">
        <div className="relative aspect-[9/16]">
          <img
            src={thumbnail}
            alt={post.title || post.client.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-transparent to-transparent" />
          
          {/* Client tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-m3-primary/90 text-m3-on-primary text-xs font-semibold">
              @{post.client.ig_handle}
            </span>
          </div>

          {/* Pinned badge */}
          {post.pinned && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full bg-m3-secondary text-m3-on-secondary text-[10px] font-semibold flex items-center gap-1">
                <Pin className="w-3 h-3" />
                Pinned
              </span>
            </div>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-fredoka text-lg font-semibold text-m3-on-dark mb-1 line-clamp-1">
              {post.title || post.client.name}
            </h3>

            <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                               bg-m3-secondary text-m3-on-secondary text-sm font-medium
                               hover:bg-m3-secondary/90 transition-colors">
              <span>View on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
