import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, LogOut, Home } from "lucide-react";
import intorzaLogo from "@/assets/intorza-logo.webp";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Intorza" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminShell,
});

function AdminShell() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes.user?.id ?? "";
      setUserId(uid);
      setEmail(userRes.user?.email ?? "");
      if (!uid) return setIsAdmin(false);
      const { data } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
      setIsAdmin(Boolean(data));
    })();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const nav = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/posts", label: "Blog posts", icon: FileText, exact: false },
  ];

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading admin…</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Not authorized</h1>
          <p className="text-muted-foreground mb-4">
            Your account ({email}) is signed in but does not have the <code className="px-1 bg-muted rounded">admin</code> role.
          </p>
          <p className="text-xs text-muted-foreground mb-6 break-all">
            User ID: <code className="px-1 bg-muted rounded">{userId}</code>
          </p>
          <p className="text-sm text-foreground mb-6">
            Ask a current admin to run:
            <code className="block mt-2 text-left bg-muted rounded p-3 text-xs whitespace-pre-wrap">
              insert into public.user_roles (user_id, role)<br />
              values ('{userId}', 'admin');
            </code>
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" asChild><Link to="/">Back to site</Link></Button>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={intorzaLogo} alt="Intorza" className="h-8 w-auto" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{email}</div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:bg-muted">
            <Home className="w-4 h-4" /> View site
          </Link>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:bg-muted">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
