import { CountryData } from "@/data/countries";

interface CountrySEOSchemaProps {
  country: CountryData;
}

// Local Business Schema for Country-specific targeting
export const CountryLocalBusinessSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://intorza.com/${country.code}#localbusiness`,
    "name": `Intorza - Interior Design Software ${country.name}`,
    "description": country.seoDescription,
    "url": `https://intorza.com/${country.code}`,
    "logo": "https://intorza.com/intorza-logo.webp",
    "image": "https://intorza.com/og-image.png",
    "priceRange": country.price,
    "areaServed": {
      "@type": "Country",
      "name": country.name,
      "sameAs": `https://en.wikipedia.org/wiki/${country.name.replace(/ /g, '_')}`
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "addressCountry": country.code.toUpperCase()
      }
    },
    "knowsLanguage": country.locale.split('-')[0],
    "availableLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": country.locale.split('-')[0],
        "alternateName": country.locale
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Software Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quotation Builder",
            "description": `Professional quotation software for interior designers in ${country.name}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Invoice Generator",
            "description": `Automated invoice generation for contractors in ${country.name}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Client Management",
            "description": `CRM for interior design businesses in ${country.name}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Team Collaboration",
            "description": `Project collaboration tools for design teams in ${country.name}`
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Country-specific SoftwareApplication Schema
export const CountrySoftwareSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `https://intorza.com/${country.code}#software`,
    "name": `Intorza - Interior Design Software for ${country.name}`,
    "description": country.seoDescription,
    "url": `https://intorza.com/${country.code}`,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Interior Design Project Management",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": country.priceValue,
      "priceCurrency": country.currency,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Intorza"
      },
      "eligibleRegion": {
        "@type": "Country",
        "name": country.name
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Quotation Builder",
      "Invoice Generator",
      "Client Management",
      "Team Collaboration",
      "Project Tracking",
      "Site Measurement Tools"
    ],
    "screenshot": "https://intorza.com/dashboard-preview.png",
    "softwareVersion": "2.0",
    "releaseNotes": "Enhanced features for interior design professionals",
    "inLanguage": country.locale,
    "countryOfOrigin": {
      "@type": "Country",
      "name": "India"
    },
    "availableOnDevice": ["Desktop", "Tablet", "Mobile"],
    "permissions": "Internet access required"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Country-specific WebPage Schema with Speakable
export const CountryWebPageSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://intorza.com/${country.code}#webpage`,
    "url": `https://intorza.com/${country.code}`,
    "name": country.seoTitle,
    "description": country.seoDescription,
    "inLanguage": country.locale,
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://intorza.com/#website",
      "url": "https://intorza.com",
      "name": "Intorza",
      "publisher": {
        "@type": "Organization",
        "name": "Intorza"
      }
    },
    "about": {
      "@type": "Thing",
      "name": `Interior Design Software in ${country.name}`,
      "description": `Professional project management software for interior designers and contractors in ${country.name}`
    },
    "mentions": [
      {
        "@type": "Thing",
        "name": "Interior Design",
        "sameAs": "https://en.wikipedia.org/wiki/Interior_design"
      },
      {
        "@type": "Thing",
        "name": "Project Management Software",
        "sameAs": "https://en.wikipedia.org/wiki/Project_management_software"
      }
    ],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero-title", ".hero-subtitle", ".feature-title"]
    },
    "specialty": "Interior Design Business Management",
    "significantLink": [
      `https://intorza.com/${country.code}#features`,
      `https://intorza.com/${country.code}#pricing`
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Interior Designers and Contractors",
      "geographicArea": {
        "@type": "Country",
        "name": country.name
      }
    },
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": "main"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://intorza.com/og-image.png",
      "width": 1200,
      "height": 630
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Country-specific FAQ Schema
export const CountryFAQSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://intorza.com/${country.code}#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is Intorza interior design software in ${country.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Intorza is a comprehensive project management software designed specifically for interior designers and contractors in ${country.name}. It includes quotation builder, invoice generator, client management, and team collaboration tools.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does Intorza cost in ${country.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Intorza offers flexible pricing starting at ${country.price} ${country.currency} for professionals in ${country.name}. We offer a free trial to get started.`
        }
      },
      {
        "@type": "Question",
        "name": `Is Intorza available for interior designers in ${country.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Intorza is fully available for interior design professionals across ${country.name}. It supports local currency (${country.currency}) and is optimized for ${country.name}'s market.`
        }
      },
      {
        "@type": "Question",
        "name": `Can I create professional quotations in ${country.name} with Intorza?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Intorza's quotation builder allows you to create professional, branded quotations tailored for clients in ${country.name}. It includes customizable templates and automatic calculations.`
        }
      },
      {
        "@type": "Question",
        "name": `Does Intorza support invoice generation for ${country.name} businesses?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Intorza generates professional invoices compliant with ${country.name}'s business requirements. It supports ${country.currency} currency and automatic tax calculations.`
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Country-specific Organization Schema
export const CountryOrganizationSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `https://intorza.com/${country.code}#organization`,
    "name": "Intorza",
    "alternateName": `Intorza ${country.name}`,
    "url": `https://intorza.com/${country.code}`,
    "logo": {
      "@type": "ImageObject",
      "url": "https://intorza.com/intorza-logo.webp",
      "width": 200,
      "height": 50
    },
    "sameAs": [
      "https://twitter.com/intorza",
      "https://linkedin.com/company/intorza",
      "https://facebook.com/intorza"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": country.name,
      "availableLanguage": country.locale.split('-')[0],
      "url": "https://intorza.com/contact"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": country.code.toUpperCase()
    },
    "slogan": `Best Interior Design Software for ${country.name}`,
    "knowsAbout": [
      "Interior Design",
      "Project Management",
      "Quotation Software",
      "Invoice Generation",
      "Client Management"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Country-specific BreadcrumbList Schema
export const CountryBreadcrumbSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://intorza.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": country.region,
        "item": `https://intorza.com#${country.region.toLowerCase().replace(/ /g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": country.name,
        "item": `https://intorza.com/${country.code}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Country-specific Product Schema
export const CountryProductSchema = ({ country }: CountrySEOSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://intorza.com/${country.code}#product`,
    "name": `Intorza Interior Design Software - ${country.name} Edition`,
    "description": country.seoDescription,
    "image": "https://intorza.com/og-image.png",
    "brand": {
      "@type": "Brand",
      "name": "Intorza"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://intorza.com/${country.code}`,
      "priceCurrency": country.currency,
      "price": country.priceValue,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Intorza"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": country.code.toUpperCase()
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          }
        },
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": country.currency
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": `Interior Designer from ${country.name}`
        },
        "reviewBody": `Intorza has transformed how I manage my interior design projects in ${country.name}. The quotation builder saves me hours every week.`
      }
    ],
    "category": "Business Software",
    "sku": `INTORZA-${country.code.toUpperCase()}`,
    "mpn": `INT-${country.code.toUpperCase()}-2025`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Combined Country SEO Schemas Component
const CountrySEOSchema = ({ country }: CountrySEOSchemaProps) => {
  return (
    <>
      <CountryLocalBusinessSchema country={country} />
      <CountrySoftwareSchema country={country} />
      <CountryWebPageSchema country={country} />
      <CountryFAQSchema country={country} />
      <CountryOrganizationSchema country={country} />
      <CountryBreadcrumbSchema country={country} />
      <CountryProductSchema country={country} />
    </>
  );
};

export default CountrySEOSchema;
