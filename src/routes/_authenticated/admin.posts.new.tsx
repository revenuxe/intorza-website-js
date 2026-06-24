import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PostForm } from "@/components/admin/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/posts/new")({
  component: NewPost,
});

function NewPost() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/admin/posts"><ArrowLeft className="w-4 h-4 mr-2" /> Back to posts</Link>
      </Button>
      <h1 className="font-display text-3xl font-bold mb-8">New blog post</h1>
      <PostForm
        onSubmit={async (values) => {
          const { data: userRes } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from("blog_posts")
            .insert({ ...values, author_id: userRes.user?.id ?? null })
            .select("id")
            .single();
          if (error) {
            toast.error(error.message);
            return;
          }
          toast.success("Post created");
          navigate({ to: "/admin/posts/$id", params: { id: data!.id } });
        }}
      />
    </div>
  );
}
