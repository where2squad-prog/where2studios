'use client'

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { SEOHead } from '@/components/SEOHead'
import { useConventionClock } from '@/hooks/useConventionStatus'
import {
  conventionHref,
  conventions,
  formatEditionRange,
  getConventionStatus,
  nextUnknownYear,
  statusChip,
} from '@/lib/conventions'

const SITE_URL = 'https://where2studios.com'
const PAGE_URL = `${SITE_URL}/conventions`
const PAGE_TITLE = 'San Francisco Convention Calendar, Video Coverage | Where2Studios'
const PAGE_DESCRIPTION =
  'Every San Francisco conference week we cover near Moscone, with dates. Dreamforce, RSAC, Snowflake Summit, Data + AI Summit, TechCrunch Disrupt, GDC and SF Tech Week.'

export default function ConventionsPage() {
  const now = useConventionClock()

  const cards = conventions
    .map((convention) => {
      const { edition, phase } = getConventionStatus(convention, now)
      return { convention, edition, phase }
    })
    .sort((a, b) => (a.edition?.start ?? '9999').localeCompare(b.edition?.start ?? '9999'))

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'San Francisco conference week calendar',
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cards.map((card, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: card.convention.name,
      url: `${SITE_URL}${conventionHref(card.convention)}`,
    })),
  }

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical="/conventions"
        schema={[collectionSchema, itemListSchema]}
      />
      <PageLayout navVariant="dark">
        <section className="bg-m3-surface-dark pb-12 sm:pb-16 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <h1 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-dark">
              San Francisco conference week calendar
            </h1>
            <p className="mt-4 text-base sm:text-lg text-m3-on-dark/75">
              Every conference week we cover near Moscone, with dates.
            </p>

          </div>
        </section>

        <section className="py-12 sm:py-16 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cards.map(({ convention, edition, phase }) => (
                <Link
                  key={convention.slug}
                  to={conventionHref(convention)}
                  className="m3-elevated-card p-5 flex flex-col hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-fredoka text-lg font-semibold text-m3-on-surface">
                      {convention.name}
                    </h2>
                    <span className="shrink-0 rounded-full bg-m3-primary/15 text-m3-primary text-[11px] font-semibold px-3 py-1">
                      {statusChip(convention, phase)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-m3-on-surface/80 mt-2">
                    {edition
                      ? formatEditionRange(edition)
                      : `${nextUnknownYear(convention)} dates to be announced`}
                  </p>
                  <p className="text-sm text-m3-on-surface/70 mt-1 flex-1">{convention.venue}</p>
                  <span className="inline-flex items-center gap-1.5 text-m3-primary font-semibold text-sm mt-5">
                    See coverage
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  )
}
