import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/site";

const STATIC: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/careers", changefreq: "monthly", priority: "0.5" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
  { path: "/refund", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const urls: string[] = [];

        const push = (
          path: string,
          changefreq: string,
          priority: string,
          lastmod: string = today,
          alternates?: Array<{ hreflang: string; href: string }>,
          image?: { loc: string; title?: string; caption?: string },
        ) => {
          const altXml = (alternates || [])
            .map(
              (a) =>
                `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`,
            )
            .join("\n");
          const imageXml = image
            ? [
                `    <image:image>`,
                `      <image:loc>${image.loc}</image:loc>`,
                image.title ? `      <image:title>${image.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>` : null,
                image.caption ? `      <image:caption>${image.caption.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:caption>` : null,
                `    </image:image>`,
              ].filter(Boolean).join("\n")
            : "";
          urls.push(
            [
              `  <url>`,
              `    <loc>${SITE_URL}${path}</loc>`,
              `    <lastmod>${lastmod}</lastmod>`,
              `    <changefreq>${changefreq}</changefreq>`,
              `    <priority>${priority}</priority>`,
              altXml,
              imageXml,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          );
        };

        // Home with hreflang alternates for all countries
        const homeAlternates = [
          { hreflang: "x-default", href: SITE_URL },
          ...countries.map((c) => ({ hreflang: c.locale, href: `${SITE_URL}/${c.slug}` })),
        ];
        push("/", "daily", "1.0", today, homeAlternates);

        for (const p of STATIC.slice(1)) push(p.path, p.changefreq, p.priority);

        // Country pages
        for (const c of countries) {
          push(`/${c.slug}`, "weekly", "0.9", today, [
            { hreflang: c.locale, href: `${SITE_URL}/${c.slug}` },
            { hreflang: "x-default", href: `${SITE_URL}/${c.slug}` },
          ]);
        }

        // City pages
        for (const city of cities) {
          const c = countries.find((x) => x.code === city.countryCode);
          if (c) push(`/${c.slug}/${city.slug}`, "weekly", "0.7");
        }

        // Blog posts
        try {
          const { listPublishedPosts } = await import("@/lib/blog.functions");
          const posts = await listPublishedPosts();
          for (const post of posts) {
            const lastmod = (post.updated_at || post.created_at || today).split("T")[0];
            const img = post.cover_image
              ? {
                  loc: post.cover_image.startsWith("http") ? post.cover_image : `${SITE_URL}${post.cover_image}`,
                  title: post.title,
                  caption: post.excerpt || undefined,
                }
              : undefined;
            push(`/blog/${post.slug}`, "weekly", "0.7", lastmod, undefined, img);
          }
        } catch (e) {
          console.error("[sitemap] failed to load posts", e);
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
