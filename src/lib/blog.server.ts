import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export type BlogPost = { id: string; title: string; slug: string; excerpt: string | null; cover_image: string | null; content: string; created_at: string; updated_at: string; published: boolean; category: string | null; tags: string[] | null; pillar_slug: string | null };
const columns = "id,title,slug,excerpt,cover_image,content,created_at,updated_at,published,category,tags,pillar_slug";
function normalize(post: BlogPost): BlogPost { return post; }
function client() { const url = process.env.SUPABASE_URL ?? "https://rehioexyiybgrxepajnb.supabase.co"; const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY; return key ? createClient(url, key, { auth: { persistSession: false } }) : null; }
export const listPublishedPosts = unstable_cache(async (): Promise<BlogPost[]> => { const db = client(); if (!db) return []; const { data } = await db.from("blog_posts").select(columns).eq("published", true).order("created_at", { ascending: false }); return ((data ?? []) as BlogPost[]).map(normalize); }, ["published-blog-posts"], { revalidate: 300, tags: ["blog"] });
export const getPostBySlug = async (slug: string) => { const posts = await listPublishedPosts(); const post = posts.find((item) => item.slug === slug) ?? null; return { post, related: post ? posts.filter((item) => item.slug !== slug && (!post.category || item.category === post.category)).slice(0, 3) : [] }; };
