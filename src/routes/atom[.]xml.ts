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

export const Route = createFileRoute("/atom.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listPublishedPosts } = await import("@/lib/blog.functions");
        const posts = await listPublishedPosts();
        const updated = new Date(
          posts[0]?.updated_at ?? Date.now(),
        ).toISOString();
        const entries = posts
          .map((p) => {
            const url = `${SITE_URL}/blog/${p.slug}`;
            const summary = p.excerpt || p.content.substring(0, 280);
            return [
              `  <entry>`,
              `    <title>${xmlEscape(p.title)}</title>`,
              `    <link href="${url}" />`,
              `    <id>${url}</id>`,
              `    <updated>${new Date(p.updated_at).toISOString()}</updated>`,
              `    <published>${new Date(p.created_at).toISOString()}</published>`,
              `    <summary>${xmlEscape(summary)}</summary>`,
              `    <author><name>${SITE_NAME}</name><email>intorza.com@gmail.com</email></author>`,
              `  </entry>`,
            ].join("\n");
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME} Blog</title>
  <link href="${SITE_URL}/blog" />
  <link rel="self" href="${SITE_URL}/atom.xml" />
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <subtitle>Tips, strategies and SOPs for interior designers and contractors.</subtitle>
${entries}
</feed>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/atom+xml; charset=utf-8",
            "Cache-Control": "public, max-age=900, s-maxage=900",
          },
        });
      },
    },
  },
});
