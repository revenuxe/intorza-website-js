import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeedbackCTA from "@/components/FeedbackCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import {
  OrganizationSchema,
  SoftwareApplicationSchema,
  WebSiteSchema,
  FAQSchema,
  HowToSchema,
} from "@/components/seo/SchemaMarkup";

const homepageFAQs = [
  {
    question: "What is Intorza?",
    answer: "Intorza is India's #1 all-in-one interior design project management software that helps interior designers and contractors manage quotations, invoices, clients, and team members efficiently.",
  },
  {
    question: "Is Intorza free to use?",
    answer: "Yes, Intorza offers a generous free plan that includes core features like quotation builder, invoice management, and client management.",
  },
  {
    question: "Can I create professional quotations with Intorza?",
    answer: "Yes, Intorza has a powerful quotation builder with customizable templates, room-wise categorization, auto-calculations, and professional PDF export features.",
  },
  {
    question: "Does Intorza support GST invoicing?",
    answer: "Yes, Intorza fully supports GST invoicing for Indian businesses with proper tax calculations, GSTIN display, and HSN/SAC codes.",
  },
];

const howToSteps = [
  { name: "Sign Up", text: "Create your free Intorza account in seconds. No credit card required." },
  { name: "Set Up Your Business", text: "Add your business details, logo, and GST information for professional documents." },
  { name: "Create Your First Quotation", text: "Use our intuitive quotation builder to create professional proposals for your clients." },
  { name: "Manage & Grow", text: "Track clients, generate invoices, and manage your entire interior design business." },
];

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
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <WebSiteSchema />
      <FAQSchema faqs={homepageFAQs} />
      <HowToSchema
        name="How to Get Started with Intorza"
        description="Learn how to start using Intorza for your interior design business in 4 simple steps"
        steps={howToSteps}
        totalTime="PT5M"
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
