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

/** Replace this once pricing is locked. */
export const STARTING_PRICE = '$TBD'

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
    <span ref={ref} className="font-fredoka font-bold text-4xl sm:text-5xl text-m3-primary">
      {display.toFixed(stat.decimals)}
      {stat.suffix}
    </span>
  )
}

/* ---------------- Page ---------------- */

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Where2Socials, social media management for restaurants',
  serviceType: 'Social media management',
  description:
    'Instagram and TikTok management for Union City restaurants. Filming, editing, posting, community replies, and a monthly report.',
  provider: {
    '@type': 'Organization',
    name: 'Where2Studios',
    url: 'https://where2studios.com',
  },
  areaServed: {
    '@type': 'City',
    name: 'Union City',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Union City',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
  url: 'https://where2studios.com/socials',
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'

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
        title="Where2Socials | Social Media for Union City Restaurants"
        description="We run @thebackyardbayou. 59.7K followers, 14.4M views. Social media for Union City restaurants."
        url="https://where2studios.com/socials"
        schema={serviceSchema}
      />
      <Navbar variant="dark" />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-m3-surface-dark pt-32 pb-14">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 15%, hsl(var(--m3-primary) / 0.18) 0%, transparent 70%), linear-gradient(to bottom, hsl(var(--m3-surface-dark)) 0%, hsl(var(--m3-surface-dark) / 0.85) 60%, hsl(var(--m3-surface-dark)) 100%)',
            }}
          />
          <div className="relative container mx-auto px-5 sm:px-8 lg:px-12 max-w-5xl text-center sm:text-left">
            <motion.h1
              {...fade(0)}
              className="font-fredoka font-bold text-4xl sm:text-5xl lg:text-6xl text-m3-on-dark tracking-tight leading-tight mb-4"
            >
              We run @thebackyardbayou.
            </motion.h1>
            <motion.p {...fade(0.08)} className="text-lg text-m3-on-dark/70 mb-8">
              59.7K followers. 14.4M views. Union City.
            </motion.p>
            <motion.div {...fade(0.16)}>
              <button
                type="button"
                onClick={() => scrollToId('work-with-us', !!reduce)}
                className={`m3-filled-button ${focusRing}`}
              >
                Work with us
              </button>
            </motion.div>
          </div>
        </section>

        {/* 2. The work */}
        <section className="bg-m3-surface py-12">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialsProofReels.map((reel) => (
                <div key={reel.shortcode}>
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-m3-surface-variant text-m3-on-surface/80">
                      {reel.stats[0]}
                    </span>
                  </div>
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.shortcode}/embed`}
                    title={reel.title}
                    loading="lazy"
                    height={620}
                    className="w-full rounded-2xl border border-m3-outline bg-m3-surface"
                    style={{ height: 620 }}
                    allowTransparency
                    scrolling="no"
                    frameBorder={0}
                  />
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-m3-on-surface/60">
              Shot, cut, and posted by us.
            </p>
          </div>
        </section>

        {/* 3. Stats */}
        <section className="bg-m3-background py-12">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <CountUp stat={stat} />
                  <p className="mt-2 text-sm text-m3-on-surface/65 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Work with us */}
        <section id="work-with-us" className="bg-m3-surface-variant py-16 scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-3"
            >
              Want this for your restaurant?
            </motion.h2>
            <motion.p
              {...fade(0.08)}
              className="text-base text-m3-on-surface/70 text-center mb-8"
            >
              Tell us where you are. We will send you a plan.
            </motion.p>
            <AuditForm />
            <p className="mt-5 text-center text-sm text-m3-on-surface/55">
              Plans from {STARTING_PRICE}/month. Month to month.
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
