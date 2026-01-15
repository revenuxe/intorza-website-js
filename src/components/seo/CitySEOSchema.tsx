import { Helmet } from "react-helmet-async";
import { CityData } from "@/data/cities";

interface CitySEOSchemaProps {
  city: CityData;
}

const CitySEOSchema = ({ city }: CitySEOSchemaProps) => {
  const baseUrl = "https://intorza.com";
  const cityUrl = `${baseUrl}/${city.countryCode}/${city.slug}`;

  // LocalBusiness Schema for City
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${cityUrl}#localbusiness`,
    "name": `Intorza ${city.name}`,
    "description": city.seoDescription,
    "url": cityUrl,
    "logo": `${baseUrl}/intorza-logo.webp`,
    "image": `${baseUrl}/og-image.png`,
    "telephone": "+91-support",
    "email": "intorza.com@gmail.com",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.region,
      "addressCountry": city.countryName,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": city.countryName,
    },
    "areaServed": [
      {
        "@type": "City",
        "name": city.name,
      },
      ...city.landmarks.map(landmark => ({
        "@type": "Place",
        "name": landmark,
      })),
    ],
    "availableLanguage": city.localLanguages.map(lang => ({
      "@type": "Language",
      "name": lang,
    })),
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
  };

  // Service Schema for City
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${cityUrl}#service`,
    "name": `Interior Design Software for ${city.name}`,
    "description": city.seoDescription,
    "url": cityUrl,
    "provider": {
      "@type": "Organization",
      "name": "Intorza",
      "url": baseUrl,
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": city.region,
      },
    },
    "serviceType": "Interior Design Software",
    "category": "Business Software",
  };

  // WebPage Schema for City
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${cityUrl}#webpage`,
    "url": cityUrl,
    "name": city.seoTitle,
    "description": city.seoDescription,
    "inLanguage": city.localLanguages[0] || "en",
    "isPartOf": {
      "@id": `${baseUrl}/#website`,
    },
    "about": {
      "@type": "City",
      "name": city.name,
      "containedInPlace": {
        "@type": "Country",
        "name": city.countryName,
      },
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": city.countryName,
          "item": `${baseUrl}/${city.countryCode}`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": city.name,
          "item": cityUrl,
        },
      ],
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero-title", ".hero-subtitle", ".city-description"],
    },
  };

  // FAQ Schema for City
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${cityUrl}#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the best interior design software in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Intorza is the leading interior design project management software in ${city.name}. It helps ${city.name} interior designers and contractors manage quotations, invoices, clients, and team members efficiently.`,
        },
      },
      {
        "@type": "Question",
        "name": `Is Intorza available in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Intorza is fully available for interior design professionals in ${city.name}, ${city.countryName}. It works across all areas including ${city.landmarks.slice(0, 3).join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        "name": `How much does interior design software cost in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Intorza offers a generous free plan for ${city.name} interior designers. Premium features are available at affordable prices with local currency support.`,
        },
      },
    ],
  };

  // Product Schema for City
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${cityUrl}#product`,
    "name": `Intorza Interior Design Software - ${city.name}`,
    "description": city.seoDescription,
    "url": cityUrl,
    "brand": {
      "@type": "Brand",
      "name": "Intorza",
    },
    "category": "Interior Design Software",
    "offers": {
      "@type": "Offer",
      "url": "https://app.intorza.com",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "547",
      "reviewCount": "423",
      "bestRating": "5",
      "worstRating": "1",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

export default CitySEOSchema;
