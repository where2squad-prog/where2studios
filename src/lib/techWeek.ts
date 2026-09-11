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
    id: 'next-morning',
    name: 'Next Morning',
    tag: 'Most booked for Tech Week',
    description:
      'One event. We cover the key hours. You get a 30 to 45 second teaser and 3 vertical clips in your inbox by 10am the next day. The full recap edit follows after the week.',
    startingPrice: null,
  },
  {
    id: 'single-event-recap',
    name: 'Single Event Recap',
    description:
      'One event, full coverage. A 60 to 120 second recap edit, speaker and panel clips, and edited photo selects.',
    startingPrice: null,
  },
  {
    id: 'recap-social-pack',
    name: 'Recap + Social Pack',
    description:
      'The recap edit plus 8 vertical cutdowns cut for Reels, TikTok and LinkedIn. Sized, captioned and ready to post.',
    startingPrice: null,
  },
  {
    id: 'full-week',
    name: 'Full Week Coverage',
    description:
      'We embed with you October 5 to 11. Every event covered, clips dropped daily, one week long recap film at the end, and a shared folder your team and your sponsors can pull from.',
    startingPrice: null,
  },
]

export const SPONSOR_OPTION = 'Sponsor coverage'

export const techWeekNeedOptions = [
  ...techWeekPackages.map((p) => p.name),
  SPONSOR_OPTION,
  'Not sure yet',
]
