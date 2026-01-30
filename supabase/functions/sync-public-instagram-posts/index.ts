const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface Client {
  id: string;
  name: string;
  ig_handle: string;
  profile_url: string;
}

interface PostData {
  shortcode: string;
  permalink: string;
  media_type?: string;
  caption_snippet?: string;
  posted_at?: string;
  thumbnail_url?: string;
  public_views?: number;
  public_likes?: number;
  public_comments?: number;
}

// Extract shortcodes from Instagram profile page HTML
function extractShortcodesFromProfile(html: string): string[] {
  const shortcodes: string[] = [];
  
  // Match patterns like /p/SHORTCODE/ or /reel/SHORTCODE/
  const patterns = [
    /\/p\/([A-Za-z0-9_-]+)\//g,
    /\/reel\/([A-Za-z0-9_-]+)\//g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      if (match[1] && !shortcodes.includes(match[1])) {
        shortcodes.push(match[1]);
      }
    }
  }
  
  return shortcodes.slice(0, 30); // Limit to 30 posts
}

// Extract post data from Instagram post page HTML
function extractPostData(html: string, shortcode: string): PostData {
  const data: PostData = {
    shortcode,
    permalink: `https://www.instagram.com/p/${shortcode}/`,
  };
  
  // Determine media type
  if (html.includes('/reel/') || html.includes('"video_url"') || html.includes('video_view_count')) {
    data.media_type = 'reel';
  } else if (html.includes('"edge_sidecar_to_children"')) {
    data.media_type = 'carousel';
  } else {
    data.media_type = 'post';
  }
  
  // Extract thumbnail from og:image meta tag
  const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  if (ogImageMatch) {
    data.thumbnail_url = ogImageMatch[1];
  }
  
  // Extract caption from og:description or description meta
  const descMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/);
  if (descMatch) {
    data.caption_snippet = descMatch[1].slice(0, 200);
  }
  
  // Try to extract view count (for reels/videos)
  const viewCountPatterns = [
    /"video_view_count"\s*:\s*(\d+)/,
    /"play_count"\s*:\s*(\d+)/,
    /(\d+(?:,\d{3})*)\s*views/i,
  ];
  for (const pattern of viewCountPatterns) {
    const match = html.match(pattern);
    if (match) {
      data.public_views = parseInt(match[1].replace(/,/g, ''), 10);
      break;
    }
  }
  
  // Try to extract like count
  const likePatterns = [
    /"edge_liked_by"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
    /"edge_media_preview_like"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
    /(\d+(?:,\d{3})*)\s*likes/i,
  ];
  for (const pattern of likePatterns) {
    const match = html.match(pattern);
    if (match) {
      data.public_likes = parseInt(match[1].replace(/,/g, ''), 10);
      break;
    }
  }
  
  // Try to extract comment count
  const commentPatterns = [
    /"edge_media_to_comment"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
    /"edge_media_to_parent_comment"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
    /(\d+(?:,\d{3})*)\s*comments/i,
  ];
  for (const pattern of commentPatterns) {
    const match = html.match(pattern);
    if (match) {
      data.public_comments = parseInt(match[1].replace(/,/g, ''), 10);
      break;
    }
  }
  
  // Try to extract posted_at timestamp
  const timestampPatterns = [
    /"taken_at_timestamp"\s*:\s*(\d+)/,
    /"timestamp"\s*:\s*(\d+)/,
  ];
  for (const pattern of timestampPatterns) {
    const match = html.match(pattern);
    if (match) {
      data.posted_at = new Date(parseInt(match[1], 10) * 1000).toISOString();
      break;
    }
  }
  
  return data;
}

// Fetch with retry and exponential backoff
async function fetchWithRetry(url: string, maxRetries = 3): Promise<string | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.status === 429) {
        // Rate limited - wait and retry
        const waitTime = Math.pow(2, attempt) * 5000;
        console.log(`Rate limited, waiting ${waitTime}ms before retry`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      if (!response.ok) {
        console.log(`HTTP ${response.status} for ${url}`);
        return null;
      }
      
      return await response.text();
    } catch (error) {
      console.log(`Fetch error (attempt ${attempt + 1}): ${error}`);
      if (attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active clients
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .eq('is_active', true);

    if (clientsError) {
      throw new Error(`Failed to fetch clients: ${clientsError.message}`);
    }

    console.log(`Processing ${clients?.length || 0} active clients`);

    const results: { client: string; postsProcessed: number; errors: string[] }[] = [];

    for (const client of (clients || []) as Client[]) {
      const clientResult = { client: client.name, postsProcessed: 0, errors: [] as string[] };
      
      console.log(`Processing client: ${client.name} (@${client.ig_handle})`);
      
      // Fetch profile page
      const profileHtml = await fetchWithRetry(client.profile_url);
      if (!profileHtml) {
        clientResult.errors.push('Failed to fetch profile page');
        results.push(clientResult);
        continue;
      }
      
      // Extract shortcodes
      const shortcodes = extractShortcodesFromProfile(profileHtml);
      console.log(`Found ${shortcodes.length} shortcodes for ${client.name}`);
      
      // Get existing posts to check caching
      const { data: existingPosts } = await supabase
        .from('ig_public_posts')
        .select('shortcode, captured_at, public_views, public_likes, public_comments')
        .eq('client_id', client.id);
      
      const existingPostMap = new Map(
        (existingPosts || []).map(p => [p.shortcode, p])
      );
      
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      for (const shortcode of shortcodes) {
        try {
          const existing = existingPostMap.get(shortcode);
          
          // Skip if captured within 24 hours and has metrics
          if (existing?.captured_at) {
            const capturedAt = new Date(existing.captured_at);
            const hasMetrics = existing.public_views != null || 
                               existing.public_likes != null || 
                               existing.public_comments != null;
            
            if (capturedAt > twentyFourHoursAgo && hasMetrics) {
              console.log(`Skipping ${shortcode} - recently captured with metrics`);
              continue;
            }
          }
          
          // Fetch post page
          const postUrl = `https://www.instagram.com/p/${shortcode}/`;
          const postHtml = await fetchWithRetry(postUrl);
          
          if (!postHtml) {
            clientResult.errors.push(`Failed to fetch post ${shortcode}`);
            continue;
          }
          
          const postData = extractPostData(postHtml, shortcode);
          
          // Upsert into ig_public_posts
          const { error: upsertError } = await supabase
            .from('ig_public_posts')
            .upsert({
              client_id: client.id,
              shortcode: postData.shortcode,
              permalink: postData.permalink,
              media_type: postData.media_type,
              caption_snippet: postData.caption_snippet,
              posted_at: postData.posted_at,
              thumbnail_url: postData.thumbnail_url,
              public_views: postData.public_views,
              public_likes: postData.public_likes,
              public_comments: postData.public_comments,
              captured_at: now.toISOString(),
            }, {
              onConflict: 'shortcode',
            });
          
          if (upsertError) {
            clientResult.errors.push(`Failed to upsert ${shortcode}: ${upsertError.message}`);
          } else {
            clientResult.postsProcessed++;
          }
          
          // Rate limiting - wait between posts
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          clientResult.errors.push(`Error processing ${shortcode}: ${error}`);
        }
      }
      
      results.push(clientResult);
      
      // Wait between clients
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('Sync complete:', JSON.stringify(results, null, 2));

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
