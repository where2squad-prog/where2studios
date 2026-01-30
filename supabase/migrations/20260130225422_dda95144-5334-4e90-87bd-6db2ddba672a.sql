-- Create social_clients table
CREATE TABLE public.social_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ig_handle text UNIQUE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on social_clients
ALTER TABLE public.social_clients ENABLE ROW LEVEL SECURITY;

-- Public read for social_clients
CREATE POLICY "Anyone can view social clients"
ON public.social_clients
FOR SELECT
USING (true);

-- Admin insert for social_clients
CREATE POLICY "Admins can insert social clients"
ON public.social_clients
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update for social_clients
CREATE POLICY "Admins can update social clients"
ON public.social_clients
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete for social_clients
CREATE POLICY "Admins can delete social clients"
ON public.social_clients
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create social_posts table
CREATE TABLE public.social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.social_clients(id) ON DELETE CASCADE,
  permalink text UNIQUE NOT NULL,
  title text,
  thumbnail_url text,
  pinned boolean NOT NULL DEFAULT false,
  excluded boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on social_posts
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

-- Public read for non-excluded posts only
CREATE POLICY "Anyone can view non-excluded social posts"
ON public.social_posts
FOR SELECT
USING (excluded = false);

-- Admin full read (including excluded)
CREATE POLICY "Admins can view all social posts"
ON public.social_posts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin insert for social_posts
CREATE POLICY "Admins can insert social posts"
ON public.social_posts
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update for social_posts
CREATE POLICY "Admins can update social posts"
ON public.social_posts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete for social_posts
CREATE POLICY "Admins can delete social posts"
ON public.social_posts
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_social_posts_updated_at
BEFORE UPDATE ON public.social_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial clients
INSERT INTO public.social_clients (name, ig_handle) VALUES
  ('Backyard Bayou', 'thebackyardbayou'),
  ('Maya Halal Taqueria', 'mayahalaltaqueria'),
  ('Cityline Sunnyvale', 'citylinesunnyvale'),
  ('Hyphy Burger', 'hyphyburger'),
  ('Forte Athletics', 'forte.athletics');