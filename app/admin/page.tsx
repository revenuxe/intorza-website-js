"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, FileText, Plus } from "lucide-react";
import { getSupabase } from "@/lib/supabase-browser";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  useEffect(() => { void (async () => { const { data } = await getSupabase().from("blog_posts").select("id, published"); const posts = data ?? []; setStats({ total: posts.length, published: posts.filter((post) => post.published).length, drafts: posts.filter((post) => !post.published).length }); })(); }, []);
  const cards = [{ label: "Total posts", value: stats.total, icon: FileText, tone: "text-primary" }, { label: "Published", value: stats.published, icon: CheckCircle2, tone: "text-intorza-green" }, { label: "Drafts", value: stats.drafts, icon: Clock, tone: "text-intorza-amber" }];
  return <div className="mx-auto max-w-6xl p-6 md:p-8"><div className="mb-8 flex items-center justify-between"><div><h1 className="font-display text-3xl font-bold">Dashboard</h1><p className="mt-1 text-muted-foreground">Manage your Intorza blog content.</p></div><Link href="/admin/posts/new" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />New post</Link></div><div className="mb-10 grid gap-6 md:grid-cols-3">{cards.map(({ label, value, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-border bg-card p-6"><Icon className={`mb-4 h-7 w-7 ${tone}`} /><div className="text-3xl font-bold">{value}</div><div className="mt-1 text-sm text-muted-foreground">{label}</div></div>)}</div><div className="rounded-2xl border border-border bg-card p-6"><h2 className="font-display text-xl font-semibold">Quick actions</h2><div className="mt-4 flex flex-wrap gap-3"><Link href="/admin/posts" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Manage posts</Link><Link href="/blog" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">View public blog</Link></div></div></div>;
}
