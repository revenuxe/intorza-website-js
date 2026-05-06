import { CityData } from "@/data/cities";
import { CountryData } from "@/data/countries";

interface CitySEOSchemaProps {
  city: CityData;
  country: CountryData;
}

export const CityLocalBusinessSchema = ({ city, country }: CitySEOSchemaProps) => {
  const baseUrl = "https://intorza.com";
  const cityUrl = `${baseUrl}/${city.countrySlug}/${city.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${cityUrl}#localbusiness`,
    "name": `Intorza - Interior Design Software ${city.name}`,
    "description": city.seoDescription,
    "url": cityUrl,
    "image": `${baseUrl}/intorza-logo.webp`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressCountry": country.code.toUpperCase(),
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const CitySoftwareSchema = ({ city, country }: CitySEOSchemaProps) => {
  const baseUrl = "https://intorza.com";
  const cityUrl = `${baseUrl}/${city.countrySlug}/${city.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${cityUrl}#software`,
    "name": `Intorza - Interior Design Software for ${city.name}`,
    "description": city.seoDescription,
    "url": cityUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": country.priceValue.toString(),
      "priceCurrency": country.currency,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "547",
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
