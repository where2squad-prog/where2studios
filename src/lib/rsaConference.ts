// RSA Conference campaign data. Edit prices here, in one place.

import {
  formatEditionRange,
  getConventionStatus,
  nextUnknownYear,
  rsaConvention,
  type ConventionPhase,
} from './conventions'

export const RSAC = rsaConvention

/** Phase for the next RSAC edition, driven by the shared conventions engine. */
export function getRsacStatus(now: Date = new Date()) {
  return getConventionStatus(RSAC, now)
}

/** "April 5 to 8, 2027" or "2028 dates to be announced". */
export function rsacDateLine(now: Date = new Date()): string {
  const { edition } = getRsacStatus(now)
  return edition ? formatEditionRange(edition) : `${nextUnknownYear(RSAC)} dates to be announced`
}

export function rsacCountdownLine(phase: ConventionPhase): string | null {
  if (phase.kind === 'live') return `RSA Conference is live, day ${phase.day} of ${phase.totalDays}`
  if (phase.kind === 'countdown')
    return phase.days === 1
      ? 'RSA Conference starts tomorrow'
      : `${phase.days} days until RSA Conference`
  return null
}

export interface RsacPackage {
  id: string
  name: string
  tag?: string
  description: string
  startingPrice: number
}

export const rsacPackages: RsacPackage[] = [
  {
    id: 'single-event-recap',
    name: 'Single Event Recap',
    description:
      'One event, up to 5 hours on site. A 60 to 90 second recap edit and 20 edited photo selects within 5 business days.',
    startingPrice: 3500,
  },
  {
    id: 'next-morning',
    name: 'Next Morning',
    tag: 'Most booked for RSAC',
    description:
      'Everything in Single Event Recap, plus an overnight edit. A 30 second teaser and one vertical clip by 10am the next day.',
    startingPrice: 4500,
  },
  {
    id: 'recap-social-pack',
    name: 'Recap + Social Pack',
    description:
      'Everything in Next Morning, plus 5 vertical cutdowns for LinkedIn, captioned and ready within 5 business days.',
    startingPrice: 5500,
  },
  {
    id: 'full-week',
    name: 'Full Week Coverage',
    description:
      'Up to 4 events across April 5 to 8, one crew per event. Teaser and vertical clip by 10am daily, one week recap film, shared folder.',
    startingPrice: 18000,
  },
]

export const RSAC_SPONSOR_OPTION = 'Sponsor coverage add on'

export const RSAC_SPONSOR_DESCRIPTION =
  'Logo placements, your people, the room full. Cut as a separate deliverable for your sponsorship report.'

export const RSAC_SPONSOR_PRICE = 1500

export const rsacNeedOptions = [
  ...rsacPackages.map((p) => p.name),
  RSAC_SPONSOR_OPTION,
  'Not sure yet',
]

export const RSAC_PROOF_SLUGS = [
  'cloudflare-rsa-conference-2025',
  'rsa-conference-2025-b-restaurant',
  'claroty-rsa-conference-2024',
  '1password-brand-hq-build-montage',
  'reliaquest-brand-hq-build-montage',
]
