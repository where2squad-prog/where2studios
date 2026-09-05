'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'

const auditSchema = z.object({
  restaurant: z.string().trim().min(1, 'Required').max(100),
  name: z.string().trim().min(1, 'Required').max(100),
  email: z.string().trim().email('Enter a valid email').max(255),
  phone: z.string().trim().max(20).optional(),
  handle: z.string().trim().min(1, 'Required').max(60),
  goal: z.string().min(1, 'Required'),
  notes: z.string().trim().max(2000).optional(),
  website: z.string().max(0, 'Bot detected'),
})

type AuditFormData = z.infer<typeof auditSchema>

const goals = [
  { value: 'foot-traffic', label: 'Foot traffic' },
  { value: 'followers', label: 'Followers' },
  { value: 'catering-events', label: 'Catering & events' },
  { value: 'online-orders', label: 'Online orders' },
]

const emptyForm: AuditFormData = {
  restaurant: '',
  name: '',
  email: '',
  phone: '',
  handle: '',
  goal: '',
  notes: '',
  website: '',
}

export function AuditForm() {
  const reduce = useReducedMotion()
  const [formData, setFormData] = useState<AuditFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof AuditFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof AuditFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = () => {
    try {
      auditSchema.parse(formData)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const next: Partial<Record<keyof AuditFormData, string>> = {}
        err.errors.forEach((e) => {
          if (e.path[0]) next[e.path[0] as keyof AuditFormData] = e.message
        })
        setErrors(next)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError(null)

    const handle = formData.handle.replace(/^@+/, '')
    const goalLabel = goals.find((g) => g.value === formData.goal)?.label ?? formData.goal

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.restaurant,
        service: 'social-media',
        referral: 'where2socials-page',
        message: `[IG: @${handle}] [Goal: ${goalLabel}]\n\n${formData.notes || ''}`,
      })
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (hasError?: boolean) =>
    `w-full px-3 py-2.5 rounded-lg bg-m3-surface text-m3-on-surface text-sm border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-outline/40'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-all`

  const labelClasses = 'text-xs font-medium text-m3-on-surface/80 mb-1.5 block'

  if (isSubmitted) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        aria-live="polite"
        className="m3-outlined-card p-8 text-center"
      >
        <div className="w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-m3-primary" />
        </div>
        <p className="text-m3-on-surface/80 text-base max-w-sm mx-auto">
          Got it. We will look at your Instagram and reply within 1 business day.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="m3-outlined-card p-5 sm:p-7 space-y-4" noValidate>
      {/* Honeypot */}
      <div className="absolute w-0 h-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="socials-website">Website</label>
        <input
          id="socials-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="socials-restaurant" className={labelClasses}>
            Restaurant name *
          </label>
          <input
            id="socials-restaurant"
            name="restaurant"
            type="text"
            value={formData.restaurant}
            onChange={handleChange}
            aria-invalid={!!errors.restaurant}
            className={inputClasses(!!errors.restaurant)}
          />
          {errors.restaurant && (
            <p role="alert" className="text-xs text-m3-secondary mt-1">
              {errors.restaurant}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="socials-name" className={labelClasses}>
            Your name *
          </label>
          <input
            id="socials-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            className={inputClasses(!!errors.name)}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-m3-secondary mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="socials-email" className={labelClasses}>
            Email *
          </label>
          <input
            id="socials-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            className={inputClasses(!!errors.email)}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-m3-secondary mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="socials-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="socials-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses(false)}
          />
        </div>

        <div>
          <label htmlFor="socials-handle" className={labelClasses}>
            Instagram handle *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-m3-on-surface/50 pointer-events-none">
              @
            </span>
            <input
              id="socials-handle"
              name="handle"
              type="text"
              value={formData.handle}
              onChange={handleChange}
              aria-invalid={!!errors.handle}
              className={`${inputClasses(!!errors.handle)} pl-7`}
            />
          </div>
          {errors.handle && (
            <p role="alert" className="text-xs text-m3-secondary mt-1">
              {errors.handle}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="socials-goal" className={labelClasses}>
            What do you want more of? *
          </label>
          <select
            id="socials-goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            aria-invalid={!!errors.goal}
            className={`${inputClasses(!!errors.goal)} cursor-pointer`}
          >
            <option value=""></option>
            {goals.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          {errors.goal && (
            <p role="alert" className="text-xs text-m3-secondary mt-1">
              {errors.goal}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="socials-notes" className={labelClasses}>
          Notes
        </label>
        <textarea
          id="socials-notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          className={inputClasses(false)}
        />
      </div>

      {submitError && (
        <p role="alert" aria-live="assertive" className="text-sm text-m3-secondary">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="m3-filled-button w-full inline-flex items-center justify-center gap-2 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? 'Sending' : 'Send my audit request'}
      </button>
    </form>
  )
}
