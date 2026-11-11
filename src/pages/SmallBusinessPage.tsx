'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { SEOHead } from '@/components/SEOHead'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { KeepReading } from '@/components/layout/KeepReading'
import { VideoModal } from '@/components/VideoModal'
import { ReelWall } from '@/components/small-business/ReelWall'
import { SmallBizForm } from '@/components/small-business/SmallBizForm'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  PAGE_PATH,
  PAGE_URL,
  areaCities,
  bayouStats,
  faqs,
  entryOffer,
  offers,
  pacbio,
  type Offer,
} from '@/data/smallBusiness'
import joshAvatar from '@/assets/small-business/team-joshua.webp'
import gavinAvatar from '@/assets/small-business/team-gavin.webp'
import danAvatar from '@/assets/small-business/team-daniel.webp'

const FORM_ID = 'get-started'
const PRICES_ID = 'prices'

const fromPrice = entryOffer.price

const PAGE_TITLE = 'Bay Area Small Business Social Media and Video | Where2Studios'
const PAGE_DESCRIPTION = `We run @thebackyardbayou: 34M views, ${bayouStats.followers} followers. Content days, social media, commercials and ads for Bay Area small businesses. From ${fromPrice}.`

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'
const focusRingDark = `${focusRing} focus-visible:ring-offset-m3-surface-dark`

