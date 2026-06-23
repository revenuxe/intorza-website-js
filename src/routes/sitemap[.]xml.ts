import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/site";

const STATIC = ["/", "/about", "/contact", "/careers", "/blog", "/privacy", "/terms", "/cookies", "/refund"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [];
        const push = (path: string, changefreq = "weekly", priority = "0.7") => {
          urls.push(
            `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
          );
        };

        for (const p of STATIC) push(p, p === "/" ? "daily" : "monthly", p === "/" ? "1.0" : "0.6");
        for (const c of countries) push(`/${c.code}`, "weekly", "0.8");
        for (const city of cities) push(`/${city.countryCode}/${city.slug}`, "weekly", "0.7");

        try {
          const { listPublishedPosts } = await import("@/lib/blog.functions");
          const posts = await listPublishedPosts();
          for (const post of posts) push(`/blog/${post.slug}`, "weekly", "0.6");
        } catch (e) {
          console.error("[sitemap] failed to load posts", e);
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
