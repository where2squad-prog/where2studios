'use client'

import { motion } from 'framer-motion'

import brandBackyardBayou from '@/assets/brand-backyard-bayou.svg'
import brandCityline from '@/assets/brand-cityline.svg'
import brandFoodieland from '@/assets/brand-foodieland.svg'
import brandHyphyBurger from '@/assets/brand-hyphy-burger.svg'
import brandOhgane from '@/assets/brand-ohgane.svg'
import brandPacbio from '@/assets/brand-pacbio.svg'
import brandVisitBerkeley from '@/assets/brand-visit-berkeley.svg'

export function TrustedBrands() {
  const brands = [
    { name: "Backyard Bayou", logo: brandBackyardBayou },
    { name: "Cityline", logo: brandCityline },
    { name: "Foodieland", logo: brandFoodieland },
    { name: "Hyphy Burger", logo: brandHyphyBurger },
    { name: "Ohgane", logo: brandOhgane },
    { name: "PacBio", logo: brandPacbio },
    { name: "Visit Berkeley", logo: brandVisitBerkeley },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      {/* M3 Label style */}
      <span className="label text-m3-on-surface/50">
        Trusted By Growing Brands
      </span>
      
      {/* Passive horizontal logo strip - no hover states */}
      <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mt-6 max-w-4xl mx-auto">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center justify-center"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-70"
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
