'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import { useCountUp } from '@/hooks/useCountUp';
import brandPacbio from '@/assets/brand-pacbio.svg';
import brandCityline from '@/assets/brand-cityline.svg';
import brandVisitBerkeley from '@/assets/brand-visit-berkeley.svg';
import brandTurbopuffer from '@/assets/brand-turbopuffer.png';
import '@/styles/marquee.css';

type Brand = { name: string; logo?: string };

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

  const brands: Brand[] = [
    { name: 'Coinbase' },
    { name: 'Gourmet Provisions' },
    { name: 'Stripe' },
    { name: 'Cursor' },
    { name: 'Modal' },
    { name: 'Braintrust' },
    { name: 'LlamaIndex' },
    { name: 'Browserbase' },
    { name: 'Parallel' },
    { name: 'turbopuffer', logo: brandTurbopuffer },
    { name: 'GitHub' },
    { name: '1Password' },
    { name: 'Immuta' },
    { name: 'Cohesity' },
    { name: 'ReliaQuest' },
    { name: 'Xsolla' },
    { name: 'Club Hex' },
    { name: 'Datahaiku' },
    { name: 'PacBio', logo: brandPacbio },
    { name: 'Cityline', logo: brandCityline },
    { name: 'Visit Berkeley', logo: brandVisitBerkeley },
  ];

  const renderBrand = (brand: Brand, decorative: boolean) => (
    <div className="marquee-item h-10 sm:h-12 lg:h-14">
      {brand.logo ?
      <img
        src={brand.logo}
        alt={decorative ? '' : `${brand.name} logo, a Where2Studios client`}
        className="h-10 sm:h-12 lg:h-14 w-auto max-w-none"
        style={{ filter: 'brightness(0) saturate(100%)' }}
        draggable={false} /> :

      <span
        aria-hidden={decorative || undefined}
        className="font-fredoka font-semibold text-2xl sm:text-3xl text-m3-on-surface tracking-tight whitespace-nowrap leading-none">
          {brand.name}
        </span>
      }
    </div>);


  return (
    <section className="py-16 sm:py-20 lg:py-24 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Title and subtitle */}
      <div className="text-center mb-8 sm:mb-10 px-4">
        <p className="text-m3-on-surface/50 text-xs font-semibold uppercase tracking-widest mb-2">
          Worked with
        </p>
      </div>

      
      {/* Full-width seamless marquee */}
      <div className="marquee-container">
        {/* Left fade */}
        <div className="marquee-fade marquee-fade-left" />
        
        {/* Mobile: CSS animation | Desktop: JS-driven scroll */}
        <div
          className={`marquee-viewport ${isMobile ? 'marquee-css-animated' : ''}`}
          ref={isMobile ? undefined : viewportRef}>

          <div className={`marquee-track ${isMobile ? 'marquee-track-animated' : ''}`}>
            {/* First set */}
            <div className="marquee-content" ref={isMobile ? undefined : contentRef}>
              {brands.map((brand) =>
              <div key={brand.name} className="marquee-item">
                  <img
                  src={brand.logo}
                  alt={`${brand.name} logo, a Where2Studios client`}
                  className="h-16 sm:h-20 lg:h-24 w-auto max-w-none"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                  draggable={false} />

                </div>
              )}
            </div>

            {/* Duplicate for seamless loop */}
            <div className="marquee-content" aria-hidden="true">
              {brands.map((brand) =>
              <div key={`${brand.name}-dup`} className="marquee-item">
                  <img
                  src={brand.logo}
                  alt=""
                  className="h-16 sm:h-20 lg:h-24 w-auto max-w-none"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                  draggable={false} />

                </div>
              )}
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
    </section>);

}