import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeedbackCTA from "@/components/FeedbackCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Interior Design Software 2025 | Free Quotation & Invoice Maker"
        description="Intorza is India's #1 interior design project management software. Create professional quotations, generate GST invoices, manage clients & team collaboration. Trusted by 500+ designers. Start Free!"
        keywords="interior design software, interior design project management, quotation software for interior designers, invoice software for contractors, interior business management, client management software, interior designer tools, best interior design software India, free quotation software, GST invoice software"
        canonicalUrl="https://intorza.com"
        ogImage="https://intorza.com/og-image.png"
      />
      <Header />
      <main>
        <HeroSection />
        <FeedbackCTA />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
