'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'
import { CONTACT_EMAIL, planChoices, review } from '@/data/smallBusiness'

/** Accepts "@name", "name" or a pasted instagram.com link, returns the bare handle. */
function cleanHandle(raw: string) {
  const trimmed = raw.trim()
  const fromUrl = trimmed.match(/instagram\.com\/([A-Za-z0-9._]+)/i)
  return (fromUrl ? fromUrl[1] : trimmed).replace(/^@+/, '').replace(/\/+$/, '')
}

const schema = z.object({
  handle: z
    .string()
    .transform(cleanHandle)
    .pipe(z.string().regex(/^[A-Za-z0-9._]{1,30}$/, 'Add your business Instagram, like @yourshop')),
  name: z.string().trim().min(1, 'Add your name').max(100),
  contact: z.string().trim().min(5, 'Add a phone number or email').max(255),
  website: z.string().max(0, 'Bot detected'),
})

type Values = { handle: string; name: string; contact: string; website: string }
type FieldErrors = Partial<Record<keyof Values, string>>

const empty: Values = { handle: '', name: '', contact: '', website: '' }

/** submit-contact needs an email; phone-only leads carry this placeholder, as on the Backyard Bayou page. */
const FALLBACK_EMAIL = 'noemail@where2studios.com'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'

interface SmallBizFormProps {
  /** Plan picked on the page (plan buttons) or in the form. */
  plan: string | null
  onPlan: (id: string | null) => void
  onBookCall: () => void
}

/** The free page review request: the main ask on /small-business. */
export function SmallBizForm({ plan, onPlan, onBookCall }: SmallBizFormProps) {
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
      const first = (['handle', 'name', 'contact'] as const).find((k) => next[k])
      if (first) document.getElementById(`sb-${first}`)?.focus()
      return
    }

    setSending(true)
    setSubmitError(null)

    const { handle, name, contact } = parsed.data
    const isEmail = contact.includes('@') && !contact.startsWith('@')
    const planLabel = planChoices.find((c) => c.id === plan)?.label ?? 'Not picked'

    try {
      await submitContact({
        name,
        email: isEmail ? contact : FALLBACK_EMAIL,
        phone: isEmail ? undefined : contact,
        company: `@${handle}`,
        service: planLabel,
        referral: 'small-business-review',
        source: 'socials',
        message: [
          '[Free page review request]',
          `Instagram: https://www.instagram.com/${handle}/`,
          `Leaning toward: ${planLabel}`,
          `Contact: ${contact}`,
          `Promised: review within ${review.turnaround}`,
        ].join('\n'),
      })
      setSent(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? `${err.message}. Try again, or email ${CONTACT_EMAIL}.`
          : `That did not send. Try again, or email ${CONTACT_EMAIL}.`
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

  const errorText = (key: keyof Values) =>
    errors[key] ? (
      <p id={`sb-${key}-error`} className="text-xs text-m3-secondary mt-1.5">
        {errors[key]}
      </p>
    ) : null

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="rounded-3xl bg-m3-surface p-8 sm:p-10 text-center shadow-[var(--shadow-md)]">
        <div className="w-14 h-14 bg-m3-primary/15 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-m3-primary" aria-hidden="true" />
        </div>
        <p className="font-fredoka text-2xl font-semibold text-m3-on-surface">
          Got it. Your review is on its way within {review.turnaround}.
        </p>
        <p className="mt-3 text-sm text-m3-on-surface/65">Want to talk it through sooner?</p>
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
      aria-label="Get a free page review"
      className="relative rounded-3xl bg-m3-surface p-5 sm:p-8 shadow-[var(--shadow-md)] space-y-5"
    >
      {/* Honeypot */}
      <div className="absolute w-0 h-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="sb-website">Website</label>
        <input id="sb-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <div>
        <label htmlFor="sb-handle" className={label}>
          Your business Instagram
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
            spellCheck={false}
            required
            aria-required="true"
            aria-invalid={!!errors.handle}
            aria-describedby={errors.handle ? 'sb-handle-error' : undefined}
            value={values.handle}
            onChange={onChange}
            className={`${input(!!errors.handle)} pl-8`}
          />
        </div>
        {errorText('handle')}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          {errorText('name')}
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
          {errorText('contact')}
        </div>
      </div>

      <fieldset>
        <legend className={label}>
          Leaning toward a plan? <span className="font-normal text-m3-on-surface/50">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {planChoices.map((choice) => {
            const on = plan === choice.id
            return (
              <button
                key={choice.id}
                type="button"
                aria-pressed={on}
                onClick={() => onPlan(on ? null : choice.id)}
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
        {sending ? 'Sending' : 'Send me my free review'}
      </button>
      <p className="text-xs text-center text-m3-on-surface/55">Free, and no pressure to sign up for anything.</p>
    </form>
  )
}
