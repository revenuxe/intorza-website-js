"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PostForm, type PostFormValues } from "@/components/admin/PostForm";
import { getSupabase } from "@/lib/supabase-browser";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostFormValues | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { void (async () => { const { data, error } = await getSupabase().from("blog_posts").select("title, slug, content, excerpt, cover_image, published").eq("id", id).single(); if (error) setError(error.message); else setPost({ title: data.title, slug: data.slug, content: data.content ?? "", excerpt: data.excerpt ?? "", cover_image: data.cover_image ?? "", published: data.published }); })(); }, [id]);
  return <div className="mx-auto max-w-4xl p-6 md:p-8"><h1 className="mb-8 font-display text-3xl font-bold">Edit blog post</h1>{error ? <p className="text-destructive">{error}</p> : post ? <PostForm initial={post} onSubmit={async (values) => { const { error } = await getSupabase().from("blog_posts").update(values).eq("id", id); if (error) throw error; router.replace("/admin/posts"); }} /> : <p className="text-muted-foreground">Loading…</p>}</div>;
}
