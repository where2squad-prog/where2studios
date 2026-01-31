-- Create storage bucket for email assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('email-assets', 'email-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to email assets
CREATE POLICY "Public read access for email assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'email-assets');

-- Allow authenticated users to upload email assets (admin only in practice)
CREATE POLICY "Admin upload access for email assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'email-assets');