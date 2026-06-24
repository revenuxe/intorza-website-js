import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updated_at: string;
};

export const Route = createFileRoute("/_authenticated/admin/posts/")({
  component: PostsList,
});

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, updated_at")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setPosts((data as Post[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Post deleted");
    load();
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Blog posts</h1>
          <p className="text-muted-foreground mt-1">{posts.length} post{posts.length === 1 ? "" : "s"}</p>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new"><Plus className="w-4 h-4 mr-2" /> New post</Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-muted-foreground mb-4">No posts yet.</p>
            <Button asChild><Link to="/admin/posts/new">Write your first post</Link></Button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-3">Title</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Updated</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{p.title}</div>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      p.published ? "bg-intorza-green/10 text-intorza-green" : "bg-intorza-amber/10 text-intorza-amber"
                    }`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-1">
                      {p.published && (
                        <Button variant="ghost" size="icon" asChild title="View live">
                          <Link to="/blog/$slug" params={{ slug: p.slug }} target="_blank"><ExternalLink className="w-4 h-4" /></Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild title="Edit">
                        <Link to="/admin/posts/$id" params={{ id: p.id }}><Pencil className="w-4 h-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id, p.title)} title="Delete">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
