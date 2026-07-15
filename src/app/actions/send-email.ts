"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<ContactFormResult> {
  console.log("[Server Action] Received:", {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    messageLength: data.message?.length,
  });

  try {
    // ── Validation ─────────────────────────────────────────────
    if (!data.firstName?.trim() || data.firstName.trim().length < 2) {
      return { success: false, error: "First name must be at least 2 characters." };
    }
    if (!data.lastName?.trim() || data.lastName.trim().length < 2) {
      return { success: false, error: "Last name must be at least 2 characters." };
    }
    if (!data.email?.trim()) {
      return { success: false, error: "Email is required." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (!data.message?.trim() || data.message.trim().length < 10) {
      return { success: false, error: "Message must be at least 10 characters." };
    }
    if (data.message.length > 5000) {
      return { success: false, error: "Message must be less than 5000 characters." };
    }

    const sanitizedFirstName = data.firstName.trim().replace(/[^a-zA-Z\s'-]/g, "");
    const sanitizedLastName = data.lastName.trim().replace(/[^a-zA-Z\s'-]/g, "");
    const fullName = `${sanitizedFirstName} ${sanitizedLastName}`;
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanMessage = data.message.trim();

    const submittedAt = new Date().toLocaleString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", timeZoneName: "short",
    });

    console.log("[Server Action] Sending to info@euroenterprises.rent...");

    // ── SEND EMAIL TO info@euroenterprises.rent ONLY ───────────
    const { data: emailData, error } = await resend.emails.send({
          from: "Euro Enterprises <info@euroenterprises.rent>",

      to: ["info@euroenterprises.rent"],        // ← YOUR EMAIL - where YOU receive it
      replyTo: cleanEmail,                       // ← So you can reply to the user
      subject: `Contact Form: ${fullName}`,
      text: buildPlainText({ fullName, email: cleanEmail, message: cleanMessage, submittedAt }),
      html: buildEmailTemplate({ fullName, email: cleanEmail, message: cleanMessage, submittedAt }),
    });

    if (error) {
      console.error("[Resend] FAILED:", error);
      return { success: false, error: `Failed to send: ${error.message}` };
    }

    console.log("[Resend] SUCCESS! Email ID:", emailData?.id);
    return { success: true };

  } catch (err) {
    console.error("[Server Action] CRASH:", err);
    return { success: false, error: "Server error. Please try again." };
  }
}

function buildEmailTemplate(params: {
  fullName: string;
  email: string;
  message: string;
  submittedAt: string;
}): string {
  const { fullName, email, message, submittedAt } = params;

  const safeMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form - Euro Enterprises</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .header { background: #1e3a5f; padding: 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 20px; font-weight: 600; }
    .header p { color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px; }
    .content { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 12px; font-weight: 700; color: #1e3a5f; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; }
    .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .info-label { width: 100px; color: #64748b; font-size: 13px; font-weight: 500; }
    .info-value { flex: 1; color: #0f172a; font-size: 13px; font-weight: 600; }
    .info-value a { color: #2563eb; text-decoration: none; }
    .message-box { background: #f8fafc; border-left: 3px solid #2563eb; padding: 20px; border-radius: 0 8px 8px 0; }
    .message-box p { margin: 0; color: #334155; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
    .reply-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; text-align: center; margin-top: 24px; }
    .reply-box p { margin: 0 0 12px; color: #1e40af; font-size: 13px; }
    .reply-box a { display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 13px; font-weight: 600; }
    .footer { border-top: 1px solid #f1f5f9; padding: 20px 32px; text-align: center; }
    .footer p { margin: 0; color: #94a3b8; font-size: 11px; }
    .footer a { color: #2563eb; text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .container { border-radius: 0 !important; }
      .header, .content, .footer { padding: 24px !important; }
      .info-row { flex-direction: column; }
      .info-label { width: 100%; margin-bottom: 4px; }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td style="padding: 24px 16px;">
      <div class="container">
        <div class="header">
          <h1>📩 New Contact Form Message</h1>
          <p>Euro Enterprises — euroenterprises.rent</p>
        </div>
        <div class="content">
          <div class="section">
            <p class="section-title">Sender Details</p>
            <div class="info-row">
              <span class="info-label">Name</span>
              <span class="info-value">${fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value"><a href="mailto:${email}">${email}</a></span>
            </div>
            <div class="info-row" style="border-bottom: none;">
              <span class="info-label">Date</span>
              <span class="info-value">${submittedAt}</span>
            </div>
          </div>
          <div class="section">
            <p class="section-title">Message</p>
            <div class="message-box">
              <p>${safeMessage}</p>
            </div>
          </div>
          <div class="reply-box">
            <p>Click below to reply directly to ${fullName.split(" ")[0]}</p>
            <a href="mailto:${email}">Reply to ${fullName.split(" ")[0]}</a>
          </div>
        </div>
        <div class="footer">
          <p>Sent from <a href="https://www.euroenterprises.rent/">euroenterprises.rent</a> contact form</p>
        </div>
      </div>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildPlainText(params: {
  fullName: string;
  email: string;
  message: string;
  submittedAt: string;
}): string {
  return `New Contact Form Message — Euro Enterprises

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SENDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:  ${params.fullName}
Email: ${params.email}
Date:  ${params.submittedAt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${params.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply to this email to respond to ${params.fullName}.

—
Euro Enterprises
https://www.euroenterprises.rent/`;
}