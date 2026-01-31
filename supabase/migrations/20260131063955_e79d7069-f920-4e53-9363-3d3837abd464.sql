-- Fix rate_limits: Remove public INSERT policy, only allow service role
DROP POLICY IF EXISTS "Anyone can create rate limit entries" ON public.rate_limits;

-- Rate limits should only be managed by edge functions using service role
-- No public INSERT policy needed - the edge function uses service role key

-- Ensure contact_submissions has no public INSERT (it already doesn't based on schema)
-- But let's be explicit and ensure only service role can insert
-- The edge function already uses service role for inserts