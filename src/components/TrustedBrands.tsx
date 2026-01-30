'use client'

import brandBackyardBayou from '@/assets/brand-backyard-bayou.svg'
import brandCityline from '@/assets/brand-cityline.svg'
import brandFoodieland from '@/assets/brand-foodieland.svg'
import brandHyphyBurger from '@/assets/brand-hyphy-burger.svg'
import brandOhgane from '@/assets/brand-ohgane.svg'
import brandPacbio from '@/assets/brand-pacbio.svg'
import brandVisitBerkeley from '@/assets/brand-visit-berkeley.svg'

import '@/styles/marquee.css'

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
    <section className="py-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Label */}
      <p className="label text-center text-m3-on-surface/50 mb-8">
        Trusted By Growing Brands
      </p>
      
      {/* Full-width seamless marquee */}
      <div className="marquee-container">
        {/* Left fade */}
        <div className="marquee-fade marquee-fade-left" />
        
        {/* Scrolling track */}
        <div className="marquee-track">
          {/* First set */}
          <div className="marquee-content">
            {brands.map((brand) => (
              <div key={brand.name} className="marquee-item">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="marquee-content" aria-hidden="true">
            {brands.map((brand) => (
              <div key={`${brand.name}-dup`} className="marquee-item">
                <img 
                  src={brand.logo} 
                  alt="" 
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right fade */}
        <div className="marquee-fade marquee-fade-right" />
      </div>
    </section>
  )
}
