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
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100).optional(),
  companyUrl: z.string().trim().max(255).optional(),
  growthGoal: z.string().min(1, 'Please select a growth goal'),
  service: z.string().min(1, 'Please select what you need help with'),
  budget: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, 'Notes are required').max(2000),
  website: z.string().max(0, 'Bot detected'), // Honeypot
})

type ContactFormData = z.infer<typeof contactSchema>

const growthGoals = [
  { value: 'launch', label: 'Launch' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'leads', label: 'Leads' },
  { value: 'sales', label: 'Sales' },
  { value: 'hiring', label: 'Hiring' },
  { value: 'community', label: 'Community' },
]

const serviceNeeds = [
  { value: 'strategy', label: 'Strategy' },
  { value: 'production', label: 'Production' },
  { value: 'marketing-execution', label: 'Marketing Execution' },
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
    companyUrl: '',
    growthGoal: '',
    service: '',
    budget: '',
    timeline: '',
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
        company: formData.company || undefined,
        service: formData.service,
        message: `[Growth Goal: ${formData.growthGoal}]${formData.role ? ` [Role: ${formData.role}]` : ''}${formData.companyUrl ? ` [Website: ${formData.companyUrl}]` : ''}\n\n${formData.message}`,
        phone: formData.phone || undefined,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
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
      companyUrl: '',
      growthGoal: '',
      service: '',
      budget: '',
      timeline: '',
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
          Got it.
        </h3>
        <p className="text-m3-on-surface/60 mb-6">
          We'll reply within 1 business day with next steps, then you can book your strategy call.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!pendingCalOpen && (
            <button
              onClick={openCalModal}
              className="m3-filled-button flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book a Strategy Call
            </button>
          )}
          <Link
            to="/work"
            className="m3-outlined-button inline-flex items-center justify-center"
          >
            See Our Work
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
            <label className={labelClasses}>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses(!!errors.name)} placeholder="Your name" />
            {errors.name && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.name}</p>}
          </div>
          <div>
            <label className={labelClasses}>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses(!!errors.email)} placeholder="you@company.com" />
            {errors.email && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.email}</p>}
          </div>
        </div>

        {/* Phone & Company */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClasses}>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses(!!errors.phone)} placeholder="Best number to reach you" />
          </div>
          <div>
            <label className={labelClasses}>Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClasses(!!errors.company)} placeholder="Company name" />
          </div>
        </div>

        {/* Role & Website */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Role</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className={inputClasses(false)} placeholder="Founder, marketing, ops" />
            </div>
            <div>
              <label className={labelClasses}>Website</label>
              <input type="url" name="companyUrl" value={formData.companyUrl} onChange={handleChange} className={inputClasses(false)} placeholder="Link, if you have it" />
            </div>
          </div>
        )}

        {/* Growth Goal & Service Need */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClasses}>What are you trying to grow? *</label>
            <select name="growthGoal" value={formData.growthGoal} onChange={handleChange} className={selectClasses(!!errors.growthGoal)}>
              <option value="">Select</option>
              {growthGoals.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
            {errors.growthGoal && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.growthGoal}</p>}
          </div>
          <div>
            <label className={labelClasses}>What do you need help with? *</label>
            <select name="service" value={formData.service} onChange={handleChange} className={selectClasses(!!errors.service)}>
              <option value="">Select</option>
              {serviceNeeds.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            {errors.service && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.service}</p>}
          </div>
        </div>

        {/* Timeline & Budget */}
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Timeline</label>
              <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} className={inputClasses(false)} placeholder="When do you want to launch" />
            </div>
            <div>
              <label className={labelClasses}>Budget range</label>
              <input type="text" name="budget" value={formData.budget} onChange={handleChange} className={inputClasses(false)} placeholder="A range is fine" />
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className={labelClasses}>Notes *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className={`${inputClasses(!!errors.message)} resize-none`}
            placeholder="What's working, what's not, what you want to improve"
          />
          {errors.message && <p className="text-m3-secondary text-[10px] mt-0.5">{errors.message}</p>}
        </div>

        {submitError && (
          <p className="text-m3-secondary text-xs">{submitError}</p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="m3-filled-button flex items-center justify-center gap-2 flex-1 py-2.5 text-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
