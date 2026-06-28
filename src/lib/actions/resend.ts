"use server";

import { Resend } from "resend";
import z from "zod";
import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";

if (!env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is required");
}
if (!env.TO_EMAIL) {
  throw new Error("TO_EMAIL environment variable is required");
}

const resend = new Resend(env.RESEND_API_KEY);
const toEmail = env.TO_EMAIL;

const schema = z.object({
  name: z.string().min(1, { error: "Please enter your name" }),
  email: z.email({ error: "Invalid email address" }),
  subject: z.string().min(1, { error: "Please enter a subject" }),
  message: z.string().min(1, { error: "Please enter a message" }),
});

export async function sendEmailAction(formData: FormData) {
  const name = (formData.get("name") as string) || "";
  const email = (formData.get("email") as string) || "";
  const subject = (formData.get("subject") as string) || "";
  const message = (formData.get("message") as string) || "";

  const parsed = schema.safeParse({
    name,
    email,
    subject,
    message,
  });

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message).join(", ");
    return { success: false, error: errors };
  }

  try {
    await resend.emails.send({
      from: `${name} <contact-form@mails.naomijonhq.com>`,
      replyTo: `${name} <${email}>`,
      to: [toEmail],
      subject: `${subject} - Message from Contact Form`,
      text: `${message}`,
    });
    return { success: true };
  } catch (error) {
    logger.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
