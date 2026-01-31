'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, Check, Calendar } from 'lucide-react'
import { z } from 'zod'
import { supabase } from '@/integrations/supabase/client'
import { useCalModal } from '@/hooks/useCalModal'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { Link } from 'react-router-dom'

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Full name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  company: z.string().trim().min(1, 'Company/Brand is required').max(100),
  service: z.string().min(1, 'Service is required'),
  referral: z.string().min(1, 'Please tell us how you heard about us'),
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  message: z.string().trim().min(1, 'Message is required').max(2000),
  website: z.string().max(0, 'Bot detected'),
})

type BookingFormData = z.infer<typeof bookingSchema>

const services = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'events', label: 'Events' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'commercials', label: 'Commercials' },
]

const budgetRanges = [
  { value: 'under-2k', label: 'Under $2k' },
  { value: '2k-5k', label: '$2k–$5k' },
  { value: '5k-10k', label: '$5k–$10k' },
  { value: '10k-plus', label: '$10k+' },
]

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '2-4-weeks', label: '2–4 weeks' },
  { value: '1-2-months', label: '1–2 months' },
  { value: 'flexible', label: 'Flexible' },
]

const referralSources = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'google', label: 'Google Search' },
  { value: 'yelp', label: 'Yelp' },
  { value: 'referral', label: 'Word of mouth/referral' },
  { value: 'event', label: 'Event/conference' },
  { value: 'newsletter', label: 'Email newsletter' },
  { value: 'other', label: 'Other' },
]

export function BookingFormSheet() {
  const { isOpen, closeSheet } = useBookingSheet()
  const { openCalModal } = useCalModal()
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    referral: '',
    budget: '',
    timeline: '',
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    try {
      bookingSchema.parse(formData)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BookingFormData, string>> = {}
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0] as keyof BookingFormData] = e.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
        message: formData.message,
        phone: formData.phone,
        budget: formData.budget,
        timeline: formData.timeline,
        referral: formData.referral,
      })

      if (dbError) throw dbError

      try {
        await supabase.functions.invoke('send-contact-email', {
          body: formData,
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
      }

      setIsSubmitted(true)
      // Open Cal.com modal after submission
      openCalModal()
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeSheet()
    // Reset form after close animation
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        referral: '',
        budget: '',
        timeline: '',
        message: '',
        website: '',
      })
      setErrors({})
      setSubmitError(null)
    }, 300)
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-m3-surface text-m3-on-surface border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-outline/30'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all`

  const selectClasses = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-m3-surface text-m3-on-surface border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-outline/30'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all appearance-none cursor-pointer`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-m3-surface-variant z-50 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-m3-surface-variant border-b border-m3-outline/20 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-m3-on-surface">Tell us about yourself</h2>
                <p className="text-sm text-m3-on-surface/60">Fill out this form to book a discovery call. All fields are required.</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-m3-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-m3-on-surface/70" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-m3-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-m3-on-surface mb-2">You're booked!</h3>
                  <p className="text-m3-on-surface/60 mb-6">
                    Check your inbox for the calendar invite. Excited to meet you!
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/work"
                      onClick={handleClose}
                      className="m3-outlined-button inline-flex items-center justify-center"
                    >
                      View Our Work
                    </Link>
                    <button
                      onClick={handleClose}
                      className="m3-text-button text-m3-primary"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="absolute -left-[9999px] opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Full Name */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      Full Name <span className="text-m3-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses(!!errors.name)}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-m3-secondary text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      Email <span className="text-m3-secondary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses(!!errors.email)}
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-m3-secondary text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      Phone <span className="text-m3-secondary">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses(!!errors.phone)}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-m3-secondary text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Company/Brand */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      Company/Brand <span className="text-m3-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses(!!errors.company)}
                      placeholder="Your company or brand"
                    />
                    {errors.company && <p className="text-m3-secondary text-xs mt-1">{errors.company}</p>}
                  </div>

                  {/* Service Category */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      Service Category <span className="text-m3-secondary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={selectClasses(!!errors.service)}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-m3-on-surface/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.service && <p className="text-m3-secondary text-xs mt-1">{errors.service}</p>}
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      How did you hear about us? <span className="text-m3-secondary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        className={selectClasses(!!errors.referral)}
                      >
                        <option value="">Select an option</option>
                        {referralSources.map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-m3-on-surface/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.referral && <p className="text-m3-secondary text-xs mt-1">{errors.referral}</p>}
                  </div>

                  {/* Budget & Timeline Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                        Budget <span className="text-m3-secondary">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={selectClasses(!!errors.budget)}
                        >
                          <option value="">Select</option>
                          {budgetRanges.map((b) => (
                            <option key={b.value} value={b.value}>{b.label}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-m3-on-surface/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.budget && <p className="text-m3-secondary text-xs mt-1">{errors.budget}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                        Timeline <span className="text-m3-secondary">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className={selectClasses(!!errors.timeline)}
                        >
                          <option value="">Select</option>
                          {timelines.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-m3-on-surface/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.timeline && <p className="text-m3-secondary text-xs mt-1">{errors.timeline}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium text-m3-on-surface mb-2 block">
                      Message <span className="text-m3-secondary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClasses(!!errors.message)} resize-none`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="text-m3-secondary text-xs mt-1">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <p className="text-m3-secondary text-sm">{submitError}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full m3-filled-button flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                    Book a Discovery Call
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
