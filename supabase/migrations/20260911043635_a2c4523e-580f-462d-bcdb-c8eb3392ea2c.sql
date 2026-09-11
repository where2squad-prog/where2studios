DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;

CREATE POLICY "Anyone can view published projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can view all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all social posts" ON public.social_posts;
DROP POLICY IF EXISTS "Anyone can view non-excluded social posts" ON public.social_posts;

CREATE POLICY "View social posts"
ON public.social_posts
FOR SELECT
TO anon, authenticated
USING (excluded = false OR has_role(auth.uid(), 'admin'::app_role));