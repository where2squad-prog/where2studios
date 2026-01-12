'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from './figma/ImageWithFallback'
import joshuaPhoto from '../assets/team-joshua.png'
import danielPhoto from '../assets/team-daniel.png'
import gabbyPhoto from '../assets/team-gabby.png'
import ryanPhoto from '../assets/team-ryan.png'
import gavinPhoto from '../assets/team-gavin.png'
import anthonyPhoto from '../assets/team-member-1.png'
import josephPhoto from '../assets/team-member-2.png'

export function Team() {
  const teamMembers = [
    {
      name: "Joshua Saltiban",
      role: "CEO",
      image: joshuaPhoto,
    },
    {
      name: "Daniel Martinez",
      role: "Operations Lead",
      image: danielPhoto,
    },
    {
      name: "Gabby Guevara",
      role: "Social Media Manager",
      image: gabbyPhoto,
    },
    {
      name: "Ryan Sison",
      role: "Lead Videographer",
      image: ryanPhoto,
    },
    {
      name: "Gavin Legaspi",
      role: "Content Producer",
      image: gavinPhoto,
    },
    {
      name: "Anthony Gonzalez",
      role: "Content Producer",
      image: anthonyPhoto,
    },
    {
      name: "Joseph Jimenez",
      role: "Lead Photographer",
      image: josephPhoto,
    }
  ]

  return (
    <section id="team" className="relative py-12 sm:py-16 bg-m3-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="label text-m3-secondary"
          >
            The Squad
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-on-background mt-2 mb-2"
          >
            Meet the Team
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-m3-on-background/60"
          >
            The people who make things happen.
          </motion.p>
        </div>

        {/* Team Grid - M3 Outlined Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {/* M3 Outlined Card */}
              <div className="m3-outlined-card overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-m3-surface-variant">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Info */}
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="text-sm sm:text-base font-bold text-m3-on-surface truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-m3-secondary font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
