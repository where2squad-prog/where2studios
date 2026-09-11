ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS show_on_main_site boolean NOT NULL DEFAULT true;

UPDATE public.projects SET category = 'event-recaps'
  WHERE slug IN (
    'onchain-summit-recap-highlight',
    'passionfroot-tech-event-recap',
    'marin-destination-highlight-reel',
    'sunnyvale-cityline-event-recap',
    'google-pixel-activation-build-montage'
  );

UPDATE public.projects SET category = 'brand-films'
  WHERE category IN ('brand-videos', 'corporate', 'launch-videos', 'podcasts', 'photography', 'social-clips');

UPDATE public.projects SET show_on_main_site = false
  WHERE slug IN ('marin-destination-highlight-reel', 'sunnyvale-cityline-event-recap');