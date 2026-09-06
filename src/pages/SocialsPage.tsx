'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { SEOHead } from '@/components/SEOHead'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { AuditForm } from '@/components/socials/AuditForm'
import { socialsProofReels } from '@/data/socialsProof'
import crabLogo from '@/assets/backyard-bayou-crab.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

/** Replace this once pricing is locked. */
export const STARTING_PRICE = '$1,500'

function scrollToId(id: string, instant: boolean) {
  document.getElementById(id)?.scrollIntoView({
    behavior: instant ? 'auto' : 'smooth',
    block: 'start',
  })
}

/* ---------------- Stat count-up ---------------- */

interface Stat {
  value: number
  decimals: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 59.7, decimals: 1, suffix: 'K', label: 'followers' },
  { value: 14.4, decimals: 1, suffix: 'M', label: 'views' },
  { value: 5, decimals: 0, suffix: '', label: 'reels past 1M' },
  { value: 278, decimals: 0, suffix: 'K', label: 'shares' },
]

function CountUp({ stat }: { stat: Stat }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(reduce ? stat.value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(stat.value)
      return
    }
    const duration = 1400
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(stat.value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, stat.value])

  return (
    <span ref={ref} className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-primary">
      {display.toFixed(stat.decimals)}
      {stat.suffix}
    </span>
  )
}

/* ---------------- Page ---------------- */

const PAGE_DESCRIPTION =
  "Union City's social media team. We run @thebackyardbayou at Union Landing: 59.7K followers, reels past 1M views. Management, content, influencer invites, commercials. Starting from $1,500 a month."

const faqs: { q: string; a: string }[] = [
  {
    q: 'Do you work with businesses in Union Landing and Union City?',
    a: 'Yes. We are based in Union City and we run @thebackyardbayou at Union Landing. We also work with businesses in Fremont, Hayward, and Newark.',
  },
  {
    q: 'What does social media management include?',
    a: 'One film day a month at your business, editing, two to three posts a week on Instagram and TikTok, captions, and replies to comments and DMs.',
  },
  {
    q: 'How much does it cost?',
    a: 'Starting from $1,500 a month. Month to month. Bigger plans add film days and posts.',
  },
  {
    q: 'Do you do more than social media?',
    a: 'Yes. Content creation, influencer invites, commercials, and event recaps through Where2Studios.',
  },
  {
    q: 'How do I start?',
    a: 'Send the short form on this page. We reply within one business day and come by to see your spot.',
  },
]

const areaServed = ['Union City', 'Union Landing', 'Fremont', 'Hayward', 'Newark'].map((name) => ({
  '@type': 'Place',
  name,
}))

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://where2studios.com/socials#business',
      name: 'Where2Socials',
      alternateName: 'Where2Studios Social',
      url: 'https://where2studios.com/socials',
      image: 'https://where2studios.com/og-image.png',
      description: PAGE_DESCRIPTION,
      parentOrganization: {
        '@type': 'Organization',
        name: 'Where2Studios',
        url: 'https://where2studios.com',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Union City',
        addressRegion: 'CA',
        postalCode: '94587',
        addressCountry: 'US',
      },
      areaServed,
      priceRange: '$1,500+/month',
      email: 'socials@where2studios.com',
      sameAs: ['https://www.instagram.com/where2studios'],
      knowsAbout: [
        'social media marketing',
        'social media management',
        'content creation',
        'Instagram Reels',
        'TikTok',
        'influencer marketing',
        'commercials',
      ],
    },
    {
      '@type': 'Service',
      name: 'Social media management',
      serviceType: 'Social media marketing',
      provider: { '@id': 'https://where2studios.com/socials#business' },
      areaServed,
      offers: {
        '@type': 'Offer',
        price: 1500,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: 1500,
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
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
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://where2studios.com' },
        { '@type': 'ListItem', position: 2, name: 'Socials', item: 'https://where2studios.com/socials' },
      ],
    },
  ],
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'

function WorkCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: 'start', loop: true, dragFree: false }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {socialsProofReels.map((reel) => (
          <CarouselItem
            key={reel.shortcode}
            className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3"
          >
            <div className="mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-m3-surface-variant text-m3-on-surface/80">
                {reel.stats[0]}
              </span>
            </div>
            <iframe
              src={`https://www.instagram.com/reel/${reel.shortcode}/embed`}
              title={`Backyard Bayou Instagram reel, ${reel.stats[0]}, Union City`}
              loading="lazy"
              height={600}
              className="w-full rounded-2xl border border-m3-outline bg-m3-surface"
              style={{ height: 600 }}
              scrolling="no"
              frameBorder={0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={`hidden md:flex -left-4 ${focusRing}`} />
      <CarouselNext className={`hidden md:flex -right-4 ${focusRing}`} />

      <div className="flex justify-center gap-2 mt-6">
        {socialsProofReels.map((reel, i) => (
          <button
            key={reel.shortcode}
            type="button"
            aria-label={`Go to reel ${i + 1}`}
            aria-current={selected === i}
            onClick={() => api?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${focusRing} ${
              selected === i ? 'w-6 bg-m3-primary' : 'w-2 bg-m3-on-surface/25'
            }`}
          />
        ))}
      </div>
    </Carousel>
  )
}

export default function SocialsPage() {
  const reduce = useReducedMotion()

  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay },
  })

  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <SkipLink />
      <SEOHead
        title="Social Media Marketing in Union City, CA | Where2Socials by Where2Studios"
        description={PAGE_DESCRIPTION}
        url="https://where2studios.com/socials"
        image="https://where2studios.com/og-image.png"
        schema={pageSchema}
      />
      <Navbar variant="dark" />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-m3-surface-dark pt-28 pb-16">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 15%, hsl(var(--m3-primary) / 0.18) 0%, transparent 70%), linear-gradient(to bottom, hsl(var(--m3-surface-dark)) 0%, hsl(var(--m3-surface-dark) / 0.85) 60%, hsl(var(--m3-surface-dark)) 100%)',
            }}
          />
          <div className="relative container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10">
              <motion.img
                {...fade(0.05)}
                src={crabLogo}
                alt="Backyard Bayou crab logo. Union City restaurant whose Instagram is run by Where2Socials."
                width={260}
                className="order-first lg:order-last mx-auto w-[140px] lg:w-[260px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
              />

              <div className="text-center lg:text-left">
                <motion.h1
                  {...fade(0)}
                  className="font-fredoka font-bold text-4xl sm:text-5xl lg:text-6xl text-m3-on-dark tracking-tight leading-tight mb-4"
                >
                  We run @thebackyardbayou.
                </motion.h1>

                <motion.p {...fade(0.04)} className="text-base text-m3-on-dark/70 mb-8">
                  Social media marketing for Union City and Union Landing businesses.
                </motion.p>


                <motion.div
                  {...fade(0.08)}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10"
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <CountUp stat={stat} />
                      <p className="mt-1 text-sm text-m3-on-dark/60 leading-snug">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.h2
                  {...fade(0.16)}
                  className="font-fredoka font-bold text-2xl text-m3-on-dark mb-5"
                >
                  Want this for your restaurant?
                </motion.h2>
                <motion.div {...fade(0.2)}>
                  <button
                    type="button"
                    onClick={() => scrollToId('work-with-us', !!reduce)}
                    className={`m3-filled-button ${focusRing}`}
                  >
                    Work with us
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The work */}
        <section className="bg-m3-surface py-10">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <WorkCarousel />
          </div>
        </section>

        {/* 3. Work with us */}
        <section id="work-with-us" className="bg-m3-surface-variant py-16 scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-8"
            >
              Want this for your restaurant?
            </motion.h2>
            <AuditForm />
            <p className="mt-5 text-center text-sm text-m3-on-surface/55">
              Starting from {STARTING_PRICE} a month. Month to month.
            </p>
            <p className="mt-1 text-center text-sm text-m3-on-surface/55">
              One film day. Two to three posts a week.
            </p>
          </div>
        </section>

        <Footer />
      </main>

      <FloatingCTA
        label="Work with us"
        scrollToId="work-with-us"
        hideWhenVisibleId="work-with-us"
        mobileOnly
      />
    </div>
  )
}
