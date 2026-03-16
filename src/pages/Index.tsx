import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProCTA from "@/components/ProCTA";
import FeedbackCTA from "@/components/FeedbackCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import useGeoRedirect from "@/hooks/useGeoRedirect";
import GeoRedirectBanner from "@/components/GeoRedirectBanner";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { geoData, showRedirectBanner, redirectToLocalPage, dismissBanner } = useGeoRedirect();

  // Single SoftwareApplication schema for homepage only
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
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Interior Design Software 2025 | Free Quotation & Invoice Maker"
        description="Intorza is India's #1 interior design project management software. Create professional quotations, generate GST invoices, manage clients & team collaboration. Trusted by 500+ designers. Start Free!"
        keywords="interior design software, quotation software for interior designers, invoice software, interior design project management, GST invoice software, interior design app"
        canonicalUrl="https://intorza.com"
        includeHreflang={true}
      />
      
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      <Header />
      <main>
        <HeroSection />
        <ProCTA />
        <FeaturesSection />
        <HowItWorksSection />
        <FeedbackCTA />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />

      {showRedirectBanner && geoData && (
        <GeoRedirectBanner
          countryCode={geoData.countryCode}
          countryName={geoData.countryName}
          onRedirect={redirectToLocalPage}
          onDismiss={dismissBanner}
        />
      )}
    </div>
  );
};

export default Index;
