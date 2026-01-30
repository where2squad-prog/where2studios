'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Send, Calendar } from 'lucide-react'
import { z } from 'zod'
import { supabase } from '@/integrations/supabase/client'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  company: z.string().trim().max(100).optional(),
  service: z.string().optional(),
  message: z.string().trim().min(1, 'Message is required').max(2000),
  phone: z.string().trim().max(20).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  referral: z.string().trim().max(200).optional(),
  honeypot: z.string().max(0, 'Bot detected'),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
  { value: 'corporate', label: 'Corporate' },
  { value: 'events', label: 'Events' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'commercials', label: 'Commercials' },
]

const budgets = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-plus', label: '$25,000+' },
]

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-plus-months', label: '3+ months' },
]

interface ContactFormProps {
  showBookCall?: boolean
  compact?: boolean
}

export function ContactForm({ showBookCall = true, compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    phone: '',
    budget: '',
    timeline: '',
    referral: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    try {
      contactSchema.parse(formData)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0] as keyof ContactFormData] = e.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const isValid = (): boolean => {
    try {
      contactSchema.parse(formData)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (openCalAfter: boolean = false) => {
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Submit to database
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        service: formData.service || null,
        message: formData.message,
        phone: formData.phone || null,
        budget: formData.budget || null,
        timeline: formData.timeline || null,
        referral: formData.referral || null,
      })

      if (dbError) throw dbError

      // Send email notification
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: formData,
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
        // Don't fail the submission if email fails
      }

      setIsSubmitted(true)

      if (openCalAfter) {
        // Open Cal.com in new tab
        window.open('https://cal.com/where2-studios-tvdbun/discovery-call', '_blank')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="m3-elevated-card p-8 sm:p-12 text-center"
      >
        <div className="w-16 h-16 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-m3-primary" />
        </div>
        <h3 className="text-2xl font-bold text-m3-on-surface mb-2">Message Sent!</h3>
        <p className="text-m3-on-surface/60 mb-6">
          We'll get back to you within 24 hours. Check your email for confirmation.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({
              name: '',
              email: '',
              company: '',
              service: '',
              message: '',
              phone: '',
              budget: '',
              timeline: '',
              referral: '',
              honeypot: '',
            })
          }}
          className="m3-text-button text-m3-primary"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <div className="m3-elevated-card p-6 sm:p-8">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }} className="space-y-5">
        {/* Honeypot - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="absolute -left-[9999px] opacity-0"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name & Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label text-m3-on-surface/70 mb-2 block">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border ${
                errors.name ? 'border-m3-secondary' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-m3-primary/30`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-m3-secondary text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="label text-m3-on-surface/70 mb-2 block">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border ${
                errors.email ? 'border-m3-secondary' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-m3-primary/30`}
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-m3-secondary text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Company & Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label text-m3-on-surface/70 mb-2 block">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border border-transparent focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
              placeholder="Your company"
            />
          </div>
          <div>
            <label className="label text-m3-on-surface/70 mb-2 block">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border border-transparent focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Service & Budget */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label text-m3-on-surface/70 mb-2 block">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border border-transparent focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label text-m3-on-surface/70 mb-2 block">Budget</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border border-transparent focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
              >
                <option value="">Select budget</option>
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Timeline & Referral */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label text-m3-on-surface/70 mb-2 block">Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border border-transparent focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
              >
                <option value="">Select timeline</option>
                {timelines.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label text-m3-on-surface/70 mb-2 block">How did you hear about us?</label>
              <input
                type="text"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border border-transparent focus:outline-none focus:ring-2 focus:ring-m3-primary/30"
                placeholder="e.g. Instagram, referral"
              />
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="label text-m3-on-surface/70 mb-2 block">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl bg-m3-surface-variant text-m3-on-surface border ${
              errors.message ? 'border-m3-secondary' : 'border-transparent'
            } focus:outline-none focus:ring-2 focus:ring-m3-primary/30 resize-none`}
            placeholder="Tell us about your project..."
          />
          {errors.message && <p className="text-m3-secondary text-xs mt-1">{errors.message}</p>}
        </div>

        {submitError && (
          <p className="text-m3-secondary text-sm">{submitError}</p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {showBookCall && (
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting || !isValid()}
              className="m3-filled-button flex items-center justify-center gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              Book a Call
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${showBookCall ? 'm3-outlined-button' : 'm3-filled-button'} flex items-center justify-center gap-2 flex-1 disabled:opacity-50`}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Just Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
