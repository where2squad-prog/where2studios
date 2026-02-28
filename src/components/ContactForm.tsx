'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Send, Calendar } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'
import { useCalModal } from '@/hooks/useCalModal'
import { Link } from 'react-router-dom'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  company: z.string().trim().min(1, 'Startup name is required').max(100),
  role: z.string().trim().min(1, 'Role is required').max(100),
  stage: z.string().min(1, 'Stage is required'),
  companyUrl: z.string().trim().max(255).optional(),
  service: z.string().min(1, 'Content need is required'),
  launchDate: z.string().trim().max(100).optional(),
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  referral: z.string().min(1, 'Please tell us how you heard about us'),
  message: z.string().trim().min(1, 'Message is required').max(2000),
  website: z.string().max(0, 'Bot detected'), // Honeypot
})

type ContactFormData = z.infer<typeof contactSchema>

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
  { value: 'youtube', label: 'YouTube' },
  { value: 'google', label: 'Google Search' },
  { value: 'referral', label: 'Word of mouth/referral' },
  { value: 'event', label: 'Event/conference' },
  { value: 'other', label: 'Other' },
]

interface ContactFormProps {
  showBookCall?: boolean
  compact?: boolean
}

export function ContactForm({ showBookCall = true, compact = false }: ContactFormProps) {
  const { openCalModal } = useCalModal()
  const [formData, setFormData] = useState<ContactFormData>({
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
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [pendingCalOpen, setPendingCalOpen] = useState(false)

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
      setPendingCalOpen(openCalAfter)

      if (openCalAfter) {
        openCalModal()
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setPendingCalOpen(false)
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
        <h3 className="text-2xl font-bold text-m3-on-surface mb-2">
          {pendingCalOpen ? "You're booked!" : "Thanks, we got your message"}
        </h3>
        <p className="text-m3-on-surface/60 mb-6">
          {pendingCalOpen
            ? "Check your inbox for the calendar invite. Excited to meet you!"
            : "We'll reply within 1 business day. Want to move faster? Book a call now."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!pendingCalOpen && (
            <button
              onClick={openCalModal}
              className="m3-filled-button flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book a Discovery Call
            </button>
          )}
          <Link
            to="/work"
            className="m3-outlined-button inline-flex items-center justify-center"
          >
            View Our Work
          </Link>
        </div>
        <button
          onClick={resetForm}
          className="m3-text-button text-m3-primary mt-4"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-xl bg-m3-surface-variant text-m3-on-surface text-sm border ${
      hasError ? 'border-m3-secondary' : 'border-transparent'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/30`

  const selectClasses = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-xl bg-m3-surface-variant text-m3-on-surface text-sm border ${
      hasError ? 'border-m3-secondary' : 'border-transparent'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/30`

  const labelClasses = "text-xs font-medium text-m3-on-surface/70 mb-1.5 block"

  return (
    <div className="m3-elevated-card p-5 sm:p-6">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }} className="space-y-4">
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
        <div className="grid sm:grid-cols-2 gap-3">
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
        <div className="grid sm:grid-cols-2 gap-3">
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
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Your Role *</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className={inputClasses(!!errors.role)} placeholder="CEO, Head of Marketing…" />
              {errors.role && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.role}</p>}
            </div>
            <div>
              <label className={labelClasses}>Stage *</label>
              <select name="stage" value={formData.stage} onChange={handleChange} className={selectClasses(!!errors.stage)}>
                <option value="">Select stage</option>
                {stages.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {errors.stage && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.stage}</p>}
            </div>
          </div>
        )}

        {/* Website & Content Need */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Website</label>
              <input type="url" name="companyUrl" value={formData.companyUrl} onChange={handleChange} className={inputClasses(false)} placeholder="https://…" />
            </div>
            <div>
              <label className={labelClasses}>Content Need *</label>
              <select name="service" value={formData.service} onChange={handleChange} className={selectClasses(!!errors.service)}>
                <option value="">Select</option>
                {contentNeeds.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {errors.service && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.service}</p>}
            </div>
          </div>
        )}

        {/* Launch Date & Budget */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Launch / Event Date</label>
              <input type="text" name="launchDate" value={formData.launchDate} onChange={handleChange} className={inputClasses(false)} placeholder="e.g. March 2026" />
            </div>
            <div>
              <label className={labelClasses}>Budget *</label>
              <select name="budget" value={formData.budget} onChange={handleChange} className={selectClasses(!!errors.budget)}>
                <option value="">Select budget</option>
                {budgetRanges.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
              {errors.budget && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.budget}</p>}
            </div>
          </div>
        )}

        {/* Timeline & Referral */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Timeline *</label>
              <select name="timeline" value={formData.timeline} onChange={handleChange} className={selectClasses(!!errors.timeline)}>
                <option value="">Select timeline</option>
                {timelines.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              {errors.timeline && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.timeline}</p>}
            </div>
            <div>
              <label className={labelClasses}>How'd you find us? *</label>
              <select name="referral" value={formData.referral} onChange={handleChange} className={selectClasses(!!errors.referral)}>
                <option value="">Select an option</option>
                {referralSources.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              {errors.referral && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.referral}</p>}
            </div>
          </div>
        )}

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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {showBookCall && (
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting || !isValid()}
              className="m3-filled-button flex items-center justify-center gap-2 flex-1 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              Book a Discovery Call
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${showBookCall ? 'm3-outlined-button' : 'm3-filled-button'} flex items-center justify-center gap-2 flex-1 py-2.5 text-sm disabled:opacity-50`}
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
