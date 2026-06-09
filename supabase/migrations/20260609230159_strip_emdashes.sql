UPDATE public.projects
SET description = REPLACE(description, '—', '.'),
    result = REPLACE(result, '—', '.'),
    title = REPLACE(title, '—', '-'),
    challenge = REPLACE(challenge, '—', '.'),
    approach = REPLACE(approach, '—', '.')
WHERE description LIKE '%—%' OR result LIKE '%—%' OR title LIKE '%—%' OR challenge LIKE '%—%' OR approach LIKE '%—%';
