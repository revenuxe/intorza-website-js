import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms & Conditions - Intorza Service Agreement"
        description="Read Intorza's Terms and Conditions. Understand your rights and responsibilities when using our interior design project management software and services."
        keywords="intorza terms of service, terms and conditions, user agreement, service terms, software license agreement"
        canonicalUrl="https://intorza.com/terms"
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs items={[{ name: "Terms & Conditions", url: "https://intorza.com/terms" }]} className="mb-8" />
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: December 9, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using Intorza's services, website, or applications (collectively, the "Service"), 
                you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of 
                these terms, you may not access the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use the Service. By using the 
                Service, you represent that you are at least 18 years of age and have the legal capacity to enter 
                into these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Description of Service
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Intorza provides a cloud-based business management platform designed for interior design and 
                contracting professionals. The Service includes, but is not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Project management and tracking tools</li>
                <li>Site measurement documentation</li>
                <li>Quotation creation and management</li>
                <li>Invoice generation and payment tracking</li>
                <li>Client relationship management</li>
                <li>Team collaboration features</li>
                <li>Reporting and analytics</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, 
                with or without notice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. User Accounts
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                Failure to do so constitutes a breach of these Terms, which may result in immediate termination 
                of your account.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Safeguarding the password that you use to access the Service</li>
                <li>Any activities or actions under your account</li>
                <li>Restricting access to your computer and/or account</li>
                <li>Notifying us immediately upon becoming aware of any breach of security or unauthorized use</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You may not use as a username the name of another person or entity that is not lawfully available 
                for use, or a name or trademark that is subject to any rights of another person or entity without 
                appropriate authorization.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Subscription and Payments
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed 
                in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly 
                or annual basis, depending on the type of subscription plan you select.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At the end of each Billing Cycle, your Subscription will automatically renew under the exact same 
                conditions unless you cancel it or Intorza cancels it. You may cancel your Subscription renewal 
                either through your online account management page or by contacting our customer support team.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A valid payment method, including credit card or other accepted payment methods, is required to 
                process the payment for your Subscription. You shall provide Intorza with accurate and complete 
                billing information.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Should automatic billing fail to occur for any reason, Intorza will issue an electronic invoice 
                indicating that you must proceed manually, within a certain deadline date, with the full payment 
                corresponding to the billing period.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Free Trial
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Intorza may, at its sole discretion, offer a Subscription with a free trial for a limited period 
                of time ("Free Trial"). You may be required to enter your billing information in order to sign 
                up for the Free Trial.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you do enter your billing information when signing up for the Free Trial, you will not be charged 
                by Intorza until the Free Trial has expired. On the last day of the Free Trial period, unless you 
                cancelled your Subscription, you will be automatically charged the applicable Subscription fees.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Refund Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Except when required by law, paid Subscription fees are non-refundable. However, we may provide 
                refunds or credits at our sole discretion under the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Service unavailability exceeding 24 consecutive hours due to our fault</li>
                <li>Billing errors on our part</li>
                <li>New subscribers within 7 days of initial purchase, upon request</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, please contact our support team at support@intorza.com with your account 
                details and reason for the refund request.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service and its original content (excluding Content provided by users), features, and 
                functionality are and will remain the exclusive property of Intorza and its licensors. The 
                Service is protected by copyright, trademark, and other laws of both India and foreign countries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our trademarks and trade dress may not be used in connection with any product or service without 
                the prior written consent of Intorza.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                8. User Content
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Service allows you to post, link, store, share, and otherwise make available certain 
                information, text, graphics, or other material ("Content"). You are responsible for the 
                Content that you post on or through the Service, including its legality, reliability, and 
                appropriateness.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By posting Content on or through the Service, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>The Content is yours (you own it) and/or you have the right to use it</li>
                <li>The posting of your Content does not violate any privacy rights, intellectual property rights, 
                    or other rights of any person or entity</li>
                <li>Your Content does not contain any viruses, malware, or other harmful code</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You retain any and all of your rights to any Content you submit, post, or display on or through 
                the Service. Intorza does not claim ownership of your Content.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                9. Prohibited Uses
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may use the Service only for lawful purposes and in accordance with these Terms. You agree 
                not to use the Service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate Intorza, an employee, another user, or any other 
                    person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the 
                    Service</li>
                <li>To introduce any viruses, trojan horses, worms, or other material which is malicious or 
                    technologically harmful</li>
                <li>To attempt to gain unauthorized access to any parts of the Service</li>
                <li>To use the Service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                10. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your data 
                against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular backups of user data</li>
                <li>Secure data centers with physical security measures</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to protect your personal information, no method of transmission over the Internet 
                or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                11. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall Intorza, nor its directors, employees, partners, agents, suppliers, or 
                affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Our total liability to you for all claims arising out of or relating to this Agreement shall not 
                exceed the amount you paid to us in the twelve (12) months prior to the claim.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                12. Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and 
                "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express 
                or implied, including, but not limited to, implied warranties of merchantability, fitness for 
                a particular purpose, non-infringement, or course of performance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Intorza does not warrant that (a) the Service will function uninterrupted, secure, or available 
                at any particular time or location; (b) any errors or defects will be corrected; (c) the Service 
                is free of viruses or other harmful components; or (d) the results of using the Service will 
                meet your requirements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                13. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms shall be governed and construed in accordance with the laws of India, without regard 
                to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of 
                those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, 
                the remaining provisions of these Terms will remain in effect.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                14. Dispute Resolution
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any disputes arising out of or relating to these Terms or the Service shall first be attempted 
                to be resolved through good-faith negotiation between the parties. If the dispute cannot be 
                resolved through negotiation within thirty (30) days, either party may initiate arbitration.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The arbitration shall be conducted in Bangalore, India, in accordance with the Arbitration and 
                Conciliation Act, 1996. The language of the arbitration shall be English. The decision of the 
                arbitrator shall be final and binding on both parties.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                15. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any 
                reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate 
                your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All provisions of these Terms which by their nature should survive termination shall survive 
                termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, 
                and limitations of liability.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                16. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
                revision is material, we will try to provide at least 30 days notice prior to any new terms taking 
                effect.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What constitutes a material change will be determined at our sole discretion. By continuing to 
                access or use our Service after those revisions become effective, you agree to be bound by the 
                revised terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                17. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Email:</strong> legal@intorza.com</li>
                <li><strong>Support:</strong> support@intorza.com</li>
                <li><strong>Address:</strong> Bangalore, Karnataka, India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
