DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
GRANT INSERT ON public.contact_submissions TO anon;