'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Clapperboard, Send, TrendingUp } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { SEOHead } from '@/components/SEOHead'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { AuditForm } from '@/components/socials/AuditForm'
import { socialsProofReels } from '@/data/socialsProof'

/** Replace this once pricing is locked. */
export const STARTING_PRICE = '$TBD'

const SECTION_PAD = 'py-16 sm:py-20 lg:py-24'

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
  { value: 59.7, decimals: 1, suffix: 'K', label: 'followers on @thebackyardbayou' },
  { value: 14.4, decimals: 1, suffix: 'M', label: 'views across their top 80 posts' },
  { value: 5, decimals: 0, suffix: '', label: 'reels over 1,000,000 views' },
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

const deliverables = [
  {
    icon: Clapperboard,
    title: 'We shoot it',
    body:
      'We come to your restaurant twice a month and film your food, your people, your regulars. You keep cooking.',
  },
  {
    icon: Send,
    title: 'We post it',
    body:
      'Reels, stories, and captions in your voice. A monthly calendar you approve in five minutes.',
  },
  {
    icon: TrendingUp,
    title: 'We grow it',
    body:
      'We reply to comments and DMs, track what is working, and send you a one-page report every month.',
  },
]

const steps = [
  { n: '1', title: 'Free 10-minute audit', body: 'We look at your Instagram and tell you the three things to fix.' },
  { n: '2', title: 'Kickoff shoot', body: 'We film your first batch within 7 days.' },
  { n: '3', title: 'Post, learn, repeat', body: 'Monthly calendar. Monthly report. Better every month.' },
]

const areas = ['Union Landing', 'Union City', 'Fremont', 'Hayward', 'Newark']

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'