const priceNumber = (o: Offer) => Number(o.price.replace(/[^0-9]/g, ''))

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Social media and video for small businesses',
      serviceType: 'Social media marketing',
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      provider: {
        '@type': 'Organization',
        name: 'Where2Studios',
        url: 'https://where2studios.com',
      },
      areaServed: [
        ...areaCities.map((name) => ({ '@type': 'City', name })),
        { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Small business plans',
        itemListElement: offers.map((o) => ({
          '@type': 'Offer',
          name: o.name,
          description: o.what,
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': o.unit ? 'UnitPriceSpecification' : 'PriceSpecification',
            minPrice: priceNumber(o),
            priceCurrency: 'USD',
            ...(o.unit ? { unitText: 'MONTH' } : {}),
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

function scrollToId(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export default function SmallBusinessPage() {
  const { openSheet } = useBookingSheet()
  const [selected, setSelected] = useState<string[]>([])
  const [pacbioOpen, setPacbioOpen] = useState(false)

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const askAbout = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev : [...prev, id]))
    scrollToId(FORM_ID)
    window.setTimeout(() => document.getElementById('sb-business')?.focus({ preventScroll: true }), 450)
  }

  const bookCall = () => {
    const need = offers
      .filter((o) => selected.includes(o.id))
      .map((o) => o.name)
      .join(', ')
    openSheet({ conference: 'Small business', need: need || undefined, source: 'small-business' })
  }

  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <SkipLink />
      <SEOHead
        title={PAGE_TITLE}
        ogTitle="Social media and video for Bay Area small businesses"
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        canonical={PAGE_PATH}
        image="/og/small-business.png"
        imageAlt="Where2Studios. Social media and video for small businesses."
        schema={pageSchema}
        answer
        breadcrumbName="Small business"
      />
      <Navbar variant="dark" />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero: the proof is the page */}
        <section className="relative overflow-hidden bg-m3-surface-dark text-m3-on-dark pt-[calc(var(--nav-h,96px)+0.75rem)] sm:pt-[calc(var(--nav-h,112px)+2rem)] pb-14 sm:pb-20 lg:pb-24">
          <div className="relative container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl">
            <h1 className="font-fredoka font-semibold tracking-tight text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.02] max-w-[24ch] [text-wrap:balance]">
              {bayouStats.views} views for a seafood spot in Union City.
            </h1>

            <div className="mt-5 sm:mt-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10">
              <p className="text-base sm:text-lg lg:text-xl text-m3-on-dark/75 max-w-[50ch] leading-relaxed [text-wrap:pretty]">
                That is{' '}
                <a
                  href="https://www.instagram.com/thebackyardbayou/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-m3-on-dark underline decoration-m3-primary decoration-2 underline-offset-4 hover:decoration-m3-on-dark rounded-sm ${focusRingDark}`}
                >
                  @thebackyardbayou
                </a>
                . We film it, edit it and post it. Now we do the same for small businesses across the Bay
                Area.
              </p>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToId(FORM_ID)}
                  className={`m3-filled-button flex-1 sm:flex-none text-base px-6 sm:px-7 py-3.5 ${focusRingDark}`}
                >
                  Get started
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId(PRICES_ID)}
                  className={`flex-1 sm:flex-none rounded-full px-6 sm:px-7 py-3.5 font-fredoka font-semibold text-base text-m3-on-dark border border-m3-on-dark/25 hover:border-m3-on-dark/60 hover:bg-white/5 transition-colors ${focusRingDark}`}
                >
                  See prices
                </button>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <ReelWall />
            </div>

            <p className="mt-8 lg:mt-14 text-sm text-m3-on-dark/60 max-w-[60ch]">
              Every one of these passed a million views. {bayouStats.followers} followers and{' '}
              {bayouStats.shares} shares, from a restaurant at Union Landing. Tap one to watch it.
            </p>
          </div>
        </section>

        {/* Prices, laid out like a menu */}
        <section id={PRICES_ID} className="bg-m3-background py-16 sm:py-24 scroll-mt-20">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--nav-h,96px)+2rem)] self-start">
              <h2 className="font-fredoka font-semibold text-4xl sm:text-5xl tracking-tight text-m3-on-background">
                Start small.
              </h2>
              <p id="answer" className="mt-5 text-base sm:text-lg text-m3-on-background/70 max-w-[44ch] leading-relaxed">
                Where2Studios makes social media content, runs Instagram and TikTok accounts, shoots
                commercials and runs ads for small businesses across the Bay Area. Try one content day
                for {fromPrice}. If you like what you get, we can take over your account from there.
              </p>
            </div>

            <ul className="border-b border-m3-on-background/12">
              {offers.map((offer) => (
                <li key={offer.id} className="border-t border-m3-on-background/12 py-7 sm:py-8">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-fredoka font-semibold text-2xl sm:text-[1.75rem] leading-tight text-m3-on-background">
                      {offer.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex-1 min-w-[1.5rem] border-b-2 border-dotted border-m3-on-background/25 -translate-y-1.5"
                    />
                    <p className="shrink-0 text-right leading-none">
                      <span className="text-sm text-m3-on-background/55 mr-1.5">from</span>
                      <span className="font-fredoka font-semibold text-2xl sm:text-[1.75rem] text-m3-on-background">
                        {offer.price}
                      </span>
                      {offer.unit && (
                        <span className="block sm:inline text-sm text-m3-on-background/55 sm:ml-1.5 mt-1 sm:mt-0">
                          {offer.unit}
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="mt-3 text-base text-m3-on-background/80 max-w-[54ch] leading-relaxed">{offer.what}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                    <p className="text-sm text-m3-on-background/55">{offer.note}</p>
                    <button
                      type="button"
                      onClick={() => askAbout(offer.id)}
                      aria-label={`Ask about ${offer.name.toLowerCase()}`}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-fredoka font-semibold text-m3-on-background border border-m3-on-background/20 hover:border-m3-on-background hover:bg-m3-on-background hover:text-m3-background transition-colors ${focusRing}`}
                    >
                      Ask about this
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Commercial proof */}
        <section className="bg-m3-surface py-16 sm:py-24">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-center">
            <button
              type="button"
              onClick={() => setPacbioOpen(true)}
              aria-label="Play the PacBio film"
              className={`group relative block w-full aspect-video overflow-hidden rounded-3xl bg-m3-surface-dark ${focusRing}`}
            >
              <img
                src={pacbio.thumbnail}
                alt="Still from a PacBio promo film shot by Where2Studios, a presenter smiling in front of a PacBio event backdrop"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
              <span
                aria-hidden="true"
                className="absolute left-5 bottom-5 sm:left-6 sm:bottom-6 inline-flex items-center gap-2 rounded-full bg-white/95 text-m3-on-surface pl-3 pr-4 py-2 font-fredoka font-semibold text-sm shadow-[var(--shadow-md)]"
              >
                <Play className="w-4 h-4 fill-current" />
                Play
              </span>
            </button>

            <div>
              <h2 className="font-fredoka font-semibold text-4xl sm:text-5xl tracking-tight text-m3-on-surface [text-wrap:balance]">
                We shoot commercials too.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-m3-on-surface/75 leading-relaxed max-w-[42ch]">
                We have filmed for PacBio for {pacbio.years} years: commercials, keynote talks and speaker
                sessions. We travel with their team to film them.
              </p>
              <p className="mt-4 text-base text-m3-on-surface/60 leading-relaxed max-w-[42ch]">
                The same crew films for Google Pixel, Cloudflare and 1Password during convention week in
                San Francisco.
              </p>
              <Link
                to="/work"
                className={`mt-6 inline-block font-fredoka font-semibold text-m3-on-surface underline decoration-m3-primary decoration-2 underline-offset-4 hover:decoration-m3-on-surface rounded-sm ${focusRing}`}
              >
                See that work
              </Link>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id={FORM_ID} className="bg-m3-surface-variant py-16 sm:py-24 scroll-mt-16">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20">
            <div>
              <h2 className="font-fredoka font-semibold text-4xl sm:text-5xl tracking-tight text-m3-on-surface [text-wrap:balance]">
                Tell us about your business.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-m3-on-surface/70 leading-relaxed max-w-[40ch]">
                We reply within one business day.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3 shrink-0">
                  {[
                    { src: joshAvatar, name: 'Josh' },
                    { src: gavinAvatar, name: 'Gavin' },
                    { src: danAvatar, name: 'Dan' },
                  ].map((p) => (
                    <img
                      key={p.name}
                      src={p.src}
                      alt={p.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      className="w-14 h-14 rounded-full ring-4 ring-m3-surface-variant object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm text-m3-on-surface/70 leading-snug max-w-[26ch]">
                  Josh, Gavin and Dan. The people who film are the people you text.
                </p>
              </div>

              <p className="mt-8 text-base text-m3-on-surface/70 leading-relaxed max-w-[40ch]">
                Josh has worked at Backyard Bayou for 11 years, from bussing tables to general manager. We
                know what a slow Tuesday feels like.
              </p>

              <p className="mt-8 text-sm text-m3-on-surface/60">
                Rather talk it through?{' '}
                <button
                  type="button"
                  onClick={bookCall}
                  className={`inline-flex min-h-[44px] items-center font-medium text-m3-on-surface underline underline-offset-4 decoration-m3-primary decoration-2 hover:decoration-m3-on-surface rounded-sm ${focusRing}`}
                >
                  Book a 15 minute call
                </button>
              </p>
            </div>

            <SmallBizForm selected={selected} onToggle={toggle} onBookCall={bookCall} />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-m3-background py-16 sm:py-20">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka font-semibold text-3xl sm:text-4xl tracking-tight text-m3-on-background mb-6">
              Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger data-faq-question className="text-left font-fredoka text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-m3-on-background/75 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <KeepReading
          links={[
            { label: 'Our work', href: '/work' },
            { label: 'Who we are', href: '/who-we-are' },
            { label: 'Backyard Bayou socials', href: '/backyard-bayou-socials' },
            { label: 'Contact', href: '/contact' },
          ]}
        />
        <Footer />
      </main>

      <VideoModal
        isOpen={pacbioOpen}
        onClose={() => setPacbioOpen(false)}
        videoUrl={pacbio.videoUrl}
        title={pacbio.title}
      />

      <FloatingCTA label="Get started" scrollToId={FORM_ID} hideWhenVisibleId={FORM_ID} mobileOnly />
    </div>
  )
}
