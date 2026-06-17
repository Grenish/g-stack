import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("⚠️ Warning: RESEND_API_KEY environment variable is not defined.");
}

export const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

/**
 * Sends a transactional email using Resend.
 * Node.js SDK returns { data, error } instead of throwing errors.
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = "onboarding@resend.dev",
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });

  if (error) {
    console.error("❌ Email sending failed:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}
