import { countries } from "@/data/countries";
import { SITE_URL } from "@/lib/site";

// Build hreflang link entries for all country pages + x-default.
export function hreflangLinks(currentPath = "/"): Array<{
  rel: "alternate";
  hrefLang: string;
  href: string;
}> {
  const links: Array<{ rel: "alternate"; hrefLang: string; href: string }> = countries.map((c) => ({
    rel: "alternate",
    hrefLang: c.locale,
    href: `${SITE_URL}/${c.code}`,
  }));
  links.push({ rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${currentPath === "/" ? "" : currentPath}` });
  return links;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Intorza",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/intorza-logo.webp`, width: 512, height: 512 },
    description: "Interior design project management software for quotations, invoices, and client management.",
    email: "intorza.com@gmail.com",
    foundingDate: "2024",
    address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Bangalore" },
    sameAs: ["https://twitter.com/intorza", "https://linkedin.com/company/intorza"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Intorza - Interior Design Project Management Software",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}
