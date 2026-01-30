-- 1. Fix rate_limits table - add SELECT policy for rate limit checks
CREATE POLICY "Anyone can check rate limits"
ON public.rate_limits
FOR SELECT
USING (true);

-- 2. Allow admins to manage rate_limits (cleanup old entries)
CREATE POLICY "Admins can delete rate limit entries"
ON public.rate_limits
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Fix user_roles table - allow admins to manage roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Fix projects table - allow admins to manage content
CREATE POLICY "Admins can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));