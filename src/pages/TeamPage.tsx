'use client'

import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

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
  return (
    <PageLayout navVariant="light">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="label text-m3-secondary mb-4 block">Who We Are</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-m3-on-surface mb-6">
              Who We Are
            </h1>
            <p className="text-xl text-m3-on-surface/80 mb-4">
              A passionate team of creators who believe every story deserves to be told.
            </p>
            <p className="text-lg text-m3-on-surface/70 leading-relaxed">
              Where2Studios is a media production & marketing agency that helps businesses 
              connect with real people. We create high quality visuals with fast turnaround times, 
              tell stories that move people, and help you reach the right audience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="pb-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="m3-outlined-card p-6 transition-all duration-300 hover:border-m3-primary/30 group">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-20 h-20">
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
                    <h3 className="font-semibold text-m3-on-surface">{member.name}</h3>
                    <p className="text-m3-primary text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-m3-on-surface/70 text-sm leading-relaxed">{member.blurb}</p>
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
                          <Instagram className="w-5 h-5" />
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
                          <Linkedin className="w-5 h-5" />
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
    </PageLayout>
  )
}
