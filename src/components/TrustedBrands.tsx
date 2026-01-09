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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-12"
    >
      <span className="font-fredoka text-xs font-medium text-near-black/50 uppercase tracking-widest">
        Trusted By Growing Brands
      </span>
      <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 mt-6 max-w-5xl mx-auto">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center p-2 sm:p-3 transition-all duration-200">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-full h-full object-contain transition-all duration-200"
              />
            </div>
            <span className="font-fredoka text-xs sm:text-sm text-near-black/70 text-center font-medium">
              {brand.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
