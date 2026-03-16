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
import { Helmet } from "react-helmet-async";

const CountryHome = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  
  const country = countryCode ? getCountryByCode(countryCode.toLowerCase()) : undefined;
  
  if (!country) {
    return <Navigate to="/" replace />;
  }

  // Clean country-specific schema - one per type only
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Intorza - Interior Design Software ${country.name}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "url": `https://intorza.com/${country.code}`,
    "offers": {
      "@type": "Offer",
      "price": country.priceValue.toString(),
      "priceCurrency": country.currency,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "547",
      "bestRating": "5"
    },
    "author": { "@id": "https://intorza.com/#organization" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://intorza.com" },
      { "@type": "ListItem", "position": 2, "name": country.name, "item": `https://intorza.com/${country.code}` }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={country.seoTitle}
        description={country.seoDescription}
        keywords={country.seoKeywords}
        canonicalUrl={`https://intorza.com/${country.code}`}
        locale={country.locale}
        includeHreflang={true}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
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
