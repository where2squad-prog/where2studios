'use client'

export function Awards() {
  const brands = [
    { name: "Brand Name", placeholder: true },
    { name: "Brand Name", placeholder: true },
    { name: "Brand Name", placeholder: true },
    { name: "Brand Name", placeholder: true },
    { name: "Brand Name", placeholder: true },
    { name: "Brand Name", placeholder: true },
  ]

  return (
    <section id="trusted" className="relative py-16 bg-background overflow-hidden">
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-fredoka text-sm font-medium text-golden-yellow uppercase tracking-widest">
            Trusted By
          </span>
        </div>

        {/* Brands Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group flex items-center justify-center px-6 py-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-golden-yellow/50 transition-all duration-300 min-w-[140px]"
            >
              <span className="font-fredoka text-lg text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground/60 mt-8 font-fredoka">
          Your brand could be here →
        </p>

      </div>
      
    </section>
  )
}