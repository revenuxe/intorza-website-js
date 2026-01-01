import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Refund Policy - Intorza Subscription Refunds"
        description="Read Intorza's refund policy for subscription plans. Learn about eligibility, refund process, and timelines for requesting a refund."
        keywords="intorza refund policy, subscription refund, money back guarantee, cancellation policy, payment refund"
        canonicalUrl="https://intorza.com/refund"
      />
      <Header />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <Breadcrumbs items={[{ name: "Refund Policy", url: "https://intorza.com/refund" }]} className="mb-8" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              Refund Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: December 9, 2024
            </p>

            <div className="prose prose-lg max-w-none text-foreground/80">
              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                1. Overview
              </h2>
              <p className="mb-4">
                At Intorza, we want you to be completely satisfied with our services. This 
                Refund Policy outlines the circumstances under which refunds may be granted 
                and the process for requesting one.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                2. Free Tier
              </h2>
              <p className="mb-4">
                Intorza is currently free for the first 1000 users. As no payment is required 
                for the free tier, no refunds are applicable for free users.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                3. Paid Subscriptions (Future)
              </h2>
              <p className="mb-4">
                When we introduce paid plans, the following refund policy will apply:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Monthly Subscriptions:</strong> Refunds available within 7 days of payment if service not used significantly.</li>
                <li><strong>Annual Subscriptions:</strong> Prorated refunds available within 30 days of payment.</li>
                <li><strong>Enterprise Plans:</strong> Refunds handled on a case-by-case basis as per the service agreement.</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                4. Eligibility for Refunds
              </h2>
              <p className="mb-4">
                Refunds may be granted in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Technical issues preventing access to the service that cannot be resolved</li>
                <li>Duplicate or erroneous charges</li>
                <li>Cancellation within the refund period as specified above</li>
                <li>Significant service disruptions caused by Intorza</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                5. Non-Refundable Items
              </h2>
              <p className="mb-4">
                The following are not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Subscriptions after the refund period has elapsed</li>
                <li>Accounts terminated for violation of Terms of Service</li>
                <li>Partial month usage after cancellation</li>
                <li>Add-on services or features after use</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                6. How to Request a Refund
              </h2>
              <p className="mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Email us at <a href="mailto:intorza.com@gmail.com" className="text-primary hover:underline">intorza.com@gmail.com</a></li>
                <li>Include your account email and order/transaction ID</li>
                <li>Explain the reason for your refund request</li>
                <li>Our team will review your request within 3-5 business days</li>
              </ol>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                7. Refund Processing
              </h2>
              <p className="mb-4">
                Once approved, refunds will be processed within 5-10 business days. The refund 
                will be credited to the original payment method used for the purchase.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                8. Contact Us
              </h2>
              <p className="mb-4">
                For any questions regarding our Refund Policy, please contact us at:{" "}
                <a href="mailto:intorza.com@gmail.com" className="text-primary hover:underline">
                  intorza.com@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
