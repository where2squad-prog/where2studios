import {
  conventions,
  getNextEdition,
  formatEditionRangeShort,
  type Convention,
} from '@/lib/conventions'

/** Cal.com event behind every "Book a call" button on the site. */
export const CAL_LINK = 'where2-studios-tvdbun/discovery-call'
export const CAL_NAMESPACE = 'where2-call'
export const CALL_LENGTH_LABEL = '15 minute call'

export const OTHER_TOPIC = 'Another event or launch'

export interface TopicOption {
  /** Value stored on the booking and the lead. */
  value: string
  /** Short date label shown on the chip, e.g. "Oct 5 to 11". */
  when?: string
  slug?: string
}

/** Upcoming conferences, soonest first, then the catch-all. Updates itself as weeks wrap. */
export function getTopicOptions(now: Date = new Date(), limit = 4): TopicOption[] {
  const upcoming = conventions
    .map((c) => ({ c, edition: getNextEdition(c, now) }))
    .filter((x): x is { c: Convention; edition: NonNullable<ReturnType<typeof getNextEdition>> } => !!x.edition)
    .sort((a, b) => a.edition.start.localeCompare(b.edition.start))
    .slice(0, limit)
    .map(({ c, edition }) => ({
      value: `${c.name} ${edition.year}`,
      when: formatEditionRangeShort(edition).replace(/, \d{4}$/, ''),
      slug: c.slug,
    }))

  return [...upcoming, { value: OTHER_TOPIC }]
}

/** Find the conference a topic string refers to, so the confirmation can show matching films. */
export function conventionForTopic(topic?: string): Convention | undefined {
  if (!topic) return undefined
  const t = topic.toLowerCase()
  return conventions.find(
    (c) => t.includes(c.name.toLowerCase()) || t.includes(c.slug.replace(/-/g, ' '))
  )
}

/** Lead source the submit-contact function accepts. */
export function leadSource(topic?: string): 'sf-tech-week' | 'contact' {
  return topic && /tech week/i.test(topic) ? 'sf-tech-week' : 'contact'
}

export interface BookedCall {
  start?: Date
  name?: string
  email?: string
}

/** Cal.com's booking events change shape between versions, so read them defensively. */
type Loose = Record<string, unknown>
const obj = (v: unknown): Loose => (v && typeof v === 'object' ? (v as Loose) : {})
const str = (v: unknown): string | undefined => (typeof v === 'string' && v ? v : undefined)

export function readBookingEvent(detail: unknown): BookedCall {
  const data = obj(obj(detail).data)
  const booking = obj(data.booking ?? data)
  const attendees = booking.attendees
  const attendee = obj(Array.isArray(attendees) ? attendees[0] : undefined)
  const responses = obj(booking.responses)
  const startRaw = str(data.startTime) ?? str(booking.startTime) ?? str(data.date)
  const start = startRaw ? new Date(startRaw) : undefined
  const responseName = responses.name
  return {
    start: start && !Number.isNaN(start.getTime()) ? start : undefined,
    name: str(attendee.name) ?? str(responseName) ?? str(obj(responseName).firstName),
    email: str(attendee.email) ?? str(responses.email),
  }
}

export function formatCallTime(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}
