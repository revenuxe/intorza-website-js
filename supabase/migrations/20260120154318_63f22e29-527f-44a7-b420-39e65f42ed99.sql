-- Create scheduled_blog_posts table for blog post scheduling
CREATE TABLE public.scheduled_blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  keywords TEXT,
  target_audience TEXT DEFAULT 'interior designers, architects, contractors',
  target_city TEXT,
  target_country TEXT,
  scheduled_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'published', 'failed')),
  blog_post_id UUID REFERENCES public.blog_posts(id),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Enable Row Level Security
ALTER TABLE public.scheduled_blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view all scheduled posts" 
ON public.scheduled_blog_posts 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create scheduled posts" 
ON public.scheduled_blog_posts 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update scheduled posts" 
ON public.scheduled_blog_posts 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete scheduled posts" 
ON public.scheduled_blog_posts 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scheduled_blog_posts_updated_at
BEFORE UPDATE ON public.scheduled_blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for efficient querying
CREATE INDEX idx_scheduled_blog_posts_date_status ON public.scheduled_blog_posts(scheduled_date, status);
CREATE INDEX idx_scheduled_blog_posts_status ON public.scheduled_blog_posts(status);