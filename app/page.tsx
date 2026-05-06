import HeroSection from "@/components/HeroSection";
import ProCTA from "@/components/ProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeedbackCTA from "@/components/FeedbackCTA";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { Metadata } from "next";
import Script from "next/script";
import GeoRedirectWrapper from "@/components/GeoRedirectWrapper";

export const metadata: Metadata = {
  title: "Best Interior Design Software 2026 | Free Quotation & Invoice Maker",
  description: "Intorza is the #1 interior design project management software. Create professional quotations, generate GST invoices, manage clients & team collaboration. Trusted by 500+ designers. Start for free today!",
  keywords: "interior design software, interior design project management, quotation maker for interior designers, interior design invoice software, GST invoice software, client management for designers, interior design business tools",
  alternates: {
    canonical: "https://intorza.com",
  },
  openGraph: {
    title: "Best Interior Design Software 2026 | Intorza",
    description: "Streamline your interior design business with professional quotations, invoices, and project management. Join 500+ successful designers.",
    url: "https://intorza.com",
    siteName: "Intorza",
    images: [
      {
        url: "https://intorza.com/assets/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "Intorza Interior Design Software Dashboard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intorza | Interior Design Project Management Made Easy",
    description: "Create professional quotations and invoices in minutes. The complete business tool for interior designers.",
    images: ["https://intorza.com/assets/dashboard-preview.png"],
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://intorza.com/#organization",
    "name": "Intorza",
    "url": "https://intorza.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://intorza.com/assets/intorza-logo.webp",
      "width": "150",
      "height": "48"
    },
    "sameAs": [
      "https://linkedin.com/company/intorza",
      "https://twitter.com/intorza",
      "https://instagram.com/intorza"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Intorza",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "547",
      "bestRating": "5"
    },
    "description": "All-in-one interior design project management software with quotation builder, invoice generator, client management & team collaboration.",
    "url": "https://intorza.com",
    "author": { "@id": "https://intorza.com/#organization" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Intorza?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Intorza is an all-in-one interior design project management software that helps designers and contractors manage quotations, invoices, clients, and teams."
        }
      },
      {
        "@type": "Question",
        "name": "Is Intorza free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Intorza offers a free plan with core features including quotation builder, invoice management, and client management."
        }
      },
      {
        "@type": "Question",
        "name": "Does Intorza support GST invoicing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Intorza fully supports GST invoicing with proper tax calculations, GSTIN display, and HSN/SAC codes."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <HeroSection />
      <ProCTA />
      <FeaturesSection />
      <HowItWorksSection />
      <FeedbackCTA />
      <TestimonialsSection />
      <CTASection />
      
      <GeoRedirectWrapper />
    </>
  );
}
