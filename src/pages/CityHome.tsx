import { useParams, Navigate } from "react-router-dom";
import { getCityBySlug } from "@/data/cities";
import { countries } from "@/data/countries";
import SEOHead from "@/components/seo/SEOHead";
import CitySEOSchema from "@/components/seo/CitySEOSchema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CountryTestimonialsSection from "@/components/country/CountryTestimonialsSection";
import CountryProCTA from "@/components/country/CountryProCTA";
import CountryCTASection from "@/components/country/CountryCTASection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FeedbackCTA from "@/components/FeedbackCTA";

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

  return (
    <>
      <SEOHead
        title={city.seoTitle}
        description={city.seoDescription}
        keywords={city.seoKeywords}
        canonicalUrl={cityUrl}
        locale={country.locale}
        ogType="website"
        ogImage={`${baseUrl}/og-image.png`}
        includeHreflang={false}
        category="Interior Design Software"
        tags={[city.name, city.countryName, "Interior Design", "Quotation Software", "Invoice Software", ...city.landmarks]}
        priceRange="$"
        applicationName="Intorza"
        speakableSelectors={[".hero-title", ".hero-subtitle", ".city-description"]}
      />
      <CitySEOSchema city={city} />
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* City-specific Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-sm font-medium text-primary">{city.trustedByText}</span>
              </div>
              
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Interior Design Software for{" "}
                <span className="text-primary">{city.name}</span>
              </h1>
              
              <p className="hero-subtitle city-description text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {city.heroSubtitle}
              </p>

              {/* City landmarks */}
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
