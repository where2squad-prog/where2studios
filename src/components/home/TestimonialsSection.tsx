'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useTestimonials } from '@/hooks/useTestimonials'

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useTestimonials()

  // If no testimonials, show a placeholder section
  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-m3-surface-variant rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!testimonials || testimonials.length === 0) {
    // Show client notes placeholder
    return (
      <section className="py-16 sm:py-20 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Client Notes
            </span>
            <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
              Teams we've built with
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="m3-tonal-card p-8">
              <Quote className="w-8 h-8 text-m3-primary mx-auto mb-4" />
              <p className="text-m3-on-surface/70 italic">
                "Working with Where2Studios was seamless. They understood our brand, 
                delivered on time, and the content exceeded our expectations."
              </p>
              <p className="mt-4 text-sm font-semibold text-m3-on-surface">
                — Bay Area Marketing Team
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 bg-m3-surface">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-fredoka text-2xl sm:text-3xl lg:text-4xl font-semibold text-m3-on-surface mt-2">
            Teams we've built with
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="m3-tonal-card p-6"
            >
              <Quote className="w-6 h-6 text-m3-primary mb-4" />
              
              <p className="text-m3-on-surface/80 text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                {testimonial.headshot_url ? (
                  <img
                    src={testimonial.headshot_url}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-m3-primary/20 flex items-center justify-center">
                    <span className="text-m3-primary font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm text-m3-on-surface">
                    {testimonial.name}
                  </p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-xs text-m3-on-surface/60">
                      {testimonial.role}{testimonial.role && testimonial.company && ', '}{testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
