// San Francisco conference week calendar. Dates are inclusive, America/Los_Angeles.

export interface ConventionEdition {
  year: number
  start: string
  end: string
}

export interface Convention {
  slug: string
  name: string
  organizer: string
  venue: string
  audience: string
  buyers: string[]
  editions: ConventionEdition[]
  proofSlugs: string[]
  faqs: { q: string; a: string }[]
  href?: string
}

export const conventions: Convention[] = [
  {
    slug: 'dreamforce',
    name: 'Dreamforce',
    organizer: 'Salesforce',
    venue: 'Moscone North, South and West',
    audience:
      'Salesforce customers, partners and ISVs fill SoMa for three days and every partner needs proof their activation was busy.',
    buyers: [
      'Salesforce partners and ISVs running an activation',
      'sponsors',
      'hospitality suites near Moscone',
    ],
    editions: [
      { year: 2023, start: '2023-09-12', end: '2023-09-14' },
      { year: 2024, start: '2024-09-17', end: '2024-09-19' },
      { year: 2026, start: '2026-09-15', end: '2026-09-17' },
    ],
    proofSlugs: [
      'ownbackup-dreamforce-2024',
      'ownbackup-dreamforce-2023',
      'immuta-brand-hq-build-montage',
    ],
    faqs: [
      {
        q: 'Do you cover Dreamforce side events outside Moscone?',
        a: 'Yes. Most of our Dreamforce work is in the hotels, rooftops and restaurants around Moscone, including The Howard.',
      },
      {
        q: 'How fast can we get clips during Dreamforce?',
        a: 'Shoot day one, clip in your inbox by 10am day two, so your team can post while the show is still running.',
      },
    ],
  },
  {
    slug: 'rsac',
    name: 'RSAC Conference',
    organizer: 'RSA Conference',
    venue: 'Moscone Center',
    audience:
      'Security buyers walk the halls all day, so vendors need footage from the hub and the suite, not just the booth.',
    buyers: [
      'security vendors running experience hubs and hospitality suites',
      'podcast and exec content teams',
    ],
    editions: [
      { year: 2024, start: '2024-05-06', end: '2024-05-09' },
      { year: 2025, start: '2025-04-28', end: '2025-05-01' },
      { year: 2027, start: '2027-04-05', end: '2027-04-08' },
    ],
    proofSlugs: [
      'cloudflare-rsa-conference-2025',
      'claroty-rsa-conference-2024',
      'claroty-podcast-day-rsa-2024',
      'rsa-conference-2025-b-restaurant',
    ],
    faqs: [
      {
        q: 'Can you run a podcast day during RSAC?',
        a: 'Yes. We have shot back to back podcast and interview days for security vendors at RSAC, including multi camera setups in a suite.',
      },
      {
        q: 'Can one crew cover a hub and an evening party?',
        a: 'Usually yes for a single day. Across the full week we put a fresh crew on each day so the edits keep landing overnight.',
      },
    ],
  },
  {
    slug: 'snowflake-summit',
    name: 'Snowflake Summit',
    organizer: 'Snowflake',
    venue: 'Moscone Center',
    audience:
      'Data platform partners compete for the same attendees, so the lounge and the customer dinner both need footage.',
    buyers: ['data platform partners running lounges and meeting hubs'],
    editions: [
      { year: 2025, start: '2025-06-02', end: '2025-06-05' },
      { year: 2026, start: '2026-06-01', end: '2026-06-04' },
      { year: 2027, start: '2027-06-07', end: '2027-06-10' },
    ],
    proofSlugs: [
      'immuta-snowflake-summit-2025',
      'snowflake-summit-2025-b-restaurant',
      'immuta-brand-hq-build-montage',
    ],
    faqs: [
      {
        q: 'Do you shoot the build out before Snowflake Summit opens?',
        a: 'Yes. We shoot load in and the finished space the morning before doors, which gives you a clean build montage.',
      },
      {
        q: 'Can you cover a customer dinner the same day as the lounge?',
        a: 'Yes. Lounge in the day, dinner at night, one crew, and the clip goes out the next morning.',
      },
    ],
  },
  {
    slug: 'data-ai-summit',
    name: 'Data + AI Summit',
    organizer: 'Databricks',
    venue: 'Moscone North, West and South',
    audience:
      'Data and AI vendors run activations within a block of Moscone and need clips their field teams can post the same week.',
    buyers: ['data and AI vendors running activations and side events'],
    editions: [{ year: 2027, start: '2027-06-21', end: '2027-06-24' }],
    proofSlugs: [
      'dataiku-brand-hq-build-montage',
      'hex-brand-hq-build-montage',
      'github-brand-hq-build-montage',
    ],
    faqs: [
      {
        q: 'Do you shoot activation build montages for Data + AI Summit?',
        a: 'Yes. Build montages are one of our most requested films for this week, from empty room to opening night.',
      },
      {
        q: 'Can you deliver a clip per day across the summit?',
        a: 'Yes. One clip by 10am each morning for the day before, then the full recap the same week.',
      },
    ],
  },
  {
    slug: 'techcrunch-disrupt',
    name: 'TechCrunch Disrupt',
    organizer: 'TechCrunch',
    venue: 'Moscone West',
    audience:
      'Founders launching and funds hosting want fast, human footage they can post before the news cycle moves on.',
    buyers: ['startups launching', 'VCs hosting founder events', 'sponsors'],
    editions: [{ year: 2026, start: '2026-10-13', end: '2026-10-15' }],
    proofSlugs: [
      'the-agent-open-san-francisco',
      'onchain-summit-2024',
      'passionfroot-tech-event-recap',
    ],
    faqs: [
      {
        q: 'Can you shoot a launch announcement during Disrupt?',
        a: 'Yes. We shoot the stage moment, the booth and short founder pieces to camera, then cut a vertical the same night if you need it.',
      },
      {
        q: 'Do you cover founder dinners around Disrupt?',
        a: 'Yes. We shoot quiet, no big lights, and you approve every clip before anything goes out.',
      },
    ],
  },
  {
    slug: 'gdc',
    name: 'GDC Festival of Gaming',
    organizer: 'Informa',
    venue: 'Moscone Center',
    audience:
      'Studios and platform vendors run suites, parties and press days across the week and want footage that looks like the game, not a trade show.',
    buyers: ['game studios, publishers and platform vendors running suites and parties'],
    editions: [{ year: 2027, start: '2027-03-01', end: '2027-03-05' }],
    proofSlugs: [
      'xsolla-brand-hq-build-montage',
      '1password-brand-hq-build-montage',
      'the-veranda-venue-film',
    ],
    faqs: [
      {
        q: 'Can you shoot a GDC party and keep it usable for marketing?',
        a: 'Yes. We shoot parties with a light kit that keeps faces clean, and you sign off on every face that appears.',
      },
      {
        q: 'Do you cover press and partner days during GDC?',
        a: 'Yes. Press days, partner meetings and suite demos all cut well into a week recap and short exec clips.',
      },
    ],
  },
  {
    slug: 'sf-tech-week',
    name: 'SF Tech Week',
    organizer: 'a16z',
    venue: 'citywide side events',
    audience:
      'Hundreds of side events run in one week and hosts need something posted while the city is still full.',
    buyers: [
      'startups and funds hosting side events',
      'sponsors',
      'brands running activations across the city',
    ],
    editions: [{ year: 2026, start: '2026-10-05', end: '2026-10-11' }],
    proofSlugs: [
      'the-agent-open-san-francisco',
      'dataiku-brand-hq-build-montage',
      'cloudflare-rsa-conference-2025',
    ],
    href: '/sf-tech-week',
    faqs: [
      {
        q: 'How many events can you cover in one Tech Week?',
        a: 'Up to four events across the week with one crew per event, more if we plan it early.',
      },
      {
        q: 'How late can we book a Tech Week night?',
        a: 'Nights fill first. If a crew is still open we will take a booking the day before.',
      },
    ],
  },
]

