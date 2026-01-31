import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://where2studios.com",
  "https://www.where2studios.com",
  "https://id-preview--2bb4daec-4a94-4b24-bf81-fcab77007c43.lovable.app",
  "https://2bb4daec-4a94-4b24-bf81-fcab77007c43.lovableproject.com",
  "http://localhost:8080",
  "http://localhost:5173",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  phone?: string;
  budget?: string;
  timeline?: string;
  referral?: string;
}

// HTML escape function to prevent XSS in emails
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate limiting constants
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const MAX_SUBMISSIONS_PER_HOUR = 3;

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client identifier for rate limiting
    const identifier = req.headers.get("x-forwarded-for") || 
                       req.headers.get("x-real-ip") || 
                       "unknown";

    // Check rate limits
    const hourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { data: recentSubmissions, error: rateLimitError } = await supabaseAdmin
      .from("rate_limits")
      .select("*")
      .eq("identifier", identifier)
      .eq("action", "contact_form")
      .gte("created_at", hourAgo);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      // Continue anyway - don't block legitimate users due to rate limit DB issues
    }

    if (recentSubmissions && recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      console.log(`Rate limit exceeded for ${identifier}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Rate limit exceeded. Maximum 3 submissions per hour." 
        }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Record this submission attempt
    await supabaseAdmin.from("rate_limits").insert({
      identifier,
      action: "contact_form",
    });

    const data: ContactRequest = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Please provide your name, email, and message." 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Save to database using service role (bypasses RLS)
    const { error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        service: data.service || null,
        message: data.message,
        phone: data.phone || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        referral: data.referral || null,
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Continue with email sending even if DB insert fails
    }

    // Escape all user-provided data for HTML emails
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = data.company ? escapeHtml(data.company) : "";
    const safePhone = data.phone ? escapeHtml(data.phone) : "";
    const safeService = data.service ? escapeHtml(data.service) : "";
    const safeBudget = data.budget ? escapeHtml(data.budget) : "";
    const safeTimeline = data.timeline ? escapeHtml(data.timeline) : "";
    const safeReferral = data.referral ? escapeHtml(data.referral) : "";
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

    // 1. Send internal notification email
    const internalEmailResponse = await resend.emails.send({
      from: "Where2Studios <notifications@where2studios.com>",
      to: ["contact@where2studios.com"],
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
        ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
        ${safeService ? `<p><strong>Service:</strong> ${safeService}</p>` : ""}
        ${safeBudget ? `<p><strong>Budget:</strong> ${safeBudget}</p>` : ""}
        ${safeTimeline ? `<p><strong>Timeline:</strong> ${safeTimeline}</p>` : ""}
        ${safeReferral ? `<p><strong>Referral:</strong> ${safeReferral}</p>` : ""}
        <hr />
        <h3>Message:</h3>
        <p>${safeMessage}</p>
      `,
    });

    console.log("Internal notification sent:", internalEmailResponse);

    // 2. Send confirmation email to user
    const confirmationEmailResponse = await resend.emails.send({
      from: "Where2Studios <no-reply@where2studios.com>",
      to: [data.email],
      subject: "Thanks for reaching out to Where2Studios!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #14180A; font-size: 24px; margin-bottom: 20px;">Thanks for reaching out, ${safeName}!</h1>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            We've received your message and are excited to learn more about your project.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            A member of our team will get back to you within <strong>24 hours</strong>.
          </p>
          
          <div style="background: #FFF8EE; padding: 20px; border-radius: 12px; margin: 30px 0;">
            <p style="color: #14180A; font-size: 14px; margin: 0;">
              <strong>Your message:</strong><br>
              ${safeMessage}
            </p>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            In the meantime, feel free to check out our <a href="https://where2studios.com/work" style="color: #E09E24;">recent work</a>.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          
          <p style="color: #666; font-size: 14px;">
            Where2Studios<br>
            Bay Area, CA<br>
            <a href="https://where2studios.com" style="color: #E09E24;">where2studios.com</a>
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        internal: internalEmailResponse,
        confirmation: confirmationEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    // Log detailed error server-side for debugging
    console.error("Error in send-contact-email function:", error);
    
    // Return generic message to client (don't expose internal details)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "We're unable to process your request at this time. Please try again later." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(null) },
      }
    );
  }
};

serve(handler);
