'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { supabase } from '@/integrations/supabase/client'
import { useWhere2BoysSheet } from '@/contexts/Where2BoysSheetContext'

const COLLAB_TYPES = ['Event coverage', 'Restaurant feature', 'Brand partnership', 'Creator partnership', 'Travel invite', 'Other']
const TIMELINES = ['ASAP', 'This month', 'Next month', '2 to 3 months', 'Flexible']
const BUDGETS = ['Under $1K', '$1K to $3K', '$3K to $5K', '$5K to $10K', '$10K+', 'Need a quote']

export function Where2BoysContactSheet() {
  const { isOpen, closeSheet } = useWhere2BoysSheet()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      collab_type: String(fd.get('collab_type') || ''),
      timeline: String(fd.get('timeline') || ''),
      budget_range: String(fd.get('budget_range') || ''),
      message: String(fd.get('message') || ''),
      source: 'where2boys',
    }
    const { error: dbError } = await supabase.from('contact_submissions').insert(payload as never)
    if (dbError) {
      setError('Something went wrong. Please try again or DM us @where2boys.')
      setSubmitting(false)
      return
    }
    setSuccess(true)
    setSubmitting(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeSheet()
      setTimeout(() => {
        setSuccess(false)
        setError(null)
      }, 300)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto p-0 border-l-0"
        style={{ background: '#F5EDDF' }}
      >
        <SheetHeader className="px-6 pt-6 pb-2 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#E84228' }}>
            Tell us where
          </p>
          <SheetTitle className="font-fredoka font-bold text-2xl sm:text-3xl text-m3-on-surface">
            Let's work together
          </SheetTitle>
        </SheetHeader>

        <div className="px-6 pb-8 pt-4">
          {success ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-m3-outline p-8 text-center bg-m3-surface"
            >
              <div className="w-14 h-14 rounded-full bg-m3-surface-dark text-m3-on-dark flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-fredoka font-bold text-2xl text-m3-on-surface mb-2">Got it.</h3>
              <p className="text-base text-m3-on-surface/70">
                We'll be in touch. If it's time-sensitive, DM us on Instagram.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Company or handle" name="company" />
              <SelectField label="What kind of collab?" name="collab_type" options={COLLAB_TYPES} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField label="Timeline" name="timeline" options={TIMELINES} />
                <SelectField label="Budget range" name="budget_range" options={BUDGETS} />
              </div>
              <TextareaField label="Tell us about it" name="message" required />

              {error && (
                <p role="alert" className="text-sm" style={{ color: '#E84228' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full text-m3-on-dark font-fredoka font-semibold text-base sm:text-lg py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ background: '#E84228' }}
              >
                {submitting ? 'Sending' : 'Send'}
              </button>

              <p className="text-center text-sm text-m3-on-surface/60">
                Or DM us at{' '}
                <a
                  href="https://www.instagram.com/where2boys/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                  style={{ color: '#E84228' }}
                >
                  @where2boys
                </a>
              </p>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  const id = `w2b-sheet-${name}`
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-semibold text-m3-on-surface mb-1.5">
        {label}
        {required && <span style={{ color: '#E84228' }}> *</span>}
      </span>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-m3-outline bg-m3-surface px-4 py-3 text-base text-m3-on-surface focus:outline-none focus:ring-2 focus:border-transparent"
        style={{ ['--tw-ring-color' as never]: '#E84228' }}
      />
    </label>
  )
}

function SelectField({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  const id = `w2b-sheet-${name}`
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-semibold text-m3-on-surface mb-1.5">
        {label}
        {required && <span style={{ color: '#E84228' }}> *</span>}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-xl border border-m3-outline bg-m3-surface px-4 py-3 text-base text-m3-on-surface focus:outline-none focus:ring-2 focus:border-transparent"
        style={{ ['--tw-ring-color' as never]: '#E84228' }}
      >
        <option value="" disabled></option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextareaField({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  const id = `w2b-sheet-${name}`
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-semibold text-m3-on-surface mb-1.5">
        {label}
        {required && <span style={{ color: '#E84228' }}> *</span>}
      </span>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        className="w-full rounded-xl border border-m3-outline bg-m3-surface px-4 py-3 text-base text-m3-on-surface focus:outline-none focus:ring-2 focus:border-transparent resize-y"
        style={{ ['--tw-ring-color' as never]: '#E84228' }}
      />
    </label>
  )
}