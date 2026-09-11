'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { SEOHead, areaServed } from '@/components/SEOHead'
import { ProjectCard } from '@/components/ProjectCard'
import { VideoModal } from '@/components/VideoModal'
import { TrustedBrands } from '@/components/TrustedBrands'
import { ConventionForm } from '@/components/conventions/ConventionForm'
import { useProjects, type Project } from '@/hooks/useProjects'
import { useConventionStatus } from '@/hooks/useConventionStatus'
import { deliverables } from '@/data/deliverables'
import {
  conventions,
  formatEditionRange,
  nextUnknownYear,
  sharedConventionFaqs,
  type Convention,
} from '@/lib/conventions'
import NotFoundPage from './NotFoundPage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const SITE_URL = 'https://where2studios.com'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function joinNames(names: string[]) {
  if (names.length <= 1) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/** A convention with a dedicated page just points at it. */
function ConventionRedirect({ convention }: { convention: Convention }) {
  const navigate = useNavigate()
  const href = convention.href!

  useEffect(() => {
    navigate(href, { replace: true })
  }, [navigate, href])

  return (
    <>
      <SEOHead
        title={`${convention.name} Video Coverage in San Francisco | Where2Studios`}
        description={`Video coverage for ${convention.name} in San Francisco.`}
        canonical={href}
        robots="noindex, follow"
      />
      <PageLayout navVariant="dark">
        <section className="bg-m3-surface-dark min-h-[60vh] pt-[calc(var(--nav-h,112px)+2rem)] pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h1 className="font-fredoka text-3xl font-semibold text-m3-on-dark">
              {convention.name}
            </h1>
            <Link to={href} className="m3-filled-button text-sm px-6 py-3 mt-6 inline-block">
              Go to the {convention.name} page
            </Link>
          </div>
        </section>
      </PageLayout>
    </>
  )
}

