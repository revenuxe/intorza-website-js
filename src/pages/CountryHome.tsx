import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import CountryHeroSection from "@/components/country/CountryHeroSection";
import CountryProCTA from "@/components/country/CountryProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeedbackCTA from "@/components/FeedbackCTA";
import CountryTestimonialsSection from "@/components/country/CountryTestimonialsSection";
import CountryCTASection from "@/components/country/CountryCTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { getCountryByCode } from "@/data/countries";

const CountryHome = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  
  const country = countryCode ? getCountryByCode(countryCode.toLowerCase()) : undefined;
  
  if (!country) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={country.seoTitle}
        description={country.seoDescription}
        keywords={country.seoKeywords}
        canonicalUrl={`https://intorza.com/${country.code}`}
        ogImage="https://intorza.com/og-image.png"
      />
      <Header />
      <main>
        <CountryHeroSection country={country} />
        <CountryProCTA country={country} />
        <FeaturesSection />
        <HowItWorksSection />
        <FeedbackCTA />
        <CountryTestimonialsSection country={country} />
        <CountryCTASection country={country} />
      </main>
      <Footer />
    </div>
  );
};

export default CountryHome;
