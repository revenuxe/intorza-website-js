import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy - How Intorza Protects Your Data"
        description="Learn how Intorza collects, uses, and protects your personal and business data. Our privacy policy explains your rights and our data security practices."
        keywords="intorza privacy policy, data protection, GDPR compliance, data security, personal information protection, business data privacy"
        canonicalUrl="https://intorza.com/privacy"
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs items={[{ name: "Privacy Policy", url: "https://intorza.com/privacy" }]} className="mb-8" />
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: December 9, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Intorza ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our 
                website and services (collectively, the "Service").
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge 
                that you have read, understood, and agree to be bound by this Privacy Policy. If you do not 
                agree with the terms of this Privacy Policy, please do not access the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. 
                We will alert you about any changes by updating the "Last updated" date of this Privacy Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Information We Collect
              </h2>
              
              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                2.1 Personal Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Personally identifiable information that you voluntarily provide to us when registering or 
                using our Service may include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Name (first name and last name)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name and address</li>
                <li>Billing address and payment information</li>
                <li>Job title and professional information</li>
                <li>Profile picture (optional)</li>
              </ul>

              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                2.2 Business Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Data related to your business operations that you enter into the Service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Client information and contact details</li>
                <li>Project details and site measurements</li>
                <li>Quotations and invoices</li>
                <li>Payment records and transaction history</li>
                <li>Team member information</li>
                <li>Documents and files you upload</li>
              </ul>

              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                2.3 Automatically Collected Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Information automatically collected when you access the Service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Device information (type, operating system, browser)</li>
                <li>IP address and general location</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Log files and analytics data</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>To provide our Service:</strong> Creating and managing your account, processing 
                    transactions, and delivering the features you use</li>
                <li><strong>To improve our Service:</strong> Understanding how users interact with our platform 
                    to enhance functionality and user experience</li>
                <li><strong>To communicate with you:</strong> Sending service-related notices, updates, 
                    promotional materials, and responding to your inquiries</li>
                <li><strong>To ensure security:</strong> Protecting against fraud, unauthorized access, and 
                    other security threats</li>
                <li><strong>To comply with legal obligations:</strong> Meeting regulatory requirements and 
                    responding to legal requests</li>
                <li><strong>To analyze usage:</strong> Generating aggregate statistics and insights about 
                    Service usage</li>
                <li><strong>For billing and payments:</strong> Processing subscription payments and managing 
                    your billing history</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Legal Basis for Processing (GDPR)
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are located in the European Economic Area (EEA), our legal basis for collecting and 
                using personal information depends on the specific context:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Contractual Necessity:</strong> Processing necessary to provide you with our 
                    Service as per our agreement</li>
                <li><strong>Consent:</strong> Where you have given explicit consent for specific processing 
                    activities</li>
                <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests, 
                    such as improving our Service</li>
                <li><strong>Legal Obligation:</strong> Processing required to comply with applicable laws</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              
              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                5.1 Service Providers
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information with third-party service providers who perform services on our 
                behalf, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Cloud hosting and infrastructure providers</li>
                <li>Payment processors</li>
                <li>Email service providers</li>
                <li>Analytics providers</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                5.2 Legal Requirements
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may disclose your information when required by law or in response to valid requests by 
                public authorities (e.g., court order or government agency).
              </p>

              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                5.3 Business Transfers
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a merger, acquisition, or sale of all or a portion of our assets, your 
                information may be transferred as part of that transaction.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement robust security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest 
                    using AES-256 encryption</li>
                <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms 
                    limit who can access your data</li>
                <li><strong>Regular Audits:</strong> We conduct regular security assessments and penetration 
                    testing</li>
                <li><strong>Secure Infrastructure:</strong> Our servers are hosted in secure, SOC 2 compliant 
                    data centers</li>
                <li><strong>Employee Training:</strong> All employees receive regular security awareness 
                    training</li>
                <li><strong>Incident Response:</strong> We maintain a comprehensive incident response plan</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Despite our efforts, no security measures are perfect or impenetrable. We cannot guarantee 
                absolute security of your data.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                7. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Provide our Service to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Specific retention periods:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Account Data:</strong> Retained for the duration of your account plus 30 days 
                    after deletion request</li>
                <li><strong>Business Data:</strong> Retained for the duration of your account plus 90 days 
                    to allow for data export</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years as required by tax and 
                    financial regulations</li>
                <li><strong>Analytics Data:</strong> Retained for 26 months in aggregate form</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                8. Your Privacy Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be 
                    forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of processing under 
                    certain circumstances</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data in a structured, 
                    machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or 
                    for direct marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing 
                    is based on consent</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of these rights, please contact us at privacy@intorza.com. We will respond to 
                your request within 30 days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                9. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our Service and hold 
                certain information. Types of cookies we use:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Necessary for the Service to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our 
                    Service</li>
                <li><strong>Preference Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity across websites for advertising 
                    purposes (with consent)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your country of 
                residence. These countries may have different data protection laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When we transfer your data internationally, we ensure appropriate safeguards are in place, 
                including Standard Contractual Clauses approved by relevant authorities, or reliance on 
                adequacy decisions where applicable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                11. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not intended for use by children under the age of 18. We do not knowingly 
                collect personal information from children under 18. If you are a parent or guardian and you 
                are aware that your child has provided us with personal information, please contact us 
                immediately. If we become aware that we have collected personal information from children 
                without verification of parental consent, we will take steps to remove that information from 
                our servers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                12. Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Service may contain links to third-party websites and services. We are not responsible for 
                the privacy practices or content of these third parties. We encourage you to review the privacy 
                policies of any third-party services you access through our Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Third-party services we integrate with include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Payment processors (Razorpay, Stripe)</li>
                <li>Analytics providers (Google Analytics)</li>
                <li>Cloud infrastructure (AWS, Google Cloud)</li>
                <li>Communication tools (SendGrid, Twilio)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                13. Do Not Track Signals
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not currently respond to "Do Not Track" signals sent by web browsers. However, you can 
                opt out of certain tracking by adjusting your browser settings or using our cookie preferences 
                settings when available.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                14. California Privacy Rights (CCPA)
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are a California resident, you have specific rights under the California Consumer Privacy 
                Act (CCPA):
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Right to know what personal information is collected, used, and shared</li>
                <li>Right to delete personal information held by businesses</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell personal information as defined by the CCPA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                15. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last updated" date at the top of this page</li>
                <li>Sending you an email notification for material changes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                16. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Data Protection Officer:</strong> privacy@intorza.com</li>
                <li><strong>General Inquiries:</strong> support@intorza.com</li>
                <li><strong>Mailing Address:</strong> Intorza Technologies, Bangalore, Karnataka, India</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you are located in the EEA and believe we have not adequately addressed your concerns, you 
                have the right to lodge a complaint with your local data protection authority.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
