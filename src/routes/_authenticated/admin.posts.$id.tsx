import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PostForm, type PostFormValues } from "@/components/admin/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState<PostFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug, content, excerpt, cover_image, published")
        .eq("id", id)
        .single();
      if (error) toast.error(error.message);
      if (data) {
        setInitial({
          title: data.title,
          slug: data.slug,
          content: data.content ?? "",
          excerpt: data.excerpt ?? "",
          cover_image: data.cover_image ?? "",
          published: data.published,
        });
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="p-8 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/admin/posts"><ArrowLeft className="w-4 h-4 mr-2" /> Back to posts</Link>
      </Button>
      <h1 className="font-display text-3xl font-bold mb-8">Edit blog post</h1>
      {loading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : initial ? (
        <PostForm
          initial={initial}
          onSubmit={async (values) => {
            const { error } = await supabase
              .from("blog_posts")
              .update(values)
              .eq("id", id);
            if (error) {
              toast.error(error.message);
              return;
            }
            toast.success("Post saved");
            navigate({ to: "/admin/posts" });
          }}
        />
      ) : (
        <div className="text-muted-foreground">Post not found.</div>
      )}
    </div>
  );
}
