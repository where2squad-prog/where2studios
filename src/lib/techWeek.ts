// Tech Week campaign data. Edit prices here, in one place.

export const SF_TECH_WEEK_START = '2026-10-05'
export const SF_TECH_WEEK_END = '2026-10-11'
export const LA_TECH_WEEK_START = '2026-10-12'
export const LA_TECH_WEEK_END = '2026-10-18'

// The campaign hides itself after LA Tech Week ends.
const CAMPAIGN_END = new Date('2026-10-19T00:00:00-07:00')
const SF_START = new Date('2026-10-05T00:00:00-07:00')
const LA_END = new Date('2026-10-19T00:00:00-07:00')

export function isTechWeekCampaignLive(now: Date = new Date()) {
  return now < CAMPAIGN_END
}

export type CountdownState =
  | { kind: 'countdown'; days: number }
  | { kind: 'live' }
  | { kind: 'hidden' }

export function getCountdownState(now: Date = new Date()): CountdownState {
  if (now >= LA_END) return { kind: 'hidden' }
  if (now >= SF_START) return { kind: 'live' }
  const days = Math.ceil((SF_START.getTime() - now.getTime()) / 86400000)
  return { kind: 'countdown', days }
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
