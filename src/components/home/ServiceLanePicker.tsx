'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, PartyPopper, Heart, Share2, Tv } from 'lucide-react'
import { useProjects, getThumbnail, Project } from '@/hooks/useProjects'

const services = [
  { id: 'corporate', label: 'Corporate', icon: Building2, route: '/corporate' },
  { id: 'events', label: 'Events', icon: PartyPopper, route: '/events' },
  { id: 'weddings', label: 'Weddings', icon: Heart, route: '/weddings' },
  { id: 'social-media', label: 'Social Media', icon: Share2, route: '/social-media' },
  { id: 'commercials', label: 'Commercials', icon: Tv, route: '/commercials' },
]

export function ServiceLanePicker() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [clickCount, setClickCount] = useState<Record<string, number>>({})

  const { data: projects } = useProjects({
    category: selectedService || undefined,
  })

  const handleServiceClick = (serviceId: string, route: string) => {
    const currentCount = clickCount[serviceId] || 0

    if (selectedService === serviceId) {
      // Second click - navigate
      window.location.href = route
    } else {
      // First click - select and show preview
      setSelectedService(serviceId)
      setClickCount({ ...clickCount, [serviceId]: currentCount + 1 })
    }
  }

  const previewProjects = projects?.slice(0, 4) || []

  return (
    <section className="py-16 sm:py-24 bg-m3-surface-variant">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label text-m3-secondary">What We Do</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-on-surface mt-2">
            Choose your lane
          </h2>
          <p className="text-m3-on-surface/60 mt-3 max-w-xl mx-auto">
            Click to preview projects. Click again to explore the full service.
          </p>
        </motion.div>

        {/* Service Cards - Horizontal */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {services.map((service, index) => {
            const isSelected = selectedService === service.id
            const Icon = service.icon

            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleServiceClick(service.id, service.route)}
                className={`
                  flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all cursor-pointer
                  ${isSelected
                    ? 'm3-filled-button shadow-lg scale-105'
                    : 'm3-tonal-card hover:shadow-md'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isSelected ? '' : 'text-m3-primary'}`} />
                <span className={`font-medium ${isSelected ? '' : 'text-m3-on-surface'}`}>
                  {service.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Preview Panel */}
        <AnimatePresence mode="wait">
          {selectedService && previewProjects.length > 0 && (
            <motion.div
              key={selectedService}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="m3-elevated-card p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-m3-on-surface">
                    Recent {services.find((s) => s.id === selectedService)?.label} Projects
                  </h3>
                  <Link
                    to={services.find((s) => s.id === selectedService)?.route || '/work'}
                    className="m3-text-button text-m3-primary text-sm"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previewProjects.map((project: Project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="aspect-[9/14] rounded-xl overflow-hidden group cursor-pointer"
                      onClick={() => window.location.href = services.find((s) => s.id === selectedService)?.route || '/work'}
                    >
                      <img
                        src={getThumbnail(project)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
