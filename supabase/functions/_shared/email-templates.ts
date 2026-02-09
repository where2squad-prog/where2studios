// Shared email templates for Where2Studios contact form emails

export type InquiryPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  referral?: string;
  pageUrl?: string;
  createdAt?: string;
};

const BRAND = {
  bg: "#FFFBF5",
  text: "#231C16",
  coral: "#E07A5F",
  coralDark: "#C4604A",
  gold: "#D9A441",
  border: "#E7D5C0",
  muted: "#7A6E63",
  cardBg: "#FFFFFF",
};

const LOGO_URL =
  "https://ndnuwfsuanbjjtfflbfc.supabase.co/storage/v1/object/public/email-assets/logo-circle.png";
const CAL_URL = "https://cal.com/where2studios/intro";
const WORK_URL = "https://where2studios.com/work";
const SITE_URL = "https://where2studios.com";

// ── Helpers ──────────────────────────────────────────────

export function escapeHtml(input: string): string {
  return (input || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function shortenPageUrl(pageUrl?: string): string {
  if (!pageUrl) return "";
  try {
    const u = new URL(pageUrl);
    return `${u.origin}${u.pathname}`;
  } catch {
    return pageUrl;
  }
}

export function parseAttribution(pageUrl?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!pageUrl) return out;
  try {
    const u = new URL(pageUrl);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"]) {
      const v = u.searchParams.get(k);
      if (v) out[k] = v;
    }
  } catch { /* ignore */ }
  return out;
}

// ── Reusable components ──────────────────────────────────

function renderButton(label: string, href: string, primary = true): string {
  const bg = primary ? BRAND.coral : "transparent";
  const color = primary ? "#FFFFFF" : BRAND.coral;
  const border = primary ? BRAND.coral : BRAND.coral;
  return `<a href="${escapeHtml(href)}" target="_blank" style="display:inline-block;background:${bg};color:${color};border:2px solid ${border};padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;font-family:Inter,'Helvetica Neue',Arial,sans-serif;mso-padding-alt:0;text-align:center;">${escapeHtml(label)}</a>`;
}

