import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy - Intorza",
  description: "Learn about how we use cookies and similar technologies on our website.",
  alternates: {
    canonical: "https://intorza.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs items={[{ name: "Cookie Policy", url: "https://intorza.com/cookies" }]} className="mb-8" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: December 9, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              We use cookies to improve your experience on our website. This policy explains how we use cookies and what your choices are.
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. What are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. How We Use Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies for several reasons, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function correctly and cannot be switched off in our systems.</li>
                <li><strong>Performance and Analytics:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
                <li><strong>Marketing Cookies:</strong> These are used to track visitors across websites to display relevant and engaging ads.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Your Choices
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all or some cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about our Cookie Policy, please contact us at intorza.com@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
