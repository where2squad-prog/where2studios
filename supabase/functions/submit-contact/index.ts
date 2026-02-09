import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  renderClientConfirmationEmail,
  renderInternalInquiryEmail,
  escapeHtml,
  type InquiryPayload,
} from "../_shared/email-templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function getIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for") || "";
  const first = xff.split(",")[0]?.trim();
  return first || "unknown";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
  const NOTIFY_TO = Deno.env.get("CONTACT_NOTIFY_TO") || "contact@where2studios.com";
  const FROM_ADDRESS = "Where2Studios <no-reply@where2studios.com>";

  const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  let rawPayload: Record<string, unknown>;
  try {
    rawPayload = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const name = String(rawPayload.name || "").trim();
  const email = String(rawPayload.email || "").trim().toLowerCase();
  const company = String(rawPayload.company || "").trim();
  const phone = String(rawPayload.phone || "").trim();
  const service = String(rawPayload.service || "").trim();
  const budget = String(rawPayload.budget || "").trim();
  const timeline = String(rawPayload.timeline || "").trim();
  const referral = String(rawPayload.referral || "").trim();
  const message = String(rawPayload.message || "").trim();
  const page_url = String(rawPayload.page_url || "").trim();

  if (!name || !email || !message) return json(400, { error: "Missing required fields" });
  if (!isValidEmail(email)) return json(400, { error: "Invalid email" });
  if (message.length > 5000) return json(400, { error: "Message too long" });

  const ip = getIp(req);
  const ua = req.headers.get("user-agent") || "";

  // Rate limits
  const ipOk = await supabaseAdmin.rpc("check_rate_limit", {
    p_key: `ip:${ip}`,
    p_max: 10,
    p_window_seconds: 3600,
  });
  if (ipOk.error) return json(500, { error: "Rate limit check failed" });
  if (ipOk.data === false) return json(429, { error: "Too many requests, try later" });

  const emailOk = await supabaseAdmin.rpc("check_rate_limit", {
    p_key: `email:${email}`,
    p_max: 3,
    p_window_seconds: 3600,
  });
  if (emailOk.error) return json(500, { error: "Rate limit check failed" });
  if (emailOk.data === false) return json(429, { error: "Too many requests, try later" });

  // Insert submission
  const { error: insertErr } = await supabaseAdmin
    .from("contact_submissions")
    .insert([
      {
        name,
        email,
        company: company || null,
        phone: phone || null,
        service: service || null,
        budget: budget || null,
        timeline: timeline || null,
        referral: referral || null,
        message,
        page_url: page_url || null,
        ip_address: ip,
        user_agent: ua,
      },
    ]);

  if (insertErr) {
    console.error("Insert error:", insertErr);
    return json(500, { error: "Failed to save submission" });
  }

  // Build email payload
  const payload: InquiryPayload = {
    name,
    email,
    company,
    phone,
    service,
    budget,
    timeline,
    referral,
    message,
    pageUrl: page_url,
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

  // Send emails via Resend
  if (RESEND_API_KEY) {
    const internal = renderInternalInquiryEmail(payload);
    const confirmation = renderClientConfirmationEmail(payload);

    const sendEmail = async (opts: {
      to: string;
      subject: string;
      html: string;
      text: string;
      reply_to?: string;
    }) => {
      try {
        const body: Record<string, unknown> = {
          from: FROM_ADDRESS,
          to: opts.to,
          subject: opts.subject,
          html: opts.html,
          text: opts.text,
        };
        if (opts.reply_to) body.reply_to = opts.reply_to;

        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (!r.ok) {
          const err = await r.text();
          console.error("Resend error:", err);
        }
        return r.ok;
      } catch (e) {
        console.error("Email send error:", e);
        return false;
      }
    };

    await Promise.all([
      sendEmail({
        to: NOTIFY_TO,
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
        reply_to: email,
      }),
      sendEmail({
        to: email,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
    ]);
  }

  return json(200, { ok: true });
});
