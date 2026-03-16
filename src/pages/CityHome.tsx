import { useParams, Navigate } from "react-router-dom";
import { getCityBySlug } from "@/data/cities";
import { countries } from "@/data/countries";
import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CountryTestimonialsSection from "@/components/country/CountryTestimonialsSection";
import CountryProCTA from "@/components/country/CountryProCTA";
import CountryCTASection from "@/components/country/CountryCTASection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FeedbackCTA from "@/components/FeedbackCTA";
import { Helmet } from "react-helmet-async";

const CityHome = () => {
  const { countryCode, citySlug } = useParams<{ countryCode: string; citySlug: string }>();

  if (!countryCode || !citySlug) {
    return <Navigate to="/" replace />;
  }

  const city = getCityBySlug(countryCode, citySlug);
  const country = countries.find(c => c.code === countryCode.toLowerCase());

  if (!city || !country) {
    return <Navigate to={`/${countryCode}`} replace />;
  }

  const baseUrl = "https://intorza.com";
  const cityUrl = `${baseUrl}/${city.countryCode}/${city.slug}`;

  const breadcrumbItems = [
    { name: country.name, url: `${baseUrl}/${country.code}` },
    { name: city.name, url: cityUrl },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": country.name, "item": `${baseUrl}/${country.code}` },
      { "@type": "ListItem", "position": 3, "name": city.name, "item": cityUrl }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Intorza - Interior Design Software ${city.name}`,
    "applicationCategory": "BusinessApplication",
    "url": cityUrl,
    "offers": {
      "@type": "Offer",
      "price": country.priceValue.toString(),
      "priceCurrency": country.currency,
      "availability": "https://schema.org/InStock"
    },
    "author": { "@id": "https://intorza.com/#organization" }
  };

  return (
    <>
      <SEOHead
        title={city.seoTitle}
        description={city.seoDescription}
        keywords={city.seoKeywords}
        canonicalUrl={cityUrl}
        locale={country.locale}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <section className="py-12 lg:py-20 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-sm font-medium text-primary">{city.trustedByText}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Interior Design Software for{" "}
                <span className="text-primary">{city.name}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {city.heroSubtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {city.landmarks.map((landmark, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {landmark}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.intorza.com"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Free in {city.name}
                </a>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <HowItWorksSection />
        <CountryTestimonialsSection country={country} />
        <CountryProCTA country={country} />
        <CountryCTASection country={country} />
        <FeedbackCTA />
      </main>
      
      <Footer />
    </>
  );
};

export default CityHome;
