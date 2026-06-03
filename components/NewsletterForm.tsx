"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions/klaviyo";
import { Button } from "./ui/Button";

/**
 * A custom-designed newsletter signup form component.
 * Uses the Klaviyo server action to subscribe users.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setStatus("success");
        setMessage("Yay! Check your inbox to confirm your subscription. ✨");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  }

  if (status === "success") {
    return (
      <div
        id="newsletter-success"
        className="p-8 bg-white border-4 border-[#48bb78] rounded-3xl text-center shadow-[6px_6px_0px_#c6f6d5] font-sans text-base font-bold text-text-dark wobble"
        role="status"
        aria-live="polite"
      >
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="w-full mb-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="relative w-full">
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="w-full px-6 py-4 border-4 border-brand-red rounded-2xl font-sans text-base font-bold text-text-dark bg-white outline-none shadow-[4px_4px_0px_var(--color-brand-pink)] transition-all duration-200 focus-visible:outline-3 focus-visible:outline-brand-red focus-visible:outline-offset-2 focus:-translate-y-0.5 focus:shadow-[6px_6px_0px_var(--color-brand-pink)] placeholder-[#718096]"
            aria-label="Email address for newsletter"
            aria-describedby={
              status === "error" ? "newsletter-error" : undefined
            }
            aria-invalid={status === "error"}
          />
          {status === "error" && (
            <p
              id="newsletter-error"
              className="text-brand-red text-xs font-black mt-2 text-left pl-1"
              role="status"
              aria-live="assertive"
            >
              <span>⚠️</span> {message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full"
          rotate="0deg"
          size="large"
        >
          {status === "loading" ? "Joining..." : "Join the Newsletter"}
        </Button>

        <p className="text-[11px] text-text-muted leading-relaxed text-center mt-2 font-semibold">
          By signing up, you agree to receive marketing emails from Naomi Jon
          HQ. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}

