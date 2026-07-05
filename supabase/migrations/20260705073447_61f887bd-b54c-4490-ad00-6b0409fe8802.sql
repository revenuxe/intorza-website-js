-- Enable pg_cron so the project stays "active" (Supabase pauses free-tier
-- projects after 7 days of no DB activity — a scheduled query is enough).
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Remove any prior schedule with the same name (safe on first run).
DO $$
BEGIN
  PERFORM cron.unschedule('intorza_keepalive');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Ping the blog_posts table every day at 03:00 UTC. Cheap, indexed, no writes.
SELECT cron.schedule(
  'intorza_keepalive',
  '0 3 * * *',
  $$SELECT count(*) FROM public.blog_posts;$$
);