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
  category?: string;
  tags?: string[];
  readingTime?: string;
  wordCount?: number;
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
  category,
  tags,
  readingTime,
  wordCount,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Intorza") ? title : `${title} | Intorza`;

  // Normalize canonical URL
  const normalizedCanonical =
    canonicalUrl.endsWith("/") && canonicalUrl !== "https://intorza.com/"
      ? canonicalUrl.slice(0, -1)
      : canonicalUrl;

  // Hreflang links
  const hreflangLinks: HreflangLink[] = includeHreflang
    ? [
        { locale: "x-default", url: "https://intorza.com/" },
        { locale: "en-IN", url: "https://intorza.com/" },
        ...countries.map((country) => ({
          locale: country.locale,
          url: `https://intorza.com/${country.code}`,
        })),
      ]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={normalizedCanonical} />

      {/* Language */}
      <meta httpEquiv="content-language" content={locale.replace("_", "-")} />

      {/* Hreflang */}
      {hreflangLinks.map((link) => (
        <link
          key={link.locale}
          rel="alternate"
          hrefLang={link.locale}
          href={link.url}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={normalizedCanonical} />
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
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {readingTime && <meta name="twitter:label1" content="Reading time" />}
      {readingTime && <meta name="twitter:data1" content={readingTime} />}
      {wordCount && <meta name="twitter:label2" content="Word count" />}
      {wordCount && (
        <meta name="twitter:data2" content={wordCount.toString()} />
      )}

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
      {ogType === "article" && (
        <meta
          property="article:section"
          content={category || "Interior Design"}
        />
      )}
      {ogType === "article" &&
        tags &&
        tags.map((tag, i) => (
          <meta key={i} property="article:tag" content={tag} />
        ))}
    </Helmet>
  );
};

export default SEOHead;
