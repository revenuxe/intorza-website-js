import { createClient } from "@supabase/supabase-js";

// Server-side, anon/publishable key — public read-only access to blog_posts
// (RLS allows `published = true` for the anon role).
//
// Configure via env: SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.
// Falls back to the legacy Intorza project ref when env is not yet set.
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://rehioexyiybgrxepajnb.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || "";

export const supabasePublic = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: undefined,
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const supabaseConfigured = Boolean(SUPABASE_KEY);
