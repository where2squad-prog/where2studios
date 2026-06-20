ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'contact';
ALTER TABLE public.contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_source_check;
ALTER TABLE public.contact_submissions ADD CONSTRAINT contact_submissions_source_check CHECK (source IN ('contact', 'where2boys', 'booking'));
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS collab_type TEXT, ADD COLUMN IF NOT EXISTS timeline TEXT, ADD COLUMN IF NOT EXISTS budget_range TEXT, ADD COLUMN IF NOT EXISTS company TEXT;