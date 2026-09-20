"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getSupabase } from "@/lib/supabase-browser";

export default function NewPostPage() {
  const router = useRouter();
  return <div className="mx-auto max-w-4xl p-6 md:p-8"><h1 className="mb-8 font-display text-3xl font-bold">New blog post</h1><PostForm onSubmit={async (values) => { const supabase = getSupabase(); const { data: user } = await supabase.auth.getUser(); const { data, error } = await supabase.from("blog_posts").insert({ ...values, author_id: user.user?.id ?? null }).select("id").single(); if (error) throw error; router.replace(`/admin/posts/${data.id}`); }} /></div>;
}
