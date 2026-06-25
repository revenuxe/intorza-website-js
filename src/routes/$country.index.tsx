import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryHeroSection from "@/components/country/CountryHeroSection";
import ProCTA from "@/components/ProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { getCountryBySlug, countries } from "@/data/countries";
import { getCitiesByCountrySlug } from "@/data/cities";
import { SITE_URL } from "@/lib/site";
import { hreflangLinks, socialImageMeta, softwareAppSchema, faqPageSchema, homepageFaqs } from "@/lib/seo";
import { breadcrumbListSchema } from "@/components/seo/Breadcrumbs";

export const Route = createFileRoute("/$country/")({
  loader: ({ params }) => {
    const country = getCountryBySlug(params.country);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { country } = loaderData;
    const url = `${SITE_URL}/${country.slug}`;
    return {
      meta: [
        { title: country.seoTitle },
        { name: "description", content: country.seoDescription },
        { name: "keywords", content: country.seoKeywords },
        { property: "og:title", content: country.seoTitle },
        { property: "og:description", content: country.seoDescription },
        { property: "og:url", content: url },
        { property: "og:locale", content: country.locale.replace("-", "_") },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: country.seoTitle },
        { name: "twitter:description", content: country.seoDescription },
        ...socialImageMeta(),
      ],
      links: [
        { rel: "canonical", href: url },
        ...hreflangLinks(`/${country.slug}`),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            softwareAppSchema({
              url,
              price: String(country.priceValue),
              currency: country.currency,
              name: `Intorza — Interior Design Software ${country.name}`,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: `Intorza ${country.name}`,
            description: country.seoDescription,
            url,
            image: `${SITE_URL}/og-image.jpg`,
            areaServed: { "@type": "Country", name: country.name },
            priceRange: country.price,
            knowsLanguage: country.locale.split("-")[0],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqPageSchema(homepageFaqs)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbListSchema([{ name: country.name, url }])),
        },
      ],
    };
  },
  component: CountryPage,
});

function CountryPage() {
  const { country } = Route.useLoaderData();
  const cityList = getCitiesByCountrySlug(country.slug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CountryHeroSection country={country} />
        <ProCTA price={country.price} currency={country.currency} countryName={country.name} />
        <FeaturesSection />
        <HowItWorksSection />

        {cityList.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container-custom max-w-5xl text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cities we serve in {country.name}
              </h2>
              <p className="text-muted-foreground mb-8">
                Localized interior design software for every major city.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {cityList.map((city) => (
                  <Link
                    key={city.slug}
                    to="/$country/$city"
                    params={{ country: country.slug, city: city.slug }}
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <TestimonialsSection countryName={country.name} />
        <CTASection countryName={country.name} trustedByText={country.trustedByText} />
      </main>
      <Footer />
    </div>
  );
}

// linter-friendly
void countries;
