import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export type PostFormValues = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  published: boolean;
};

const empty: PostFormValues = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  cover_image: "",
  published: false,
};

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function PostForm({
  initial,
  onSubmit,
}: {
  initial?: PostFormValues;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
}) {
  const [values, setValues] = useState<PostFormValues>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof PostFormValues>(k: K, v: PostFormValues[K]) =>
    setValues((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim() || !values.slug.trim() || !values.content.trim()) return;
    setSaving(true);
    await onSubmit(values);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          required
          value={values.title}
          onChange={(e) => {
            const title = e.target.value;
            set("title", title);
            if (!initial) set("slug", toSlug(title));
          }}
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" required value={values.slug} onChange={(e) => set("slug", toSlug(e.target.value))} />
        <p className="text-xs text-muted-foreground mt-1">URL: /blog/{values.slug || "..."}</p>
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" rows={2} value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
      </div>
      <div>
        <Label htmlFor="cover">Cover image URL</Label>
        <Input id="cover" type="url" value={values.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://..." />
      </div>
      <div>
        <Label htmlFor="content">Content (Markdown / HTML)</Label>
        <Textarea id="content" required rows={16} value={values.content} onChange={(e) => set("content", e.target.value)} className="font-mono text-sm" />
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-3">
          <Switch id="published" checked={values.published} onCheckedChange={(v) => set("published", v)} />
          <Label htmlFor="published" className="cursor-pointer">Published</Label>
        </div>
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save post"}</Button>
      </div>
    </form>
  );
}
