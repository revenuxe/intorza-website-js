"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabase } from "@/lib/supabase-browser";

export default function AuthPage() { const router = useRouter(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const signIn = async (event: React.FormEvent) => { event.preventDefault(); setLoading(true); let error: Error | null = null; try { ({ error } = await getSupabase().auth.signInWithPassword({ email, password })); } catch (cause) { error = cause instanceof Error ? cause : new Error("Authentication is not configured."); } setLoading(false); if (error) return alert(error.message); router.replace("/admin"); }; return <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4"><div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8"><h1 className="font-display text-2xl font-bold text-center mb-2">Admin Access</h1><p className="text-sm text-muted-foreground text-center mb-6">Sign in to manage Intorza content.</p><form onSubmit={signIn} className="space-y-4"><div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div><div><Label htmlFor="password">Password</Label><Input id="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div><Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button></form><Link href="/" className="block mt-6 text-center text-sm text-muted-foreground hover:text-primary">← Back to site</Link></div></div>; }
