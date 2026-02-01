import { PageLayout } from "@/components/layout";

export default function TermsOfServicePage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: February 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Where2Studios website (where2studios.com) and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Where2Studios provides professional video production and social media content creation services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Corporate video production</li>
                <li>Commercial and advertising content</li>
                <li>Event videography</li>
                <li>Wedding videography</li>
                <li>Social media content creation and management</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Use of Website</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others. You agree not to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Submit false or misleading information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to scrape or collect data</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Submit spam or malicious content through our contact forms</li>
                <li>Impersonate another person or entity</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Contact Form Submissions</h2>
              <p className="text-muted-foreground leading-relaxed">
                When submitting inquiries through our contact form, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Provide accurate and truthful information</li>
                <li>Not submit spam or automated submissions</li>
                <li>Respect our rate limiting policies (designed to prevent abuse)</li>
                <li>Not attempt to bypass security measures</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to reject or ignore submissions that violate these terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, videos, and software, is the property of Where2Studios or its content suppliers and is protected by copyright and trademark laws.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Portfolio Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                The videos and images displayed in our portfolio are showcased with the permission of our clients. These works remain the intellectual property of their respective owners and Where2Studios. Portfolio content is for demonstration purposes only.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Service Agreements</h2>
              <p className="text-muted-foreground leading-relaxed">
                Actual video production services are governed by separate service agreements or contracts. These Terms of Service apply to website usage only. Project-specific terms, deliverables, timelines, and payment terms will be outlined in individual service agreements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website is provided "as is" without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>The website will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>The website is free of viruses or harmful components</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, Where2Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website. This limitation applies regardless of whether the damages arise from use or misuse of the website, inability to use the website, or interruption, suspension, or termination of the website.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Where2Studios, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the website or violation of these Terms of Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. Accessing third-party links is at your own risk.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">15. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                <p className="text-foreground font-semibold">Where2Studios</p>
                <p className="text-muted-foreground mt-2">Bay Area, California</p>
                <p className="text-muted-foreground mt-1">
                  Email:{" "}
                  <a href="mailto:contact@where2studios.com" className="text-primary hover:underline">
                    contact@where2studios.com
                  </a>
                </p>
                <p className="text-muted-foreground mt-1">
                  Website:{" "}
                  <a href="https://where2studios.com" className="text-primary hover:underline">
                    where2studios.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
