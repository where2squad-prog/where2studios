const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface Post {
  id: string;
  client_id: string;
  posted_at: string | null;
  captured_at: string | null;
  public_views: number | null;
  public_likes: number | null;
  public_comments: number | null;
  is_pinned: boolean;
  is_excluded: boolean;
}

interface RankedPost {
  post: Post;
  score: number;
}

function calculateScore(post: Post): number {
  // If views exist and > 0, use views as score
  if (post.public_views != null && post.public_views > 0) {
    return post.public_views;
  }
  
  // Otherwise: likes + (comments * 5)
  const likes = post.public_likes ?? 0;
  const comments = post.public_comments ?? 0;
  
  return likes + (comments * 5);
}

function sortPosts(posts: RankedPost[]): RankedPost[] {
  return posts.sort((a, b) => {
    // Pinned posts first
    if (a.post.is_pinned && !b.post.is_pinned) return -1;
    if (!a.post.is_pinned && b.post.is_pinned) return 1;
    
    // Then by score descending
    if (a.score !== b.score) return b.score - a.score;
    
    // Then by posted_at descending (more recent first)
    const aPosted = a.post.posted_at ? new Date(a.post.posted_at).getTime() : 0;
    const bPosted = b.post.posted_at ? new Date(b.post.posted_at).getTime() : 0;
    if (aPosted !== bPosted) return bPosted - aPosted;
    
    // Then by captured_at descending
    const aCaptured = a.post.captured_at ? new Date(a.post.captured_at).getTime() : 0;
    const bCaptured = b.post.captured_at ? new Date(b.post.captured_at).getTime() : 0;
    return bCaptured - aCaptured;
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create auth client to verify user
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;

    // Create service role client for admin check
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - admin required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Admin ${userId} initiated rankings computation`);

    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    // Fetch all active clients
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('id, name')
      .eq('is_active', true);

    if (clientsError) {
      throw new Error(`Failed to fetch clients: ${clientsError.message}`);
    }

    console.log(`Computing rankings for ${clients?.length || 0} clients`);

    // Clear existing rankings
    await supabase.from('ig_social_rankings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('ig_social_global_rankings').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const allRankedPosts: RankedPost[] = [];
    const clientResults: { client: string; topPosts: number }[] = [];

    for (const client of (clients || [])) {
      console.log(`Processing client: ${client.name}`);
      
      // Fetch posts for this client (last 90 days or last 30 posts)
      const { data: posts, error: postsError } = await supabase
        .from('ig_public_posts')
        .select('*')
        .eq('client_id', client.id)
        .eq('is_excluded', false)
        .order('posted_at', { ascending: false, nullsFirst: false })
        .limit(30);

      if (postsError) {
        console.error(`Failed to fetch posts for ${client.name}: ${postsError.message}`);
        continue;
      }

      // Filter to last 90 days if we have posted_at
      const filteredPosts = (posts || []).filter((post: Post) => {
        if (!post.posted_at) return true; // Include if no date
        return new Date(post.posted_at) >= ninetyDaysAgo;
      });

      // Calculate scores
      const rankedPosts: RankedPost[] = filteredPosts.map((post: Post) => ({
        post,
        score: calculateScore(post),
      }));

      // Sort and take top 6 for per-client rankings
      const sortedPosts = sortPosts(rankedPosts);
      const top6 = sortedPosts.slice(0, 6);

      // Insert per-client rankings
      if (top6.length > 0) {
        const rankingsToInsert = top6.map((rp, index) => ({
          client_id: client.id,
          post_id: rp.post.id,
          score: rp.score,
          rank: index + 1,
          computed_at: now.toISOString(),
        }));

        const { error: insertError } = await supabase
          .from('ig_social_rankings')
          .insert(rankingsToInsert);

        if (insertError) {
          console.error(`Failed to insert rankings for ${client.name}: ${insertError.message}`);
        }
      }

      clientResults.push({ client: client.name, topPosts: top6.length });
      
      // Add to global pool
      allRankedPosts.push(...rankedPosts);
    }

    // Compute global top 20
    const globalSorted = sortPosts(allRankedPosts);
    const globalTop20 = globalSorted.slice(0, 20);

    if (globalTop20.length > 0) {
      const globalRankingsToInsert = globalTop20.map((rp, index) => ({
        post_id: rp.post.id,
        score: rp.score,
        rank: index + 1,
        computed_at: now.toISOString(),
      }));

      const { error: globalInsertError } = await supabase
        .from('ig_social_global_rankings')
        .insert(globalRankingsToInsert);

      if (globalInsertError) {
        console.error(`Failed to insert global rankings: ${globalInsertError.message}`);
      }
    }

    console.log('Rankings computed:', {
      clientResults,
      globalTop20Count: globalTop20.length,
    });

    return new Response(
      JSON.stringify({
        success: true,
        clientResults,
        globalTop20Count: globalTop20.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Compute rankings error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
