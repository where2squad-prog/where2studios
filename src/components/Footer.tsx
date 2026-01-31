'use client'

export function Footer() {
  const links = [
    { label: 'Our Work', href: '/work' },
    { label: 'Team', href: '#team' },
    { label: 'Book a Call', href: '#contact' },
  ]

  const platforms = ['TikTok', 'Instagram', 'YouTube', 'Meta', 'CapCut', 'Adobe']

  return (
    <footer className="relative py-10 sm:py-12 pb-20 sm:pb-24 bg-m3-surface-dark text-m3-on-dark">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-10 max-w-4xl mx-auto">
          
          {/* Links Column */}
          <div>
            <h4 className="font-fredoka text-sm font-medium text-m3-on-dark mb-3">Links</h4>
            <nav className="flex flex-col gap-1.5">
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
            <h4 className="font-fredoka text-sm font-medium text-m3-on-dark mb-3">Platforms</h4>
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((platform) => (
                <span 
                  key={platform}
                  className="px-2.5 py-1 bg-m3-on-dark/10 border border-m3-on-dark/15 rounded-full text-m3-on-dark/70 text-xs"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-m3-on-dark/10 pt-6 mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="font-fredoka text-m3-primary text-lg font-medium">
              Where2Studios
            </div>
            <p className="text-xs text-m3-on-dark/50">
              © 2025 Where2Studios. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
