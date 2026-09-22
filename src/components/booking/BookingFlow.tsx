'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Cal, { getCalApi } from '@calcom/embed-react'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { submitContact } from '@/lib/submitContact'
import { useProjects, proofWall, getThumbnail } from '@/hooks/useProjects'
import {
  CAL_LINK,
  CAL_NAMESPACE,
  CALL_LENGTH_LABEL,
  OTHER_TOPIC,
  conventionForTopic,
  formatCallTime,
  getTopicOptions,
  leadSource,
  readBookingEvent,
  type BookedCall,
} from '@/lib/booking'
import type { BookingPrefill } from '@/contexts/BookingSheetContext'

type Step = 'topic' | 'time' | 'done' | 'quote' | 'quote-sent'

interface BookingFlowProps {
  prefill?: BookingPrefill
  /** 'sheet' sits in the slide-in panel, 'inline' sits on a page section. */
  variant?: 'sheet' | 'inline'
  /** Lets the sheet header follow the current step. */
  onStepChange?: (step: Step) => void
  onClose?: () => void
}

const quoteSchema = z.object({
  name: z.string().trim().min(1, 'Add your name').max(100),
  email: z.string().trim().email('Add a valid email').max(255),
  event: z.string().trim().min(1, 'Add the event').max(160),
  note: z.string().trim().max(500),
})

type QuoteValues = z.infer<typeof quoteSchema>

export const stepTitles: Record<Step, string> = {
  topic: 'What is the call about?',
  time: 'Pick a time',
  done: 'You are booked',
  quote: 'Get a quote by email',
  'quote-sent': 'Got it',
}

