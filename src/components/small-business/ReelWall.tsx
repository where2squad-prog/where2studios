'use client'

import { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { millionReels, type ProofReel } from '@/data/smallBusiness'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface-dark'

/**
 * The eight @thebackyardbayou reels past 1M views, as a row of phone sized posters.
 * Posters are local webp files so the hero stays fast; the Instagram embed only
 * loads when someone taps one.
 */
export function ReelWall() {
  const [open, setOpen] = useState<ProofReel | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* One entrance moment for the page. Pure CSS so the prerendered HTML animates without JS. */}
      <style>{`
        @keyframes sb-rise { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        .sb-rise { animation: sb-rise 700ms cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .sb-rise { animation: none } }
      `}</style>

      <ul
        aria-label="Backyard Bayou reels with more than one million views"
        className="-mx-5 sm:-mx-8 lg:mx-0 px-5 sm:px-8 lg:px-0 flex lg:grid lg:grid-cols-8 gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-5 pb-2 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {millionReels.map((reel, i) => (
          <li
            key={reel.shortcode}
            className={`sb-rise shrink-0 basis-[38%] sm:basis-[24%] lg:basis-auto snap-start ${
              i % 2 === 1 ? 'lg:mt-6' : ''
            }`}
            style={{ animationDelay: `${120 + i * 70}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpen(reel)}
              aria-label={`Watch the ${reel.views} views reel on Instagram`}
              className={`group relative block w-full aspect-[9/16] overflow-hidden rounded-[20px] bg-black ring-1 ring-white/10 ${focusRing}`}
            >
              <img
                src={reel.poster}
                alt={reel.alt}
                width={432}
                height={768}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
              />
              <span className="absolute left-3 bottom-3 text-left leading-none">
                <span className="block font-fredoka font-semibold text-2xl text-white">{reel.views}</span>
                <span className="block mt-1 text-xs text-white/75">views</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(next) => !next && setOpen(null)}>
        <DialogContent
          ref={contentRef}
          // Keep focus off the Instagram iframe so Escape still reaches the dialog.
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            contentRef.current?.focus()
          }}
          className="max-w-[420px] w-[calc(100%-2rem)] p-0 overflow-hidden rounded-2xl bg-white border-0 gap-0 focus:outline-none">
          <DialogTitle className="sr-only">Backyard Bayou reel, {open?.views} views</DialogTitle>
          <DialogDescription className="sr-only">
            Instagram reel from @thebackyardbayou, made by Where2Studios.
          </DialogDescription>
          {open && (
            <iframe
              key={open.shortcode}
              src={`https://www.instagram.com/reel/${open.shortcode}/embed`}
              title={`Backyard Bayou Instagram reel, ${open.views} views`}
              className="block w-full bg-white"
              style={{ height: 'min(720px, 85vh)' }}
              scrolling="no"
              frameBorder={0}
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
