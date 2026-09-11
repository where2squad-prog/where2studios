'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, Check, Send } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { conventions, conventionSortKey } from '@/lib/conventions'
import { Link } from 'react-router-dom'

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100).optional(),
  conference: z.string().min(1, 'Required'),
  eventDates: z.string().trim().max(120).optional(),
  running: z.string().min(1, 'Required'),
  service: z.string().min(1, 'Required'),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, 'Required').max(2000),
  website: z.string().max(0, 'Bot detected'),
})

type BookingFormData = z.infer<typeof bookingSchema>

const conferenceOptions = [
  ...[...conventions]
    .sort((a, b) => conventionSortKey(a).localeCompare(conventionSortKey(b)))
    .map((c) => c.name),
  'Another conference',
  'Not tied to a conference',
]

const runningOptions = [
  'Brand HQ or experience hub',
  'Hospitality suite or lounge',
  'Side event or party',
  'Sponsor activation',
  'Exec content or podcast',
  'Other',
]

const needOptions = [
  'Activation recap',
  'Exec clips for LinkedIn',
  'Same week social cutdowns',
  'Full week coverage',
  'Sponsor cut',
  'Not sure yet',
]

const emptyForm: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  conference: '',
  eventDates: '',
  running: '',
  service: '',
  budget: '',
  message: '',
  website: '',
}

