import { createFileRoute, notFound } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProCTA from "@/components/ProCTA";
import CTASection from "@/components/CTASection";
import Breadcrumbs, { breadcrumbListSchema } from "@/components/seo/Breadcrumbs";
import { getCityBySlug } from "@/data/cities";
import { getCountryByCode } from "@/data/countries";
import { SITE_URL } from "@/lib/site";
import { hreflangLinks } from "@/lib/seo";

export const Route = createFileRoute("/$country/$city")({
  loader: ({ params }) => {
    const country = getCountryByCode(params.country);
    const city = getCityBySlug(params.country, params.city);
    if (!country || !city) throw notFound();
    return { country, city };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { country, city } = loaderData;
    const url = `${SITE_URL}/${city.countryCode}/${city.slug}`;
    return {
      meta: [
        { title: city.seoTitle },
        { name: "description", content: city.seoDescription },
        { name: "keywords", content: city.seoKeywords },
        { property: "og:title", content: city.seoTitle },
        { property: "og:description", content: city.seoDescription },
        { property: "og:url", content: url },
        { property: "og:locale", content: country.locale.replace("-", "_") },
      ],
      links: [
        { rel: "canonical", href: url },
        ...hreflangLinks(`/${params.country}/${params.city}`),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Intorza ${city.name}`,
            description: city.seoDescription,
            url,
            image: `${SITE_URL}/intorza-logo.webp`,
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressRegion: city.region,
              addressCountry: city.countryName,
            },
            areaServed: [
              { "@type": "City", name: city.name },
              ...city.landmarks.map((l) => ({ "@type": "Place", name: l })),
            ],
            priceRange: country.price,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Interior Design Software for ${city.name}`,
            description: city.seoDescription,
            url,
            provider: { "@type": "Organization", name: "Intorza", url: SITE_URL },
            areaServed: { "@type": "City", name: city.name },
            serviceType: "Interior Design Software",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbListSchema([
              { name: country.name, url: `${SITE_URL}/${country.code}` },
              { name: city.name, url },
            ]),
          ),
        },
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { country, city } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container-custom pt-28 pb-4">
          <Breadcrumbs
            items={[
              { name: country.name, url: `${SITE_URL}/${country.code}` },
              { name: city.name, url: `${SITE_URL}/${country.code}/${city.slug}` },
            ]}
          />
        </div>

        <section className="py-12 lg:py-20 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="container-custom max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">{city.trustedByText}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Interior Design Software for <span className="text-primary">{city.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {city.heroSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {city.landmarks.map((l) => (
                <span key={l} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                  {l}
                </span>
              ))}
            </div>
            <a
              href="https://app.intorza.com"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
            >
              Start Free in {city.name}
            </a>
          </div>
        </section>

        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection countryName={city.name} />
        <ProCTA price={country.price} currency={country.currency} countryName={city.name} />
        <CTASection countryName={city.name} trustedByText={city.trustedByText} />
      </main>
      <Footer />
    </div>
  );
}
