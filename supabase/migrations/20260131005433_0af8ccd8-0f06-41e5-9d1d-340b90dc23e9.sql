-- Remove public INSERT policies since the edge function uses service role key (bypasses RLS)
-- This prevents direct database spam while still allowing the contact form to work

-- Drop the public INSERT policy on contact_submissions
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Drop the public INSERT policy on rate_limits
DROP POLICY IF EXISTS "Anyone can insert rate limits" ON public.rate_limits;