function ConventionContent({ convention }: { convention: Convention }) {
  const { data: projects } = useProjects()
  const [activeVideo, setActiveVideo] = useState<Project | null>(null)
  const [preselected, setPreselected] = useState('')
  const { edition, phase } = useConventionStatus(convention)

  const proof = useMemo(() => {
    const all = projects || []
    return convention.proofSlugs
      .map((slug) => all.find((p) => p.slug === slug))
      .filter((p): p is Project => !!p)
  }, [projects, convention.proofSlugs])

  const clientNames = useMemo(() => {
    const names = proof
      .map((p) => p.client_name)
      .filter((name): name is string => !!name)
    return joinNames([...new Set(names)])
  }, [proof])

  const tbaYear = nextUnknownYear(convention)
  const year = edition?.year ?? tbaYear
  const dateLine = edition ? formatEditionRange(edition) : null

  const eyebrow = dateLine ?? `${convention.name} ${tbaYear}, dates to be announced`
  const h1 =
    phase.kind === 'live'
      ? `${convention.name} is live. Crews on the ground this week.`
      : `Video coverage for ${convention.name} ${year}`

  let countdown: string | null = null
  if (phase.kind === 'live') {
    countdown = `${convention.name} is live, day ${phase.day} of ${phase.totalDays}`
  } else if (phase.kind === 'countdown') {
    countdown =
      phase.days === 1
        ? `${convention.name} starts tomorrow`
        : `${phase.days} days until ${convention.name}`
  }

  const pageUrl = `${SITE_URL}/conventions/${convention.slug}`
  const title = `${convention.name} Video Coverage in San Francisco | Where2Studios`
  const description = dateLine
    ? `Video coverage for ${convention.name}, ${dateLine}. Brand HQ, hospitality suite and side event coverage near Moscone. Exec clips by the next morning, full recap the same week.`
    : `Video coverage for ${convention.name} ${tbaYear} in San Francisco. Brand HQ, hospitality suite and side event coverage near Moscone, with exec clips by the next morning.`

  const faqs = [...convention.faqs, ...sharedConventionFaqs]

  const quotable = `Where2Studios covers ${convention.name} in San Francisco: brand headquarters, hospitality suites, exec meetings and side events near Moscone, with clips delivered by the next morning and a full recap the same week.${
    clientNames
      ? ` We have shot ${clientNames} during ${convention.name} and other convention weeks at The Howard, B Restaurant and The Veranda.`
      : ''
  }`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${convention.name} Video Coverage`,
    serviceType: 'Event video production',
    description,
    url: pageUrl,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Conventions', item: `${SITE_URL}/conventions` },
      { '@type': 'ListItem', position: 3, name: convention.name, item: pageUrl },
    ],
  }

  const eventSchema = edition
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `${convention.name} ${edition.year}`,
        startDate: edition.start,
        endDate: edition.end,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: convention.venue,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            addressCountry: 'US',
          },
        },
        organizer: { '@type': 'Organization', name: convention.organizer },
      }
    : null

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={`/conventions/${convention.slug}`}
        schema={
          eventSchema
            ? [serviceSchema, faqSchema, breadcrumbSchema, eventSchema]
            : [serviceSchema, faqSchema, breadcrumbSchema]
        }
      />
      <PageLayout navVariant="dark">
        {/* Hero */}
        <section className="bg-m3-surface-dark pb-12 sm:pb-16 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <p className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              {eyebrow}
            </p>
            <h1 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark mt-3">
              {h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-dark/75">
              Brand HQ, hospitality suite and side event coverage steps from Moscone. Exec clips,
              activation recaps and same week social cutdowns.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => scrollTo('convention-form')}
                className="m3-filled-button text-sm px-6 py-3"
              >
                Book {convention.name} coverage
              </button>
              <button
                onClick={() => scrollTo('convention-proof')}
                className="m3-outlined-button text-sm px-6 py-3 text-m3-on-dark border-m3-on-dark/30"
              >
                See the work
              </button>
            </div>
            {countdown && (
              <p
                className="font-fredoka font-semibold text-m3-primary mt-5 text-lg"
                aria-live="polite"
              >
                {countdown}
              </p>
            )}
            <p className="mt-2 text-xs text-m3-on-dark/60">{convention.venue}</p>
          </div>
        </section>

        {/* Brand strip */}
        <div className="bg-m3-background">
          <TrustedBrands />
        </div>

        {/* Quotable answer */}
        <section className="py-10 sm:py-12 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <div className="m3-outlined-card p-5 sm:p-6">
              <p className="text-sm sm:text-base text-m3-on-surface/80 leading-relaxed">
                {quotable}
              </p>
            </div>
          </div>
        </section>

        {/* Buyers */}
        <section className="py-10 sm:py-14 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              Who books us during {convention.name}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-m3-on-surface/75">
              {joinNames(convention.buyers)}.
            </p>
            <p className="mt-3 text-sm sm:text-base text-m3-on-surface/75">{convention.audience}</p>
          </div>
        </section>

        {/* Proof */}
        <section
          id="convention-proof"
          className="py-12 sm:py-20 bg-m3-background scroll-mt-[calc(var(--nav-h,80px)+16px)]"
        >
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              Convention week work
            </h2>
            <p className="mt-2 text-sm sm:text-base text-m3-on-surface/70">
              Real work, not a mood board.
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
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm"
              >
                See all our work
                <ArrowRight className="w-4 h-4" />
              </Link>
              {taggedCount > proof.length && (
                <Link
                  to="/work?category=convention-week"
                  className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm"
                >
                  All {convention.name} work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-12 sm:py-16 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
              What we deliver
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {deliverables.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="m3-elevated-card p-5">
                    <Icon className="w-5 h-5 text-m3-primary" aria-hidden="true" />
                    <h3 className="font-fredoka text-lg font-semibold text-m3-on-surface mt-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-m3-on-surface/70 mt-2">{item.line}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-xs sm:text-sm text-m3-on-surface/60 mt-6">
              Quote based. Send your dates and we scope it the same day.
            </p>
          </div>
        </section>

        {/* Form */}
        <section
          id="convention-form"
          className="py-12 sm:py-16 bg-m3-surface-variant scroll-mt-[calc(var(--nav-h,80px)+16px)]"
        >
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              Book {convention.name} coverage
            </h2>
            <ConventionForm
              slug={convention.slug}
              conventionName={convention.name}
              year={year}
              preselected={preselected}
              onPreselect={setPreselected}
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
              {convention.name} questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={`cv-faq-${i}`} value={`cv-faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base text-m3-on-surface">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-m3-on-surface/70">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8">
              <Link
                to="/conventions"
                className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm"
              >
                See the full convention calendar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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

export default function ConventionPage() {
  const { slug } = useParams<{ slug: string }>()
  const convention = conventions.find((c) => c.slug === slug)

  if (!convention) return <NotFoundPage />
  if (convention.href) return <ConventionRedirect convention={convention} />
  return <ConventionContent convention={convention} />
}

export function getConventionStaticPaths(): string[] {
  return conventions.map((c) => `/conventions/${c.slug}`)
}
