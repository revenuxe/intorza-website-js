UPDATE public.blog_posts
SET content = REPLACE(REPLACE(content, 'https://app.intorza.com', 'https://www.app.intorza.com'), '(app.intorza.com)', '(www.app.intorza.com)')
WHERE content LIKE '%app.intorza.com%' AND content NOT LIKE '%www.app.intorza.com%' OR content LIKE '%https://app.intorza.com%';