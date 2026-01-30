import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactRequest = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      throw new Error("Missing required fields: name, email, message");
    }

    // 1. Send internal notification email
    const internalEmailResponse = await resend.emails.send({
      from: "Where2Studios <notifications@where2studios.com>",
      to: ["contact@where2studios.com"],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ""}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
        ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ""}
        ${data.referral ? `<p><strong>Referral:</strong> ${data.referral}</p>` : ""}
        <hr />
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
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
          <h1 style="color: #14180A; font-size: 24px; margin-bottom: 20px;">Thanks for reaching out, ${data.name}!</h1>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            We've received your message and are excited to learn more about your project.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            A member of our team will get back to you within <strong>24 hours</strong>.
          </p>
          
          <div style="background: #FFF8EE; padding: 20px; border-radius: 12px; margin: 30px 0;">
            <p style="color: #14180A; font-size: 14px; margin: 0;">
              <strong>Your message:</strong><br>
              ${data.message.replace(/\n/g, "<br>")}
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
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
