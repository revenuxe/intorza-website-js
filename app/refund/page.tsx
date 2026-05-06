import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Refund Policy - Intorza",
  description: "Read our refund policy for information on subscriptions and payments.",
  alternates: {
    canonical: "https://intorza.com/refund",
  },
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs items={[{ name: "Refund Policy", url: "https://intorza.com/refund" }]} className="mb-8" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Refund Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: December 9, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our refund policy explains the conditions under which we provide refunds for our services. We strive to provide the best possible experience for our users, and we want you to be satisfied with your purchase.
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Subscription Refunds
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a 7-day money-back guarantee for all new subscription plans. If you are not satisfied with our service for any reason, you can request a full refund within 7 days of your initial purchase.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                After the initial 7-day period, subscriptions are generally non-refundable. However, we may consider refund requests on a case-by-case basis under exceptional circumstances.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Automatic Renewals
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Subscriptions are set to automatically renew at the end of each billing cycle. You are responsible for canceling your subscription before the renewal date if you do not wish to continue the service. Refunds will not be provided for automatic renewals unless requested within 48 hours of the renewal date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. How to Request a Refund
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To request a refund, please contact our support team at intorza.com@gmail.com with your account details and the reason for your request. We will process your request within 5-7 business days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Exceptions
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to refuse a refund if we find evidence of fraud, abuse of our service, or other manipulative practices that entitle us to a counterclaim.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about our Refund Policy, please contact us at intorza.com@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
