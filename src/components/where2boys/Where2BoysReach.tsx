'use client'

export function Where2BoysReach() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-m3-surface-dark text-m3-on-dark">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#E84228' }}>
          Reach
        </p>
        <h2 className="font-fredoka font-bold text-3xl sm:text-4xl lg:text-5xl mb-12 leading-tight">
          When we feature a spot,{' '}
          <span style={{ color: '#E09E24' }}>it gets seen.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 mb-14">
          <div>
            <div className="font-fredoka font-bold text-6xl sm:text-7xl mb-2" style={{ color: '#E09E24' }}>1.2M</div>
            <div className="text-base sm:text-lg text-m3-on-dark/70">views on a single post</div>
          </div>
          <div>
            <div className="font-fredoka font-bold text-6xl sm:text-7xl mb-2" style={{ color: '#E09E24' }}>258K</div>
            <div className="text-base sm:text-lg text-m3-on-dark/70">views every month</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="font-fredoka font-semibold text-xl mb-2">Who we reach</h3>
            <p className="text-sm sm:text-base text-m3-on-dark/70 leading-relaxed">
              Bay Area locals and visitors who care about food, spots, travel, and culture. Curious, hungry, and ready to go where we point them.
            </p>
          </div>
          <div>
            <h3 className="font-fredoka font-semibold text-xl mb-2">How we work</h3>
            <p className="text-sm sm:text-base text-m3-on-dark/70 leading-relaxed">
              We don't just rack up views. We curate who we feature, frame the highlight, and target the right audience. The result is the right crowd showing up, not just the most.
            </p>
          </div>
        </div>

        <p className="text-sm text-m3-on-dark/50">1.4K followers · 93 posts shipped · growing</p>
      </div>
    </section>
  )
}