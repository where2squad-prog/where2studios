/**
 * Secure contact form submission via edge function
 * Bypasses client-side Supabase and uses server-side rate limiting + validation
 */

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  referral?: string;
  message: string;
}

interface SubmitContactResponse {
  ok: boolean;
  error?: string;
}

export async function submitContact(formData: ContactFormData): Promise<SubmitContactResponse> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({
      ...formData,
      page_url: window.location.href,
    }),
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data?.error || "Failed to send message");
  }
  
  return data;
}
