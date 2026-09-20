"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Home, LayoutDashboard, LogOut } from "lucide-react";
import { getSupabase } from "@/lib/supabase-browser";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<"loading" | "denied" | "ready" | "error">("loading");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const checkAccess = async () => {
      try {
        const supabase = getSupabase();
        const { data: userResult, error: userError } = await supabase.auth.getUser();
        const user = userResult.user;
        if (userError || !user) { router.replace("/auth"); return; }
        const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
        if (!active) return;
        setEmail(user.email ?? "");
        setUserId(user.id);
        if (roleError) { setMessage(roleError.message); setState("error"); } else { setState(isAdmin ? "ready" : "denied"); }
      } catch (cause) {
        if (active) { setMessage(cause instanceof Error ? cause.message : "Unable to verify your admin access."); setState("error"); }
      }
    };
    void checkAccess();
    return () => { active = false; };
  }, [router]);

  const signOut = async () => { try { await getSupabase().auth.signOut(); } finally { router.replace("/auth"); } };

  if (state === "loading") return <main className="min-h-screen grid place-items-center bg-background"><p className="text-muted-foreground">Loading admin…</p></main>;
  if (state === "error") return <Notice title="Admin connection error" text={message} onSignOut={signOut} />;
  if (state === "denied") return <Notice title="Not authorized" text={`${email} is signed in but does not have the admin role.`} userId={userId} onSignOut={signOut} />;

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, active: pathname === "/admin" || pathname === "/admin/dashboard" },
    { href: "/admin/posts", label: "Blog posts", icon: FileText, active: pathname.startsWith("/admin/posts") },
  ];
  return <div className="min-h-screen bg-muted/20 md:flex"><aside className="flex shrink-0 flex-col border-b border-border bg-card md:min-h-screen md:w-64 md:border-b-0 md:border-r"><div className="px-6 py-5"><Link href="/" className="font-display text-xl font-bold">Intorza <span className="text-sm font-medium text-muted-foreground">Admin</span></Link></div><nav className="flex gap-2 overflow-x-auto border-y border-border px-3 py-3 md:flex-1 md:flex-col md:border-y-0">{nav.map(({ href, label, icon: Icon, active }) => <Link key={href} href={href} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav><div className="flex items-center gap-2 px-3 py-3 md:block md:border-t md:border-border"><Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted"><Home className="h-4 w-4" />View site</Link><button onClick={signOut} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted"><LogOut className="h-4 w-4" />Sign out</button></div></aside><main className="min-w-0 flex-1">{children}</main></div>;
}

function Notice({ title, text, userId, onSignOut }: { title: string; text: string; userId?: string; onSignOut: () => Promise<void> }) {
  return <main className="min-h-screen grid place-items-center bg-background px-4"><div className="max-w-lg rounded-2xl border border-border bg-card p-8 text-center"><h1 className="font-display text-2xl font-bold">{title}</h1><p className="mt-3 text-muted-foreground">{text}</p>{userId && <p className="mt-4 break-all text-xs text-muted-foreground">User ID: {userId}</p>}<button onClick={() => void onSignOut()} className="mt-6 text-primary hover:underline">Sign out</button></div></main>;
}
