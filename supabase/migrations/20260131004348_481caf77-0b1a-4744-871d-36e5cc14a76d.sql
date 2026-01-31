-- Remove the public SELECT policy that exposes IP addresses
DROP POLICY IF EXISTS "Anyone can check rate limits" ON public.rate_limits;

-- Rate limit checks are performed server-side in Edge Functions using service role key
-- which bypasses RLS, so no public read access is needed