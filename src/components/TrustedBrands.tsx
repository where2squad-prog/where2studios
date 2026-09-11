'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import { useCountUp } from '@/hooks/useCountUp';
import brandPacbio from '@/assets/brand-pacbio.svg';
import brandTurbopuffer from '@/assets/brand-turbopuffer.png';
import glyphCoinbase from '@/assets/icons/coinbase.svg';
import glyphStripe from '@/assets/icons/stripe.svg';
import glyphGithub from '@/assets/icons/github.svg';
import glyph1password from '@/assets/icons/1password.svg';
import glyphCursor from '@/assets/icons/cursor.svg';
import glyphModal from '@/assets/icons/modal.svg';
import glyphBraintrust from '@/assets/icons/braintrust.svg';
import glyphCloudflare from '@/assets/icons/cloudflare.svg';
import glyphGoogle from '@/assets/icons/google.svg';
import '@/styles/marquee.css';

type Brand = { name: string; wordmark?: string; glyph?: string };

const MOBILE_SPEED = 24; // px per second

export function TrustedBrands() {
  const isMobile = useIsMobile();
  const conventionWeeks = useCountUp({ end: 9, duration: 2000, suffix: '+' });
  const techBrands = useCountUp({ end: 20, duration: 2000, suffix: '+' });
  const hqFilms = useCountUp({ end: 22, duration: 2000 });
  const trackRef = useRef<HTMLDivElement>(null);

  // Only use JS-based scroll on desktop (more reliable CSS animation on mobile)
  const {
    viewportRef,
    contentRef
  } = useMarqueeScroll({
    speed: 22,
    enabled: !isMobile
  });

  // Mobile: derive the CSS animation duration from the measured track width
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isMobile) return;

    const apply = () => {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        track.style.setProperty('--marquee-duration', `${(half / MOBILE_SPEED).toFixed(2)}s`);
      }
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(track);
    return () => observer.disconnect();
  }, [isMobile]);

  const brands: Brand[] = [
    { name: 'Cloudflare', glyph: glyphCloudflare },
    { name: 'Google', glyph: glyphGoogle },
    { name: 'GitHub', glyph: glyphGithub },
    { name: '1Password', glyph: glyph1password },
    { name: 'Immuta' },
    { name: 'ReliaQuest' },
    { name: 'Cohesity' },
    { name: 'Coinbase', glyph: glyphCoinbase },
    { name: 'Stripe', glyph: glyphStripe },
    { name: 'Salesforce' },
    { name: 'turbopuffer', wordmark: brandTurbopuffer },
    { name: 'Parallel' },
    { name: 'LlamaIndex' },
    { name: 'Braintrust', glyph: glyphBraintrust },
    { name: 'Modal', glyph: glyphModal },
    { name: 'Browserbase' },
    { name: 'Cursor', glyph: glyphCursor },
    { name: 'Xsolla' },
    { name: 'Gourmet Provisions' },
    { name: 'PacBio', wordmark: brandPacbio },
  ];

  const renderBrand = (brand: Brand, decorative: boolean) => {
    const textClass =
      'font-fredoka font-semibold text-xl sm:text-2xl text-m3-on-surface tracking-tight whitespace-nowrap leading-none';

    return (
      <div className="marquee-item h-10 sm:h-12 flex items-center gap-3">
        {brand.wordmark ?
        <img
          src={brand.wordmark}
          alt={decorative ? '' : `${brand.name} logo, a Where2Studios client`}
          aria-hidden={decorative || undefined}
          className="h-7 sm:h-8 w-auto max-w-[170px] sm:max-w-[210px] object-contain"
          style={{ filter: 'brightness(0) saturate(100%)' }}
          draggable={false} /> :
        brand.glyph ?
        <>
            <img
            src={brand.glyph}
            alt=""
            aria-hidden="true"
            className="h-6 sm:h-7 w-auto"
            style={{ filter: 'brightness(0) saturate(100%)' }}
            draggable={false} />
            <span aria-hidden={decorative || undefined} className={textClass}>{brand.name}</span>
          </> :

        <span aria-hidden={decorative || undefined} className={textClass}>{brand.name}</span>
        }
      </div>);

  };




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

          <div className={`marquee-track ${isMobile ? 'marquee-track-animated' : ''}`} ref={trackRef}>
            {/* First set */}
            <div className="marquee-content" ref={isMobile ? undefined : contentRef}>
              {brands.map((brand) =>
              <div key={brand.name}>{renderBrand(brand, false)}</div>
              )}
            </div>

            {/* Duplicate for seamless loop */}
            <div className="marquee-content" aria-hidden="true">
              {brands.map((brand) =>
              <div key={`${brand.name}-dup`}>{renderBrand(brand, true)}</div>
              )}
            </div>

          </div>
        </div>
        
        {/* Right fade */}
        <div className="marquee-fade marquee-fade-right" />
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 mt-10 sm:mt-14" ref={conventionWeeks.ref}>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-6 sm:gap-12 lg:gap-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">{conventionWeeks.formatted}</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Conference weeks covered</div>
            </div>
            <div className="text-center" ref={techBrands.ref}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">{techBrands.formatted}</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Tech brands</div>
            </div>
            <div className="text-center" ref={hqFilms.ref}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">{hqFilms.formatted}</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Activation films</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-m3-primary tabular-nums">10am</div>
              <div className="text-m3-on-surface/60 text-xs sm:text-sm font-medium mt-1">Next morning clip delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}