import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProCTA from "@/components/ProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { SITE_URL } from "@/lib/site";
import { softwareAppSchema, websiteSchema } from "@/lib/seo";

const title = "Best Interior Design Software 2025 | Free Quotation & Invoice Maker | Intorza";
const description = "Intorza is the all-in-one interior design project management software. Create quotations, generate GST invoices, manage clients, projects & teams. Trusted by 500+ designers worldwide. Start Free!";
export const metadata: Metadata = { title, description, alternates: { canonical: SITE_URL }, openGraph: { title, description, url: SITE_URL }, keywords: ["interior design software", "quotation software for interior designers", "invoice software for contractors", "interior design project management"] };

export default function Home() { return <div className="min-h-screen bg-background"><Header /><main><HeroSection /><ProCTA /><FeaturesSection /><HowItWorksSection /><TestimonialsSection /><CTASection /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema(), softwareAppSchema()]) }} /></div>; }
