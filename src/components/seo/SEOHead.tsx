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
  // AEO & Advanced SEO Props
  speakableSelectors?: string[];
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  wordCount?: number;
  priceRange?: string;
  applicationName?: string;
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
  speakableSelectors,
  videoUrl,
  videoTitle,
  videoDescription,
  videoThumbnail,
  videoDuration,
  category,
  tags,
  readingTime,
  wordCount,
  priceRange,
  applicationName = "Intorza",
}: SEOHeadProps) => {
  const fullTitle = title.includes("Intorza") ? title : `${title} | Intorza`;
  const currentDate = new Date().toISOString();
  
  // Normalize canonical URL (remove trailing slash except for root)
  const normalizedCanonical = canonicalUrl.endsWith('/') && canonicalUrl !== 'https://intorza.com/' 
    ? canonicalUrl.slice(0, -1) 
    : canonicalUrl;

  // Generate hreflang links for all country pages - with x-default pointing to root
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

  // Speakable Schema for Voice Search / AEO
  const speakableSchema = speakableSelectors ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": speakableSelectors
    },
    "url": canonicalUrl
  } : null;

  // VideoObject Schema for video SEO
  const videoSchema = videoUrl ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoTitle || fullTitle,
    "description": videoDescription || description,
    "thumbnailUrl": videoThumbnail || ogImage,
    "uploadDate": publishedTime || currentDate,
    "duration": videoDuration || "PT2M",
    "contentUrl": videoUrl,
    "embedUrl": videoUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Intorza",
      "logo": {
        "@type": "ImageObject",
        "url": "https://intorza.com/intorza-logo.webp"
      }
    }
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={normalizedCanonical} />
      
      {/* Cache Control for SEO */}
      <meta httpEquiv="Cache-Control" content="public, max-age=86400" />

      {/* Advanced SEO Meta Tags */}
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      {category && <meta name="category" content={category} />}
      {tags && <meta name="news_keywords" content={tags.join(", ")} />}
      {readingTime && <meta name="twitter:label1" content="Reading time" />}
      {readingTime && <meta name="twitter:data1" content={readingTime} />}
      {priceRange && <meta name="pricerange" content={priceRange} />}
      
      {/* Application Meta Tags */}
      <meta name="application-name" content={applicationName} />
      <meta name="apple-mobile-web-app-title" content={applicationName} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Geo & Language Tags */}
      <meta name="geo.region" content={locale.split("_")[1] || "IN"} />
      <meta name="language" content={locale.split("_")[0] || "en"} />
      <meta httpEquiv="content-language" content={locale.replace("_", "-")} />

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
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Intorza" />
      <meta property="og:locale" content={locale} />
      <meta property="og:updated_time" content={modifiedTime || currentDate} />
      {tags && tags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@intorza" />
      <meta name="twitter:creator" content="@intorza" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      {wordCount && <meta name="twitter:label2" content="Word count" />}
      {wordCount && <meta name="twitter:data2" content={wordCount.toString()} />}

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="intorza" />

      {/* Pinterest */}
      <meta name="pinterest-rich-pin" content="true" />

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
        <meta property="article:section" content={category || "Technology"} />
      )}

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      {/* Speakable Schema for Voice Search AEO */}
      {speakableSchema && (
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      )}

      {/* VideoObject Schema */}
      {videoSchema && (
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