export function BookingFlow({ prefill = {}, variant = 'sheet', onStepChange, onClose }: BookingFlowProps) {
  const reduce = useReducedMotion()
  const [topics, setTopics] = useState(() => getTopicOptions())
  const [topic, setTopic] = useState<string>(prefill.conference ?? '')
  const [step, setStepState] = useState<Step>(prefill.conference ? 'time' : 'topic')
  const [booked, setBooked] = useState<BookedCall>({})
  const [mounted, setMounted] = useState(false)

  const setStep = (next: Step) => {
    setStepState(next)
    onStepChange?.(next)
  }

  useEffect(() => {
    setMounted(true)
    setTopics(getTopicOptions())
    onStepChange?.(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cal.com tells us when a slot is confirmed; move to our own confirmation.
  // Both the old and new event fire, and each carries different details, so merge them.
  useEffect(() => {
    let active = true
    let cleanup: (() => void) | undefined
    ;(async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      if (!active) return
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#D4AF37' } },
        hideEventTypeDetails: variant === 'sheet',
      })
      const handle = (e: { detail?: unknown }) => {
        if (!active) return
        const info = readBookingEvent(e?.detail)
        setBooked((prev) => ({
          start: prev.start ?? info.start,
          name: prev.name ?? info.name,
          email: prev.email ?? info.email,
        }))
        setStep('done')
      }
      cal('on', { action: 'bookingSuccessfulV2', callback: handle })
      cal('on', { action: 'bookingSuccessful', callback: handle })
      cleanup = () => {
        cal('off', { action: 'bookingSuccessfulV2', callback: handle })
        cal('off', { action: 'bookingSuccessful', callback: handle })
      }
    })()
    return () => {
      active = false
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  // Record the booked call as a lead in /admin when Cal.com shares who booked.
  useEffect(() => {
    if (step !== 'done' || !booked.email) return
    submitContact({
      name: booked.name || booked.email,
      email: booked.email,
      service: prefill.need || 'Discovery call',
      message: [
        `[Booked a ${CALL_LENGTH_LABEL}]`,
        booked.start ? `When: ${formatCallTime(booked.start)}` : null,
        `Topic: ${topic || 'Not given'}`,
        prefill.need ? `Interested in: ${prefill.need}` : null,
        prefill.venue ? `Venue: ${prefill.venue}` : null,
        `Booked from: ${prefill.source || 'booking-sheet'}`,
      ]
        .filter(Boolean)
        .join('\n'),
      source: leadSource(topic),
    }).catch(() => {
      /* Cal.com already emailed the booking, so a failed log is not worth surfacing. */
    })
  }, [step, booked.email]) // eslint-disable-line react-hooks/exhaustive-deps

  const pickTopic = (value: string) => {
    setTopic(value)
    window.setTimeout(() => setStep('time'), reduce ? 0 : 160)
  }

  const calNotes = [
    topic ? `Topic: ${topic}` : null,
    prefill.need ? `Interested in: ${prefill.need}` : null,
    prefill.venue ? `Venue: ${prefill.venue}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  // Skip motion until mounted so the prerendered HTML matches the first client render.
  const motionProps = !mounted || reduce
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
        transition: { duration: 0.18 },
      }

  const chipClass =
    'w-full flex items-center justify-between gap-3 rounded-2xl bg-m3-surface border-2 border-transparent px-4 py-3.5 text-left text-m3-on-surface hover:border-m3-primary focus-visible:outline-none focus-visible:border-m3-primary transition-colors'

  const stepsShown: Step[] = ['topic', 'time', 'done']
  const progressIndex = stepsShown.indexOf(step)

  return (
    <div className={variant === 'inline' ? 'm3-elevated-card p-5 sm:p-6' : ''}>
      {progressIndex >= 0 && (
        <div className="flex gap-1.5 mb-4" aria-hidden="true">
          {stepsShown.map((s, i) => (
            <span
              key={s}
              className={`h-1 w-7 rounded-full transition-colors ${
                i <= progressIndex ? 'bg-m3-primary' : 'bg-m3-on-surface/15'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {step === 'topic' && (
          <motion.div key="topic" {...motionProps}>
            {variant === 'inline' && (
              <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-1">
                {stepTitles.topic}
              </h3>
            )}
            <p className="text-sm text-m3-on-surface/60 mb-4">
              One tap. We bring the right work to the call.
            </p>
            <div className="grid gap-2">
              {topics.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => pickTopic(t.value)}
                  className={`${chipClass} ${topic === t.value ? 'border-m3-primary' : ''}`}
                >
                  <span className="text-[15px] font-medium">{t.value}</span>
                  {t.when ? (
                    <span className="text-[11px] uppercase tracking-wide text-m3-on-surface/50 shrink-0">
                      {t.when}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-m3-on-surface/50 shrink-0" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-m3-on-surface/60 text-center mt-5">
              Not ready to talk?{' '}
              <button
                type="button"
                onClick={() => setStep('quote')}
                className="underline underline-offset-2 text-m3-on-surface/80 hover:text-m3-primary"
              >
                Get a quote by email
              </button>
            </p>
          </motion.div>
        )}

        {step === 'time' && (
          <motion.div key="time" {...motionProps}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                {variant === 'inline' && (
                  <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface">
                    {stepTitles.time}
                  </h3>
                )}
                <p className="text-sm text-m3-on-surface/60">
                  {CALL_LENGTH_LABEL}
                  {topic && topic !== OTHER_TOPIC ? ` · ${topic}` : ''}
                </p>
              </div>
              {!prefill.conference && (
                <button
                  type="button"
                  onClick={() => setStep('topic')}
                  className="inline-flex items-center gap-1 text-xs text-m3-on-surface/60 hover:text-m3-primary shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Change
                </button>
              )}
            </div>
            <div
              className={`rounded-2xl overflow-hidden bg-m3-surface-dark ${
                variant === 'sheet' ? 'min-h-[520px]' : 'min-h-[560px]'
              }`}
            >
              {mounted ? (
                <Cal
                  namespace={CAL_NAMESPACE}
                  calLink={CAL_LINK}
                  style={{ width: '100%', height: '100%', minHeight: variant === 'sheet' ? 520 : 560, overflow: 'auto' }}
                  config={{
                    layout: 'month_view',
                    theme: 'dark',
                    ...(calNotes ? { notes: calNotes } : {}),
                    ...(topic ? { 'metadata[topic]': topic } : {}),
                    'metadata[source]': prefill.source || 'booking-sheet',
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-[520px]">
                  <Loader2 className="w-5 h-5 animate-spin text-m3-on-dark/60" />
                </div>
              )}
            </div>
            <p className="text-xs text-m3-on-surface/60 text-center mt-4">
              Times show in your time zone. Prefer email?{' '}
              <button
                type="button"
                onClick={() => setStep('quote')}
                className="underline underline-offset-2 text-m3-on-surface/80 hover:text-m3-primary"
              >
                Get a quote instead
              </button>
            </p>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" {...motionProps}>
            <BookedConfirmation booked={booked} topic={topic} onClose={onClose} variant={variant} />
          </motion.div>
        )}

        {step === 'quote' && (
          <motion.div key="quote" {...motionProps}>
            <QuoteForm
              topic={topic}
              prefill={prefill}
              variant={variant}
              onBack={() => setStep(topic && prefill.conference ? 'time' : 'topic')}
              onSent={() => setStep('quote-sent')}
            />
          </motion.div>
        )}

        {step === 'quote-sent' && (
          <motion.div key="quote-sent" {...motionProps} role="status" aria-live="polite" className="text-center py-6">
            <div className="w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-m3-primary" />
            </div>
            <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface mb-2">Got it.</h3>
            <p className="text-sm text-m3-on-surface/60 mb-5">
              We reply within 1 business day with a scope and a starting price.
            </p>
            <button
              type="button"
              onClick={() => setStep('time')}
              className="m3-outlined-button text-sm px-5 py-2.5"
            >
              Or pick a call time now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BookedConfirmation({
  booked,
  topic,
  onClose,
  variant,
}: {
  booked: BookedCall
  topic: string
  onClose?: () => void
  variant: 'sheet' | 'inline'
}) {
  const { data: projects } = useProjects()
  const convention = conventionForTopic(topic)

  const films = useMemo(() => {
    const all = projects || []
    const matched = convention ? proofWall(all, convention.proofSlugs) : []
    const fallback = all.filter((p) => p.featured && p.slug)
    const list = matched.length ? matched : fallback
    return list.filter((p) => p.slug).slice(0, 3)
  }, [projects, convention])

  return (
    <div role="status" aria-live="polite">
      <div className="text-center">
        <div className="w-14 h-14 bg-m3-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-m3-primary" />
        </div>
        {variant === 'inline' && (
          <h3 className="font-fredoka text-2xl font-semibold text-m3-on-surface mb-2">You are booked.</h3>
        )}
      </div>

      <div className="rounded-2xl bg-m3-surface p-4 mt-2 space-y-1">
        <p className="font-fredoka text-lg font-semibold text-m3-on-surface">
          {booked.start ? formatCallTime(booked.start) : 'Your call is on the calendar'}
        </p>
        <p className="text-sm text-m3-on-surface/60">{CALL_LENGTH_LABEL} with Joshua</p>
        <p className="text-sm text-m3-on-surface/60">
          Invite sent to {booked.email || 'your email'}, with a link to reschedule.
        </p>
      </div>

      {films.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-m3-on-surface mb-3">
            {convention ? `Watch before the call: our ${convention.name} work` : 'Watch before the call'}
          </p>
          <div className="grid gap-2">
            {films.map((film) => (
              <Link
                key={film.id}
                to={`/work/${film.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl p-2 hover:bg-m3-surface transition-colors"
              >
                <img
                  src={getThumbnail(film)}
                  alt=""
                  loading="lazy"
                  className="w-20 h-12 rounded-lg object-cover bg-m3-surface-dark shrink-0"
                />
                <span className="text-sm text-m3-on-surface line-clamp-2">{film.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {onClose && (
        <button type="button" onClick={onClose} className="m3-text-button text-m3-primary text-sm w-full mt-5">
          Close
        </button>
      )}
    </div>
  )
}

function QuoteForm({
  topic,
  prefill,
  variant,
  onBack,
  onSent,
}: {
  topic: string
  prefill: BookingPrefill
  variant: 'sheet' | 'inline'
  onBack: () => void
  onSent: () => void
}) {
  const [values, setValues] = useState<QuoteValues>({
    name: '',
    email: '',
    event: topic && topic !== OTHER_TOPIC ? topic : '',
    note: prefill.need ? `Interested in: ${prefill.need}` : '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteValues, string>>>({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [website, setWebsite] = useState('')

  const set = (key: keyof QuoteValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website) return
    const parsed = quoteSchema.safeParse(values)
    if (!parsed.success) {
      const next: Partial<Record<keyof QuoteValues, string>> = {}
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) next[err.path[0] as keyof QuoteValues] = err.message
      })
      setErrors(next)
      return
    }
    setSending(true)
    setSendError(null)
    try {
      await submitContact({
        name: parsed.data.name,
        email: parsed.data.email,
        service: prefill.need || 'Quote by email',
        message: [
          '[Quote by email]',
          `Event: ${parsed.data.event}`,
          prefill.venue ? `Venue: ${prefill.venue}` : null,
          parsed.data.note ? `Note: ${parsed.data.note}` : null,
          `Sent from: ${prefill.source || 'booking-sheet'}`,
        ]
          .filter(Boolean)
          .join('\n'),
        source: leadSource(parsed.data.event),
      })
      onSent()
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'That did not send. Try again.')
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full rounded-xl bg-m3-surface border border-m3-outline/30 px-4 py-3 text-sm text-m3-on-surface placeholder:text-m3-on-surface/40 focus:outline-none focus:ring-2 focus:ring-m3-primary/50'
  const labelClass = 'block text-xs font-medium text-m3-on-surface/70 mb-1.5'
  const id = (k: string) => `quote-${variant}-${k}`

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="flex items-center justify-between">
        {variant === 'inline' ? (
          <h3 className="font-fredoka text-xl font-semibold text-m3-on-surface">{stepTitles.quote}</h3>
        ) : (
          <p className="text-sm text-m3-on-surface/60">We reply within 1 business day.</p>
        )}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs text-m3-on-surface/60 hover:text-m3-primary"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to a call
        </button>
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={id('name')} className={labelClass}>Name</label>
          <input id={id('name')} className={inputClass} autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
          {errors.name && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={id('email')} className={labelClass}>Work email</label>
          <input id={id('email')} type="email" className={inputClass} autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} />
          {errors.email && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor={id('event')} className={labelClass}>Event</label>
        <input id={id('event')} className={inputClass} placeholder="Conference, launch or party" value={values.event} onChange={(e) => set('event', e.target.value)} />
        {errors.event && <p role="alert" className="text-xs text-m3-secondary mt-1">{errors.event}</p>}
      </div>
      <div>
        <label htmlFor={id('note')} className={labelClass}>Anything we should know? (optional)</label>
        <input id={id('note')} className={inputClass} placeholder="Dates, venue, what you want out of it" value={values.note} onChange={(e) => set('note', e.target.value)} />
      </div>

      {sendError && <p role="alert" className="text-xs text-m3-secondary">{sendError}</p>}

      <button
        type="submit"
        disabled={sending}
        className="m3-filled-button w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {sending && <Loader2 className="w-4 h-4 animate-spin" />}
        Send for a quote
      </button>
    </form>
  )
}
