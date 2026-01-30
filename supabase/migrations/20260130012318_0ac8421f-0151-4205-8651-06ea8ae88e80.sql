-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  result TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create public read policy (portfolio is public)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create contact_submissions table for form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  phone TEXT,
  budget TEXT,
  timeline TEXT,
  referral TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Insert-only policy for contact submissions (public can submit)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create rate limiting helper table
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Public insert policy for rate limits
CREATE POLICY "Anyone can create rate limit entries" 
ON public.rate_limits 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits (identifier, action, created_at);

-- Insert sample project data
INSERT INTO public.projects (title, category, video_url, thumbnail_url, result, description, featured, display_order) VALUES
('Fine Dining Experience', 'restaurants', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop', '3x weekend reservations', 'Full content strategy and production for upscale dining.', true, 1),
('Local Taco Shop', 'restaurants', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=800&fit=crop', '45% more foot traffic', 'Viral ASMR content series.', true, 2),
('Sushi Bar Launch', 'restaurants', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=800&fit=crop', '3.1M views in 30 days', 'Grand opening campaign.', true, 3),
('Brunch Spot Rebrand', 'restaurants', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=800&fit=crop', '2-hour wait times', 'UGC-style content.', true, 4),
('Craft Brewery', 'restaurants', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=800&fit=crop', 'Sold out taproom events', 'Behind-the-scenes content.', true, 5),
('Tech Conference 2024', 'corporate', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=800&fit=crop', '10K+ attendee engagement', 'Full event coverage with highlight reels.', false, 6),
('Company Retreat', 'corporate', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop', 'Boosted team morale', 'Candid moments and team bonding.', false, 7),
('Beach Wedding', 'weddings', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', 'Viral wedding film', 'Cinematic destination wedding.', false, 8),
('Garden Wedding', 'weddings', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop', '1M+ TikTok views', 'Romantic outdoor ceremony.', false, 9),
('Fitness Brand Launch', 'social-media', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop', '200+ new signups', 'Transformation content series.', false, 10),
('Food Festival', 'events', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=800&fit=crop', 'Sold out in 48 hours', 'Pre-event hype content.', false, 11),
('Local Coffee Commercial', 'commercials', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop', '500K impressions', 'Brand awareness campaign.', false, 12),
('Car Dealership', 'commercials', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=800&fit=crop', '2x test drive bookings', 'Showroom tour series.', false, 13);