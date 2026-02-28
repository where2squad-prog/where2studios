'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, Check, Calendar } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'
import { useCalModal } from '@/hooks/useCalModal'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { Link } from 'react-router-dom'

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().min(1, 'Required').max(20),
  company: z.string().trim().min(1, 'Required').max(100),
  role: z.string().trim().min(1, 'Required').max(100),
  stage: z.string().min(1, 'Required'),
  companyUrl: z.string().trim().max(255).optional(),
  service: z.string().min(1, 'Required'),
  launchDate: z.string().trim().max(100).optional(),
  budget: z.string().min(1, 'Required'),
  timeline: z.string().min(1, 'Required'),
  referral: z.string().min(1, 'Required'),
  message: z.string().trim().min(1, 'Required').max(2000),
  website: z.string().max(0, 'Bot detected'),
})

type BookingFormData = z.infer<typeof bookingSchema>

const contentNeeds = [
  { value: 'launch-video', label: 'Launch Video' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'event-recap', label: 'Event Recap' },
  { value: 'multiple', label: 'Multiple / Not Sure' },
]

const stages = [
  { value: 'pre-seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b-plus', label: 'Series B+' },
  { value: 'bootstrapped', label: 'Bootstrapped' },
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
  { value: 'google', label: 'Google' },
  { value: 'referral', label: 'Referral' },
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
    role: '',
    stage: '',
    companyUrl: '',
    service: '',
    launchDate: '',
    budget: '',
    timeline: '',
    referral: '',
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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
      await submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
        message: `[Role: ${formData.role}] [Stage: ${formData.stage}]${formData.companyUrl ? ` [Website: ${formData.companyUrl}]` : ''}${formData.launchDate ? ` [Launch/Event Date: ${formData.launchDate}]` : ''}\n\n${formData.message}`,
        phone: formData.phone,
        budget: formData.budget,
        timeline: formData.timeline,
        referral: formData.referral,
      })

      setIsSubmitted(true)
      setTimeout(() => {
        openCalModal()
      }, 300)
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeSheet()
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        stage: '',
        companyUrl: '',
        service: '',
        launchDate: '',
        budget: '',
        timeline: '',
        referral: '',
        message: '',
        website: '',
      })
      setErrors({})
      setSubmitError(null)
    }, 300)
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-3 py-2 rounded-lg bg-m3-surface text-m3-on-surface text-sm border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-outline/30'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all`

  const selectClasses = (hasError: boolean) =>
    `w-full px-3 py-2 rounded-lg bg-m3-surface text-m3-on-surface text-sm border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-outline/30'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all appearance-none cursor-pointer`

  const labelClasses = "text-xs font-medium text-m3-on-surface/80 mb-1 block"

  const SelectArrow = () => (
    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg className="w-3.5 h-3.5 text-m3-on-surface/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 z-[120]"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-m3-surface-variant z-[120] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-m3-surface-variant px-5 pt-5 pb-4 relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 hover:bg-m3-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-m3-on-surface/70" />
              </button>
              <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface text-center">Tell us about your project</h2>
              <p className="text-xs text-m3-on-surface/50 text-center mt-1">We reply within 1 business day</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-m3-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-m3-on-surface mb-2">You're booked!</h3>
                  <p className="text-m3-on-surface/60 text-sm mb-5">
                    Check your inbox for the calendar invite.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/work"
                      onClick={handleClose}
                      className="m3-outlined-button inline-flex items-center justify-center text-sm py-2"
                    >
                      View Our Work
                    </Link>
                    <button
                      onClick={handleClose}
                      className="m3-text-button text-m3-primary text-sm"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  {/* Name & Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClasses}>Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses(!!errors.name)} placeholder="Your name" />
                      {errors.name && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses(!!errors.email)} placeholder="you@startup.com" />
                      {errors.email && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone & Startup Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClasses}>Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses(!!errors.phone)} placeholder="(555) 123-4567" />
                      {errors.phone && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>Startup Name *</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClasses(!!errors.company)} placeholder="Your startup" />
                      {errors.company && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.company}</p>}
                    </div>
                  </div>

                  {/* Role & Stage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClasses}>Your Role *</label>
                      <input type="text" name="role" value={formData.role} onChange={handleChange} className={inputClasses(!!errors.role)} placeholder="CEO, Head of Marketing…" />
                      {errors.role && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.role}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>Stage *</label>
                      <div className="relative">
                        <select name="stage" value={formData.stage} onChange={handleChange} className={selectClasses(!!errors.stage)}>
                          <option value="">Select</option>
                          {stages.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <SelectArrow />
                      </div>
                      {errors.stage && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.stage}</p>}
                    </div>
                  </div>

                  {/* Website & Content Need */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClasses}>Website</label>
                      <input type="url" name="companyUrl" value={formData.companyUrl} onChange={handleChange} className={inputClasses(false)} placeholder="https://…" />
                    </div>
                    <div>
                      <label className={labelClasses}>Content Need *</label>
                      <div className="relative">
                        <select name="service" value={formData.service} onChange={handleChange} className={selectClasses(!!errors.service)}>
                          <option value="">Select</option>
                          {contentNeeds.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <SelectArrow />
                      </div>
                      {errors.service && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.service}</p>}
                    </div>
                  </div>

                  {/* Launch Date & Budget */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClasses}>Launch / Event Date</label>
                      <input type="text" name="launchDate" value={formData.launchDate} onChange={handleChange} className={inputClasses(false)} placeholder="e.g. March 2026" />
                    </div>
                    <div>
                      <label className={labelClasses}>Budget *</label>
                      <div className="relative">
                        <select name="budget" value={formData.budget} onChange={handleChange} className={selectClasses(!!errors.budget)}>
                          <option value="">Select</option>
                          {budgetRanges.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                        </select>
                        <SelectArrow />
                      </div>
                      {errors.budget && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.budget}</p>}
                    </div>
                  </div>

                  {/* Timeline & Referral */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClasses}>Timeline *</label>
                      <div className="relative">
                        <select name="timeline" value={formData.timeline} onChange={handleChange} className={selectClasses(!!errors.timeline)}>
                          <option value="">Select</option>
                          {timelines.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        <SelectArrow />
                      </div>
                      {errors.timeline && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.timeline}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>How'd you find us? *</label>
                      <div className="relative">
                        <select name="referral" value={formData.referral} onChange={handleChange} className={selectClasses(!!errors.referral)}>
                          <option value="">Select</option>
                          {referralSources.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                        </select>
                        <SelectArrow />
                      </div>
                      {errors.referral && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.referral}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClasses}>Tell us about your project *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClasses(!!errors.message)} resize-none`}
                      placeholder="What are you launching? What content do you need?"
                    />
                    {errors.message && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <p className="text-m3-secondary text-xs">{submitError}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full m3-filled-button flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Calendar className="w-4 h-4" />
                    )}
                    Book a Discovery Call
                  </button>

                  {/* Trust Signals */}
                  <div className="pt-4 border-t border-m3-outline/20 mt-4">
                    <div className="flex items-center justify-center gap-6 text-m3-on-surface/50">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs">30 min call</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs">No commitment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs">Free quote</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
