import { Helmet } from "react-helmet-async";

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://intorza.com/#organization",
    name: "Intorza",
    url: "https://intorza.com",
    logo: {
      "@type": "ImageObject",
      url: "https://intorza.com/intorza-logo.webp",
      width: 512,
      height: 512,
    },
    image: "https://intorza.com/og-image.png",
    description: "India's #1 interior design project management software for quotations, invoices, and client management",
    email: "intorza.com@gmail.com",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Intorza Team",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "India",
    },
    sameAs: [
      "https://twitter.com/intorza",
      "https://linkedin.com/company/intorza",
      "https://facebook.com/intorza",
      "https://instagram.com/intorza",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "intorza.com@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// SoftwareApplication Schema with Reviews
export const SoftwareApplicationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://intorza.com/#software",
    name: "Intorza",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Project Management Software",
    operatingSystem: "Web, iOS, Android",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "2.0",
    datePublished: "2024-01-01",
    description: "All-in-one interior design project management software with quotation builder, invoice generator, client management, and team collaboration features. Trusted by 500+ interior designers and contractors in India.",
    screenshot: [
      "https://intorza.com/dashboard-preview.png",
      "https://intorza.com/quotation-preview.png",
      "https://intorza.com/invoice-preview.png",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
      seller: {
        "@type": "Organization",
        name: "Intorza",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "547",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Person",
          name: "Priya Sharma",
        },
        datePublished: "2024-11-15",
        reviewBody: "Intorza has transformed how I manage my interior design business. The quotation builder saves me hours every week!",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Person",
          name: "Rajesh Kumar",
        },
        datePublished: "2024-10-20",
        reviewBody: "Best software for interior contractors. Client management and invoicing features are exceptional.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Person",
          name: "Anita Desai",
        },
        datePublished: "2024-09-10",
        reviewBody: "Finally a software designed for Indian interior designers! The site measurement tool is a game changer.",
      },
    ],
    featureList: [
      "Professional Quotation Builder",
      "Invoice Generator with GST",
      "Client Management CRM",
      "Team Collaboration Tools",
      "Project Management Dashboard",
      "Site Measurement Calculator",
      "PDF Export & Sharing",
      "Payment Tracking",
      "Multi-currency Support",
      "Cloud Storage",
    ],
    author: {
      "@type": "Organization",
      name: "Intorza",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// WebSite Schema with SearchAction
export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://intorza.com/#website",
    url: "https://intorza.com",
    name: "Intorza - Interior Design Project Management Software",
    description: "India's #1 interior design software for quotations, invoices, and client management",
    publisher: {
      "@id": "https://intorza.com/#organization",
    },
    inLanguage: "en-IN",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://app.intorza.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSchema = ({ faqs }: { faqs: FAQItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Article Schema for Blog Posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}

export const ArticleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "Intorza Team",
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: authorName,
      url: "https://intorza.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Intorza",
      logo: {
        "@type": "ImageObject",
        url: "https://intorza.com/intorza-logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// HowTo Schema for tutorials
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export const HowToSchema = ({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    totalTime: totalTime || "PT10M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Product Schema for specific features
export const ProductSchema = ({
  name,
  description,
  image,
  url = "https://intorza.com",
  price = "0",
  rating = "4.9",
  ratingCount = "547",
  reviewCount = "423",
}: {
  name: string;
  description: string;
  image: string;
  url?: string;
  price?: string;
  rating?: string;
  ratingCount?: string;
  reviewCount?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}/#product`,
    name: name,
    description: description,
    image: image,
    url: url,
    brand: {
      "@type": "Brand",
      name: "Intorza",
    },
    offers: {
      "@type": "Offer",
      url: "https://app.intorza.com",
      price: price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
      seller: {
        "@type": "Organization",
        name: "Intorza",
        url: "https://intorza.com",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      ratingCount: ratingCount,
      reviewCount: reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// LocalBusiness Schema
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://intorza.com/#localbusiness",
    name: "Intorza",
    image: "https://intorza.com/intorza-logo.webp",
    description: "Interior design project management software company",
    url: "https://intorza.com",
    telephone: "",
    email: "intorza.com@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.5937",
      longitude: "78.9629",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "Free - ₹999/month",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
