'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { SkipLink } from '@/components/layout/SkipLink'
import { SEOHead, areaServed } from '@/components/SEOHead'
import { TechWeekInlineCallout } from '@/components/techweek/TechWeekCallout'
import { useBookingSheet } from '@/contexts/BookingSheetContext'
import { useAllProjects, CaseStudy } from '@/hooks/useCaseStudy'
import { getThumbnail } from '@/hooks/useProjects'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const PAGE_DESCRIPTION =
  'Event recap videos for conferences, summits, brand activations and corporate events in the San Francisco Bay Area. Next day teaser edits, speaker and panel clips, full recap edits, vertical cutdowns.'

const SHORT_ANSWER =
  'An event recap video is a short film that turns your event into content you can keep using. Where2Studios covers conferences, summits and brand activations across the San Francisco Bay Area, then delivers a next day teaser, a full recap edit, speaker and panel clips, and vertical cutdowns for social.'

const deliverables = [
  {
    title: 'Full recap edit',
    line: 'Your hero asset, 60 to 120 seconds, built around the story of the day.',
  },
  {
    title: 'Next day teaser edit',
    line: 'A short cut you can post while people are still talking about the event.',
  },
  {
    title: 'Speaker and panel clips',
    line: 'Standalone clips of the talks and panels worth sharing on their own.',
  },
  {
    title: 'Vertical cutdowns',
    line: 'Reframed versions sized for Instagram, TikTok and LinkedIn.',
  },
  { title: 'Photo selects', line: 'Edited stills from the day for decks, recaps and press.' },
  
]

const steps = [
  { n: '01', title: 'Strategy call', line: 'We learn the goal, the audience and where the video needs to run.' },
  { n: '02', title: 'Shot list and run of show', line: 'We map moments, speakers and timing against your schedule.' },
  { n: '03', title: 'Coverage day', line: 'Our crew shoots the room, the stage, the details and the interviews.' },
  { n: '04', title: 'Delivery', line: 'Teaser first, then the full recap, clips, verticals and photo selects.' },
]

const eventTypes = [
  'Tech conferences and summits',
  'Corporate offsites and all hands',
  'Product launches and brand activations',
  'Festivals and food events',
  'Nonprofit galas and fundraisers',
  'Sports and community events',
]

const faqs = [
  {
    q: 'What is an event recap video?',
    a: 'A short edit that captures what your event was about. Most brands use it for follow up email, social and next year promotion.',
  },
  {
    q: 'How much does an event recap video cost in the Bay Area?',
    a: 'Quote based, not a fixed package. It depends on event length, crew size, deliverables and turnaround. Book a call and we scope it same day.',
  },
  {
    q: 'How fast can you turn around a recap?',
    a: 'The teaser comes first so you have something to post right away. The full recap, clips and verticals follow once the edit is locked.',
  },
  {
    q: 'What is the difference between a teaser and a full recap?',
    a: 'The teaser is a short cut built for speed. The full recap is the 60 to 120 second hero edit with more of the story.',
  },
  {
    q: 'How many shooters do you send?',
    a: 'It depends on the event. We size the crew on the call so nothing important gets missed.',
  },
  {
    q: 'Do you cover multi day conferences?',
    a: 'Yes. We plan coverage day by day against your run of show and keep the same crew across the event.',
  },
  {
    q: 'Do you handle photo as well as video?',
    a: 'Yes. You can add edited photo selects to any event package, shot by the same team.',
  },
  {
    q: 'Do you help with posting and distribution?',
    a: 'Yes. We also offer social media management and content distribution if you want the recap posted and cut per platform.',
  },
]


