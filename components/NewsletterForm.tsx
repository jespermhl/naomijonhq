"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions/klaviyo";
import { Button } from "./ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [{ status, message }, setState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setState({ status: "loading", message: "" });

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setState({
          status: "success",
          message: "Yay! Check your inbox to confirm your subscription. ✨",
        });
        setEmail("");
      } else {
        setState({
          status: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setState({ status: "error", message: "An unexpected error occurred." });
    }
  }

  return (
    <div className="mt-0 w-full pt-1">
      {status === "success" ? (
        <div
          id="newsletter-success"
          className="w-full rounded-3xl border border-white/80 bg-white/70 px-6 py-6 text-center font-sans shadow-[0_12px_30px_rgba(255,79,168,0.06)] backdrop-blur-md transition-all duration-300"
          role="status"
          aria-live="polite"
        >
          <p className="text-base font-extrabold leading-relaxed text-text-dark">
            {message}
          </p>
        </div>
      ) : (
        /* Tightened spacing between input, button, and legal disclaimer text */
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <div className="relative w-full">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
              className="w-full rounded-full border border-white/80 bg-white/92 px-6 py-3.5 font-sans text-base font-bold text-text-dark placeholder-[#b58a9d] outline-none shadow-[0_10px_25px_rgba(255,79,168,0.1)] transition-all duration-200 focus:-translate-y-0.5 focus:shadow-[0_14px_32px_rgba(255,79,168,0.14)] focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2"
              aria-label="Email address for newsletter"
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
              aria-invalid={status === "error"}
            />
            {status === "error" && (
              <p
                id="newsletter-error"
                className="mt-1.5 pl-1 text-left text-xs font-black text-brand-red"
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

          <p className="mt-1 text-center text-[10.5px] font-semibold leading-relaxed text-text-muted/80">
            By signing up, you agree to receive marketing emails from Naomi Jon HQ.
            You can unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}