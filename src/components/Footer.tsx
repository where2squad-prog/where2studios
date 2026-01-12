'use client'

export function Footer() {
  const links = [
    { label: 'Our Work', href: '/work' },
    { label: 'Team', href: '#team' },
    { label: 'Book a Call', href: '#contact' },
  ]

  const platforms = ['TikTok', 'Instagram', 'YouTube', 'Meta', 'CapCut', 'Adobe']

  return (
    <footer className="relative py-12 sm:py-16 bg-m3-surface-dark text-m3-on-dark">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-12 max-w-4xl mx-auto">
          
          {/* Links Column */}
          <div>
            <h4 className="font-fredoka font-semibold text-m3-on-dark mb-4">Links</h4>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-m3-on-dark/70 hover:text-m3-on-dark text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Platforms Column */}
          <div>
            <h4 className="font-fredoka font-semibold text-m3-on-dark mb-4">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span 
                  key={platform}
                  className="px-3 py-1 bg-m3-on-dark/5 border border-m3-on-dark/10 rounded-full text-m3-on-dark/60 text-xs"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-m3-on-dark/10 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-fredoka text-m3-primary text-xl font-semibold">
              Where2Studios
            </div>
            <p className="text-sm text-m3-on-dark/50">
              © 2025 Where2Studios. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