function EventProjectCard({ project, index }: { project: CaseStudy; index: number }) {
  const thumbnail = project.thumbnail_url || getThumbnail(project as any)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/work/${project.slug || project.id}`}
        className="group block m3-elevated-card overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={`Event recap video for ${project.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-dark/80 via-transparent to-transparent" />
          {project.video_url && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-12 h-12 rounded-full bg-m3-primary/90 flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-m3-on-primary fill-current ml-0.5" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-fredoka text-base font-semibold text-m3-on-surface mb-1 line-clamp-1 group-hover:text-m3-primary transition-colors">
            {project.title}
          </h3>
          {project.result && (
            <p className="text-sm text-m3-on-surface/60 line-clamp-2 mb-2">{project.result}</p>
          )}
          <div className="flex items-center gap-1 text-m3-primary font-medium text-sm group-hover:gap-2 transition-all">
            Watch the film
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function EventRecapVideosPage() {
  const { openSheet } = useBookingSheet()
  const { data: recaps } = useAllProjects({ category: 'event-recaps' })
  const { data: events } = useAllProjects({ category: 'events' })

  const proof = [...(recaps || []), ...(events || [])]
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return (a.display_order ?? 0) - (b.display_order ?? 0)
    })
    .slice(0, 6)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Event Recap Video Production',
    serviceType: 'Event Recap Video Production',
    description: PAGE_DESCRIPTION,
    url: 'https://where2studios.com/event-recap-videos',
    provider: { '@id': 'https://where2studios.com/#business' },
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Event recap video deliverables',
      itemListElement: deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d.title, description: d.line },
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
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://where2studios.com/services' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Event Recap Videos',
        item: 'https://where2studios.com/event-recap-videos',
      },
    ],
  }

  return (
    <>
      <SkipLink />
      <SEOHead
        title="Event Recap Videos | Bay Area Conference Video Production | Where2Studios"
        description={PAGE_DESCRIPTION}
        url="https://where2studios.com/event-recap-videos"
        schema={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <div className="min-h-screen bg-m3-surface-variant">
        <Navbar variant="light" />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {/* Hero */}
          <section className="pt-28 pb-10 sm:pt-40 sm:pb-14">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                  Event Recap Videos
                </span>
                <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2">
                  Event recap videos for Bay Area conferences and brand events
                </h1>
                <p className="mt-4 text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                  We cover the event, then deliver a teaser you can post while people are still
                  talking about it. After that comes the full recap edit, speaker clips and vertical
                  cutdowns for social.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-3 mt-6">
                  <button onClick={openSheet} className="m3-filled-button text-sm px-6 py-3">
                    Book a Call
                  </button>
                  <Link to="/work" className="m3-outlined-button text-sm px-6 py-3">
                    See Event Recaps
                  </Link>
                </div>

                <p className="text-m3-on-surface/50 text-xs mt-3">
                  Free 30 minute strategy call, we reply within 1 business day.
                </p>
              </motion.div>
            </div>
          </section>

          <div className="pb-8">
            <TechWeekInlineCallout />
          </div>

          {/* Short answer block */}
          <section className="pb-12">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <div className="m3-outlined-card p-5 sm:p-6 max-w-3xl">
                <p className="text-sm sm:text-base text-m3-on-surface/80 leading-relaxed">
                  {SHORT_ANSWER}
                </p>
              </div>
            </div>
          </section>

          {/* What you get */}
          <section className="py-12 sm:py-16 bg-m3-surface">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-8">
                What you get
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {deliverables.map((d) => (
                  <div key={d.title} className="m3-outlined-card p-5 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-m3-primary shrink-0" />
                      <h3 className="font-fredoka text-base font-semibold text-m3-on-surface">
                        {d.title}
                      </h3>
                    </div>
                    <p className="text-sm text-m3-on-surface/70">{d.line}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-8">
                How it works
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {steps.map((s) => (
                  <div key={s.n} className="m3-elevated-card p-5 h-full">
                    <div className="text-m3-primary font-fredoka text-sm font-semibold mb-2">
                      {s.n}
                    </div>
                    <h3 className="font-fredoka text-base font-semibold text-m3-on-surface mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-m3-on-surface/70">{s.line}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Events we cover */}
          <section className="py-12 sm:py-16 bg-m3-surface">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
                Events we cover
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl">
                {eventTypes.map((type) => (
                  <li
                    key={type}
                    className="flex items-start gap-2 text-sm sm:text-base text-m3-on-surface/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-m3-primary mt-1 shrink-0" />
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Where we shoot */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-4">
                Where we shoot
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-m3-on-surface/75">
                <p>
                  Most of our event work happens in San Francisco, Oakland and San Jose, where the
                  conference and summit calendar is busiest.
                </p>
                <p>
                  We shoot regularly down the peninsula and through the South Bay in Sunnyvale, Santa
                  Clara and Palo Alto, and across the East Bay in Berkeley, Fremont and Union City.
                </p>
                <p>
                  If your event sits anywhere else in the wider Bay Area, we can get there, and we
                  travel for multi day conferences.
                </p>
              </div>
            </div>
          </section>

          {/* Proof */}
          {proof.length > 0 && (
            <section className="py-12 sm:py-16 bg-m3-surface">
              <div className="container mx-auto px-4 sm:px-8 lg:px-12">
                <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-8">
                  Recent event recaps
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {proof.map((project, index) => (
                    <EventProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="py-12 sm:py-16 bg-m3-background">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl">
              <h2 className="font-fredoka text-2xl sm:text-3xl font-semibold text-m3-on-surface mb-6">
                Event recap video FAQ
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={`faq-${i}`} value={`faq-${i}`}>
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
          <section className="py-16 sm:py-24 bg-m3-surface">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
              <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
                Got an event on the calendar?
              </h2>
              <p className="mt-4 text-m3-on-surface/60 max-w-xl mx-auto">
                Book a strategy call. Tell us the event, the dates and the goal. We will map
                deliverables, timeline and budget.
              </p>
              <p className="mt-2 text-m3-on-surface/40 text-sm">
                Free 30 minute strategy call, we reply within 1 business day.
              </p>
              <div className="mt-8">
                <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                  Book a Call
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}
