import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// ─── HTML escape ─────────────────────────────────────────────────────────────
// Prevents XSS when user-submitted content is injected into the email HTML.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── Email format validation ─────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── In-memory rate limiter ──────────────────────────────────────────────────
// 5 submissions per IP per hour. Resets on server restart (fine for portfolio).
// For production scale, replace with Upstash Redis ratelimit.
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) ?? {
    count: 0,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
}

// ─── Nodemailer transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    // Rate limit check
    const ip =
      req.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, message } = await req.json();

    // Field presence validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Email format validation
    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // Sanitise all user inputs before injecting into HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Build mailto link using the raw (but escaped) values
    const subject = encodeURIComponent("Re: Your enquiry to CloudRight");
    const body = encodeURIComponent(
      `Hi ${name.trim()},\n\nThanks for reaching out to CloudRight.\n\n`,
    );
    const replyLink = `mailto:${email.trim()}?subject=${subject}&body=${body}`;

    await transporter.sendMail({
      from: `"CloudRight Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email.trim(),
      subject: `New enquiry from ${safeName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Enquiry - CloudRight</title>
</head>
<body style="margin:0;padding:0;font-family:Helvetica, Arial, sans-serif;color:#1a1a2e;background:#fff;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:collapse;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:16px;">
              <h1 style="margin:0;font-size:22px;color:#1a1a2e;">New Contact Enquiry</h1>
              <p style="margin:4px 0 0;font-size:14px;color:#555;">from ${safeName}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:16px 0;">

              <!-- Sender Info -->
              <p style="margin:0 0 4px;font-weight:600;color:#555;">Sender Information</p>
              <p style="margin:2px 0;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin:2px 0;"><strong>Email:</strong>
                <a href="mailto:${safeEmail}" style="color:#d4af37;text-decoration:none;">${safeEmail}</a>
              </p>

              <!-- Message -->
              <p style="margin:16px 0 4px;font-weight:600;color:#555;">Message</p>
              <p style="margin:2px 0;line-height:1.6;color:#1a1a2e;white-space:pre-wrap;">
                ${safeMessage.replace(/\n/g, "<br/>")}
              </p>

              <!-- Reply CTA -->
              <p style="margin:16px 0 0;">
                <a href="${replyLink}"
                   style="display:inline-block;background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;font-size:13px;">
                  Reply to ${safeName} →
                </a>
                <span style="float:right;font-size:11px;color:#888;">${timestamp} IST</span>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;font-size:11px;color:#888;text-align:center;">
              This email was sent via the contact form on
              <a href="https://cloudright.in" style="color:#1a1a2e;text-decoration:none;font-weight:500;">
                cloudright.in
              </a>.<br/>
              &copy; ${new Date().getFullYear()} CloudRight. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again." },
      { status: 500 },
    );
  }
}
