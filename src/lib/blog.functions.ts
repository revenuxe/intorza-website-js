import { createServerFn } from "@tanstack/react-start";

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

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogPost[]> => {
    const { supabasePublic, supabaseConfigured } = await import(
      "@/lib/supabase-public.server"
    );
    if (!supabaseConfigured) return [];
    const { data, error } = await supabasePublic
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, content, created_at, updated_at, published")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[blog] listPublishedPosts error:", error.message);
      return [];
    }
    return (data ?? []) as BlogPost[];
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
    const { supabasePublic, supabaseConfigured } = await import(
      "@/lib/supabase-public.server"
    );
    if (!supabaseConfigured) return { post: null, related: [] };
    const { data: post, error } = await supabasePublic
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, content, created_at, updated_at, published")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !post) {
      if (error) console.error("[blog] getPostBySlug error:", error.message);
      return { post: null, related: [] };
    }
    const { data: related } = await supabasePublic
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, content, created_at, updated_at, published")
      .eq("published", true)
      .neq("slug", data.slug)
      .limit(3);
    return { post: post as BlogPost, related: (related ?? []) as BlogPost[] };
  });
