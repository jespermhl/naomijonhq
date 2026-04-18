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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    console.log("Submitting email:", email);

    try {
      const result = await subscribeToNewsletter(email);
      console.log("Subscription result:", result);

      if (result.success) {
        setStatus("success");
        setMessage("Yay! Check your inbox to confirm your subscription. ✨");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  }

  if (status === "success") {
    return (
      <div className="newsletter-status success-state wobble">
        <div className="status-icon">🍓</div>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="newsletter-form-container">
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="newsletter-input"
          />
          {status === "error" && (
            <p className="error-message">
              <span>⚠️</span> {message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="newsletter-submit-btn"
          rotate="0deg"
        >
          {status === "loading" ? "Joining..." : "Join the Newsletter"}
        </Button>

        <p className="newsletter-disclaimer">
          By signing up, you agree to receive marketing emails from Naomi Jon HQ.
          You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