export default function SocialsPage() {
  const reduce = useReducedMotion()
  const [showAllReels, setShowAllReels] = useState(false)

  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay },
  })

  const visibleReels = showAllReels ? socialsProofReels : socialsProofReels.slice(0, 3)

  return (
    <div className="min-h-screen bg-m3-background text-m3-on-background">
      <SkipLink />
      <SEOHead
        title="Where2Socials | Social Media for Union City Restaurants"
        description="We manage Instagram and TikTok for Union City restaurants. We run @thebackyardbayou: 59.7K followers and reels past a million views. Get a free Instagram audit."
        url="https://where2studios.com/socials"
        schema={serviceSchema}
      />
      <Navbar variant="dark" />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-m3-surface-dark min-h-[85vh] flex items-center pt-28 pb-16 sm:pt-32">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 15%, hsl(var(--m3-primary) / 0.18) 0%, transparent 70%), linear-gradient(to bottom, hsl(var(--m3-surface-dark)) 0%, hsl(var(--m3-surface-dark) / 0.85) 60%, hsl(var(--m3-surface-dark)) 100%)',
            }}
          />
          <div className="relative container mx-auto px-5 sm:px-8 lg:px-12 max-w-4xl text-center">
            <motion.p {...fade(0)} className="text-sm sm:text-base text-m3-primary font-medium mb-4">
              Social media for Union City restaurants
            </motion.p>
            <motion.h1
              {...fade(0.05)}
              className="font-fredoka font-bold text-4xl sm:text-5xl lg:text-6xl text-m3-on-dark tracking-tight leading-tight mb-6"
            >
              We run the Instagram everyone in Union City already follows.
            </motion.h1>
            <motion.p
              {...fade(0.12)}
              className="text-base sm:text-lg text-m3-on-dark/75 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Where2Socials manages @thebackyardbayou at Union Landing. 59.7K followers. Five reels
              past a million views. We can do it for your spot too.
            </motion.p>
            <motion.div {...fade(0.2)} className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => scrollToId('audit', !!reduce)}
                className={`m3-filled-button ${focusRing}`}
              >
                Get a free Instagram audit
              </button>
              <button
                type="button"
                onClick={() => scrollToId('proof', !!reduce)}
                className={`m3-outlined-button !text-m3-on-dark !border-m3-on-dark/30 hover:!bg-m3-on-dark/10 ${focusRing}`}
              >
                See the numbers
              </button>
            </motion.div>
            <motion.p {...fade(0.28)} className="mt-5 text-sm text-m3-on-dark/55">
              Free 10-minute audit. We reply within 1 business day.
            </motion.p>
          </div>
        </section>

        {/* 2. Stat strip */}
        <section className={`bg-m3-background ${SECTION_PAD}`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <CountUp stat={stat} />
                  <p className="mt-2 text-sm text-m3-on-surface/65 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-xs sm:text-sm text-m3-on-surface/50">
              Pulled from the Instagram API on Sep 5, 2026. One restaurant. One team: us.
            </p>
          </div>
        </section>

        {/* 3. Proof */}
        <section id="proof" className={`bg-m3-surface ${SECTION_PAD} scroll-mt-24`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-10"
            >
              The reels Union City has already seen.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleReels.map((reel) => (
                <div key={reel.shortcode}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {reel.stats.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-m3-surface-variant text-m3-on-surface/80"
                      >
                        {s}
                      </span>
                    ))}
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

            {!showAllReels && socialsProofReels.length > 3 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllReels(true)}
                  className={`m3-outlined-button ${focusRing}`}
                >
                  Show 3 more
                </button>
              </div>
            )}

            <p className="mt-8 text-center text-sm text-m3-on-surface/60">
              Every one of these was shot, cut, and captioned by Where2Socials.
            </p>
          </div>
        </section>

        {/* 4. What you get */}
        <section className={`bg-m3-background ${SECTION_PAD}`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-10"
            >
              What you get.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliverables.map((item, i) => (
                <motion.div key={item.title} {...fade(i * 0.08)} className="m3-outlined-card p-6">
                  <item.icon className="w-7 h-7 text-m3-primary mb-4" aria-hidden="true" />
                  <h3 className="font-fredoka font-semibold text-xl text-m3-on-surface mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-m3-on-surface/70 leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why Union City */}
        <section className={`bg-m3-surface-variant ${SECTION_PAD}`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl text-center">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface mb-5"
            >
              Built two doors down.
            </motion.h2>
            <motion.p
              {...fade(0.08)}
              className="text-base sm:text-lg text-m3-on-surface/75 leading-relaxed"
            >
              We are not an agency in San Francisco guessing what Union City eats. We have run
              Backyard Bayou's Instagram and TikTok from inside the restaurant for years. We know the
              lunch rush at Union Landing, the Friday night crowd, and what makes people drive in
              from Fremont and Hayward.
            </motion.p>
            <motion.div {...fade(0.16)} className="mt-8 flex flex-wrap gap-2 justify-center">
              {areas.map((area) => (
                <span
                  key={area}
                  className="text-sm font-medium px-4 py-2 rounded-full bg-m3-surface border border-m3-outline text-m3-on-surface/80"
                >
                  {area}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. Pricing teaser */}
        <section className={`bg-m3-background ${SECTION_PAD}`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl">
            <motion.div {...fade(0)} className="m3-tonal-card p-8 sm:p-10 text-center">
              <p className="text-sm text-m3-on-surface/60 font-medium mb-3">Simple monthly plans</p>
              <p className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface mb-4">
                Starting at {STARTING_PRICE}/month
              </p>
              <p className="text-sm sm:text-base text-m3-on-surface/70 max-w-xl mx-auto mb-7 leading-relaxed">
                No long contracts. Month to month after the first 90 days. Every plan includes
                filming, editing, posting, and a monthly report.
              </p>
              <button
                type="button"
                onClick={() => scrollToId('audit', !!reduce)}
                className={`m3-filled-button ${focusRing}`}
              >
                Get a free audit
              </button>
            </motion.div>
          </div>
        </section>

        {/* 7. How it works */}
        <section className={`bg-m3-surface ${SECTION_PAD}`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-6xl">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-10"
            >
              How it works.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div key={step.n} {...fade(i * 0.08)}>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-m3-primary text-m3-on-primary font-fredoka font-semibold mb-4">
                    {step.n}
                  </span>
                  <h3 className="font-fredoka font-semibold text-xl text-m3-on-surface mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-m3-on-surface/70 leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Lead form */}
        <section id="audit" className={`bg-m3-background ${SECTION_PAD} scroll-mt-24`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-surface text-center mb-8"
            >
              Get your free Instagram audit.
            </motion.h2>
            <AuditForm />
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className={`bg-m3-surface-dark ${SECTION_PAD}`}>
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl text-center">
            <motion.h2
              {...fade(0)}
              className="font-fredoka font-bold text-3xl sm:text-4xl text-m3-on-dark mb-7 leading-tight"
            >
              Your regulars are already on Instagram. Let them find you.
            </motion.h2>
            <button
              type="button"
              onClick={() => scrollToId('audit', !!reduce)}
              className={`m3-filled-button ${focusRing}`}
            >
              Get a free audit
            </button>
          </div>
        </section>

        <Footer />
      </main>

      {/* 10. Mobile sticky CTA, hidden while the form is in view */}
      <FloatingCTA label="Get a free audit" scrollToId="audit" hideWhenVisibleId="audit" mobileOnly />
    </div>
  )
}
