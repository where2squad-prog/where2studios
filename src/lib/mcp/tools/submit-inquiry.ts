import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "submit_inquiry",
  title: "Submit contact inquiry",
  description: "Submit a new contact / partnership inquiry to Where2Studios. Use for prospective clients, collabs, or Where2Boys partnerships.",
  inputSchema: {
    name: z.string().min(1).describe("Full name of the requester."),
    email: z.string().email().describe("Contact email."),
    company: z.string().optional().describe("Company or Instagram handle."),
    message: z.string().min(1).describe("What they want to work on."),
    collab_type: z.string().optional().describe("Type of collab, e.g. 'Brand partnership', 'Event coverage'."),
    timeline: z.string().optional().describe("Requested timeline, e.g. 'ASAP', 'Next month'."),
    budget_range: z.string().optional().describe("Budget range, e.g. '$3K to $5K'."),
    source: z.enum(["mcp", "where2boys", "website"]).optional().describe("Source tag (default 'mcp')."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const payload = { ...input, source: input.source ?? "mcp" };
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert(payload)
      .select("id, created_at")
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Inquiry received (id: ${data?.id}). The team will follow up by email.` }],
      structuredContent: { submission: data },
    };
  },
});