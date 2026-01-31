-- Remove the public SELECT policy that exposes IP addresses and tracking data
DROP POLICY IF EXISTS "Anyone can check rate limits" ON public.rate_limits;