function renderShell(opts: {
  title: string;
  preheader?: string;
  contentHtml: string;
}): string {
  const preheader = escapeHtml(opts.preheader || "");
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>${escapeHtml(opts.title)}</title>
<!--[if mso]><style>table,td{font-family:Arial,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.bg};">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

<!-- Logo -->
<tr><td align="center" style="padding-bottom:28px;">
<img src="${LOGO_URL}" alt="Where2Studios" width="56" height="56" style="display:block;border-radius:50%;border:0;"/>
</td></tr>

<!-- Card -->
<tr><td style="background:${BRAND.cardBg};border-radius:16px;border:1px solid ${BRAND.border};overflow:hidden;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:36px 32px;">
${opts.contentHtml}
</td></tr>
</table>
</td></tr>

<!-- Footer -->
<tr><td align="center" style="padding-top:28px;">
<p style="margin:0 0 6px;color:${BRAND.text};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:600;">Where2Studios</p>
<p style="margin:0 0 4px;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:12px;">Full-service video production · Bay Area, CA</p>
<p style="margin:0;font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:12px;">
<a href="${SITE_URL}" style="color:${BRAND.coral};text-decoration:none;">where2studios.com</a>
</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Detail row for internal email ────────────────────────

function detailRow(label: string, valueHtml: string): string {
  if (!valueHtml || valueHtml === "—") return "";
  return `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:100px;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:10px 0 10px 12px;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;">${valueHtml}</td>
</tr>`;
}

// ── Client confirmation email ────────────────────────────

export function renderClientConfirmationEmail(payload: InquiryPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const name = payload.name?.trim() || "there";
  const msg = payload.message?.trim() || "";
  const pageShort = shortenPageUrl(payload.pageUrl);

  const contentHtml = `
<h1 style="margin:0 0 8px;color:${BRAND.text};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:24px;font-weight:700;">Message received 🎬</h1>
<p style="margin:0 0 24px;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.6;">
Hey ${escapeHtml(name)}, thanks for reaching out! We're excited to learn about your project and will follow up within <strong style="color:${BRAND.text};">24 hours</strong>.
</p>
<p style="margin:0 0 8px;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:14px;">Want to move faster?</p>

<!-- Buttons -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
<tr>
<td style="padding-right:12px;">${renderButton("Book a Discovery Call", CAL_URL)}</td>
<td>${renderButton("View Our Work", WORK_URL, false)}</td>
</tr>
</table>

<!-- Divider -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${BRAND.border};padding-top:24px;">
<p style="margin:0 0 10px;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your message</p>
<p style="margin:0;color:${BRAND.text};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.7;background:${BRAND.bg};padding:16px;border-radius:10px;">${escapeHtml(msg || "No message provided").replace(/\n/g, "<br/>")}</p>
</td></tr></table>
${pageShort ? `<p style="margin:16px 0 0;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:12px;">Sent from: ${escapeHtml(pageShort)}</p>` : ""}`;

  const text = [
    `Hey ${name},`,
    "",
    "Thanks for reaching out to Where2Studios! We've received your message and will follow up within 24 hours.",
    "",
    `Book a discovery call: ${CAL_URL}`,
    `View our work: ${WORK_URL}`,
    "",
    "Your message:",
    msg || "No message provided",
    pageShort ? `\nSent from: ${pageShort}` : "",
    "",
    "— Where2Studios",
    "where2studios.com",
  ].filter(Boolean).join("\n");

  return {
    subject: "We got your message – Where2Studios 🎬",
    html: renderShell({
      title: "We got your message",
      preheader: "Thanks for reaching out — we'll follow up within 24 hours.",
      contentHtml,
    }),
    text,
  };
}

// ── Internal inquiry email ───────────────────────────────

export function renderInternalInquiryEmail(payload: InquiryPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const name = payload.name?.trim() || "Unknown";
  const email = payload.email?.trim() || "";
  const company = payload.company?.trim() || "";
  const phone = payload.phone?.trim() || "";
  const service = payload.service?.trim() || "";
  const budget = payload.budget?.trim() || "";
  const timeline = payload.timeline?.trim() || "";
  const referral = payload.referral?.trim() || "";
  const message = payload.message?.trim() || "";
  const pageShort = shortenPageUrl(payload.pageUrl);
  const attrib = parseAttribution(payload.pageUrl);

  const subjectLine = `New inquiry – ${name}${company ? ` (${company})` : ""}`;

  const pill = (text: string) =>
    `<span style="display:inline-block;background:${BRAND.bg};color:${BRAND.text};padding:3px 10px;border-radius:12px;font-size:12px;font-weight:500;">${escapeHtml(text)}</span>`;

  const contentHtml = `
<h1 style="margin:0 0 6px;color:${BRAND.text};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:700;">New Inquiry 🎬</h1>
<p style="margin:0 0 20px;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:14px;">
${escapeHtml(name)}${company ? ` from <strong style="color:${BRAND.text};">${escapeHtml(company)}</strong>` : ""} submitted the contact form.
</p>

<!-- Action buttons -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
<tr>
${email ? `<td style="padding-right:10px;">${renderButton("Reply", `mailto:${escapeHtml(email)}`)}</td>` : ""}
${payload.pageUrl ? `<td>${renderButton("View Page", escapeHtml(pageShort || payload.pageUrl), false)}</td>` : ""}
${payload.pageUrl ? `<td>${renderButton("View Page", escapeHtml(pageShort || payload.pageUrl), false)}</td>` : ""}
</tr>
</table>

<!-- Details table -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${detailRow("Name", escapeHtml(name))}
${detailRow("Email", email ? `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND.coral};text-decoration:none;">${escapeHtml(email)}</a>` : "")}
${detailRow("Company", company ? escapeHtml(company) : "")}
${detailRow("Phone", phone ? `<a href="tel:${escapeHtml(phone)}" style="color:${BRAND.coral};text-decoration:none;">${escapeHtml(phone)}</a>` : "")}
${detailRow("Service", service ? pill(service) : "")}
${detailRow("Budget", budget ? pill(budget) : "")}
${detailRow("Timeline", timeline ? escapeHtml(timeline) : "")}
${detailRow("Referral", referral ? escapeHtml(referral) : "")}
${detailRow("Page", pageShort ? `<a href="${escapeHtml(payload.pageUrl || "")}" style="color:${BRAND.coral};text-decoration:none;">${escapeHtml(pageShort)}</a>` : "")}
${attrib.utm_source ? detailRow("Source", escapeHtml(attrib.utm_source)) : ""}
${attrib.utm_medium ? detailRow("Medium", escapeHtml(attrib.utm_medium)) : ""}
${attrib.utm_campaign ? detailRow("Campaign", escapeHtml(attrib.utm_campaign)) : ""}
${attrib.fbclid ? detailRow("FBCLID", escapeHtml(attrib.fbclid)) : ""}
</table>

<!-- Message -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
<tr><td>
<p style="margin:0 0 10px;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
<p style="margin:0;color:${BRAND.text};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.7;background:${BRAND.bg};padding:16px;border-radius:10px;">${escapeHtml(message || "No message provided").replace(/\n/g, "<br/>")}</p>
</td></tr>
</table>

${payload.createdAt ? `<p style="margin:16px 0 0;color:${BRAND.muted};font-family:Inter,'Helvetica Neue',Arial,sans-serif;font-size:11px;">Submitted: ${escapeHtml(payload.createdAt)}</p>` : ""}`;

  const text = [
    `New inquiry – Where2Studios`,
    "",
    `Name: ${name}`,
    email ? `Email: ${email}` : "",
    company ? `Company: ${company}` : "",
    phone ? `Phone: ${phone}` : "",
    service ? `Service: ${service}` : "",
    budget ? `Budget: ${budget}` : "",
    timeline ? `Timeline: ${timeline}` : "",
    referral ? `Referral: ${referral}` : "",
    pageShort ? `Page: ${pageShort}` : "",
    attrib.utm_source ? `Source: ${attrib.utm_source}` : "",
    attrib.utm_medium ? `Medium: ${attrib.utm_medium}` : "",
    attrib.utm_campaign ? `Campaign: ${attrib.utm_campaign}` : "",
    "",
    "Message:",
    message || "No message provided",
  ].filter(Boolean).join("\n");

  return {
    subject: subjectLine,
    html: renderShell({
      title: "New inquiry",
      preheader: `${name}${company ? ` from ${company}` : ""} submitted a contact form.`,
      contentHtml,
    }),
    text,
  };
}
