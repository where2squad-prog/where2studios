'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'
import { serviceChoices } from '@/data/smallBusiness'

const schema = z.object({
  business: z.string().trim().min(1, 'Add your business name').max(100),
  name: z.string().trim().min(1, 'Add your name').max(100),
  contact: z.string().trim().min(5, 'Add a phone number or email').max(255),
  handle: z.string().trim().max(60).optional(),
  website: z.string().max(0, 'Bot detected'),
})

type Values = z.infer<typeof schema>
type FieldErrors = Partial<Record<keyof Values, string>>

const empty: Values = { business: '', name: '', contact: '', handle: '', website: '' }

/** submit-contact needs an email; phone-only leads carry this placeholder, as on the Backyard Bayou page. */
const FALLBACK_EMAIL = 'noemail@where2studios.com'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'

interface SmallBizFormProps {
  /** Service ids picked on the page (price list buttons) or in the form. */
  selected: string[]
  onToggle: (id: string) => void
  onBookCall: () => void
}

export function SmallBizForm({ selected, onToggle, onBookCall }: SmallBizFormProps) {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof Values]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      const next: FieldErrors = {}
      parsed.error.errors.forEach((err) => {
        const key = err.path[0] as keyof Values
        if (key && !next[key]) next[key] = err.message
      })
      setErrors(next)
      const first = Object.keys(next)[0]
      if (first) document.getElementById(`sb-${first}`)?.focus()
      return
    }

    setSending(true)
    setSubmitError(null)

    const contact = values.contact.trim()
    const isEmail = contact.includes('@') && !contact.startsWith('@')
    const handle = (values.handle || '').trim().replace(/^@+/, '')
    const picked = serviceChoices.filter((c) => selected.includes(c.id)).map((c) => c.label)

    try {
      await submitContact({
        name: values.name.trim(),
        email: isEmail ? contact : FALLBACK_EMAIL,
        phone: isEmail ? undefined : contact,
        company: values.business.trim(),
        service: picked.length ? picked.join(', ') : 'Not picked',
        referral: 'small-business-page',
        source: 'socials',
        message: [
          '[Small business page inquiry]',
          `Business: ${values.business.trim()}`,
          `Interested in: ${picked.length ? picked.join(', ') : 'Not picked'}`,
          handle ? `Instagram: @${handle}` : null,
          `Contact: ${contact}`,
        ]
          .filter(Boolean)
          .join('\n'),
      })
      setSent(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? `${err.message}. Try again, or email contact@where2studios.com.`
          : 'That did not send. Try again, or email contact@where2studios.com.'
      )
    } finally {
      setSending(false)
    }
  }

  const input = (hasError?: boolean) =>
    `w-full px-3.5 py-3 rounded-xl bg-m3-surface text-m3-on-surface text-base border ${
      hasError ? 'border-m3-secondary ring-1 ring-m3-secondary' : 'border-m3-on-surface/15'
    } focus:outline-none focus:ring-2 focus:ring-m3-primary/50 focus:border-m3-primary transition-colors`

  const label = 'block text-sm font-medium normal-case tracking-normal text-m3-on-surface/80 mb-1.5'

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="rounded-3xl bg-m3-surface p-8 sm:p-10 text-center shadow-[var(--shadow-md)]">
        <div className="w-14 h-14 bg-m3-primary/15 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-m3-primary" aria-hidden="true" />
        </div>
        <p className="font-fredoka text-2xl font-semibold text-m3-on-surface">Sent. We will reach out within one business day.</p>
        <p className="mt-3 text-sm text-m3-on-surface/65">Want to pick a time now instead?</p>
        <button type="button" onClick={onBookCall} className={`m3-outlined-button mt-4 ${focusRing}`}>
          Book a 15 minute call
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Tell us about your business"
      className="relative rounded-3xl bg-m3-surface p-5 sm:p-8 shadow-[var(--shadow-md)] space-y-5"
    >
      {/* Honeypot */}
      <div className="absolute w-0 h-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="sb-website">Website</label>
        <input id="sb-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {serviceChoices.map((choice) => {
            const on = selected.includes(choice.id)
            return (
              <button
                key={choice.id}
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(choice.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${focusRing} ${
                  on
                    ? 'bg-m3-on-surface text-m3-surface border-m3-on-surface'
                    : 'bg-transparent text-m3-on-surface/80 border-m3-on-surface/20 hover:border-m3-on-surface/45'
                }`}
              >
                {on && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                {choice.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sb-business" className={label}>
            Business name
          </label>
          <input
            id="sb-business"
            name="business"
            type="text"
            autoComplete="organization"
            required
            aria-required="true"
            aria-invalid={!!errors.business}
            aria-describedby={errors.business ? 'sb-business-error' : undefined}
            value={values.business}
            onChange={onChange}
            className={input(!!errors.business)}
          />
          {errors.business && (
            <p id="sb-business-error" className="text-xs text-m3-secondary mt-1.5">
              {errors.business}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sb-name" className={label}>
            Your name
          </label>
          <input
            id="sb-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'sb-name-error' : undefined}
            value={values.name}
            onChange={onChange}
            className={input(!!errors.name)}
          />
          {errors.name && (
            <p id="sb-name-error" className="text-xs text-m3-secondary mt-1.5">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sb-contact" className={label}>
            Phone or email
          </label>
          <input
            id="sb-contact"
            name="contact"
            type="text"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? 'sb-contact-error' : undefined}
            value={values.contact}
            onChange={onChange}
            className={input(!!errors.contact)}
          />
          {errors.contact && (
            <p id="sb-contact-error" className="text-xs text-m3-secondary mt-1.5">
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sb-handle" className={label}>
            Instagram <span className="font-normal text-m3-on-surface/50">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-m3-on-surface/45 pointer-events-none" aria-hidden="true">
              @
            </span>
            <input
              id="sb-handle"
              name="handle"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              value={values.handle}
              onChange={onChange}
              className={`${input(false)} pl-8`}
            />
          </div>
        </div>
      </div>

      {submitError && (
        <p role="alert" className="text-sm text-m3-secondary">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className={`m3-filled-button w-full inline-flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-70 ${focusRing}`}
      >
        {sending && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {sending ? 'Sending' : 'Send'}
      </button>
    </form>
  )
}