export const sharedConventionFaqs = [
  {
    q: 'Do you work inside Moscone?',
    a: "We cover side events, activations and suites around Moscone. Inside the halls depends on the organizer's media rules.",
  },
  {
    q: 'How early should we book?',
    a: 'Conference week crews book out four to six weeks ahead. If you are inside two weeks, message us anyway, we hold a standby crew.',
  },
  {
    q: 'Do you deliver photo too?',
    a: 'Yes, edited photo selects come with every conference week booking.',
  },
]

/* ------------------------------ phase engine ------------------------------ */

const DAY = 86400000

export type EditionPhase =
  | { kind: 'countdown'; days: number }
  | { kind: 'live'; day: number; totalDays: number; daysLeft: number }
  | { kind: 'wrapped' }

export type ConventionPhase = EditionPhase | { kind: 'tba' }

/** US Pacific offset for a plain ISO date, second Sunday in March to first Sunday in November. */
function pacificOffset(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const nthSunday = (month: number, nth: number) => {
    const first = new Date(Date.UTC(y, month - 1, 1)).getUTCDay()
    return 1 + ((7 - first) % 7) + (nth - 1) * 7
  }
  const dstStart = nthSunday(3, 2)
  const dstEnd = nthSunday(11, 1)
  const after = m > 3 || (m === 3 && d >= dstStart)
  const before = m < 11 || (m === 11 && d < dstEnd)
  return after && before ? '-07:00' : '-08:00'
}

