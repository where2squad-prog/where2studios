'use client'

export function Footer() {
  return (
    <footer className="relative py-16 bg-near-black text-cream-highlight">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Logo and Description */}
          <div className="max-w-md">
            <div className="font-fredoka text-golden-yellow text-2xl font-semibold tracking-wide mb-4">
              Where2Studios
            </div>
            <p className="text-cream-highlight/70 leading-relaxed mb-6">
              A social media agency and partnership platform that builds repeatable content systems driving real business outcomes.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-6">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/where2studios"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 gentle-animation cursor-pointer text-cream-highlight/60 hover:text-cream-highlight"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/where2studios"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 gentle-animation cursor-pointer text-cream-highlight/60 hover:text-cream-highlight"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@where2studios"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 gentle-animation cursor-pointer text-cream-highlight/60 hover:text-cream-highlight"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.936-1.315-2.117-1.315-3.338h-3.357v14.826c0 1.543-1.252 2.795-2.795 2.795s-2.795-1.252-2.795-2.795 1.252-2.795 2.795-2.795c.293 0 .576.045.843.13V9.804a6.67 6.67 0 0 0-.843-.054c-3.683 0-6.674 2.99-6.674 6.674s2.99 6.674 6.674 6.674 6.674-2.99 6.674-6.674V9.696a9.577 9.577 0 0 0 5.588 1.786V7.627c-1.319 0-2.54-.529-3.42-1.394a4.902 4.902 0 0 1-1.294-2.671z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@where2studios"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 gentle-animation cursor-pointer text-cream-highlight/60 hover:text-cream-highlight"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-fredoka font-semibold text-cream-highlight mb-2">Quick Links</h4>
            <a href="#services" className="inline-flex items-center gap-2 px-4 py-2 bg-cream-highlight/5 hover:bg-cream-highlight/10 border border-cream-highlight/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow transition-all text-sm w-fit">
              <span>🎬</span> Services
            </a>
            <a href="#team" className="inline-flex items-center gap-2 px-4 py-2 bg-cream-highlight/5 hover:bg-cream-highlight/10 border border-cream-highlight/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow transition-all text-sm w-fit">
              <span>👥</span> Team
            </a>
            <a href="/work" className="inline-flex items-center gap-2 px-4 py-2 bg-cream-highlight/5 hover:bg-cream-highlight/10 border border-cream-highlight/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow transition-all text-sm w-fit">
              <span>✨</span> Our Work
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 bg-cream-highlight/5 hover:bg-cream-highlight/10 border border-cream-highlight/10 hover:border-golden-yellow/30 rounded-full text-white hover:text-golden-yellow transition-all text-sm w-fit">
              <span>📞</span> Contact
            </a>
          </div>

          {/* Platforms We Use */}
          <div className="flex flex-col gap-3">
            <h4 className="font-fredoka font-semibold text-cream-highlight mb-2">Platforms & Workflow</h4>
            <div className="flex flex-wrap gap-2 max-w-xs">
              {['TikTok', 'Instagram', 'YouTube', 'Meta', 'CapCut', 'Adobe', 'Notion', 'Later'].map((platform) => (
                <span 
                  key={platform}
                  className="px-3 py-1 bg-cream-highlight/5 border border-cream-highlight/10 rounded-full text-cream-highlight/60 text-xs"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-highlight/10 pt-8 mt-12">
          <div className="text-center text-sm text-cream-highlight/50">
            © 2025 Where2Studios. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
