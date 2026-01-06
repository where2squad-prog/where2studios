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
      vibe: "I help brands and creators translate their purpose into stories people actually connect with.",
      image: joshuaPhoto,
    },
    {
      name: "Daniel Martinez",
      role: "Operations Lead",
      vibe: "I keep things organized, so everyone can do their best work",
      image: danielPhoto,
    },
    {
      name: "Gabby Guevara",
      role: "Social Media Manager",
      vibe: "I'm big on community, I make sure people feel seen",
      image: gabbyPhoto,
    },
    {
      name: "Ryan Sison",
      role: "Lead Videographer",
      vibe: "I'm always looking for the real moment, not just the perfect one",
      image: ryanPhoto,
    },
    {
      name: "Gavin Legaspi",
      role: "Content Producer",
      vibe: "I bring steady energy, and I help keep the quality consistent",
      image: gavinPhoto,
    },
    {
      name: "Anthony Gonzalez",
      role: "Content Producer",
      vibe: "I move fast, but I care about getting it right",
      image: anthonyPhoto,
    },
    {
      name: "Joseph Jimenez",
      role: "Lead Photographer",
      vibe: "I love catching the little moments that make it feel real",
      image: josephPhoto,
    }
  ]

  return (
    <section id="team" className="relative pt-8 pb-24 lg:pb-32 bg-background overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-brick-red/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-brick-red/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-2 bg-brick-red/10 text-brick-red rounded-full text-sm font-semibold mb-6 border border-brick-red/20"
          >
            The Squad
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-bold text-near-black mb-6"
          >
            Meet the Dreamers
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg lg:text-xl text-near-black/70 max-w-2xl mx-auto"
          >
            The people who make things happen.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative active:scale-95 transition-transform"
            >
              {/* Card */}
              <div className="fun-card bg-card rounded-3xl overflow-hidden transition-all duration-300">
                
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-cream-highlight text-sm font-medium">
                      "{member.vibe}"
                    </p>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="font-fredoka text-lg font-bold text-near-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-brick-red font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-brick-red/20 to-golden-yellow/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <p className="text-near-black/60 mb-4">
            Want to join the squad?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brick-red text-cream-highlight font-semibold rounded-full hover:bg-brick-red/90 transition-all duration-500 hover:scale-105"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
