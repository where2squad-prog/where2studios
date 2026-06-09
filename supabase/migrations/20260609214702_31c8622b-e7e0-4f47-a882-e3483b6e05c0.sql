
-- 1. Tighten email-assets bucket: only admins can write
DROP POLICY IF EXISTS "Admin upload access for email assets" ON storage.objects;

CREATE POLICY "Admins can upload email assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'email-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update email assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'email-assets' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'email-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete email assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'email-assets' AND public.has_role(auth.uid(), 'admin'));

-- 2. Revoke direct EXECUTE on security-definer functions from anon/public.
-- has_role remains executable by authenticated (needed by RLS policies).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;
