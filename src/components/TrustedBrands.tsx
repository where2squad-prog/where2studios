'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import { useCountUp } from '@/hooks/useCountUp';
import brandPacbio from '@/assets/brand-pacbio.svg';
import '@/styles/marquee.css';

export function TrustedBrands() {
  const isMobile = useIsMobile();
  const views = useCountUp({ end: 259, duration: 2000, suffix: 'M+' });
  
  // Only use JS-based scroll on desktop (more reliable CSS animation on mobile)
  const {
    viewportRef,
    contentRef
  } = useMarqueeScroll({
    speed: 36,
    enabled: !isMobile
  });

  const brands = [{
    name: "PacBio",
    logo: brandPacbio
  }];

  return (
    <section className="py-12 sm:py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Title and subtitle */}
      <div className="text-center mb-8 sm:mb-10 px-4">
        <p className="text-m3-on-surface/50 text-xs font-semibold uppercase tracking-widest mb-2">
          Built for startups. Trusted by growing brands.
        </p>
        <p className="text-m3-on-surface/60 text-sm max-w-lg mx-auto">
          We understand startup speed, startup budgets, and startup ambition — and we bring the same clarity to every industry we serve.
        </p>
      </div>
      
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

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 mt-10 sm:mt-14" ref={views.ref}>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-6 sm:gap-12 lg:gap-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">150+</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Projects shipped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">{views.formatted}</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Views earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">80+</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Brands supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">500+</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Assets delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
