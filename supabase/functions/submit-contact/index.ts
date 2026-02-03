import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    },
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
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
  const NOTIFY_TO = Deno.env.get("CONTACT_NOTIFY_TO") || "contact@where2studios.com";
  const FROM_EMAIL = Deno.env.get("CONTACT_FROM_EMAIL") || "no-reply@where2studios.com";

  const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const company = String(payload.company || "").trim();
  const phone = String(payload.phone || "").trim();
  const message = String(payload.message || "").trim();
  const page_url = String(payload.page_url || "").trim();

  if (!name || !email || !message) return json(400, { error: "Missing required fields" });
  if (!isValidEmail(email)) return json(400, { error: "Invalid email" });
  if (message.length > 5000) return json(400, { error: "Message too long" });

  const ip = getIp(req);
  const ua = req.headers.get("user-agent") || "";

  // Rate limits
  const ipOk = await supabaseAdmin.rpc("check_rate_limit", {
    p_key: `ip:${ip}`,
    p_max: 10,
    p_window_seconds: 3600
  });

  if (ipOk.error) return json(500, { error: "Rate limit check failed" });
  if (ipOk.data === false) return json(429, { error: "Too many requests, try later" });

  const emailOk = await supabaseAdmin.rpc("check_rate_limit", {
    p_key: `email:${email}`,
    p_max: 3,
    p_window_seconds: 3600
  });

  if (emailOk.error) return json(500, { error: "Rate limit check failed" });
  if (emailOk.data === false) return json(429, { error: "Too many requests, try later" });

  // Insert submission
  const { error: insertErr } = await supabaseAdmin
    .from("contact_submissions")
    .insert([{
      name,
      email,
      company: company || null,
      phone: phone || null,
      message,
      page_url: page_url || null,
      ip_address: ip,
      user_agent: ua,
    }]);

  if (insertErr) {
    console.error("Insert error:", insertErr);
    return json(500, { error: "Failed to save submission" });
  }

  // Send emails via Resend
  if (RESEND_API_KEY) {
    const notifyHtml = `
      <h2>New Where2Studios inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company) || "(none)"}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone) || "(none)"}</p>
      <p><strong>Page:</strong> ${escapeHtml(page_url) || "(unknown)"}</p>
      <h3>Message:</h3>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const autoReplyHtml = `
      <p>Hey ${escapeHtml(name)},</p>
      <p>We got your message and will follow up shortly.</p>
      <p>— Where2Studios</p>
    `;

    const sendEmail = async (to: string, subject: string, html: string) => {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
        });
        return r.ok;
      } catch (e) {
        console.error("Email send error:", e);
        return false;
      }
    };

    await Promise.all([
      sendEmail(NOTIFY_TO, "New inquiry – Where2Studios", notifyHtml),
      sendEmail(email, "We got your message – Where2Studios", autoReplyHtml)
    ]);
  }

  return json(200, { ok: true });
});

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
