import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("id, published");
      const rows = data ?? [];
      setStats({
        total: rows.length,
        published: rows.filter((r) => r.published).length,
        drafts: rows.filter((r) => !r.published).length,
      });
    })();
  }, []);

  const cards = [
    { label: "Total posts", value: stats.total, icon: FileText, tone: "bg-primary/10 text-primary" },
    { label: "Published", value: stats.published, icon: CheckCircle2, tone: "bg-intorza-green/10 text-intorza-green" },
    { label: "Drafts", value: stats.drafts, icon: Clock, tone: "bg-intorza-amber/10 text-intorza-amber" },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your Intorza blog content.</p>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new"><Plus className="w-4 h-4 mr-2" /> New post</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-2xl p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${c.tone}`}>
              <c.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-foreground">{c.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold mb-2">Quick actions</h2>
        <p className="text-sm text-muted-foreground mb-4">Jump straight into common tasks.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild><Link to="/admin/posts">Manage posts</Link></Button>
          <Button variant="outline" asChild><Link to="/admin/posts/new">Write a new post</Link></Button>
          <Button variant="outline" asChild><Link to="/blog">View public blog</Link></Button>
        </div>
      </div>
    </div>
  );
}