function pacificMidnight(iso: string): number {
  return new Date(`${iso}T00:00:00${pacificOffset(iso)}`).getTime()
}

export function getEditionPhase(edition: ConventionEdition, now: Date = new Date()): EditionPhase {
  const t = now.getTime()
  const start = pacificMidnight(edition.start)
  const endExclusive = pacificMidnight(edition.end) + DAY
  const totalDays = Math.max(1, Math.round((endExclusive - start) / DAY))

  if (t < start) return { kind: 'countdown', days: Math.ceil((start - t) / DAY) }
  if (t < endExclusive) {
    const day = Math.min(totalDays, Math.floor((t - start) / DAY) + 1)
    return { kind: 'live', day, totalDays, daysLeft: Math.ceil((endExclusive - t) / DAY) }
  }
  return { kind: 'wrapped' }
}

/** First edition that has not wrapped yet. */
export function getNextEdition(
  convention: Convention,
  now: Date = new Date()
): ConventionEdition | null {
  const sorted = [...convention.editions].sort((a, b) => a.start.localeCompare(b.start))
  return sorted.find((edition) => getEditionPhase(edition, now).kind !== 'wrapped') ?? null
}

export function getConventionStatus(
  convention: Convention,
  now: Date = new Date()
): { edition: ConventionEdition | null; phase: ConventionPhase } {
  const edition = getNextEdition(convention, now)
  if (!edition) return { edition: null, phase: { kind: 'tba' } }
  return { edition, phase: getEditionPhase(edition, now) }
}

/** Year we point at when every known edition has passed. */
export function nextUnknownYear(convention: Convention): number {
  const last = convention.editions[convention.editions.length - 1]
  return (last?.year ?? new Date().getFullYear()) + 1
}

/* ------------------------------ formatting ------------------------------ */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/** "September 15 to 17, 2026" or "September 30 to October 2, 2026". */
export function formatEditionRange(edition: ConventionEdition): string {
  const [, sm, sd] = edition.start.split('-').map(Number)
  const [ey, em, ed] = edition.end.split('-').map(Number)
  const startPart = `${MONTHS[sm - 1]} ${sd}`
  const endPart = sm === em ? `${ed}` : `${MONTHS[em - 1]} ${ed}`
  return `${startPart} to ${endPart}, ${ey}`
}

/** "Sep 15 to 17, 2026", used on compact cards. */
export function formatEditionRangeShort(edition: ConventionEdition): string {
  return formatEditionRange(edition).replace(
    /(January|February|March|April|June|July|August|September|October|November|December)/g,
    (m) => m.slice(0, 3)
  )
}

export function conventionHref(convention: Convention): string {
  return convention.href ?? `/conventions/${convention.slug}`
}

export function statusChip(convention: Convention, phase: ConventionPhase): string {
  if (phase.kind === 'live') return 'Live now'
  if (phase.kind === 'countdown')
    return phase.days === 1 ? 'Tomorrow' : `In ${phase.days} days`
  return `Wrapped, ${nextUnknownYear(convention)} TBA`
}

/** Sort key for the calendar: next start date, unknown dates last. */
export function conventionSortKey(convention: Convention, now: Date = new Date()): string {
  const edition = getNextEdition(convention, now)
  return edition ? edition.start : '9999-12-31'
}
