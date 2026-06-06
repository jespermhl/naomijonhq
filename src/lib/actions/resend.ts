"use server";

import { Resend } from "resend";
import z from "zod";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is required");
}
if (!process.env.TO_EMAIL) {
    throw new Error("TO_EMAIL environment variable is required");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;

const schema = z.object({
    name: z.string().min(1, { error: "Please enter your name" }),
    email: z.email({ error: "Invalid email address" }),
    subject: z.string().min(1, { error: "Please enter a subject" }),
    message: z.string().min(1, { error: "Please enter a message" }),
});

export async function sendEmailAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const parsed = schema.safeParse({
        name,
        email,
        subject,
        message,
    });

    if (!parsed.success) {
        return { success: false, error: parsed.error.message };
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
        console.error(error);
        return { success: false, error: "Failed to send email. Please try again." };
    }
}