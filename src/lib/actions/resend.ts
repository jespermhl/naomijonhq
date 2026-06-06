"use server";

import { Resend } from "resend";
import z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;

const schema = z.object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().min(1, "Please enter your email").email("Invalid email address"),
    subject: z.string().min(1, "Please enter a subject"),
    message: z.string().min(1, "Please enter a message"),
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
            to: [toEmail!],
            subject: `${subject} - Message from Contact Form`,
            text: `${message}`,
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to send email. Please try again." };
    }
}