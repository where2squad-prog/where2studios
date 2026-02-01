import { PageLayout } from "@/components/layout";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: February 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Where2Studios ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website where2studios.com (the "Site") or use our video production and social media services.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By using our Site or services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3 text-foreground">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you contact us or request our services, we may collect:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Project details and messages you send us</li>
                <li>Budget and timeline preferences</li>
                <li>How you heard about us (referral source)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6 text-foreground">Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you visit our Site, we may automatically collect:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>IP address (used for rate limiting and security purposes only)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Provide project quotes and discuss project requirements</li>
                <li>Deliver our video production and social media services</li>
                <li>Send you confirmation emails and project updates</li>
                <li>Prevent spam and abuse through rate limiting</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Protection & Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure database storage with row-level security policies</li>
                <li>Limited access to personal data (admin-only access controls)</li>
                <li>Server-side validation and sanitization of all inputs</li>
                <li>Rate limiting to prevent abuse</li>
                <li>Regular security audits</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Contact form submissions: Retained for business relationship management and legal compliance</li>
                <li>Rate limiting data: Automatically purged after the rate limit window expires (typically 1 hour)</li>
                <li>Project files and deliverables: Retained according to client agreements</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Sharing Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li><strong>Service Providers:</strong> We use trusted third-party services (such as email delivery services) to operate our business. These providers are contractually obligated to protect your data.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, court order, or government request.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites or integrate with third-party services:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li><strong>Cal.com:</strong> For scheduling discovery calls</li>
                <li><strong>Instagram:</strong> For displaying our social media portfolio</li>
                <li><strong>Vimeo/YouTube:</strong> For hosting video content</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third-party services have their own privacy policies. We encourage you to review their policies before providing any personal information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses minimal cookies and local storage for essential functionality only. We do not use tracking cookies or third-party advertising cookies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:contact@where2studios.com" className="text-primary hover:underline">
                  contact@where2studios.com
                </a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. California Privacy Rights (CCPA)</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
                <li>Right to know what personal information is collected</li>
                <li>Right to know if personal information is sold or disclosed and to whom</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>We do not sell your personal information.</strong>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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
