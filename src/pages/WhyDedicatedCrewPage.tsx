'use client'

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { SEOHead } from '@/components/SEOHead'
import { ProjectCard } from '@/components/ProjectCard'
import { VideoModal } from '@/components/VideoModal'
import { useProjects, type Project } from '@/hooks/useProjects'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

const SITE_URL = 'https://where2studios.com'

const PROOF_SLUGS = [
  'cloudflare-rsa-conference-2025',
  'google-pixel-house-nba-all-star-2025',
  'immuta-snowflake-summit-2025',
]

const STATS = [
  { value: '9+', label: 'Convention weeks covered' },
  { value: '20+', label: 'Tech brands' },
  { value: '22', label: 'Brand HQ films' },
  { value: '10am', label: 'Next morning clip delivery' },
]

const SECTIONS = [
  {
    id: 'build-to-strike',
    title: 'On site from build to strike',
    body: [
      'We shoot a time lapse of the build the morning before doors.',
      'Then we are in the space every day of the week, not just for the party.',
    ],
  },
  {
    id: 'clips-by-10am',
    title: 'Clips by 10am',
    body: [
      'Shoot day one, teaser and one vertical clip in your inbox by 10am day two.',
      'Exec clips follow the same rhythm, so a keynote posts while the speaker is still in town.',
    ],
  },
  {
    id: 'one-folder',
    title: 'One folder for every stakeholder',
    body: [
      'Exec, sponsor, social and sales each need a different cut of the same week.',
      'Everything lands in one shared folder, organised by day and by deliverable.',
    ],
  },
  {
    id: 'moscone-venues',
    title: 'Built for the venues around Moscone',
    body: [
      'We have shot The Howard, B Restaurant and The Veranda, the Gourmet Provisions venue cluster near Moscone.',
      'We know the load in doors, the light at 6pm and where the power is.',
    ],
  },
  {
    id: 'photo-and-video',
    title: 'Photo and video from one crew',
    body: [
      'Edited photo selects ship with every booking.',
      'They are shot by the same crew already in the room.',
    ],
  },
]

const HERO_ANSWER =
  'A brand HQ runs exec meetings in the morning, demos at noon and a reception at night. One hired shooter gets you one edit three weeks later. A dedicated crew is on site from build to strike, cuts overnight, and puts a teaser and a vertical clip in your inbox by 10am.'


export default function WhyDedicatedCrewPage() {
  const { openSheet } = useBookingSheet()
  const { data: projects } = useProjects()
  const [activeVideo, setActiveVideo] = useState<Project | null>(null)

  const proof = useMemo(() => {
    const all = projects || []
    return PROOF_SLUGS.map((slug) => all.find((p) => p.slug === slug)).filter(
      (p): p is Project => !!p
    )
  }, [projects])

  const title = 'Why a Dedicated Convention Week Video Crew | Where2Studios'
  const description =
    'A single hired shooter gives you one deliverable three weeks later. A dedicated convention week crew is on site from build to strike and delivers clips by 10am the next morning.'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'You do not book a videographer for convention week. You deploy a content crew.',
    description,
    mainEntityOfPage: `${SITE_URL}/why-a-dedicated-crew`,
    author: { '@id': `${SITE_URL}/#business` },
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Why a dedicated crew',
        item: `${SITE_URL}/why-a-dedicated-crew`,
      },
    ],
  }

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical="/why-a-dedicated-crew"
        type="article"
        schema={[articleSchema, breadcrumbSchema]}
      />
      <PageLayout navVariant="light">
        {/* Hero */}
        <section className="bg-m3-background pb-10 sm:pb-14 pt-[calc(var(--nav-h,112px)+1.5rem)] sm:pt-[calc(var(--nav-h,112px)+2.5rem)]">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
            <p className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
              Why Where2Studios
            </p>
            <h1 className="font-fredoka text-3xl sm:text-5xl font-semibold text-m3-on-surface mt-3">
              You do not book a videographer for convention week. You deploy a content crew.
            </h1>
            <p id="answer" className="mt-5 text-base sm:text-lg text-m3-on-surface/75">
              {HERO_ANSWER}
            </p>

          </div>
        </section>

        {/* Argument sections */}
        <section className="py-12 sm:py-16 bg-m3-surface">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface">
                  {section.title}
                </h2>
                {section.body.map((line, i) => (
                  <p key={i} className="mt-3 text-sm sm:text-base text-m3-on-surface/75">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 sm:py-14 bg-m3-background">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-6 sm:gap-12 lg:gap-16">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proof */}
        {proof.length > 0 && (
          <section className="py-12 sm:py-16 bg-m3-surface">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
                What that looks like
              </h2>
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
            </div>
          </section>
        )}

        {/* Closing */}
        <section className="py-14 sm:py-20 bg-m3-surface-dark">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-2xl text-center">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-dark">
              Planning a convention week?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <button
                onClick={() => openSheet({ source: 'why-dedicated-crew' })}
                className="m3-filled-button text-sm px-6 py-3 inline-flex items-center gap-2"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/conventions"
                className="text-sm text-m3-on-dark/70 underline hover:text-m3-on-dark transition-colors"
              >
                See the convention calendar
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
