'use client'

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { SEOHead, areaServed } from '@/components/SEOHead'
import { ProjectCard } from '@/components/ProjectCard'
import { VideoModal } from '@/components/VideoModal'
import { TechWeekCountdown } from '@/components/techweek/TechWeekCountdown'
import { TechWeekForm } from '@/components/techweek/TechWeekForm'
import { useProjects, type Project } from '@/hooks/useProjects'
import { techWeekPackages, SPONSOR_OPTION } from '@/lib/techWeek'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const PAGE_TITLE = 'SF Tech Week Video Coverage, October 5 to 11 2026 | Where2Studios'
const PAGE_DESCRIPTION =
  'Event video and next morning recaps for SF Tech Week 2026 side events, panels, mixers and founder dinners. Bay Area crew. We cover LA Tech Week too.'
const PAGE_URL = 'https://where2studios.com/sf-tech-week'

const QUOTABLE =
  'Where2Studios covers SF Tech Week events from October 5 to 11, 2026. We shoot your panel, mixer, founder dinner or hackathon and deliver a next morning teaser plus vertical clips you can post while Tech Week is still running. The full recap edit follows. Bay Area based. We also cover LA Tech Week, October 12 to 18.'

const whyPoints = [
  'Hundreds of events run that week. Attention is highest while it is happening.',
  'Post the morning after and your event stays in the feed for the rest of the week, while everyone who came is still in town.',
  'The people who missed it see what they missed and ask to be on the list next time.',
]

const bookingSteps = [
  'Send us the event, the date and the times.',
  'We confirm a crew and lock your slot.',
  'We shoot.',
  'Teaser and vertical clips by 10am the next day. Full recap after the week.',
]

const PRIORITY_TITLES = [
  'onchain summit recap highlight',
  'passionfroot tech event recap',
  'google pixel activation build montage',
  'pacbio discoveries',
  'sunnyvale cityline event recap',
]