export function BookingFormSheet() {
  const { isOpen, closeSheet, prefill } = useBookingSheet()
  const [formData, setFormData] = useState<BookingFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Apply prefill values whenever the sheet opens
  useEffect(() => {
    if (!isOpen) return
    setFormData((prev) => ({
      ...prev,
      conference: prefill.conference && conferenceOptions.includes(prefill.conference)
        ? prefill.conference
        : prefill.conference
          ? 'Another conference'
          : prev.conference,
      running: prefill.running ?? prev.running,
      service: prefill.need ?? prev.service,
      message: prefill.venue ? `Venue: ${prefill.venue}\n${prev.message}`.trim() : prev.message,
    }))
  }, [isOpen, prefill])

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const parsed = bookingSchema.safeParse(formData)
    if (parsed.success) {
      setErrors({})
      return true
    }
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {}
    parsed.error.errors.forEach((e) => {
      if (e.path[0]) newErrors[e.path[0] as keyof BookingFormData] = e.message
    })
    setErrors(newErrors)
    return false
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
        company: formData.company || undefined,
        service: formData.service,
        message: `[Conference: ${formData.conference}] [Running: ${formData.running}]${
          formData.role ? ` [Role: ${formData.role}]` : ''
        }\n\n${formData.message}`,
        phone: formData.phone || undefined,
        budget: formData.budget || undefined,
        timeline: formData.eventDates || undefined,
        source: prefill.source || 'booking-sheet',
      })

      setIsSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = useCallback(() => {
    closeSheet()
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData(emptyForm)
      setErrors({})
      setSubmitError(null)
    }, 300)
  }, [closeSheet])

  const inputClasses = (hasError: boolean) =>
    `w-full px-3 py-2 rounded-lg bg-m3-surface text-m3-on-surface text-sm border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-outline/30'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all`

  const selectClasses = (hasError: boolean) =>
    `${inputClasses(hasError)} appearance-none cursor-pointer`

  const labelClasses = 'text-xs font-medium text-m3-on-surface/80 mb-1 block'

  const SelectArrow = () => (
    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        className="w-3.5 h-3.5 text-m3-on-surface/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
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
                aria-label="Close"
              >
                <X className="w-5 h-5 text-m3-on-surface/70" />
              </button>
              <h2 className="font-fredoka text-xl font-semibold text-m3-on-surface text-center">
                Tell us about your convention week
              </h2>
              <p className="text-xs text-m3-on-surface/50 text-center mt-1">
                We reply within 1 business day
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  aria-live="polite"
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-m3-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-m3-on-surface mb-2">Got it.</h3>
                  <p className="text-m3-on-surface/60 text-sm mb-5">
                    We reply within 1 business day with a scope and a price for your dates.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/work"
                      onClick={handleClose}
                      className="m3-outlined-button inline-flex items-center justify-center text-sm py-2"
                    >
                      See Our Work
                    </Link>
                    <button onClick={handleClose} className="m3-text-button text-m3-primary text-sm">
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
                      <label htmlFor="booking-name" className={labelClasses}>
                        Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        name="name"
                        required
                        aria-required="true"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses(!!errors.name)}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-m3-secondary text-[10px] mt-0.5">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-email" className={labelClasses}>
                        Email *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        name="email"
                        required
                        aria-required="true"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses(!!errors.email)}
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p className="text-m3-secondary text-[10px] mt-0.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="booking-phone" className={labelClasses}>
                        Phone
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses(false)}
                        placeholder="Best number to reach you"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-company" className={labelClasses}>
                        Company
                      </label>
                      <input
                        id="booking-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClasses(false)}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="booking-role" className={labelClasses}>
                      Role
                    </label>
                    <input
                      id="booking-role"
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={inputClasses(false)}
                      placeholder="Marketing, events, founder"
                    />
                  </div>

                  {/* Conference & dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="booking-conference" className={labelClasses}>
                        Conference *
                      </label>
                      <div className="relative">
                        <select
                          id="booking-conference"
                          name="conference"
                          required
                          aria-required="true"
                          value={formData.conference}
                          onChange={handleChange}
                          className={selectClasses(!!errors.conference)}
                        >
                          <option value="">Select</option>
                          {conferenceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <SelectArrow />
                      </div>
                      {errors.conference && (
                        <p className="text-m3-secondary text-[10px] mt-0.5">{errors.conference}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-eventDates" className={labelClasses}>
                        Event dates
                      </label>
                      <input
                        id="booking-eventDates"
                        type="text"
                        name="eventDates"
                        value={formData.eventDates}
                        onChange={handleChange}
                        className={inputClasses(false)}
                        placeholder="Oct 5 to 7"
                      />
                    </div>
                  </div>

                  {/* Running */}
                  <div>
                    <label htmlFor="booking-running" className={labelClasses}>
                      What are you running? *
                    </label>
                    <div className="relative">
                      <select
                        id="booking-running"
                        name="running"
                        required
                        aria-required="true"
                        value={formData.running}
                        onChange={handleChange}
                        className={selectClasses(!!errors.running)}
                      >
                        <option value="">Select</option>
                        {runningOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    {errors.running && (
                      <p className="text-m3-secondary text-[10px] mt-0.5">{errors.running}</p>
                    )}
                  </div>

                  {/* Need */}
                  <div>
                    <label htmlFor="booking-service" className={labelClasses}>
                      What do you need? *
                    </label>
                    <div className="relative">
                      <select
                        id="booking-service"
                        name="service"
                        required
                        aria-required="true"
                        value={formData.service}
                        onChange={handleChange}
                        className={selectClasses(!!errors.service)}
                      >
                        <option value="">Select</option>
                        {needOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    {errors.service && (
                      <p className="text-m3-secondary text-[10px] mt-0.5">{errors.service}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="booking-budget" className={labelClasses}>
                      Budget range
                    </label>
                    <input
                      id="booking-budget"
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClasses(false)}
                      placeholder="A range is fine"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="booking-message" className={labelClasses}>
                      Notes *
                    </label>
                    <textarea
                      id="booking-message"
                      name="message"
                      required
                      aria-required="true"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClasses(!!errors.message)} resize-none`}
                      placeholder="Venue, run of show, deliverables"
                    />
                    {errors.message && (
                      <p className="text-m3-secondary text-[10px] mt-0.5">{errors.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <p role="alert" className="text-m3-secondary text-xs">
                      {submitError}
                    </p>
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
                      <Send className="w-4 h-4" />
                    )}
                    Send
                  </button>

                  {/* Trust Signals */}
                  <div className="pt-4 border-t border-m3-outline/20 mt-4">
                    <div className="flex items-center justify-center gap-6 text-m3-on-surface/50">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs">30 min call</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs">No commitment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
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
