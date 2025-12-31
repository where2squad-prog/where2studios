'use client'

import { ImageWithFallback } from './figma/ImageWithFallback'
import marcusPhoto from '../assets/team-member-1.png'
import sofiaPhoto from '../assets/team-member-2.png'
import jakePhoto from '../assets/team-member-3.png'
import mayaPhoto from '../assets/team-member-4.png'
import connorPhoto from '../assets/team-member-5.png'
import zaraPhoto from '../assets/team-member-6.png'
import leoPhoto from '../assets/team-member-7.png'

export function Team() {
  const teamMembers = [
    {
      name: "Marcus",
      role: "Creative Director",
      vibe: "Turns ordinary into extraordinary",
      image: marcusPhoto,
    },
    {
      name: "Sofia",
      role: "Strategy Lead",
      vibe: "Makes the impossible happen",
      image: sofiaPhoto,
    },
    {
      name: "Jake",
      role: "Technical Director",
      vibe: "The wizard behind the curtain",
      image: jakePhoto,
    },
    {
      name: "Maya",
      role: "Developer",
      vibe: "Code that feels like magic",
      image: mayaPhoto,
    },
    {
      name: "Connor",
      role: "Production Lead",
      vibe: "Content machine energy",
      image: connorPhoto,
    },
    {
      name: "Zara",
      role: "Motion Designer",
      vibe: "Movement with meaning",
      image: zaraPhoto,
    },
    {
      name: "Leo",
      role: "VFX Artist",
      vibe: "Making the unreal feel real",
      image: leoPhoto,
    }
  ]

  return (
    <section className="relative py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-golden-yellow/10 text-golden-yellow rounded-full text-sm font-semibold mb-6">
            The Crew
          </span>
          
          <h2 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Meet the Dreamers
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            The people who make things happen.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
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
                  <h3 className="font-fredoka text-lg font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-golden-yellow font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-brick-red/20 to-golden-yellow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Want to join the crew?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brick-red text-cream-highlight font-semibold rounded-full hover:bg-brick-red/90 transition-colors duration-300"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
