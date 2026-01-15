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
import { SpeakableSchema, ItemListSchema, ProfessionalServiceSchema } from "@/components/seo/SchemaMarkup";
import useGeoRedirect from "@/hooks/useGeoRedirect";
import GeoRedirectBanner from "@/components/GeoRedirectBanner";

const Index = () => {
  const { geoData, showRedirectBanner, redirectToLocalPage, dismissBanner } = useGeoRedirect();

  // Feature list for ItemList schema (helps with featured snippets)
  const featureItems = [
    { name: "Quotation Builder", url: "https://intorza.com/#features", description: "Create professional interior design quotations with auto-calculations" },
    { name: "Invoice Generator", url: "https://intorza.com/#features", description: "Generate GST-compliant invoices for Indian businesses" },
    { name: "Client Management", url: "https://intorza.com/#features", description: "Complete CRM for managing interior design clients" },
    { name: "Team Collaboration", url: "https://intorza.com/#features", description: "Work together with your design team seamlessly" },
    { name: "Project Dashboard", url: "https://intorza.com/#features", description: "Track all your interior design projects in one place" },
    { name: "Site Measurement", url: "https://intorza.com/#features", description: "Calculate and manage site measurements digitally" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Interior Design Software 2025 | Free Quotation & Invoice Maker"
        description="Intorza is India's #1 interior design project management software. Create professional quotations, generate GST invoices, manage clients & team collaboration. Trusted by 500+ designers. Start Free!"
        keywords="interior design software, interior design project management, quotation software for interior designers, invoice software for contractors, interior business management, client management software, interior designer tools, best interior design software India, free quotation software, GST invoice software, interior design app 2025, best quotation maker for designers"
        canonicalUrl="https://intorza.com"
        ogImage="https://intorza.com/og-image.png"
        includeHreflang={true}
        speakableSelectors={["h1", ".hero-description", ".feature-title", ".faq-answer"]}
        category="Business Software"
        tags={["interior design", "project management", "quotation software", "invoice generator", "GST billing"]}
        priceRange="Free - ₹999/month"
      />
      
      {/* AEO: Speakable Schema for voice search optimization */}
      <SpeakableSchema
        name="Intorza - Best Interior Design Software"
        url="https://intorza.com"
        cssSelectors={["h1", ".hero-description", ".feature-description"]}
      />
      
      {/* AEO: ItemList Schema for featured snippets */}
      <ItemListSchema
        name="Top Features of Intorza Interior Design Software"
        description="Essential tools for interior designers and contractors"
        items={featureItems}
      />
      
      {/* Professional Service Schema for B2B visibility */}
      <ProfessionalServiceSchema />
      
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

      {/* Geo-redirect banner for international users */}
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
