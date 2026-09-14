'use client'

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { KeepReading } from '@/components/layout/KeepReading'
import { SEOHead, areaServed } from '@/components/SEOHead'
import { ProjectCard } from '@/components/ProjectCard'
import { VideoModal } from '@/components/VideoModal'
import { TrustedBrands } from '@/components/TrustedBrands'
import { RSACCountdown } from '@/components/rsac/RSACCountdown'
import { RSACForm } from '@/components/rsac/RSACForm'
import { useProjects, proofWall, getThumbnail, type Project } from '@/hooks/useProjects'
import { isPortraitMedia } from '@/lib/video'
import { useConventionStatus } from '@/hooks/useConventionStatus'
import { sharedConventionFaqs } from '@/lib/conventions'
import {
  RSAC,
  RSAC_PROOF_SLUGS,
  RSAC_SPONSOR_DESCRIPTION,
  RSAC_SPONSOR_OPTION,
  RSAC_SPONSOR_PRICE,
  rsacDateLine,
  rsacPackages,
} from '@/lib/rsaConference'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const PAGE_TITLE = 'RSA Conference Video Coverage, San Francisco | Where2Studios'
const PAGE_DESCRIPTION =
  'RSAC video coverage in San Francisco. Experience hub, suite and side event films near Moscone for Cloudflare, Claroty and 1Password, with clips by 10am.'
const PAGE_URL = 'https://where2studios.com/rsa-conference-video'

const ANSWER =
  'Where2Studios shoots RSA Conference week in San Francisco. We have covered RSAC activations for Cloudflare and Claroty and shot the full convention week at B Restaurant, all within a few blocks of Moscone. Recap films, exec clips and vertical cutdowns, with a clip delivered by 10am the next day.'

