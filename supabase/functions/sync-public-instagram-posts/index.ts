import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://where2studios.com",
  "https://www.where2studios.com",
  "https://id-preview--2bb4daec-4a94-4b24-bf81-fcab77007c43.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

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

// Extract shortcodes from Instagram profile page content
function extractShortcodesFromProfile(content: string): string[] {
  const shortcodes: string[] = [];
  
  // Match patterns like /p/SHORTCODE/ or /reel/SHORTCODE/
  const patterns = [
    /\/p\/([A-Za-z0-9_-]+)\//g,
    /\/reel\/([A-Za-z0-9_-]+)\//g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1] && !shortcodes.includes(match[1])) {
        shortcodes.push(match[1]);
      }
    }
  }
  
  return shortcodes.slice(0, 30); // Limit to 30 posts
}

// Extract post data from Instagram post page content
function extractPostData(content: string, shortcode: string): PostData {
  const data: PostData = {
    shortcode,
    permalink: `https://www.instagram.com/p/${shortcode}/`,
  };
  
  // Determine media type
  if (content.includes('/reel/') || content.includes('"video_url"') || content.includes('video_view_count')) {
    data.media_type = 'reel';
  } else if (content.includes('"edge_sidecar_to_children"')) {
    data.media_type = 'carousel';
  } else {
    data.media_type = 'post';
  }
  
  // Extract thumbnail from og:image meta tag
  const ogImageMatch = content.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  if (ogImageMatch) {
    data.thumbnail_url = ogImageMatch[1];
  }
  
  // Extract caption from og:description or description meta
  const descMatch = content.match(/<meta\s+property="og:description"\s+content="([^"]+)"/);
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
    const match = content.match(pattern);
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
    const match = content.match(pattern);
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
    const match = content.match(pattern);
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
    const match = content.match(pattern);
    if (match) {
      data.posted_at = new Date(parseInt(match[1], 10) * 1000).toISOString();
      break;
    }
  }
  
  return data;
}

// Scrape a URL using Firecrawl
async function scrapeWithFirecrawl(url: string, apiKey: string): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    console.log(`Firecrawl scraping: ${url}`);
    
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['html', 'markdown'],
        onlyMainContent: false,
        waitFor: 3000, // Wait for dynamic content
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return { success: false, error: data.error || `HTTP ${response.status}` };
    }

    // Get content from the response (check both data.data and data directly)
    const html = data.data?.html || data.html || '';
    const markdown = data.data?.markdown || data.markdown || '';
    const content = html || markdown;

    if (!content) {
      return { success: false, error: 'No content returned' };
    }

    return { success: true, content };
  } catch (error) {
    console.error('Firecrawl fetch error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY is not configured');
    }

    // Authenticate the request - require admin role
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - missing authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create client with user's auth token to verify identity
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getUser(token);
    
    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const userId = claimsData.user.id;

    // Check if user has admin role using service role client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`Admin ${userId} triggered Instagram sync`);

    // Fetch active clients
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .eq('is_active', true);

    if (clientsError) {
      throw new Error(`Failed to fetch clients: ${clientsError.message}`);
    }

    console.log(`Processing ${clients?.length || 0} active clients with Firecrawl`);

    const results: { client: string; postsProcessed: number; errors: string[] }[] = [];

    for (const client of (clients || []) as Client[]) {
      const clientResult = { client: client.name, postsProcessed: 0, errors: [] as string[] };
      
      console.log(`Processing client: ${client.name} (@${client.ig_handle})`);
      
      // Fetch profile page using Firecrawl
      const profileResult = await scrapeWithFirecrawl(client.profile_url, firecrawlApiKey);
      
      if (!profileResult.success || !profileResult.content) {
        clientResult.errors.push(`Failed to fetch profile: ${profileResult.error}`);
        results.push(clientResult);
        continue;
      }
      
      // Extract shortcodes
      const shortcodes = extractShortcodesFromProfile(profileResult.content);
      console.log(`Found ${shortcodes.length} shortcodes for ${client.name}`);
      
      if (shortcodes.length === 0) {
        clientResult.errors.push('No posts found on profile');
        results.push(clientResult);
        continue;
      }
      
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
      
      // Process up to 12 posts per client to stay within rate limits
      const postsToProcess = shortcodes.slice(0, 12);
      
      for (const shortcode of postsToProcess) {
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
          
          // Fetch post page using Firecrawl
          const postUrl = `https://www.instagram.com/p/${shortcode}/`;
          const postResult = await scrapeWithFirecrawl(postUrl, firecrawlApiKey);
          
          if (!postResult.success || !postResult.content) {
            clientResult.errors.push(`Failed to fetch post ${shortcode}: ${postResult.error}`);
            continue;
          }
          
          const postData = extractPostData(postResult.content, shortcode);
          
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
          
          // Rate limiting - wait between posts (Firecrawl has its own limits)
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (error) {
          clientResult.errors.push(`Error processing ${shortcode}: ${error}`);
        }
      }
      
      results.push(clientResult);
      
      // Wait between clients
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Sync complete:', JSON.stringify(results, null, 2));

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Sync error:', error);
    // Return generic error message to client
    return new Response(
      JSON.stringify({ success: false, error: 'An error occurred during sync. Please try again later.' }),
      { status: 500, headers: { ...getCorsHeaders(null), 'Content-Type': 'application/json' } }
    );
  }
});
