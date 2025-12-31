'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from './figma/ImageWithFallback'
import joshuaPhoto from '../assets/team-member-1.png'
import danielPhoto from '../assets/team-member-2.png'
import gabbyPhoto from '../assets/team-member-3.png'
import mattPhoto from '../assets/team-member-4.png'
import ryanPhoto from '../assets/team-member-5.png'
import anthonyPhoto from '../assets/team-member-6.png'
import gavinPhoto from '../assets/team-member-7.png'

export function Team() {
  const teamMembers = [
    {
      name: "Joshua Saltiban",
      role: "CEO",
      vibe: "Building the vision, one frame at a time",
      image: joshuaPhoto,
    },
    {
      name: "Daniel",
      role: "Operations Lead",
      vibe: "Making the impossible look easy",
      image: danielPhoto,
    },
    {
      name: "Gabby",
      role: "Social Media Manager",
      vibe: "Turning feeds into communities",
      image: gabbyPhoto,
    },
    {
      name: "Matt",
      role: "Marketing Manager",
      vibe: "Strategy that actually converts",
      image: mattPhoto,
    },
    {
      name: "Ryan",
      role: "Production Manager",
      vibe: "Every shot tells a story",
      image: ryanPhoto,
    },
    {
      name: "Anthony",
      role: "Production Manager",
      vibe: "Quality is non-negotiable",
      image: anthonyPhoto,
    },
    {
      name: "Gavin",
      role: "Production Manager",
      vibe: "Content machine energy",
      image: gavinPhoto,
    }
  ]

  return (
    <section id="team" className="relative pt-8 pb-24 lg:pb-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-2 bg-golden-yellow/10 text-golden-yellow rounded-full text-sm font-semibold mb-6"
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Card */}
              <div className="fun-card bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                
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
                  <p className="text-sm text-golden-yellow font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-brick-red/20 to-golden-yellow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
