-- Enable required extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Schedule the blog processing to run daily at midnight UTC
SELECT cron.schedule(
  'process-scheduled-blogs-daily',
  '0 0 * * *', -- Every day at midnight UTC
  $$
  SELECT net.http_post(
    url := 'https://rehioexyiybgrxepajnb.supabase.co/functions/v1/process-scheduled-blogs',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaGlvZXh5aXliZ3J4ZXBham5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNDg4NjYsImV4cCI6MjA4MjgyNDg2Nn0.sFG1xiZKyIiIVKGMBKRmj0ipZdb20c8KkzaCHmq-hrI"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);