import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listPublishedPosts } = await import("@/lib/blog.functions");
        const posts = await listPublishedPosts();
        const lastBuild = new Date(
          posts[0]?.updated_at ?? Date.now(),
        ).toUTCString();
        const items = posts
          .map((p) => {
            const url = `${SITE_URL}/blog/${p.slug}`;
            const desc = p.excerpt || p.content.substring(0, 280);
            return [
              `    <item>`,
              `      <title>${xmlEscape(p.title)}</title>`,
              `      <link>${url}</link>`,
              `      <guid isPermaLink="true">${url}</guid>`,
              `      <description>${xmlEscape(desc)}</description>`,
              `      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>`,
              `      <author>intorza.com@gmail.com (${SITE_NAME})</author>`,
              `    </item>`,
            ].join("\n");
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Tips, strategies and SOPs for interior designers and contractors — quotations, GST invoicing, project management.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=900, s-maxage=900",
          },
        });
      },
    },
  },
});
