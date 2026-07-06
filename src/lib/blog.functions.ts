import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

const BLOG_CACHE = "public, max-age=60, s-maxage=300, stale-while-revalidate=3600";
const LOVABLE_ASSET_ORIGIN = "https://project--2029f5d3-8283-4583-bbe6-df99d6935ef4.lovable.app";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  category: string | null;
  tags: string[] | null;
  pillar_slug: string | null;
};

const POST_COLS =
  "id, title, slug, excerpt, cover_image, content, created_at, updated_at, published, category, tags, pillar_slug";

function resolveBlogCoverImage(url: string | null): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url, LOVABLE_ASSET_ORIGIN);
    if (parsed.pathname.startsWith("/__l5e/")) {
      return `${LOVABLE_ASSET_ORIGIN}${parsed.pathname}`;
    }
  } catch {
    // Keep unknown/custom URLs untouched.
  }

  return url;
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return { ...post, cover_image: resolveBlogCoverImage(post.cover_image) };
}

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogPost[]> => {
    try { setResponseHeader("Cache-Control", BLOG_CACHE); } catch { /* client call */ }
    const { supabasePublic, supabaseConfigured } = await import(
      "@/lib/supabase-public.server"
    );
    if (!supabaseConfigured) return [];
    const { data, error } = await supabasePublic
      .from("blog_posts")
      .select(POST_COLS)
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[blog] listPublishedPosts error:", error.message);
      return [];
    }
    return ((data ?? []) as BlogPost[]).map(normalizeBlogPost);
  },
);

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => {
    if (!input || typeof input.slug !== "string" || !input.slug.trim()) {
      throw new Error("slug is required");
    }
    return { slug: input.slug.trim().toLowerCase() };
  })
  .handler(async ({ data }): Promise<{ post: BlogPost | null; related: BlogPost[] }> => {
    try { setResponseHeader("Cache-Control", BLOG_CACHE); } catch { /* client call */ }
    const { supabasePublic, supabaseConfigured } = await import(
      "@/lib/supabase-public.server"
    );
    if (!supabaseConfigured) return { post: null, related: [] };
    const { data: post, error } = await supabasePublic
      .from("blog_posts")
      .select(POST_COLS)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !post) {
      if (error) console.error("[blog] getPostBySlug error:", error.message);
      return { post: null, related: [] };
    }
    const typedPost = normalizeBlogPost(post as BlogPost);
    // Prefer posts in the same cluster (same category or same pillar_slug).
    let relatedQuery = supabasePublic
      .from("blog_posts")
      .select(POST_COLS)
      .eq("published", true)
      .neq("slug", data.slug);
    if (typedPost.category) {
      relatedQuery = relatedQuery.eq("category", typedPost.category);
    }
    const { data: sameCluster } = await relatedQuery.limit(3);
    let related = ((sameCluster ?? []) as BlogPost[]).map(normalizeBlogPost);
    if (related.length < 3) {
      const { data: fill } = await supabasePublic
        .from("blog_posts")
        .select(POST_COLS)
        .eq("published", true)
        .neq("slug", data.slug)
        .limit(3);
      const seen = new Set(related.map((r) => r.slug));
      for (const r of ((fill ?? []) as BlogPost[]).map(normalizeBlogPost)) {
        if (related.length >= 3) break;
        if (!seen.has(r.slug)) related.push(r);
      }
    }
    return { post: typedPost, related };
  });
