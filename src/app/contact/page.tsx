"use client";

import { useState } from "react";
import { sendEmailAction } from "@/lib/actions/resend";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type FieldErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function validateField(name: string, value: string): string | undefined {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return undefined;
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Please enter a valid email address";
      return undefined;
    case "subject":
      if (!value.trim()) return "Subject is required";
      return undefined;
    case "message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters";
      return undefined;
    default:
      return undefined;
  }
}

export default function ContactPage() {
  return (
    <div className="relative flex w-full flex-col">
      <main className="relative z-20 flex w-full flex-col">
        <ContactForm />
      </main>
    </div>
  );
}

function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const contactPoints = [
    {
      label: "Email",
      value: "info@naomijonhq.com",
      href: "mailto:info@naomijonhq.com",
    },
  ];

  function validateForm(formData: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const nameErr = validateField("name", name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateField("email", email);
    if (emailErr) errors.email = emailErr;

    const subjectErr = validateField("subject", subject);
    if (subjectErr) errors.subject = subjectErr;

    const messageErr = validateField("message", message);
    if (messageErr) errors.message = messageErr;

    return errors;
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const errors = validateForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsPending(true);

    const result = await sendEmailAction(formData);

    setIsPending(false);
    if (result.success) {
      setStatus({ success: true, message: "Message sent successfully!" });
      setFieldErrors({});
      formElement.reset();
    } else {
      setStatus({
        success: false,
        message: result.error || "Something went wrong.",
      });
    }
  }

  function inputClass(error?: string) {
    return `w-full rounded-2xl border px-5 py-3.5 font-semibold shadow-sm backdrop-blur-sm transition-all outline-none ${
      error
        ? "border-brand-error/60 bg-red-50/60 focus:border-brand-error"
        : "border-white/80 bg-white/40 focus:border-brand-red focus:bg-white/60"
    } text-text-dark placeholder-text-muted/40`;
  }

  return (
    <section className="flex min-h-[calc(100vh-140px)] w-full items-center px-6 pt-12 pb-20 max-sm:px-4 max-sm:pt-6 max-sm:pb-12">
      <div className="mx-auto w-full max-w-275">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col items-start space-y-8 lg:sticky lg:top-8 lg:max-w-130">
            <div className="space-y-6">
              <p className="text-brand-red text-xs font-black tracking-[0.18em] uppercase">
                Get In Touch
              </p>
              <h2 className="text-text-dark text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] font-black tracking-[-0.06em] uppercase">
                Say Hello
              </h2>
              <p className="text-text-muted text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed font-semibold">
                Questions, collaborations, or inquiries? <br />
                We&apos;d love to hear from you.
              </p>
            </div>

            <div className="border-text-dark/10 w-full space-y-4 border-t pt-4">
              {contactPoints.map((point, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <span className="text-brand-red flex items-center gap-1.5 text-xs font-black tracking-wider uppercase">
                    <span>✦</span> {point.label}
                  </span>
                  <a
                    href={point.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dark hover:text-brand-red w-fit text-lg font-bold transition-colors"
                  >
                    {point.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full rounded-4xl border border-white/60 bg-white/25 p-10 shadow-[0px_0px_48px_-10px_rgba(255,63,159,0.15)] backdrop-blur-md max-sm:p-6">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              {status && (
                <div
                  className={`rounded-xl border p-4 text-sm font-bold ${
                    status.success
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-brand-error/30 bg-red-50 text-brand-error"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="name"
                    className="text-text-dark text-sm font-black tracking-wider uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={inputClass(fieldErrors.name)}
                    placeholder="Jane Doe"
                    onBlur={handleBlur}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={
                      fieldErrors.name ? "name-error" : undefined
                    }
                  />
                  {fieldErrors.name && (
                    <p
                      id="name-error"
                      className="text-xs font-black text-brand-error"
                      role="status"
                      aria-live="assertive"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="email"
                    className="text-text-dark text-sm font-black tracking-wider uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={inputClass(fieldErrors.email)}
                    placeholder="jane@example.com"
                    onBlur={handleBlur}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={
                      fieldErrors.email ? "email-error" : undefined
                    }
                  />
                  {fieldErrors.email && (
                    <p
                      id="email-error"
                      className="text-xs font-black text-brand-error"
                      role="status"
                      aria-live="assertive"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="subject"
                  className="text-text-dark text-sm font-black tracking-wider uppercase"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className={inputClass(fieldErrors.subject)}
                  placeholder="What's this about?"
                  onBlur={handleBlur}
                  aria-invalid={!!fieldErrors.subject}
                  aria-describedby={
                    fieldErrors.subject ? "subject-error" : undefined
                  }
                />
                {fieldErrors.subject && (
                  <p
                    id="subject-error"
                    className="text-xs font-black text-brand-error"
                    role="status"
                    aria-live="assertive"
                  >
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="message"
                  className="text-text-dark text-sm font-black tracking-wider uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={`${inputClass(fieldErrors.message)} resize-none py-4`}
                  placeholder="Type your message here..."
                  onBlur={handleBlur}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={
                    fieldErrors.message ? "message-error" : undefined
                  }
                />
                {fieldErrors.message && (
                  <p
                    id="message-error"
                    className="text-xs font-black text-brand-error"
                    role="status"
                    aria-live="assertive"
                  >
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <div className="text-text-dark text-center text-sm font-light tracking-wider">
                By sending this contact form you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-brand-red hover:underline"
                >
                  privacy policy
                </Link>
                .
              </div>

              <Button
                type="submit"
                disabled={isPending}
                size="large"
                className="w-full"
                rotate="0deg"
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
