'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, ChevronDown, Pin } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/where2studios-logo.png'
import { useSocialPosts, useSocialClients, getSocialThumbnail } from '@/hooks/useSocialPosts'

import { Footer } from '@/components/Footer'

const POSTS_PER_PAGE = 24

export default function SocialMediaWorkPage() {
  const navigate = useNavigate()
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  
  const { data: allPosts, isLoading: postsLoading } = useSocialPosts(undefined, selectedClientId || undefined)
  const { data: clients } = useSocialClients()

  const posts = useMemo(() => {
    return allPosts?.slice(0, visibleCount) || []
  }, [allPosts, visibleCount])

  const hasMore = allPosts && allPosts.length > visibleCount

  const selectedClient = useMemo(() => {
    if (!selectedClientId || !clients) return null
    return clients.find(c => c.id === selectedClientId) || null
  }, [selectedClientId, clients])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE)
  }

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      {/* Top App Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-m3-surface-dark/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 sm:h-28 border-b border-m3-on-dark/10">
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="p-2 -ml-2 hover:bg-m3-on-dark/10 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-m3-on-dark" />
              </button>
              <Link to="/">
                <img src={logo} alt="Where2Studios" className="h-14 sm:h-20 w-auto" />
              </Link>
            </div>
            <Link to="/contact" className="m3-filled-button text-sm sm:text-base">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-6 sm:pt-44 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-m3-secondary/20 text-m3-secondary text-sm font-semibold mb-4">
              Social Media
            </span>
            <h1 className="font-fredoka text-4xl sm:text-7xl lg:text-8xl font-semibold text-m3-on-dark tracking-tight">
              Social Media Work
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-m3-on-dark/70 max-w-xl">
              Reels, posts, and campaigns built for growth and engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Filter */}
      <section className="py-4 border-b border-m3-on-dark/5">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-m3-on-dark/70">
              {allPosts?.length || 0} post{allPosts?.length !== 1 ? 's' : ''}
              {selectedClient && ` from ${selectedClient.name}`}
            </p>
            
            {/* Client dropdown */}
            {clients && clients.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-m3-surface-variant/30 
                             text-m3-on-dark text-sm font-medium hover:bg-m3-surface-variant/50 transition-colors"
                >
                  <span>{selectedClient ? selectedClient.name : 'All Clients'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-m3-surface rounded-xl shadow-xl border border-m3-outline z-[115]"
                    >
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setSelectedClientId(null)
                            setVisibleCount(POSTS_PER_PAGE)
                            setDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-m3-surface-variant transition-colors
                                     ${!selectedClientId ? 'text-m3-primary font-semibold' : 'text-m3-on-surface'}`}
                        >
                          All Clients
                        </button>
                        {clients.map(client => (
                          <button
                            key={client.id}
                            onClick={() => {
                              setSelectedClientId(client.id)
                              setVisibleCount(POSTS_PER_PAGE)
                              setDropdownOpen(false)
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-m3-surface-variant transition-colors
                                       ${selectedClientId === client.id ? 'text-m3-primary font-semibold' : 'text-m3-on-surface'}`}
                          >
                            {client.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          {postsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="m3-elevated-card aspect-[9/16] animate-pulse bg-m3-surface-variant" />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedClientId || 'all'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                >
                  {posts.map((post, index) => {
                    const thumbnail = getSocialThumbnail(post)

                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                        onClick={() => window.open(post.permalink, '_blank', 'noopener,noreferrer')}
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
                              <span className="px-2 sm:px-3 py-1 rounded-full bg-m3-primary/90 text-m3-on-primary text-[10px] sm:text-xs font-semibold">
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
                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                              <h3 className="font-fredoka text-sm sm:text-lg font-semibold text-m3-on-dark mb-2 sm:mb-3 line-clamp-1">
                                {post.title || post.client.name}
                              </h3>

                              <button className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl 
                                                 bg-m3-secondary text-m3-on-secondary text-xs sm:text-sm font-medium
                                                 hover:bg-m3-secondary/90 transition-colors">
                                <span>View on Instagram</span>
                                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 rounded-xl border-2 border-m3-primary text-m3-primary font-semibold
                               hover:bg-m3-primary hover:text-m3-on-primary transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <span className="font-fredoka text-2xl font-semibold text-m3-on-dark">
                Coming Soon!
              </span>
              <p className="mt-2 text-m3-on-dark/60 text-sm">
                New posts are on the way.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-32 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h2 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface">
            Ready to grow your social presence?
          </h2>
          <p className="mt-4 text-m3-on-surface/60">
            Let's create content that builds your community and drives results.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="m3-filled-button inline-flex items-center gap-2 text-lg">
              Book a Discovery Call
            </Link>
            <Link to="/work/productions" className="m3-outlined-button inline-flex items-center gap-2">
              View Productions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  )
}
