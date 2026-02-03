-- Add page_url and user_agent columns to contact_submissions
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS page_url text,
ADD COLUMN IF NOT EXISTS user_agent text;