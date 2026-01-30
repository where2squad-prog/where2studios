-- Create clients table for Instagram clients
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ig_handle TEXT UNIQUE NOT NULL,
  profile_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Public read access for clients
CREATE POLICY "Anyone can view active clients" 
ON public.clients 
FOR SELECT 
USING (is_active = true);

-- Admins can manage clients
CREATE POLICY "Admins can insert clients" 
ON public.clients 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update clients" 
ON public.clients 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete clients" 
ON public.clients 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create ig_public_posts table
CREATE TABLE public.ig_public_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  shortcode TEXT UNIQUE NOT NULL,
  permalink TEXT UNIQUE NOT NULL,
  media_type TEXT,
  caption_snippet TEXT,
  posted_at TIMESTAMP WITH TIME ZONE,
  thumbnail_url TEXT,
  public_views BIGINT,
  public_likes BIGINT,
  public_comments BIGINT,
  captured_at TIMESTAMP WITH TIME ZONE,
  is_excluded BOOLEAN NOT NULL DEFAULT false,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  raw JSONB,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ig_public_posts ENABLE ROW LEVEL SECURITY;

-- Public can read non-excluded posts
CREATE POLICY "Anyone can view non-excluded posts" 
ON public.ig_public_posts 
FOR SELECT 
USING (is_excluded = false);

-- Admins can manage posts
CREATE POLICY "Admins can insert posts" 
ON public.ig_public_posts 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update posts" 
ON public.ig_public_posts 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete posts" 
ON public.ig_public_posts 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create ig_social_rankings table (per-client rankings)
CREATE TABLE public.ig_social_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.ig_public_posts(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL DEFAULT 0,
  rank INTEGER NOT NULL,
  computed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, post_id)
);

-- Enable RLS
ALTER TABLE public.ig_social_rankings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view social rankings" 
ON public.ig_social_rankings 
FOR SELECT 
USING (true);

-- Admins can manage rankings
CREATE POLICY "Admins can insert rankings" 
ON public.ig_social_rankings 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update rankings" 
ON public.ig_social_rankings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete rankings" 
ON public.ig_social_rankings 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create ig_social_global_rankings table (overall rankings)
CREATE TABLE public.ig_social_global_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL UNIQUE REFERENCES public.ig_public_posts(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL DEFAULT 0,
  rank INTEGER NOT NULL,
  computed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ig_social_global_rankings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view global rankings" 
ON public.ig_social_global_rankings 
FOR SELECT 
USING (true);

-- Admins can manage global rankings
CREATE POLICY "Admins can insert global rankings" 
ON public.ig_social_global_rankings 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update global rankings" 
ON public.ig_social_global_rankings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete global rankings" 
ON public.ig_social_global_rankings 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger for ig_public_posts
CREATE TRIGGER update_ig_public_posts_updated_at
BEFORE UPDATE ON public.ig_public_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_ig_public_posts_client_id ON public.ig_public_posts(client_id);
CREATE INDEX idx_ig_public_posts_posted_at ON public.ig_public_posts(posted_at DESC NULLS LAST);
CREATE INDEX idx_ig_public_posts_captured_at ON public.ig_public_posts(captured_at DESC NULLS LAST);
CREATE INDEX idx_ig_social_rankings_client_rank ON public.ig_social_rankings(client_id, rank);
CREATE INDEX idx_ig_social_global_rankings_rank ON public.ig_social_global_rankings(rank);