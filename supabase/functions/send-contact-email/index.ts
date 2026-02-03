import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Brand colors
const BRAND = {
  background: "#FFF7ED",
  surface: "#FFFFFF",
  surfaceAlt: "#F6E6D6",
  text: "#231C16",
  textMuted: "#6F635B",
  primary: "#E07A5F",
  accent: "#D9A441",
  border: "#E7D1BE",
};

const LOGO_URL = "https://ndnuwfsuanbjjtfflbfc.supabase.co/storage/v1/object/public/email-assets/logo-circle.png";
const CAL_LINK = "https://cal.com/where2studios/intro";

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
  website?: string; // Honeypot field
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
const RATE_LIMIT_WINDOW_SECONDS = 3600; // 1 hour
const MAX_SUBMISSIONS_PER_IP = 5;
const MAX_SUBMISSIONS_PER_EMAIL = 3;

// Internal notification email template
function buildInternalEmail(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  referral: string;
  message: string;
  timestamp: string;
}): string {
  const pill = (text: string) => `
    <span style="display: inline-block; background: ${BRAND.surfaceAlt}; color: ${BRAND.text}; padding: 4px 12px; border-radius: 16px; font-size: 13px; font-weight: 500;">
      ${text}
    </span>
  `;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="${LOGO_URL}" alt="Where2Studios" width="80" height="80" style="border-radius: 50%;">
    </div>
    
    <!-- Header -->
    <div style="background: ${BRAND.surface}; border-radius: 16px; padding: 32px; border: 1px solid ${BRAND.border}; margin-bottom: 24px;">
      <h1 style="margin: 0 0 8px 0; color: ${BRAND.text}; font-size: 24px; font-weight: 700;">
        New Lead 🎬
      </h1>
      <p style="margin: 0; color: ${BRAND.textMuted}; font-size: 14px;">
        ${data.timestamp}
      </p>
    </div>
    
    <!-- Contact Details Table -->
    <div style="background: ${BRAND.surface}; border-radius: 16px; padding: 24px; border: 1px solid ${BRAND.border};">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px; width: 100px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px; font-weight: 600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">
            <a href="mailto:${data.email}" style="color: ${BRAND.primary}; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">
            <a href="tel:${data.phone}" style="color: ${BRAND.primary}; text-decoration: none;">${data.phone}</a>
          </td>
        </tr>
        ` : ""}
        ${data.company ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">${data.company}</td>
        </tr>
        ` : ""}
        ${data.service ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Service</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">${pill(data.service)}</td>
        </tr>
        ` : ""}
        ${data.budget ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Budget</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">${pill(data.budget)}</td>
        </tr>
        ` : ""}
        ${data.timeline ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Timeline</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">${data.timeline}</td>
        </tr>
        ` : ""}
        ${data.referral ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px;">Referral</td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px;">${data.referral}</td>
        </tr>
        ` : ""}
        <tr>
          <td colspan="2" style="padding: 16px 0 0 0;">
            <div style="color: ${BRAND.textMuted}; font-size: 13px; margin-bottom: 8px;">Message</div>
            <div style="color: ${BRAND.text}; font-size: 14px; line-height: 1.6; background: ${BRAND.surfaceAlt}; padding: 16px; border-radius: 12px;">
              ${data.message}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
  `;
}

// Client confirmation email template
function buildClientEmail(data: {
  name: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="${LOGO_URL}" alt="Where2Studios" width="80" height="80" style="border-radius: 50%;">
    </div>
    
    <!-- Main Content -->
    <div style="background: ${BRAND.surface}; border-radius: 16px; padding: 40px 32px; border: 1px solid ${BRAND.border}; text-align: center;">
      <h1 style="margin: 0 0 16px 0; color: ${BRAND.text}; font-size: 28px; font-weight: 700;">
        Thanks for reaching out! 🎬
      </h1>
      <p style="margin: 0 0 24px 0; color: ${BRAND.textMuted}; font-size: 16px; line-height: 1.6;">
        Hey ${data.name}, we've received your message and are excited to learn more about your project!
      </p>
      <p style="margin: 0 0 32px 0; color: ${BRAND.text}; font-size: 16px; line-height: 1.6;">
        A member of our team will get back to you within <strong>24 hours</strong>.
      </p>
      
      <!-- CTA Button -->
      <a href="${CAL_LINK}" style="display: inline-block; background: ${BRAND.primary}; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
        Book a Discovery Call
      </a>
      
      <p style="margin: 24px 0 0 0; color: ${BRAND.textMuted}; font-size: 14px;">
        Skip the wait—schedule a call now!
      </p>
    </div>
    
    <!-- Your Message Summary -->
    <div style="background: ${BRAND.surface}; border-radius: 16px; padding: 24px; border: 1px solid ${BRAND.border}; margin-top: 24px;">
      <h3 style="margin: 0 0 12px 0; color: ${BRAND.textMuted}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
        Your Message
      </h3>
      <p style="margin: 0; color: ${BRAND.text}; font-size: 14px; line-height: 1.6;">
        ${data.message}
      </p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid ${BRAND.border};">
      <p style="margin: 0 0 8px 0; color: ${BRAND.text}; font-size: 14px; font-weight: 600;">
        Where2Studios
      </p>
      <p style="margin: 0 0 16px 0; color: ${BRAND.textMuted}; font-size: 13px;">
        Bay Area, CA
      </p>
      <a href="https://where2studios.com" style="color: ${BRAND.primary}; text-decoration: none; font-size: 13px;">
        where2studios.com
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactRequest = await req.json();

    // Honeypot check - if website field is filled, it's a bot
    if (data.website && data.website.trim() !== "") {
      console.log("Honeypot triggered, rejecting submission");
      return new Response(
        JSON.stringify({ success: true }), // Fake success to confuse bots
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Please provide your name, email, and message." 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get client identifier for rate limiting
    const ipIdentifier = req.headers.get("x-forwarded-for") || 
                         req.headers.get("x-real-ip") || 
                         "unknown";
    const emailIdentifier = data.email.toLowerCase();

    // Check rate limits using atomic database function
    const [ipRateLimit, emailRateLimit] = await Promise.all([
      supabaseAdmin.rpc("check_rate_limit", {
        p_key: `contact_ip:${ipIdentifier}`,
        p_max: MAX_SUBMISSIONS_PER_IP,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS
      }),
      supabaseAdmin.rpc("check_rate_limit", {
        p_key: `contact_email:${emailIdentifier}`,
        p_max: MAX_SUBMISSIONS_PER_EMAIL,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS
      })
    ]);

    if (ipRateLimit.error || !ipRateLimit.data) {
      console.log(`IP rate limit exceeded for ${ipIdentifier}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many submissions. Please try again later." 
        }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (emailRateLimit.error || !emailRateLimit.data) {
      console.log(`Email rate limit exceeded for ${emailIdentifier}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many submissions from this email. Please try again later." 
        }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Save to database
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

    const timestamp = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });

    // Send both emails in parallel
    const [internalEmailResponse, confirmationEmailResponse] = await Promise.all([
      resend.emails.send({
        from: "Where2Studios <notifications@where2studios.com>",
        to: ["contact@where2studios.com"],
        subject: `🎬 New Lead: ${safeName}${safeCompany ? ` from ${safeCompany}` : ""}`,
        html: buildInternalEmail({
          name: safeName,
          email: safeEmail,
          company: safeCompany,
          phone: safePhone,
          service: safeService,
          budget: safeBudget,
          timeline: safeTimeline,
          referral: safeReferral,
          message: safeMessage,
          timestamp,
        }),
      }),
      resend.emails.send({
        from: "Where2Studios <no-reply@where2studios.com>",
        to: [data.email],
        subject: "Thanks for reaching out to Where2Studios! 🎬",
        html: buildClientEmail({
          name: safeName,
          message: safeMessage,
        }),
      })
    ]);

    console.log("Emails sent:", { internal: internalEmailResponse, confirmation: confirmationEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        internal: internalEmailResponse,
        confirmation: confirmationEmailResponse 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "We're unable to process your request at this time. Please try again later." 
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
