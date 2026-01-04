import { Helmet } from "react-helmet-async";
import { countries } from "@/data/countries";

interface HreflangLink {
  locale: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  locale?: string;
  includeHreflang?: boolean;
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl = "https://intorza.com",
  ogImage = "https://intorza.com/og-image.png",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author = "Intorza",
  noindex = false,
  locale = "en_IN",
  includeHreflang = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Intorza") ? title : `${title} | Intorza`;

  // Generate hreflang links for all country pages
  const hreflangLinks: HreflangLink[] = includeHreflang
    ? [
        { locale: "x-default", url: "https://intorza.com" },
        { locale: "en-IN", url: "https://intorza.com" },
        ...countries.map((country) => ({
          locale: country.locale,
          url: `https://intorza.com/${country.code}`,
        })),
      ]
    : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for International SEO */}
      {hreflangLinks.map((link) => (
        <link
          key={link.locale}
          rel="alternate"
          hrefLang={link.locale}
          href={link.url}
        />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Intorza" />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@intorza" />
      <meta name="twitter:creator" content="@intorza" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && (
        <meta property="article:author" content={author} />
      )}

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    </Helmet>
  );
};

export default SEOHead;
