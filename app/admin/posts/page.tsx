"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase-browser";

type Post = { id: string; title: string; slug: string; published: boolean; updated_at: string };

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => { setLoading(true); const { data, error } = await getSupabase().from("blog_posts").select("id, title, slug, published, updated_at").order("updated_at", { ascending: false }); if (error) setError(error.message); else setPosts((data as Post[]) ?? []); setLoading(false); };
  useEffect(() => { void load(); }, []);
  const remove = async (post: Post) => { if (!window.confirm(`Delete \"${post.title}\"? This cannot be undone.`)) return; const { error } = await getSupabase().from("blog_posts").delete().eq("id", post.id); if (error) setError(error.message); else void load(); };
  return <div className="mx-auto max-w-6xl p-6 md:p-8"><div className="mb-8 flex items-center justify-between"><div><h1 className="font-display text-3xl font-bold">Blog posts</h1><p className="mt-1 text-muted-foreground">{posts.length} post{posts.length === 1 ? "" : "s"}</p></div><Link href="/admin/posts/new" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Plus className="mr-2 h-4 w-4" />New post</Link></div>{error && <p className="mb-4 text-sm text-destructive">{error}</p>}<div className="overflow-x-auto rounded-2xl border border-border bg-card">{loading ? <p className="p-10 text-center text-muted-foreground">Loading…</p> : posts.length === 0 ? <p className="p-10 text-center text-muted-foreground">No posts yet.</p> : <table className="w-full min-w-[640px]"><thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Updated</th><th className="px-6 py-3" /></tr></thead><tbody className="divide-y divide-border">{posts.map((post) => <tr key={post.id}><td className="px-6 py-4"><div className="font-medium">{post.title}</div><div className="text-xs text-muted-foreground">/blog/{post.slug}</div></td><td className="px-6 py-4 text-sm">{post.published ? "Published" : "Draft"}</td><td className="px-6 py-4 text-sm text-muted-foreground">{new Date(post.updated_at).toLocaleDateString()}</td><td className="px-6 py-4"><div className="flex justify-end gap-2">{post.published && <Link href={`/blog/${post.slug}`} target="_blank" className="rounded p-2 hover:bg-muted" aria-label="View post"><ExternalLink className="h-4 w-4" /></Link>}<Link href={`/admin/posts/${post.id}`} className="rounded p-2 hover:bg-muted" aria-label="Edit post"><Pencil className="h-4 w-4" /></Link><button onClick={() => void remove(post)} className="rounded p-2 text-destructive hover:bg-muted" aria-label="Delete post"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>}</div></div>;
}
