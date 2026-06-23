import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const TITLE = "Refund Policy — Intorza Subscription Refunds";
const DESCRIPTION = "Read Intorza's refund policy for subscription plans, eligibility, and the refund process.";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:url", content: `${SITE_URL}/refund` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/refund` }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Refund Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: June 23, 2026</p>
          <div className="space-y-6 text-foreground/80">
            <p>At Intorza, we want you to be completely satisfied. Refunds may be granted for technical issues preventing access, duplicate or erroneous charges, or cancellation within 7 days of initial purchase.</p>
            <h2 className="font-display text-2xl font-semibold text-foreground pt-4">How to Request</h2>
            <p>Email <a className="text-primary underline" href="mailto:intorza.com@gmail.com">intorza.com@gmail.com</a> with your account email and the reason. We respond within 3-5 business days; approved refunds are processed within 5-10 business days to the original payment method.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
