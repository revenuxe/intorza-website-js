ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}'::text[];
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS pillar_slug text;
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS blog_posts_pillar_slug_idx ON public.blog_posts(pillar_slug);