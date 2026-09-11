// Tech Week campaign data. Edit prices here, in one place.

export const SF_TECH_WEEK_START = '2026-10-05'
export const SF_TECH_WEEK_END = '2026-10-11'
export const LA_TECH_WEEK_START = '2026-10-12'
export const LA_TECH_WEEK_END = '2026-10-18'

// All boundaries are America/Los_Angeles midnights.
export const SF_START = new Date('2026-10-05T00:00:00-07:00')
export const SF_END_EXCLUSIVE = new Date('2026-10-12T00:00:00-07:00')
export const LA_END_EXCLUSIVE = new Date('2026-10-19T00:00:00-07:00')

const DAY = 86400000

export type TechWeekPhase =
  | { kind: 'countdown'; days: number }
  | { kind: 'live'; day: number; daysLeft: number }
  | { kind: 'la-week' }
  | { kind: 'wrapped' }

export function getTechWeekPhase(now: Date = new Date()): TechWeekPhase {
  const t = now.getTime()
  if (t < SF_START.getTime()) {
    return { kind: 'countdown', days: Math.ceil((SF_START.getTime() - t) / DAY) }
  }
  if (t < SF_END_EXCLUSIVE.getTime()) {
    const day = Math.min(7, Math.floor((t - SF_START.getTime()) / DAY) + 1)
    return { kind: 'live', day, daysLeft: Math.ceil((SF_END_EXCLUSIVE.getTime() - t) / DAY) }
  }
  if (t < LA_END_EXCLUSIVE.getTime()) return { kind: 'la-week' }
  return { kind: 'wrapped' }
}

/** Gates every site wide promo. The /sf-tech-week page itself always stays up. */
export function isTechWeekPromoLive(phase: TechWeekPhase) {
  return phase.kind === 'countdown' || phase.kind === 'live'
}

// Compatibility wrappers. Do not call these during render.
export type CountdownState =
  | { kind: 'countdown'; days: number }
  | { kind: 'live' }
  | { kind: 'hidden' }

export function isTechWeekCampaignLive(now: Date = new Date()) {
  return isTechWeekPromoLive(getTechWeekPhase(now))
}

export function getCountdownState(now: Date = new Date()): CountdownState {
  const phase = getTechWeekPhase(now)
  if (phase.kind === 'countdown') return { kind: 'countdown', days: phase.days }
  if (phase.kind === 'live') return { kind: 'live' }
  return { kind: 'hidden' }
}

export interface TechWeekPackage {
  id: string
  name: string
  tag?: string
  description: string
  /** Set a number here when pricing is confirmed. Null hides the price line. */
  startingPrice: number | null
}

export const techWeekPackages: TechWeekPackage[] = [
  {
    id: 'single-event-recap',
    name: 'Single Event Recap',
    description:
      'One event, up to 5 hours on site. A 60 to 90 second recap edit and 20 edited photo selects, delivered within 5 business days.',
    startingPrice: 3500,
  },
  {
    id: 'next-morning',
    name: 'Next Morning',
    tag: 'Most booked for Tech Week',
    description:
      'Everything in Single Event Recap, plus an overnight edit. A 30 second teaser and one vertical clip in your inbox by 10am the next day, while the week is still running. The recap edit follows within 5 business days.',
    startingPrice: 4500,
  },
  {
    id: 'recap-social-pack',
    name: 'Recap + Social Pack',
    description:
      'Everything in Next Morning, plus 5 vertical cutdowns cut for Reels, TikTok and LinkedIn. Sized, captioned and ready to post within 5 business days.',
    startingPrice: 5500,
  },
  {
    id: 'full-week',
    name: 'Full Week Coverage',
    description:
      'Up to 4 events across October 5 to 11, one crew per event. Teaser and vertical clip per event by 10am the next day, one 60 to 90 second week recap film, and a shared folder your team and your sponsors can pull from.',
    startingPrice: 18000,
  },
]

export const SPONSOR_OPTION = 'Sponsor coverage'

export const techWeekNeedOptions = [
  ...techWeekPackages.map((p) => p.name),
  SPONSOR_OPTION,
  'Not sure yet',
]
