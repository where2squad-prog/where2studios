import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { SEOHead } from '@/components/SEOHead'
import { SkipLink } from '@/components/layout/SkipLink'

export default function AccessibilityPage() {
  return (
    <>
      <SkipLink />
      <SEOHead
        title="Accessibility | Where2Studios"
        description="Where2Studios is committed to digital accessibility. Read our accessibility statement, conformance level, and how to report issues."
        url="https://where2studios.com/accessibility"
      />
      <div className="min-h-screen bg-m3-background text-m3-on-background">
        <Navbar variant="light" />

        <main id="main-content" tabIndex={-1} className="container mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-16 sm:pt-40 sm:pb-24 max-w-3xl outline-none">
          <span className="text-m3-primary text-xs font-semibold uppercase tracking-widest">
            Accessibility
          </span>
          <h1 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-semibold text-m3-on-surface mt-2 mb-6">
            Accessibility statement
          </h1>

          <div className="space-y-6 text-m3-on-surface/80 text-base leading-relaxed">
            <p>
              Where2Studios is committed to making our website usable by everyone, including people who rely on assistive technologies such as screen readers, keyboard navigation, and motion-sensitivity preferences.
            </p>

            <section>
              <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3">
                Conformance target
              </h2>
              <p>
                We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. We test our site with keyboard navigation, common screen readers, and automated scanning tools as content and features change.
              </p>
            </section>

            <section>
              <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3">
                What we've implemented
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Skip-to-content link on every page</li>
                <li>Keyboard-accessible navigation and interactive elements with visible focus indicators</li>
                <li>Semantic HTML landmarks (header, nav, main, footer)</li>
                <li>Form labels paired with inputs, required-field indicators, and screen-reader-announced submission feedback</li>
                <li>Alternative text on meaningful images; decorative imagery hidden from screen readers</li>
                <li>Captioning support on embedded video where available</li>
                <li>Respect for the operating system's "reduce motion" preference</li>
                <li>Color contrast that meets WCAG AA targets for body text</li>
                <li>Mobile touch targets sized for ease of use</li>
              </ul>
            </section>

            <section>
              <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3">
                Known limitations
              </h2>
              <p>
                Embedded third-party content, such as YouTube video players and the Cal.com booking widget, may not fully meet our accessibility target. We are working with those providers and offer alternative ways to reach us where possible.
              </p>
              <p>
                If you encounter content that is hard to use, we want to hear about it.
              </p>
            </section>

            <section>
              <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3">
                Report an accessibility issue
              </h2>
              <p>
                Email{' '}
                <a href="mailto:contact@where2studios.com" className="text-m3-secondary font-semibold hover:underline">
                  contact@where2studios.com
                </a>
                {' '}with a description of the issue, the page or feature involved, and the assistive technology you were using. We will respond within a reasonable time and work to address the issue.
              </p>
            </section>

            <section>
              <h2 className="font-fredoka text-xl sm:text-2xl font-semibold text-m3-on-surface mt-4 mb-3">
                Last updated
              </h2>
              <p>
                This statement was last reviewed on July 6, 2026.
              </p>
            </section>
          </div>
        </main>

        <Footer />
        <FloatingCTA />
      </div>
    </>
  )
}