const faqs = [
  {
    q: 'Do you cover SF Tech Week events?',
    a: 'Yes. We work as an SF Tech Week videographer across San Francisco from October 5 to 11, 2026, and across the wider Bay Area.',
  },
  {
    q: 'How fast can I get video from my Tech Week event?',
    a: 'A teaser and three vertical clips by 10am the next morning. The full recap edit comes after the week.',
  },
  {
    q: 'How much does Tech Week video coverage cost?',
    a: 'A Tech Week event recap video is priced on hours, crew and how many events. It depends on hours, crew and how many events. Send us your dates and we quote you the same day.',
  },
  {
    q: 'Can you cover more than one event during Tech Week?',
    a: 'Yes. Full Week Coverage is built for hosts running several events across the week.',
  },
  {
    q: 'Do you cover LA Tech Week?',
    a: 'Yes. We take LA Tech Week videographer bookings for October 12 to 18. Tell us early so we can plan the travel.',
  },
  {
    q: 'My event is a private founder dinner. Can you still shoot it?',
    a: 'Yes. We shoot quiet, no big lights, and you approve every clip before anything goes out.',
  },
  {
    q: 'Can you shoot vertical for Reels, TikTok and LinkedIn?',
    a: 'Yes. Vertical is the default for Tech Week, not an add on.',
  },
  {
    q: 'How late can I book before October 5?',
    a: 'Book as early as you can. Nights fill first. If we still have a crew we will take a booking the day before.',
  },
  {
    q: 'Do you shoot photo as well as video?',
    a: 'Yes. Edited photo selects come with the recap packages.',
  },
  {
    q: 'Do you handle sponsor deliverables?',
    a: 'Yes. We cut a sponsor version with their branding, their people and their logo placements.',
  },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function SFTechWeekPage() {
  const { data: projects } = useProjects()
  const [activeVideo, setActiveVideo] = useState<Project | null>(null)
  const [preselected, setPreselected] = useState('')

  const proof = useMemo(() => {
    const all = projects || []
    const picked: Project[] = []
    PRIORITY_TITLES.forEach((wanted) => {
      const match = all.find(
        (p) => p.title.toLowerCase().includes(wanted) || wanted.includes(p.title.toLowerCase())
      )
      if (match && !picked.some((p) => p.id === match.id)) picked.push(match)
    })
    const fallback = all.filter(
      (p) =>
        !picked.some((picked) => picked.id === p.id) &&
        ['events', 'event-recaps', 'corporate'].includes(p.category.toLowerCase())
    )
    return [...picked, ...fallback, ...all.filter((p) => !picked.some((x) => x.id === p.id))].slice(
      0,
      6
    )
  }, [projects])

  const requestQuote = (packageName: string) => {
    setPreselected(packageName)
    scrollTo('tech-week-form')
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SF Tech Week Video Coverage',
    serviceType: 'Event video production',
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    provider: { '@id': 'https://where2studios.com/#business' },
    areaServed,
    validFrom: '2026-09-10',
    validThrough: '2026-10-18',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SF Tech Week packages',
      itemListElement: techWeekPackages.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.name, description: p.description },
        ...(p.startingPrice
          ? { price: p.startingPrice, priceCurrency: 'USD' }
          : { availability: 'https://schema.org/InStock' }),
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://where2studios.com' },
      { '@type': 'ListItem', position: 2, name: 'SF Tech Week', item: PAGE_URL },
    ],
  }

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        robots="index, follow"
        schema={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <PageLayout navVariant="dark">
        {/* Hero */}
        <section className="bg-m3-surface-dark pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <p className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              October 5 to 11, 2026
            </p>
            <h1 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark mt-3">
              Event video for SF Tech Week
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-dark/75">
              We cover your Tech Week event and send the first clips back the next morning, while
              the week is still going.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => scrollTo('tech-week-form')}
                className="m3-filled-button text-sm px-6 py-3"
              >
                Lock your date
              </button>
              <button
                onClick={() => scrollTo('tech-week-proof')}
                className="m3-outlined-button text-sm px-6 py-3 text-m3-on-dark border-m3-on-dark/30"
              >
                See the work
              </button>
            </div>
            <TechWeekCountdown className="mt-5 text-lg" />
            <p className="mt-2 text-xs text-m3-on-dark/60">
              Bay Area crew. We also cover LA Tech Week, October 12 to 18.
            </p>
          </div>
        </section>

        {/* Quotable answer */}
        <section className="py-10 sm:py-12 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <div className="m3-outlined-card p-5 sm:p-6">
              <p className="text-sm sm:text-base text-m3-on-surface/80 leading-relaxed">
                {QUOTABLE}
              </p>
            </div>
          </div>
        </section>

        {/* Why next morning matters */}
        <section className="py-10 sm:py-14 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              A recap that lands three weeks later lands in a dead feed
            </h2>
            <p className="mt-4 text-sm sm:text-base text-m3-on-surface/75">
              Every October the city fills up with side events and everyone needs the same thing, a
              videographer who can turn it around fast.
            </p>
            <ul className="mt-6 space-y-4">
              {whyPoints.map((point) => (
                <li
                  key={point}
                  className="text-sm sm:text-base text-m3-on-surface/75 border-l-2 border-m3-primary pl-4"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof */}
        <section
          id="tech-week-proof"
          className="py-12 sm:py-20 bg-m3-background scroll-mt-[calc(var(--nav-h,80px)+16px)]"
        >
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              Tech events we have already covered
            </h2>
            <p className="mt-2 text-sm sm:text-base text-m3-on-surface/70">
              Real work, not a mood board.
            </p>
            <p className="mt-5 text-sm font-semibold text-m3-on-surface/80">
              Onchain Summit. Passionfroot. Google Pixel. PacBio. Cityline.
            </p>
            <p className="mt-1 text-sm text-m3-on-surface/60">
              Five years shooting PacBio conference recaps, speaker talks and panel sessions.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {proof.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  aspectRatio="vertical"
                  onClick={() => setActiveVideo(project)}
                />
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm"
              >
                See all our work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-12 sm:py-16 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              Four ways to book us for Tech Week
            </h2>
            <p className="mt-2 mb-8 text-sm sm:text-base text-m3-on-surface/70">
              Side event video coverage, priced per event or per week.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {techWeekPackages.map((pkg) => (
                <div key={pkg.id} className="m3-elevated-card p-5 flex flex-col">
                  {pkg.tag && (
                    <span className="self-start rounded-full bg-m3-primary/15 text-m3-primary text-[11px] font-semibold px-3 py-1 mb-3">
                      {pkg.tag}
                    </span>
                  )}
                  <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface">
                    {pkg.name}
                  </h3>
                  {pkg.startingPrice !== null && (
                    <p className="text-sm font-semibold text-m3-primary mt-1">
                      From ${pkg.startingPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-sm text-m3-on-surface/70 mt-2 flex-1">{pkg.description}</p>
                  <button
                    onClick={() => requestQuote(pkg.name)}
                    className="m3-outlined-button text-sm px-5 py-2.5 mt-5 self-start"
                  >
                    Request a quote
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="py-12 sm:py-16 bg-m3-surface-dark">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark">
              Sponsoring an event that week?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-m3-on-dark/75">
              You paid for the logo, the bar tab and the booth. Without footage all you keep is a
              badge scan list.
            </p>
            <p className="mt-3 text-sm sm:text-base text-m3-on-dark/75">
              We cut a sponsor version of the recap. Your branding in frame, your people talking,
              your logo on the step and repeat, and vertical clips your marketing team can run after
              the week ends.
            </p>
            <button
              onClick={() => requestQuote(SPONSOR_OPTION)}
              className="m3-filled-button text-sm px-6 py-3 mt-6"
            >
              Talk to us about sponsor coverage
            </button>
          </div>
        </section>

        {/* How booking works */}
        <section className="py-12 sm:py-16 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              How booking works
            </h2>
            <ol className="space-y-4">
              {bookingSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm sm:text-base text-m3-on-surface/75">
                  <span className="font-fredoka font-semibold text-m3-primary shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-m3-on-surface/60">
              We run a limited number of crews per night from October 5 to 11. Once a night is full
              it is full.
            </p>
          </div>
        </section>

        {/* Form */}
        <section
          id="tech-week-form"
          className="py-12 sm:py-16 bg-m3-surface-variant scroll-mt-[calc(var(--nav-h,80px)+16px)]"
        >
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              Lock your Tech Week date
            </h2>
            <TechWeekForm preselected={preselected} onPreselect={setPreselected} />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              Tech Week questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={`tw-faq-${i}`} value={`tw-faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base text-m3-on-surface">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-m3-on-surface/70">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-14 sm:py-20 bg-m3-surface text-center">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              October 5 is close
            </h2>
            <p className="mt-3 text-sm sm:text-base text-m3-on-surface/70">
              San Francisco Tech Week video production books out fast. Send us your date and we
              will tell you today if we can cover it.
            </p>
            <button
              onClick={() => scrollTo('tech-week-form')}
              className="m3-filled-button text-base px-7 py-3.5 mt-6"
            >
              Lock your date
            </button>
          </div>
        </section>
      </PageLayout>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.video_url || null}
        title={activeVideo?.title}
      />
    </>
  )
}
