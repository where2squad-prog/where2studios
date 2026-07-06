'use client'

import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { SEOHead, organizationSchema } from '@/components/SEOHead'
import { SkipLink } from '@/components/layout/SkipLink'
import { useBookingSheet } from '@/contexts/BookingSheetContext'

// SVG imports
import joshuaSvg from '@/assets/team/joshua.svg'
import danielSvg from '@/assets/team/daniel.svg'
import gavinSvg from '@/assets/team/gavin.svg'
import anthonySvg from '@/assets/team/anthony.svg'
import gabbySvg from '@/assets/team/gabby.svg'
import ryanSvg from '@/assets/team/ryan.svg'
import josephSvg from '@/assets/team/joseph.svg'
import mayadSvg from '@/assets/team/mayad.svg'

interface TeamMember {
  name: string
  role: string
  blurb: string
  image?: string
  instagram?: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Joshua Saltiban',
    role: 'Chief Executive Officer, Founder',
    blurb: 'Building Where2 from the ground up, vision, systems, and execution.',
    image: joshuaSvg,
    instagram: 'heyyosalty',
    linkedin: 'joshua-saltiban-486003209',
  },
  {
    name: 'Daniel Martinez',
    role: 'Head of Marketing, Co-Founder',
    blurb: 'Marketing that actually moves, strategy, growth, and real results.',
    image: danielSvg,
    instagram: 'hungrydanz',
    linkedin: 'danieldean94',
  },
  {
    name: 'Gavin Legaspi',
    role: 'Creative Director, Co-Founder',
    blurb: 'Turning real moments into visuals people feel and remember.',
    image: gavinSvg,
    instagram: 'batang.gabino',
    linkedin: 'gavin-legaspi-a85b57250',
  },
  {
    name: 'Anthony Gonzalez',
    role: 'Head of Brand & Content Strategy, Co-Founder',
    blurb: 'Helping brands stay on point, content strategy with direction and taste.',
    image: anthonySvg,
    instagram: 'antjgonz',
    linkedin: 'anthony-gonzalez-7a8378349',
  },
  {
    name: 'Gabby Guevara',
    role: 'Social Media Manager',
    blurb: 'Keeping the socials consistent, clean, and always on brand.',
    image: gabbySvg,
    linkedin: 'gabrielleguevara',
  },
  {
    name: 'Ryan Sison',
    role: 'Video Operations Lead',
    blurb: 'Making every shoot run smooth, clean process, clean delivery.',
    image: ryanSvg,
    instagram: 'just.ryjo',
  },
  {
    name: 'Joseph Jimenez',
    role: 'Head of Photography',
    blurb: 'Capturing the details that make the story hit harder.',
    image: josephSvg,
    instagram: 'itsjobruh',
  },
  {
    name: 'Mayad Post Production House',
    role: 'Overseas Post Production Powerhouse',
    blurb: 'Our overseas post team, fast turnarounds, polished edits, built to scale.',
    image: mayadSvg,
    instagram: 'mpost.ph',
  },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function TeamPage() {
  const { openSheet } = useBookingSheet()

  return (
    <>
      <SkipLink />
      <SEOHead
        title="Who We Are"
        description="Meet the Where2Studios team. A growth partner for ambitious brands. Strategy, storytelling, and execution. Our goal is to tell stories worth sharing."
        schema={organizationSchema}
      />

      <div className="min-h-screen bg-m3-surface">
        <Navbar variant="light" />
        <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section */}
        <section className="pt-28 pb-12 sm:pt-40 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
                Who We Are
              </span>
              <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-semibold text-m3-on-surface mt-2 mb-6">
                We're not just a media company. We're your growth partner.
              </h1>
              <p className="text-base sm:text-lg text-m3-on-surface/70 max-w-xl">
                Built with startups in mind, we help emerging and scaling brands look established, credible, and unforgettable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Body Sections */}
        <section className="pb-12 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-3">What we do</h2>
                <p className="text-m3-on-surface/70 leading-relaxed">
                  From full scale marketing strategy to cinematic video production, photography, podcast production, event coverage, and brand storytelling, we create media that accelerates businesses forward.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-3">Who we help</h2>
                <p className="text-m3-on-surface/70 leading-relaxed">
                  We specialize in startups and small businesses, and our portfolio spans hospitality, tourism, food and beverage, tech, and service based brands.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mb-3">How we think</h2>
                <p className="text-m3-on-surface/70 leading-relaxed">
                  Every project starts with a strategy. Every asset has a purpose. Every campaign has a measurable goal. That's how brands grow.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-4">
                <p className="text-m3-on-surface/80 text-base sm:text-lg leading-relaxed font-medium italic">
                  "If you're building something worth sharing, we're the team that helps the world see it. Our goal is to tell stories worth sharing."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="pb-16 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="m3-outlined-card p-5 h-full transition-all duration-300 hover:border-m3-primary/30 group">
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      <Avatar className="w-16 h-16">
                        {member.image ? (
                          <AvatarImage
                            src={member.image}
                            alt={member.name}
                            className="object-cover"
                          />
                        ) : null}
                        <AvatarFallback className="bg-m3-surface-variant text-m3-on-surface text-lg font-semibold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Info */}
                    <div className="text-center">
                      <h3 className="font-fredoka font-semibold text-m3-on-surface text-sm">{member.name}</h3>
                      <p className="text-m3-primary text-xs font-medium mb-2 line-clamp-2">{member.role}</p>
                      <p className="text-m3-on-surface/70 text-xs leading-relaxed">{member.blurb}</p>
                    </div>

                    {/* Social Links */}
                    {(member.instagram || member.linkedin) && (
                      <div className="flex justify-center gap-3 mt-4">
                        {member.instagram && (
                          <a
                            href={`https://instagram.com/${member.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-m3-on-surface/50 hover:text-m3-primary transition-colors"
                            aria-label={`${member.name} on Instagram`}
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-m3-on-surface/50 hover:text-m3-primary transition-colors"
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-m3-surface-variant">
          <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
            <h2 className="font-fredoka text-2xl sm:text-4xl font-semibold text-m3-on-surface">
              Ready to work with us?
            </h2>
            <p className="mt-4 text-m3-on-surface/60 max-w-xl mx-auto">
              Free 30 minute strategy call, we reply within 1 business day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={openSheet} className="m3-filled-button text-lg px-8 py-4">
                Book a Call
              </button>
              <Link to="/work" className="m3-outlined-button">
                See Our Work
              </Link>
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
