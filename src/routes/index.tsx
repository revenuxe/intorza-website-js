import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProCTA from "@/components/ProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { SITE_URL } from "@/lib/site";
import {
  websiteSchema,
  hreflangLinks,
  socialImageMeta,
  softwareAppSchema,
  faqPageSchema,
} from "@/lib/seo";

const TITLE = "Best Interior Design Software 2025 | Free Quotation & Invoice Maker | Intorza";
const DESCRIPTION =
  "Intorza is the all-in-one interior design project management software. Create quotations, generate GST invoices, manage clients, projects & teams. Trusted by 500+ designers worldwide. Start Free!";
const KEYWORDS =
  "interior design software, quotation software for interior designers, invoice software for contractors, interior design project management, GST invoice software, modular kitchen software, site measurement app, interior CRM, design studio software, intorza";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      ...socialImageMeta(),
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      ...hreflangLinks("/"),
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(websiteSchema()) },
      { type: "application/ld+json", children: JSON.stringify(softwareAppSchema()) },
      { type: "application/ld+json", children: JSON.stringify(faqPageSchema()) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProCTA />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

