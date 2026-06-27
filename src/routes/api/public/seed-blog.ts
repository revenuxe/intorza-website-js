// TEMPORARY one-shot seed endpoint. Delete after running.
// GET /api/public/_seed-blog?key=intorza-seed-2026
// Upserts cluster blog posts via supabaseAdmin (service-role).
import { createFileRoute } from "@tanstack/react-router";
import { SEED_BLOG_POSTS } from "@/data/seed-blog-posts";

const ALLOWED_KEY = "intorza-seed-2026";

export const Route = createFileRoute("/api/public/seed-blog")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get("key") !== ALLOWED_KEY) {
          return new Response("Forbidden", { status: 403 });
        }
        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const results: Array<{ slug: string; ok: boolean; error?: string }> = [];
        const pillarSlugByCategory: Record<string, string> = {
          "Quotation Software": "interior-design-quotation-software-guide",
          "GST & Compliance": "gst-invoice-interior-designers-india-guide",
          "Project Management": "interior-design-project-management-guide",
        };
        const today = Date.now();
        for (let i = 0; i < SEED_BLOG_POSTS.length; i++) {
          const p = SEED_BLOG_POSTS[i];
          const isPillar = p.slug === pillarSlugByCategory[p.category];
          const daysAgo = SEED_BLOG_POSTS.length - i + 5;
          const ts = new Date(today - daysAgo * 86400_000).toISOString();
          const row = {
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: p.content,
            published: true,
            category: p.category,
            tags: [...p.tags],
            pillar_slug: isPillar ? null : pillarSlugByCategory[p.category],
            created_at: ts,
            updated_at: ts,
          };
          const { error } = await supabaseAdmin
            .from("blog_posts")
            .upsert(row, { onConflict: "slug" });
          results.push({
            slug: p.slug,
            ok: !error,
            error: error?.message,
          });
        }
        return Response.json({
          inserted: results.filter((r) => r.ok).length,
          failed: results.filter((r) => !r.ok),
          total: results.length,
        });
      },
    },
  },
});
