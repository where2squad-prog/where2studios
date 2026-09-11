'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { toast } from '@/components/ui/sonner'
import { submitContact } from '@/lib/submitContact'
import { deliverables } from '@/data/deliverables'

const schema = z.object({
  name: z.string().trim().min(1, 'Add your name').max(100),
  email: z.string().trim().email('Add a valid email').max(255),
  company: z.string().trim().min(1, 'Add your company').max(120),
  eventDates: z.string().trim().min(1, 'Add your date').max(120),
  venue: z.string().trim().min(1, 'Add a venue or neighborhood').max(120),
  need: z.string().trim().min(1, 'Pick what you need'),
})

type FormValues = z.infer<typeof schema>

const empty: FormValues = {
  name: '',
  email: '',
  company: '',
  eventDates: '',
  venue: '',
  need: '',
}

export const conventionNeedOptions = [
  ...deliverables.map((d) => d.title),
  'Sponsor coverage',
  'Not sure yet',
]

interface ConventionFormProps {
  slug: string
  conventionName: string
  year: number
  preselected: string
  onPreselect: (value: string) => void
}

export function ConventionForm({
  slug,
  conventionName,
  year,
  preselected,
  onPreselect,
}: ConventionFormProps) {
  const [values, setValues] = useState<FormValues>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const need = preselected || values.need
  const conference = `${conventionName} ${year}`

  const set = (key: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    if (key === 'need') onPreselect(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse({ ...values, need })
    if (!parsed.success) {
      const next: Partial<Record<keyof FormValues, string>> = {}
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) next[err.path[0] as keyof FormValues] = err.message
      })
      setErrors(next)
      return
    }

    setSubmitting(true)
    try {
      await submitContact({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        service: parsed.data.need,
        timeline: parsed.data.eventDates,
        message: `${conference} coverage request.\nEvent date or dates: ${parsed.data.eventDates}\nVenue or neighborhood: ${parsed.data.venue}\nWhat they need: ${parsed.data.need}`,
        source: `convention:${slug}`,
      })
      toast.success(`Got it. We will get back to you about your ${conventionName} dates.`)
      setDone(true)
      setValues(empty)
      onPreselect('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl bg-m3-surface border border-m3-outline px-4 py-3 text-sm text-m3-on-surface placeholder:text-m3-on-surface/40 focus:outline-none focus:ring-2 focus:ring-m3-primary'
  const labelClass = 'block text-xs font-semibold text-m3-on-surface/70 mb-1.5'

  if (done) {
    return (
      <div role="status" aria-live="polite" className="m3-elevated-card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-m3-primary/10 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-m3-primary" />
        </div>
        <h3 className="font-fredoka text-2xl font-semibold text-m3-on-surface mb-2">Got it.</h3>
        <p className="text-sm text-m3-on-surface/70">
          We reply within one business day. During conference week we reply same day.
        </p>
        <button onClick={() => setDone(false)} className="m3-text-button text-m3-primary mt-4">
          Send another date
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input type="hidden" name="conference" value={conference} readOnly />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="cv-name">
            Name
          </label>
          <input
            id="cv-name"
            className={inputClass}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
          />
          {errors.name && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="cv-email">
            Email
          </label>
          <input
            id="cv-email"
            type="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
          />
          {errors.email && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="cv-company">
          Company
        </label>
        <input
          id="cv-company"
          className={inputClass}
          value={values.company}
          onChange={(e) => set('company', e.target.value)}
        />
        {errors.company && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.company}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="cv-dates">
            Event date or dates
          </label>
          <input
            id="cv-dates"
            className={inputClass}
            placeholder="Day two, all day"
            value={values.eventDates}
            onChange={(e) => set('eventDates', e.target.value)}
          />
          {errors.eventDates && (
            <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.eventDates}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="cv-venue">
            Venue or neighborhood
          </label>
          <input
            id="cv-venue"
            className={inputClass}
            placeholder="Near Moscone"
            value={values.venue}
            onChange={(e) => set('venue', e.target.value)}
          />
          {errors.venue && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.venue}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="cv-need">
          What you need
        </label>
        <select
          id="cv-need"
          className={inputClass}
          value={need}
          onChange={(e) => set('need', e.target.value)}
        >
          <option value="">Pick one</option>
          {conventionNeedOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.need && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.need}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="m3-filled-button w-full text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Send it over
      </button>
      <p className="text-xs text-m3-on-surface/60 text-center">
        We reply within one business day. During conference week we reply same day.
      </p>
    </form>
  )
}
