import { Camera, Scissors } from 'lucide-react'

/**
 * What sits next to the event recap on the Services page.
 * Recaps stay the headline; these come from the same crew.
 */
export const photoPricing = {
  halfDay: 1000,
  fullDay: 2000,
  standardTurnaround: 'one week',
  nextDay: [
    { add: 250, photos: '50 to 100' },
    { add: 500, photos: '100 to 200' },
  ],
}

export const crewExtras = [
  {
    id: 'photography',
    title: 'Event photography',
    line: 'Same crew, same day. The room, the people, the speakers and the build, edited and delivered in a week.',
    icon: Camera,
  },
  {
    id: 'editing-only',
    title: 'Editing only',
    line: 'Already have footage? Send it over with the brief and we cut the recap, the clips and the verticals.',
    icon: Scissors,
  },
]

/** Plain facts a planner checks before booking. Keep to what the crew actually delivers. */
export const whatYouGet = [
  { label: 'First clips', value: 'A teaser and a vertical clip by 10am the next day' },
  { label: 'Full recap', value: '60 to 120 second hero film, within 5 business days' },
  { label: 'Formats', value: 'Horizontal for the recap, vertical and square cuts for social' },
  { label: 'Review', value: 'A Frame.io link for comments, up to two rounds of changes included' },
  { label: 'Ownership', value: 'You own the final files. We keep the right to show the work in our portfolio' },
  { label: 'Raw footage', value: 'Available as an add-on' },
  { label: 'Photos', value: 'Edited gallery in one week, or next day for an add-on' },
]

const usd = (n: number) => `$${n.toLocaleString('en-US')}`

export const plannerFaqs = [
  {
    q: 'Who owns the footage?',
    a: 'You own the final files and can use them anywhere. We keep the right to show the work in our portfolio.',
  },
  {
    q: 'How many rounds of changes are included?',
    a: 'Up to two rounds of changes are included. We send every cut as a Frame.io link so your team can leave comments right on the video.',
  },
  {
    q: 'Do we get the raw footage?',
    a: 'Yes, as an add-on. Tell us on the call and we add it to the quote.',
  },
  {
    q: 'Do you shoot photos too?',
    a: `Yes, the same crew shoots the event photos. A half day starts at ${usd(photoPricing.halfDay)} and a full day at ${usd(
      photoPricing.fullDay
    )}, with edited photos delivered in ${photoPricing.standardTurnaround}. Need them the next day? Add ${usd(
      photoPricing.nextDay[0].add
    )} for ${photoPricing.nextDay[0].photos} edited photos or ${usd(photoPricing.nextDay[1].add)} for ${
      photoPricing.nextDay[1].photos
    }.`,
  },
  {
    q: 'Can you do headshots at our booth or lounge?',
    a: 'Yes. Headshots can be part of any photo day.',
  },
  {
    q: 'Can you edit footage we already shot?',
    a: 'Yes. Send the footage and a short brief and we cut the recap, clips and verticals. Editing only work is quoted per project.',
  },
  {
    q: 'How fast do we get something to post?',
    a: 'A teaser and a vertical clip land by 10am the next day, so your team can post while the event is still on. The full recap follows within 5 business days.',
  },
]
