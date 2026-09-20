import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog.server";
import { SITE_URL } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const posts = await listPublishedPosts(); return [{ url: SITE_URL, changeFrequency: "weekly", priority: 1, images: [`${SITE_URL}/og-image.jpg`] }, { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 }, ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: post.updated_at, changeFrequency: "monthly" as const, priority: 0.8, ...(post.cover_image ? { images: [post.cover_image] } : {}) }))]; }
