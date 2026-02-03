-- Add explicit SELECT policy for rate_limits table (admin-only access)
-- This clarifies that only admins can view rate limit data, preventing potential bypass analysis
CREATE POLICY "Admins can view rate limits"
ON public.rate_limits
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));