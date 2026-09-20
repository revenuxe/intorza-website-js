import { countries } from "@/data/countries";
import { SITE_URL, SITE_LOGO, SITE_OG_IMAGE, SITE_DESCRIPTION } from "@/lib/site";

// Build hreflang link entries for all country pages + x-default.
export function hreflangLinks(currentPath = "/"): Array<{
  rel: "alternate";
  hrefLang: string;
  href: string;
}> {
  const links: Array<{ rel: "alternate"; hrefLang: string; href: string }> = countries.map((c) => ({
    rel: "alternate",
    hrefLang: c.locale,
    href: `${SITE_URL}/${c.slug}`,
  }));
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: `${SITE_URL}${currentPath === "/" ? "" : currentPath}`,
  });
  return links;
}

// Shared OG/Twitter image meta — apply on leaf routes for proper share previews.
export function socialImageMeta(image: string = SITE_OG_IMAGE, alt = "Intorza — Interior Design Project Management Software") {
  return [
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: alt },
  ];
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Intorza",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: SITE_LOGO, width: 512, height: 512 },
    image: SITE_OG_IMAGE,
    description: SITE_DESCRIPTION,
    email: "intorza.com@gmail.com",
    foundingDate: "2024",
    parentOrganization: { "@type": "Organization", name: "Revenuxe", url: "https://www.revenuxe.com" },
    address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Bangalore" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "intorza.com@gmail.com",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      "https://twitter.com/intorza",
      "https://www.linkedin.com/company/intorza",
      "https://www.facebook.com/intorza",
      "https://www.instagram.com/intorza",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Intorza - Interior Design Project Management Software",
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

// FAQ schema reusable across home and country pages.
export const homepageFaqs = [
  {
    q: "What is Intorza?",
    a: "Intorza is an all-in-one interior design project management software that helps designers and contractors create quotations, generate GST-ready invoices, manage clients, track projects, and collaborate with teams from one dashboard.",
  },
  {
    q: "Is Intorza free to use?",
    a: "Yes. Intorza offers a free plan to get you started, plus affordable Pro plans with advanced quotation, invoicing and team features.",
  },
  {
    q: "Who is Intorza for?",
    a: "Intorza is built for interior designers, interior contractors, modular kitchen specialists, turnkey project firms and design studios who want to streamline operations and grow their business.",
  },
  {
    q: "Does Intorza work for international clients?",
    a: "Yes. Intorza supports multi-currency quotations and invoices and is used by interior professionals across India, the US, UK, UAE, Australia, Canada, Singapore and 40+ other countries.",
  },
  {
    q: "Can I generate professional quotations and invoices?",
    a: "Absolutely. Intorza includes a powerful quotation builder, branded PDF exports, GST/VAT-ready invoices, payment tracking and client approvals — built specifically for interior projects.",
  },
];

export function faqPageSchema(faqs: { q: string; a: string }[] = homepageFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function softwareAppSchema(opts?: { url?: string; price?: string; currency?: string; name?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts?.name ?? "Intorza",
    operatingSystem: "Web Browser, iOS, Android",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Interior Design Project Management",
    url: opts?.url ?? SITE_URL,
    description: SITE_DESCRIPTION,
    image: SITE_OG_IMAGE,
    softwareVersion: "2.0",
    offers: {
      "@type": "Offer",
      price: opts?.price ?? "0",
      priceCurrency: opts?.currency ?? "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Quotation Builder",
      "Invoice Generator",
      "Client Management (CRM)",
      "Project & Site Measurement",
      "Team Collaboration",
      "GST & VAT Ready Invoicing",
      "Payment Tracking",
      "Branded PDF Exports",
    ],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
