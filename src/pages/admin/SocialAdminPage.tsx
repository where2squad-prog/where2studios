'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pin, PinOff, Eye, EyeOff, Trash2, Edit2, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/where2studios-logo.png'
import {
  useSocialClients,
  useAdminSocialPosts,
  useCreateSocialPost,
  useUpdateSocialPost,
  useDeleteSocialPost,
  getSocialThumbnail,
  SocialPostWithClient,
} from '@/hooks/useSocialPosts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function SocialAdminPage() {
  const { data: clients, isLoading: clientsLoading } = useSocialClients()
  const { data: posts, isLoading: postsLoading } = useAdminSocialPosts()
  const createPost = useCreateSocialPost()
  const updatePost = useUpdateSocialPost()
  const deletePost = useDeleteSocialPost()

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPost, setEditingPost] = useState<SocialPostWithClient | null>(null)

  // Form state
  const [clientId, setClientId] = useState('')
  const [permalink, setPermalink] = useState('')
  const [title, setTitle] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [pinned, setPinned] = useState(false)
  const [excluded, setExcluded] = useState(false)

  const resetForm = () => {
    setClientId('')
    setPermalink('')
    setTitle('')
    setThumbnailUrl('')
    setPinned(false)
    setExcluded(false)
    setShowAddForm(false)
    setEditingPost(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientId || !permalink) {
      toast.error('Client and permalink are required')
      return
    }

    // Validate permalink format
    if (!permalink.includes('instagram.com')) {
      toast.error('Please enter a valid Instagram URL')
      return
    }

    try {
      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          client_id: clientId,
          permalink,
          title: title || null,
          thumbnail_url: thumbnailUrl || null,
          pinned,
          excluded,
        })
        toast.success('Post updated')
      } else {
        await createPost.mutateAsync({
          client_id: clientId,
          permalink,
          title: title || undefined,
          thumbnail_url: thumbnailUrl || undefined,
          pinned,
          excluded,
        })
        toast.success('Post added')
      }
      resetForm()
    } catch (error: any) {
      if (error.message?.includes('duplicate key')) {
        toast.error('This Instagram link already exists')
      } else {
        toast.error(error.message || 'Failed to save post')
      }
    }
  }

  const handleEdit = (post: SocialPostWithClient) => {
    setEditingPost(post)
    setClientId(post.client_id)
    setPermalink(post.permalink)
    setTitle(post.title || '')
    setThumbnailUrl(post.thumbnail_url || '')
    setPinned(post.pinned)
    setExcluded(post.excluded)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await deletePost.mutateAsync(id)
      toast.success('Post deleted')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete')
    }
  }

  const handleTogglePin = async (post: SocialPostWithClient) => {
    try {
      await updatePost.mutateAsync({ id: post.id, pinned: !post.pinned })
      toast.success(post.pinned ? 'Unpinned' : 'Pinned')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update')
    }
  }

  const handleToggleExclude = async (post: SocialPostWithClient) => {
    try {
      await updatePost.mutateAsync({ id: post.id, excluded: !post.excluded })
      toast.success(post.excluded ? 'Now visible' : 'Now hidden')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update')
    }
  }

  const isLoading = clientsLoading || postsLoading

  return (
    <div className="min-h-screen bg-m3-surface-dark">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-m3-surface-dark/90 backdrop-blur-xl border-b border-m3-on-dark/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-4 group">
              <ArrowLeft className="w-5 h-5 text-m3-on-dark group-hover:text-m3-primary transition-colors" />
              <img src={logo} alt="Where2Studios" className="h-10 sm:h-14 w-auto" />
            </Link>
            <h1 className="font-fredoka text-lg sm:text-xl font-semibold text-m3-on-dark">
              Social Media Admin
            </h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-8 lg:px-12 py-8">
        {/* Add Button */}
        {!showAddForm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAddForm(true)}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                       bg-m3-primary text-m3-on-primary font-semibold hover:bg-m3-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Instagram Post
          </motion.button>
        )}

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-m3-surface rounded-2xl p-6 space-y-4 border border-m3-outline"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                    {editingPost ? 'Edit Post' : 'Add New Post'}
                  </h2>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="p-2 rounded-full hover:bg-m3-surface-variant transition-colors"
                  >
                    <X className="w-5 h-5 text-m3-on-surface/60" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-m3-on-surface mb-1">
                      Client *
                    </label>
                    <Select value={clientId} onValueChange={setClientId}>
                      <SelectTrigger className="w-full bg-m3-surface-variant border-m3-outline">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients?.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} (@{client.ig_handle})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Permalink */}
                  <div>
                    <label className="block text-sm font-medium text-m3-on-surface mb-1">
                      Instagram Permalink *
                    </label>
                    <Input
                      type="url"
                      placeholder="https://www.instagram.com/p/..."
                      value={permalink}
                      onChange={e => setPermalink(e.target.value)}
                      className="bg-m3-surface-variant border-m3-outline"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-m3-on-surface mb-1">
                      Title (optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="Custom title for display"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="bg-m3-surface-variant border-m3-outline"
                    />
                  </div>

                  {/* Thumbnail URL */}
                  <div>
                    <label className="block text-sm font-medium text-m3-on-surface mb-1">
                      Thumbnail URL (optional)
                    </label>
                    <Input
                      type="url"
                      placeholder="https://..."
                      value={thumbnailUrl}
                      onChange={e => setThumbnailUrl(e.target.value)}
                      className="bg-m3-surface-variant border-m3-outline"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pinned}
                      onChange={e => setPinned(e.target.checked)}
                      className="w-4 h-4 rounded border-m3-outline text-m3-primary focus:ring-m3-primary"
                    />
                    <span className="text-sm text-m3-on-surface">Pinned (show first)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excluded}
                      onChange={e => setExcluded(e.target.checked)}
                      className="w-4 h-4 rounded border-m3-outline text-m3-secondary focus:ring-m3-secondary"
                    />
                    <span className="text-sm text-m3-on-surface">Excluded (hide from public)</span>
                  </label>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createPost.isPending || updatePost.isPending}
                    className="bg-m3-primary text-m3-on-primary hover:bg-m3-primary/90"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {editingPost ? 'Update Post' : 'Add Post'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Table */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-m3-surface-variant rounded-xl animate-pulse" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors
                           ${post.excluded 
                             ? 'bg-m3-surface-variant/50 border-m3-outline/50 opacity-60' 
                             : 'bg-m3-surface border-m3-outline'}`}
              >
                {/* Thumbnail */}
                <img
                  src={getSocialThumbnail(post)}
                  alt={post.title || post.client.name}
                  className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-fredoka font-semibold text-m3-on-surface truncate">
                      {post.title || post.client.name}
                    </h3>
                    {post.pinned && (
                      <span className="px-2 py-0.5 rounded-full bg-m3-primary/20 text-m3-primary text-xs font-semibold flex items-center gap-1">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    {post.excluded && (
                      <span className="px-2 py-0.5 rounded-full bg-m3-secondary/20 text-m3-secondary text-xs font-semibold">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-m3-on-surface/60 truncate">
                    @{post.client.ig_handle}
                  </p>
                  <p className="text-xs text-m3-on-surface/40 truncate mt-1">
                    {post.permalink}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePin(post)}
                    className="p-2 rounded-lg hover:bg-m3-surface-variant transition-colors"
                    title={post.pinned ? 'Unpin' : 'Pin'}
                  >
                    {post.pinned ? (
                      <PinOff className="w-4 h-4 text-m3-primary" />
                    ) : (
                      <Pin className="w-4 h-4 text-m3-on-surface/60" />
                    )}
                  </button>
                  <button
                    onClick={() => handleToggleExclude(post)}
                    className="p-2 rounded-lg hover:bg-m3-surface-variant transition-colors"
                    title={post.excluded ? 'Show' : 'Hide'}
                  >
                    {post.excluded ? (
                      <Eye className="w-4 h-4 text-m3-secondary" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-m3-on-surface/60" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg hover:bg-m3-surface-variant transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-m3-on-surface/60" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg hover:bg-m3-secondary/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-m3-secondary" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-m3-on-dark/60 mb-4">No posts yet. Add your first Instagram post above.</p>
          </div>
        )}
      </main>
    </div>
  )
}
