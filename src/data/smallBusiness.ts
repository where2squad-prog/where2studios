// Content for /small-business, the lower budget landing page for local businesses.
// Prices, proof numbers and FAQ live here so the page can be updated in one place.

import bbKingCrab from '@/assets/small-business/bb-C7fqRz7xTXt.webp'
import bbLoveYa from '@/assets/small-business/bb-DCAF2zYIW7z.webp'
import bbShare from '@/assets/small-business/bb-DEGwQaSJozD.webp'
import bbVirginia from '@/assets/small-business/bb-C8NW0HHywfE.webp'
import bbLobsterFries from '@/assets/small-business/bb-C4Y4mVNvgqB.webp'
import bbKingCrabFries from '@/assets/small-business/bb-DWFXq9PDwpo.webp'
import bbPayDay from '@/assets/small-business/bb-DFZaQFixYAW.webp'
import bbAddress from '@/assets/small-business/bb-DAcGe94yQ00.webp'

export const PAGE_PATH = '/small-business'
export const PAGE_URL = `https://where2studios.com${PAGE_PATH}`

/**
 * @thebackyardbayou numbers, pulled from the Instagram Graph API on Nov 10, 2026.
 * views/shares are lifetime totals across all 555 reels on the account.
 */
export const bayouStats = {
  followers: '60K',
  views: '34 million',
  shares: '230K',
  reelsPastMillion: 8,
  pulledOn: '2026-11-10',
}

export interface ProofReel {
  shortcode: string
  views: string
  poster: string
  /** Short description of what is in the video, used for alt text. */
  alt: string
}

/** The eight @thebackyardbayou reels that each passed 1 million views, biggest first. */
export const millionReels: ProofReel[] = [
  { shortcode: 'C7fqRz7xTXt', views: '5.6M', poster: bbKingCrab, alt: 'Gloved hand pulling a sauced king crab leg from a seafood boil bag' },
  { shortcode: 'DCAF2zYIW7z', views: '3.4M', poster: bbLoveYa, alt: 'King crab in Cajun sauce inside a seafood boil bag' },
  { shortcode: 'DEGwQaSJozD', views: '1.9M', poster: bbShare, alt: 'Seafood boil with crab, corn and potatoes being shared' },
  { shortcode: 'C8NW0HHywfE', views: '1.5M', poster: bbVirginia, alt: 'Guest who flew in from Virginia holding a tray of loaded king crab fries' },
  { shortcode: 'C4Y4mVNvgqB', views: '1.4M', poster: bbLobsterFries, alt: 'Lobster cheese fries on a patio table' },
  { shortcode: 'DWFXq9PDwpo', views: '1.2M', poster: bbKingCrabFries, alt: 'Guests trying the king crab fries at Backyard Bayou' },
  { shortcode: 'DFZaQFixYAW', views: '1.2M', poster: bbPayDay, alt: 'Seafood boil with corn and crab legs on pay day' },
  { shortcode: 'DAcGe94yQ00', views: '1.0M', poster: bbAddress, alt: 'Sauced king crab leg held over a seafood boil' },
]

export const CONTACT_EMAIL = 'contact@where2studios.com'

export type PlanId = 'content-creation' | 'social-media'

export interface Plan {
  id: PlanId
  name: string
  /** Starting price, shown as "from $X a month". */
  price: string
  /** One plain sentence on what you get. */
  what: string
  /** Who it fits. */
  note: string
}

/** Starting prices approved Nov 11, 2026. Commercials and ads are add-ons with no listed price. */
export const plans: Plan[] = [
  {
    id: 'content-creation',
    name: 'Content creation',
    price: '$750',
    what: 'We come out once a month and film. You get 4 to 6 edited short videos, ready to post.',
    note: 'You post them. Good if you already run your own page.',
  },
  {
    id: 'social-media',
    name: 'Social media management',
    price: '$1,500',
    what: 'One film day a month, 2 to 3 posts a week on Instagram and TikTok, captions, and replies to comments and DMs.',
    note: 'We run the whole page. This is what we do for Backyard Bayou.',
  },
]

export const addOns = 'Need a commercial or ads? We add them to either plan and price them with you.'

export const planChoices: { id: PlanId | 'not-sure'; label: string }[] = [
  { id: 'content-creation', label: 'Content creation' },
  { id: 'social-media', label: 'Social media management' },
  { id: 'not-sure', label: 'Not sure yet' },
]

/** What the free page review promises. Shown next to the form and in the FAQ. */
export const review = {
  turnaround: '2 business days',
  gets: [
    '3 video ideas made for your business',
    "What's working on your page and what isn't",
    'Which plan fits, if either does',
  ],
}

/** The way we work with owners. A real sequence, so it is shown in order. */
export const growSteps: { title: string; body: string }[] = [
  {
    title: 'We come to you',
    body: 'We spend time at your spot, meet your team and find what people actually come in for.',
  },
  {
    title: 'We make it',
    body: 'We film and edit the videos, and post them too if you want us to. You keep running your business.',
  },
  {
    title: 'We check in every month',
    body: 'We sit down with you, look at what brought people in, and change the plan when something is not working.',
  },
]

/** Entry price used in the page intro and meta description. */
export const entryPlan = plans[0]

export const pacbio = {
  slug: 'pacbio',
  title: 'PacBio Discoveries',
  videoUrl: 'https://youtu.be/lEEJpUyqXm0',
  thumbnail: 'https://img.youtube.com/vi/lEEJpUyqXm0/maxresdefault.jpg',
  years: 5,
}

export const areaCities = [
  'Union City',
  'Fremont',
  'Hayward',
  'Newark',
  'Pleasanton',
  'Walnut Creek',
  'Concord',
  'Oakland',
  'San Jose',
  'San Francisco',
]

export const faqs: { q: string; a: string }[] = [
  {
    q: 'How much does it cost?',
    a: 'Content creation starts at $750 a month. Social media management starts at $1,500 a month. Commercials and ads can be added to either plan, and we price those with you.',
  },
  {
    q: 'What is the free page review?',
    a: `Send us your Instagram and we look at your page. Within ${review.turnaround} we send you 3 video ideas made for your business, what is working and what is not, and which plan fits, if either does. No cost and no pressure.`,
  },
  {
    q: 'Do I have to sign a long contract?',
    a: 'No. Both plans are month to month.',
  },
  {
    q: 'Do you only work with restaurants?',
    a: 'No. Restaurants are where we started, but we work with any local business that wants more people through the door: shops, studios, real estate teams and service businesses.',
  },
  {
    q: 'Where do you work?',
    a: `We are in Union City and Walnut Creek and work across the Bay Area, including ${areaCities
      .filter((c) => c !== 'Union City' && c !== 'Walnut Creek')
      .join(', ')}.`,
  },
  {
    q: 'Who owns the videos?',
    a: 'You do. You get the final files to post anywhere you want. We keep the right to show the work in our portfolio.',
  },
  {
    q: 'Do you run ads?',
    a: 'Yes, as an add-on to either plan. We turn your videos into Instagram, Facebook and TikTok ads. Ad spend is paid straight to Meta or TikTok on your own card, so you always see where it goes.',
  },
]