const whoThisIsFor = [
  'Security vendors running an experience hub or lounge near Moscone',
  'Hospitality suites and analyst briefing rooms that need footage the sales team can use all quarter',
  'Sponsors who have to prove the activation was busy when the CMO asks on Monday',
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function RSAConferencePage() {
  const { data: projects } = useProjects()
  const [activeVideo, setActiveVideo] = useState<Project | null>(null)
  const [preselected, setPreselected] = useState('')
  const { edition, phase, now } = useConventionStatus(RSAC)
  const dateLine = rsacDateLine(now)

  const proof = useMemo(() => proofWall(projects || [], RSAC_PROOF_SLUGS), [projects])

  const faqs = useMemo(() => {
    const seen = new Set<string>()
    return [...RSAC.faqs, ...sharedConventionFaqs]
      .filter((f) => {
        if (seen.has(f.q)) return false
        seen.add(f.q)
        return true
      })
      .slice(0, 8)
  }, [])

  const requestQuote = (packageName: string) => {
    setPreselected(packageName)
    scrollTo('rsac-form')
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'RSA Conference Video Coverage',
    serviceType: 'Event video production',
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    provider: { '@id': 'https://where2studios.com/#business' },
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RSA Conference packages',
      itemListElement: [
        ...rsacPackages.map((p) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: p.name, description: p.description },
          price: p.startingPrice,
          priceCurrency: 'USD',
        })),
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: RSAC_SPONSOR_OPTION,
            description: RSAC_SPONSOR_DESCRIPTION,
          },
          price: RSAC_SPONSOR_PRICE,
          priceCurrency: 'USD',
        },
      ],
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
      { '@type': 'ListItem', position: 2, name: 'RSA Conference video', item: PAGE_URL },
    ],
  }

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'RSA Conference 2027',
    startDate: '2027-04-05',
    endDate: '2027-04-08',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Moscone Center',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    organizer: { '@type': 'Organization', name: RSAC.organizer },
  }

  const videoSchemas = proof
    .filter((project) => !!project.video_url)
    .map((project) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: project.title,
      description: project.description || project.title,
      thumbnailUrl: getThumbnail(project),
      uploadDate: new Date(project.created_at).toISOString(),
      embedUrl: project.video_url,
      contentUrl: project.video_url,
      url: project.slug ? `https://where2studios.com/work/${project.slug}` : PAGE_URL,
      inLanguage: 'en-US',
      isFamilyFriendly: true,
      publisher: { '@id': 'https://where2studios.com/#business' },
    }))

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        ogTitle="RSA Conference video coverage"
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        answer
        image="/og/rsa-conference-video.png"
        imageAlt="RSA Conference video coverage"
        breadcrumbName="RSA Conference video"
        robots="index, follow"
        schema={[serviceSchema, faqSchema, breadcrumbSchema, eventSchema, ...videoSchemas]}
      />

      <PageLayout navVariant="dark">
        {/* Hero */}
        <section className="bg-m3-surface-dark pb-12 sm:pb-16 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <p className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              RSA Conference, {dateLine}
            </p>
            <h1 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark mt-3">
              RSA Conference video coverage in San Francisco.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-dark/75">
              Experience hubs, hospitality suites, podcast days and evening receptions around
              Moscone during RSAC week. Clips in your inbox by 10am the next morning.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => scrollTo('rsac-form')}
                className="m3-filled-button text-sm px-6 py-3"
              >
                Tell us your RSAC dates
              </button>
              <button
                onClick={() => scrollTo('rsac-proof')}
                className="m3-outlined-button text-sm px-6 py-3 text-m3-on-dark border-m3-on-dark/30"
              >
                See the work
              </button>
            </div>

            <RSACCountdown className="mt-5 text-lg" />
            <p className="mt-2 text-xs text-m3-on-dark/60">
              {edition && edition.year === 2027
                ? 'RSAC 2027 runs April 5 to 8, 2027 at Moscone.'
                : `RSA Conference ${dateLine}, Moscone North, South and West.`}
            </p>
          </div>
        </section>

        {/* Answer */}
        <section className="py-10 sm:py-14 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <p id="answer" className="text-base sm:text-lg text-m3-on-surface/80">
              {ANSWER}
            </p>
          </div>
        </section>

        {/* Brand strip */}
        <div className="bg-m3-background">
          <TrustedBrands />
        </div>

        {/* Proof */}
        <section
          id="rsac-proof"
          className="py-12 sm:py-20 bg-m3-background scroll-mt-[calc(var(--nav-h,80px)+16px)]"
        >
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              RSAC weeks we have already shot
            </h2>
            <p className="mt-2 text-sm sm:text-base text-m3-on-surface/70">
              Cloudflare. Claroty. 1Password. ReliaQuest. B Restaurant.
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

        {/* Who this is for */}
        <section className="py-12 sm:py-16 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              Who this is for
            </h2>
            <ul className="mt-6 space-y-4">
              {whoThisIsFor.map((item) => (
                <li
                  key={item}
                  className="text-sm sm:text-base text-m3-on-surface/75 border-l-2 border-m3-primary pl-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Packages */}
        <section className="py-12 sm:py-16 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              Four ways to book us for RSAC week
            </h2>
            <p className="mt-2 mb-8 text-sm sm:text-base text-m3-on-surface/70">
              Priced per event or per week.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {rsacPackages.map((pkg) => (
                <div key={pkg.id} className="m3-elevated-card p-5 flex flex-col">
                  {pkg.tag && (
                    <span className="self-start rounded-full bg-m3-primary/15 text-m3-primary text-[11px] font-semibold px-3 py-1 mb-3">
                      {pkg.tag}
                    </span>
                  )}
                  <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface">
                    {pkg.name}
                  </h3>
                  <p className="text-sm font-semibold text-m3-primary mt-1">
                    Starting at ${pkg.startingPrice.toLocaleString()}
                  </p>
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
            <p className="text-xs sm:text-sm text-m3-on-surface/60 mt-6">
              Starting prices. Every event is different, so we scope each one and quote the same day.
            </p>
          </div>
        </section>

        {/* Sponsor add on */}
        <section className="py-12 sm:py-16 bg-m3-surface-dark">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark">
              {RSAC_SPONSOR_OPTION}, starting at ${RSAC_SPONSOR_PRICE.toLocaleString()}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-m3-on-dark/75">
              {RSAC_SPONSOR_DESCRIPTION}
            </p>
            <button
              onClick={() => requestQuote(RSAC_SPONSOR_OPTION)}
              className="m3-filled-button text-sm px-6 py-3 mt-6"
            >
              Talk to us about sponsor coverage
            </button>
          </div>
        </section>

        {/* Form */}
        <section
          id="rsac-form"
          className="py-12 sm:py-16 bg-m3-surface-variant scroll-mt-[calc(var(--nav-h,80px)+16px)]"
        >
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-2">
              Tell us your RSAC dates.
            </h2>
            <p className="text-sm text-m3-on-surface/70 mb-6">We reply within 1 business day.</p>
            <RSACForm preselected={preselected} onPreselect={setPreselected} />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              RSA Conference questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={`rsac-faq-${i}`} value={`rsac-faq-${i}`}>
                  <AccordionTrigger
                    data-faq-question
                    className="text-left text-sm sm:text-base text-m3-on-surface"
                  >
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
              {phase.kind === 'live' ? 'RSAC week is on' : 'Plan the footage early'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-m3-on-surface/70">
              Send us your dates and we will tell you today if we can cover them.
            </p>
            <button
              onClick={() => scrollTo('rsac-form')}
              className="m3-filled-button text-base px-7 py-3.5 mt-6"
            >
              Tell us your RSAC dates
            </button>
          </div>
        </section>

        <KeepReading
          links={[
            { label: 'RSA Conference on the calendar', href: '/conventions/rsac' },
            { label: 'Why a dedicated crew', href: '/why-a-dedicated-crew' },
            { label: 'Our work', href: '/work' },
          ]}
        />
      </PageLayout>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.video_url || null}
        title={activeVideo?.title}
        portrait={activeVideo ? isPortraitMedia(activeVideo) : false}
      />
    </>
  )
}
