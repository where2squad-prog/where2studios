import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List published Where2Studios portfolio projects. Optionally filter by category or featured flag.",
  inputSchema: {
    category: z.string().optional().describe("Filter by category (e.g. 'corporate', 'social', 'brand')."),
    featured: z.boolean().optional().describe("If true, return only featured projects."),
    limit: z.number().int().min(1).max(50).optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, featured, limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let q = supabase
      .from("projects")
      .select("id, slug, title, category, client_name, description, thumbnail_url, video_url, featured, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .limit(limit ?? 20);
    if (category) q = q.eq("category", category);
    if (featured !== undefined) q = q.eq("featured", featured);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { projects: data ?? [] },
    };
  },
});