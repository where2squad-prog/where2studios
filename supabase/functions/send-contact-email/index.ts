import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  renderClientConfirmationEmail,
  renderInternalInquiryEmail,
  escapeHtml,
  type InquiryPayload,
} from "../_shared/email-templates.ts";

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
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Rate limiting constants
const RATE_LIMIT_WINDOW_SECONDS = 3600;
const MAX_SUBMISSIONS_PER_IP = 5;
const MAX_SUBMISSIONS_PER_EMAIL = 3;

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactRequest = await req.json();

    // Honeypot check
    if (data.website && data.website.trim() !== "") {
      console.log("Honeypot triggered, rejecting submission");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please provide your name, email, and message.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email address." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Rate limiting
    const ipIdentifier =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const emailIdentifier = data.email.toLowerCase();

    const [ipRateLimit, emailRateLimit] = await Promise.all([
      supabaseAdmin.rpc("check_rate_limit", {
        p_key: `contact_ip:${ipIdentifier}`,
        p_max: MAX_SUBMISSIONS_PER_IP,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      }),
      supabaseAdmin.rpc("check_rate_limit", {
        p_key: `contact_email:${emailIdentifier}`,
        p_max: MAX_SUBMISSIONS_PER_EMAIL,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      }),
    ]);

    if (ipRateLimit.error || !ipRateLimit.data) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many submissions. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (emailRateLimit.error || !emailRateLimit.data) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many submissions from this email. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
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

    // Build shared payload
    const payload: InquiryPayload = {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      referral: data.referral,
      message: data.message,
      createdAt: new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }),
    };

    const internal = renderInternalInquiryEmail(payload);
    const confirmation = renderClientConfirmationEmail(payload);

    // Send both emails in parallel
    const [internalEmailResponse, confirmationEmailResponse] =
      await Promise.all([
        resend.emails.send({
          from: "Where2Studios <notifications@where2studios.com>",
          to: ["contact@where2studios.com"],
          reply_to: data.email,
          subject: internal.subject,
          html: internal.html,
          text: internal.text,
        }),
        resend.emails.send({
          from: "Where2Studios <no-reply@where2studios.com>",
          to: [data.email],
          subject: confirmation.subject,
          html: confirmation.html,
          text: confirmation.text,
        }),
      ]);

    console.log("Emails sent:", {
      internal: internalEmailResponse,
      confirmation: confirmationEmailResponse,
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "We're unable to process your request at this time. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
