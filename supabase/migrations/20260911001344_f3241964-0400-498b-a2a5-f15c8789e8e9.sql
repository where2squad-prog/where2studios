ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'video',
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'embed',
  ADD COLUMN IF NOT EXISTS file_hash text,
  ADD COLUMN IF NOT EXISTS file_size bigint,
  ADD COLUMN IF NOT EXISTS duration_seconds numeric,
  ADD COLUMN IF NOT EXISTS width int,
  ADD COLUMN IF NOT EXISTS height int;

ALTER TABLE public.projects
  ADD CONSTRAINT projects_media_type_check CHECK (media_type IN ('video','photo'));

ALTER TABLE public.projects
  ADD CONSTRAINT projects_source_check CHECK (source IN ('embed','upload'));

UPDATE public.projects SET media_type = 'video', source = 'embed';

CREATE UNIQUE INDEX IF NOT EXISTS projects_file_hash_unique
  ON public.projects (file_hash) WHERE file_hash IS NOT NULL;

-- Storage policies for the portfolio bucket
CREATE POLICY "Anyone can read portfolio media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can upload portfolio media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));