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

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-10 overflow-hidden"
    >
      {/* M3 Label style */}
      <span className="label text-m3-on-surface/50">
        Trusted By Growing Brands
      </span>
      
      {/* Infinite scrolling marquee */}
      <div className="relative mt-8">
        <motion.div
          className="flex items-center gap-16"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                style={{ filter: 'brightness(0) saturate(100%)' }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
