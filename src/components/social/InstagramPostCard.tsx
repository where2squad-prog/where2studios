'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Eye, Heart, MessageCircle } from 'lucide-react'
import { RankedPost, formatCount, getInstagramThumbnail } from '@/hooks/useInstagramRankings'

interface InstagramPostCardProps {
  item: RankedPost
  index: number
  variant?: 'default' | 'compact'
}

export function InstagramPostCard({ item, index, variant = 'default' }: InstagramPostCardProps) {
  const { post, client } = item
  const thumbnail = getInstagramThumbnail(post)

  const hasViews = post.public_views != null && post.public_views > 0
  const hasLikes = post.public_likes != null && post.public_likes > 0
  const hasComments = post.public_comments != null && post.public_comments > 0
  const hasAnyStats = hasViews || hasLikes || hasComments

  const handleClick = () => {
    window.open(post.permalink, '_blank', 'noopener,noreferrer')
  }

  const capturedDate = post.captured_at
    ? new Date(post.captured_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

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
              alt={post.caption_snippet || client.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="inline-block px-2 py-0.5 rounded-full bg-m3-primary/90 text-m3-on-primary text-[10px] font-semibold mb-1">
                @{client.ig_handle}
              </span>
              <h3 className="font-fredoka text-sm font-semibold text-m3-on-dark line-clamp-2">
                {client.name}
              </h3>
              {hasAnyStats && (
                <div className="flex items-center gap-2 mt-1 text-[10px] text-m3-on-dark/70">
                  {hasViews && (
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      {formatCount(post.public_views)}
                    </span>
                  )}
                  {hasLikes && (
                    <span className="flex items-center gap-0.5">
                      <Heart className="w-3 h-3" />
                      {formatCount(post.public_likes)}
                    </span>
                  )}
                </div>
              )}
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
            alt={post.caption_snippet || client.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/90 via-transparent to-transparent" />
          
          {/* Client tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-m3-primary/90 text-m3-on-primary text-xs font-semibold">
              @{client.ig_handle}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Stats row */}
            {hasAnyStats && (
              <div className="flex items-center gap-3 mb-2 text-xs text-m3-on-dark/80">
                {hasViews && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {formatCount(post.public_views)}
                  </span>
                )}
                {hasLikes && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {formatCount(post.public_likes)}
                  </span>
                )}
                {hasComments && (
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {formatCount(post.public_comments)}
                  </span>
                )}
              </div>
            )}
            
            <h3 className="font-fredoka text-lg font-semibold text-m3-on-dark mb-1 line-clamp-1">
              {client.name}
            </h3>
            
            {capturedDate && (
              <p className="text-xs text-m3-on-dark/60 mb-3">
                Captured {capturedDate}
              </p>
            )}

            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl 
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
