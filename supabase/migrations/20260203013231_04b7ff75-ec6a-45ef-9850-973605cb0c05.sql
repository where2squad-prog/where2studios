-- Drop existing rate_limits table and recreate with new schema
DROP POLICY IF EXISTS "Admins can delete rate limit entries" ON public.rate_limits;
DROP POLICY IF EXISTS "Admins can view rate limits" ON public.rate_limits;
DROP TABLE IF EXISTS public.rate_limits;

-- 1) Table to store rate limit counters (bucketed windows)
CREATE TABLE public.rate_limits (
  id bigserial PRIMARY KEY,
  rl_key text NOT NULL,
  window_start timestamptz NOT NULL,
  window_seconds int NOT NULL,
  count int NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (rl_key, window_start)
);

CREATE INDEX rate_limits_key_window_idx
  ON public.rate_limits (rl_key, window_start DESC);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Admin-only SELECT policy for management dashboards
CREATE POLICY "Admins can view rate limits"
ON public.rate_limits
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only DELETE policy for cleanup
CREATE POLICY "Admins can delete rate limit entries"
ON public.rate_limits
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2) Atomic rate limit check + increment function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key text,
  p_max int,
  p_window_seconds int
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window_start timestamptz := to_timestamp(
    floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds
  );
  v_count int;
BEGIN
  INSERT INTO public.rate_limits (rl_key, window_start, window_seconds, count, updated_at)
  VALUES (p_key, v_window_start, p_window_seconds, 1, now())
  ON CONFLICT (rl_key, window_start)
  DO UPDATE SET
    count = public.rate_limits.count + 1,
    updated_at = now()
  RETURNING count INTO v_count;

  RETURN v_count <= p_max;
END;
$$;

-- Revoke public access - only service role should call this
REVOKE ALL ON FUNCTION public.check_rate_limit(text, int, int) FROM public;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, int, int) FROM anon;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, int, int) FROM authenticated;