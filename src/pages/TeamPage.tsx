'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import joshuaPhoto from '@/assets/team-joshua.png'
import danielPhoto from '@/assets/team-daniel.png'
import gabbyPhoto from '@/assets/team-gabby.png'
import ryanPhoto from '@/assets/team-ryan.png'
import gavinPhoto from '@/assets/team-gavin.png'
import anthonyPhoto from '@/assets/team-member-1.png'
import josephPhoto from '@/assets/team-member-2.png'
import { FloatingCTA } from '@/components/FloatingCTA'

const teamMembers = [
  {
    name: 'Joshua Saltiban',
    role: 'CEO',
    image: joshuaPhoto,
    bio: 'Founder and creative visionary behind Where2Studios. Passionate about storytelling that drives real results.',
  },
  {
    name: 'Daniel Martinez',
    role: 'Operations Lead',
    image: danielPhoto,
    bio: 'Keeps everything running smoothly from pre-production to final delivery.',
  },
  {
    name: 'Gabby Guevara',
    role: 'Social Media Manager',
    image: gabbyPhoto,
    bio: 'Crafts social strategies that turn followers into customers.',
  },
  {
    name: 'Ryan Sison',
    role: 'Lead Videographer',
    image: ryanPhoto,
    bio: 'Brings cinematic vision to every shoot with technical precision.',
  },
  {
    name: 'Gavin Legaspi',
    role: 'Content Producer',
    image: gavinPhoto,
    bio: 'Transforms raw footage into compelling visual stories.',
  },
  {
    name: 'Anthony Gonzalez',
    role: 'Content Producer',
    image: anthonyPhoto,
    bio: 'Expert in short-form content that captures attention.',
  },
  {
    name: 'Joseph Jimenez',
    role: 'Lead Photographer',
    image: josephPhoto,
    bio: 'Captures moments that tell the complete story.',
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-m3-background">
      <Navbar variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="label text-m3-secondary mb-4 block">Who We Are</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-m3-on-surface mb-6">
              Meet the team
            </h1>
            <p className="text-xl text-m3-on-surface/70">
              A collective of visual storytellers passionate about creating content that matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 sm:py-24 bg-m3-surface-variant">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="m3-outlined-card overflow-hidden group">
                  <div className="aspect-square overflow-hidden bg-m3-surface-variant">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-m3-on-surface truncate">{member.name}</h3>
                    <p className="text-m3-secondary text-sm font-medium">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-m3-surface">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-m3-on-surface mb-6">
              What drives us
            </h2>
            <p className="text-m3-on-surface/70 text-lg leading-relaxed mb-8">
              We believe in stories that matter. Every project we take on is an opportunity to help
              brands connect authentically with their audience. We're not just content creators—we're
              your partners in building something real.
            </p>
            <Link to="/contact" className="m3-filled-button inline-flex">
              Work With Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
