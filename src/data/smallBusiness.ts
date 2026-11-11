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

export type ServiceId = 'content-day' | 'social-media' | 'commercial' | 'ads'

export interface Offer {
  id: ServiceId
  name: string
  /** Shown as "From $X" plus the unit. */
  price: string
  unit?: string
  /** One plain sentence on what you get. */
  what: string
  /** Small print under the line: terms, who it is for. */
  note: string
}

/**
 * Starting prices. Only Social media management ($1,500 a month) has been approved so far.
 * Content day, Commercial and Ads are proposals, check with Josh before publishing.
 */
export const offers: Offer[] = [
  {
    id: 'content-day',
    name: 'Content day',
    price: '$750',
    what: 'We film at your spot for up to 3 hours and hand you 4 edited videos, ready to post.',
    note: 'One time. Good first step if you want to try us out.',
  },
  {
    id: 'social-media',
    name: 'Social media management',
    price: '$1,500',
    unit: 'a month',
    what: 'One film day a month, 2 to 3 posts a week on Instagram and TikTok, captions, and replies to comments and DMs.',
    note: 'Month to month. This is what we do for Backyard Bayou.',
  },
  {
    id: 'commercial',
    name: 'Commercial',
    price: '$2,500',
    what: 'A 30 to 60 second spot for your website, YouTube or TV, plus vertical cuts for Reels, TikTok and ads.',
    note: 'One time. Same crew that shoots for PacBio.',
  },
  {
    id: 'ads',
    name: 'Ads',
    price: '$500',
    unit: 'a month',
    what: 'We turn your videos into Instagram, Facebook and TikTok ads, run them, and send you a report every month.',
    note: 'Plus ad spend, paid straight to Meta or TikTok on your card.',
  },
]

export const serviceChoices: { id: ServiceId | 'not-sure'; label: string }[] = [
  { id: 'content-day', label: 'Content day' },
  { id: 'social-media', label: 'Social media' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'ads', label: 'Ads' },
  { id: 'not-sure', label: 'Not sure yet' },
]

/** Entry price used in the page intro and meta description. */
export const entryOffer = offers[0]

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
    a: `A content day starts at $750. Social media management starts at $1,500 a month. Commercials start at $2,500. Ads start at $500 a month plus your ad spend. We quote the exact number after a short call.`,
  },
  {
    q: 'Do I have to sign a long contract?',
    a: 'No. Content days and commercials are one time. Social media management and ads are month to month.',
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
    q: 'Is ad spend included in the ads price?',
    a: 'No. Ad spend is paid straight to Meta or TikTok on your own card, so you always see where it goes. Our fee covers making the ads, running them and reporting back.',
  },
]
