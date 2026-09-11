ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS convention_slug text;

UPDATE public.projects SET convention_slug = 'rsac'
WHERE slug IN ('cloudflare-rsa-conference-2025','claroty-rsa-conference-2024','claroty-podcast-day-rsa-2024','rsa-conference-2025-b-restaurant');

UPDATE public.projects SET convention_slug = 'snowflake-summit'
WHERE slug IN ('immuta-snowflake-summit-2025','snowflake-summit-2025-b-restaurant');

UPDATE public.projects SET convention_slug = 'dreamforce'
WHERE slug IN ('ownbackup-dreamforce-2024','ownbackup-dreamforce-2023');