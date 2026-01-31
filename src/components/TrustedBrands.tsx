'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import brandBackyardBayou from '@/assets/brand-backyard-bayou.svg';
import brandCityline from '@/assets/brand-cityline.svg';
import brandFoodieland from '@/assets/brand-foodieland.svg';
import brandHyphyBurger from '@/assets/brand-hyphy-burger.svg';
import brandOhgane from '@/assets/brand-ohgane.svg';
import brandPacbio from '@/assets/brand-pacbio.svg';
import brandVisitBerkeley from '@/assets/brand-visit-berkeley.svg';
import '@/styles/marquee.css';

export function TrustedBrands() {
  const isMobile = useIsMobile();
  
  // Only use JS-based scroll on desktop (more reliable CSS animation on mobile)
  const {
    viewportRef,
    contentRef
  } = useMarqueeScroll({
    speed: 36,
    enabled: !isMobile
  });

  const brands = [{
    name: "Backyard Bayou",
    logo: brandBackyardBayou
  }, {
    name: "Cityline",
    logo: brandCityline
  }, {
    name: "Foodieland",
    logo: brandFoodieland
  }, {
    name: "Hyphy Burger",
    logo: brandHyphyBurger
  }, {
    name: "Ohgane",
    logo: brandOhgane
  }, {
    name: "PacBio",
    logo: brandPacbio
  }, {
    name: "Visit Berkeley",
    logo: brandVisitBerkeley
  }];

  return (
    <section className="py-12 sm:py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Label */}
      <p className="text-center text-m3-on-surface/50 text-xs font-semibold uppercase tracking-widest mb-8 sm:mb-10">
        Trusted By Growing Brands
      </p>
      
      {/* Full-width seamless marquee */}
      <div className="marquee-container">
        {/* Left fade */}
        <div className="marquee-fade marquee-fade-left" />
        
        {/* Mobile: CSS animation | Desktop: JS-driven scroll */}
        <div 
          className={`marquee-viewport ${isMobile ? 'marquee-css-animated' : ''}`} 
          ref={isMobile ? undefined : viewportRef}
        >
          <div className={`marquee-track ${isMobile ? 'marquee-track-animated' : ''}`}>
            {/* First set */}
            <div className="marquee-content" ref={isMobile ? undefined : contentRef}>
              {brands.map(brand => (
                <div key={brand.name} className="marquee-item">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-16 sm:h-20 lg:h-24 w-auto max-w-none" 
                    style={{ filter: 'brightness(0) saturate(100%)' }} 
                    draggable={false} 
                  />
                </div>
              ))}
            </div>

            {/* Duplicate for seamless loop */}
            <div className="marquee-content" aria-hidden="true">
              {brands.map(brand => (
                <div key={`${brand.name}-dup`} className="marquee-item">
                  <img 
                    src={brand.logo} 
                    alt="" 
                    className="h-16 sm:h-20 lg:h-24 w-auto max-w-none" 
                    style={{ filter: 'brightness(0) saturate(100%)' }} 
                    draggable={false} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right fade */}
        <div className="marquee-fade marquee-fade-right" />
      </div>
    </section>
  );
}
