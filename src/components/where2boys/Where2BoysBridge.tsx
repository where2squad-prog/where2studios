'use client'

import { Video, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Where2BoysBridge() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ background: '#F5EDDF' }}>
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-2xl">
        <div className="flex gap-5 sm:gap-6 items-start">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-m3-surface-dark rounded-xl flex items-center justify-center flex-shrink-0">
            <Video className="w-6 h-6" style={{ color: '#E09E24' }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#E84228' }}>
              Production by
            </p>
            <h3 className="font-fredoka font-semibold text-xl sm:text-2xl text-m3-on-surface mb-3">
              Where2Studios
            </h3>
            <p className="text-sm sm:text-base text-m3-on-surface/70 leading-relaxed mb-4">
              Bay Area video production capturing events that build brands. Strategy, production, and content that performs.
            </p>
            <Link
              to="/"
              className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: '#E84228' }}
            >
              See Where2Studios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}