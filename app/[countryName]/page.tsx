import { countries, getCountryBySlug } from "@/data/countries";
import CountryHeroSection from "@/components/country/CountryHeroSection";
import CountryProCTA from "@/components/country/CountryProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeedbackCTA from "@/components/FeedbackCTA";
import CountryTestimonialsSection from "@/components/country/CountryTestimonialsSection";
import CountryCTASection from "@/components/country/CountryCTASection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { CountryLocalBusinessSchema, CountrySoftwareSchema } from "@/components/seo/CountrySEOSchema";

type Props = {
  params: Promise<{ countryName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countryName } = await params;
  const country = getCountryBySlug(countryName.toLowerCase());
  if (!country) return {};

  return {
    title: country.seoTitle,
    description: country.seoDescription,
    keywords: country.seoKeywords,
    alternates: {
      canonical: `https://intorza.com/${country.slug}`,
    },
    openGraph: {
      title: country.seoTitle,
      description: country.seoDescription,
      url: `https://intorza.com/${country.slug}`,
      locale: country.locale,
      siteName: "Intorza",
      images: [
        {
          url: "https://intorza.com/assets/dashboard-preview.png",
          width: 1200,
          height: 630,
          alt: `Intorza Interior Design Software in ${country.name}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: country.seoTitle,
      description: country.seoDescription,
      images: ["https://intorza.com/assets/dashboard-preview.png"],
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { countryName } = await params;
  const country = getCountryBySlug(countryName.toLowerCase());
  if (!country) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://intorza.com" },
      { "@type": "ListItem", "position": 2, "name": country.name, "item": `https://intorza.com/${country.slug}` }
    ]
  };

  return (
    <>
      <CountryLocalBusinessSchema country={country} />
      <CountrySoftwareSchema country={country} />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <CountryHeroSection country={country} />
      <CountryProCTA country={country} />
      <FeaturesSection />
      <HowItWorksSection />
      <FeedbackCTA />
      <CountryTestimonialsSection country={country} />
      <CountryCTASection country={country} />
    </>
  );
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    countryName: country.slug,
  }));
}
