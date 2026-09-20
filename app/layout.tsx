import type { Metadata, Viewport } from "next";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "../src/styles.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/seo";

export const viewport: Viewport = { themeColor: "#0F172A", width: "device-width", initialScale: 1, maximumScale: 5 };
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION, applicationName: SITE_NAME, authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  manifest: "/manifest.webmanifest", icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_US", images: ["/og-image.jpg"] },
  twitter: { card: "summary_large_image", site: "@intorza", creator: "@intorza" },
  alternates: { types: { "application/rss+xml": "/rss.xml", "application/atom+xml": "/atom.xml" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} /></body></html>;
}
