-- Add case study fields to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS client_name text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS services text[],
ADD COLUMN IF NOT EXISTS challenge text,
ADD COLUMN IF NOT EXISTS approach text,
ADD COLUMN IF NOT EXISTS deliverables text[],
ADD COLUMN IF NOT EXISTS metrics_json jsonb,
ADD COLUMN IF NOT EXISTS images text[],
ADD COLUMN IF NOT EXISTS published boolean DEFAULT true;

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  company text,
  quote text NOT NULL,
  headshot_url text,
  published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS policies for testimonials
CREATE POLICY "Anyone can view published testimonials" 
ON public.testimonials 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Generate slugs for existing projects that don't have one
UPDATE public.projects 
SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;