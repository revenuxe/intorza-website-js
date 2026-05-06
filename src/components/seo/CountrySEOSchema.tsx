import { CountryData } from "@/data/countries";

interface CountrySEOSchemaProps {
  country: CountryData;
}

export const CountryLocalBusinessSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://intorza.com/${country.slug}#localbusiness`,
    "name": `Intorza - Interior Design Software ${country.name}`,
    "description": country.seoDescription,
    "url": `https://intorza.com/${country.slug}`,
    "image": "https://intorza.com/intorza-logo.webp",
    "address": {
      "@type": "PostalAddress",
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

export const CountrySoftwareSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `https://intorza.com/${country.slug}#software`,
    "name": `Intorza - Interior Design Software for ${country.name}`,
    "description": country.seoDescription,
    "url": `https://intorza.com/${country.slug}`,
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
