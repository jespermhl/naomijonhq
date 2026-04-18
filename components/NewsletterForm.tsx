"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions/klaviyo";
import { Button } from "./ui/Button";
import styles from "./newsletter-form.module.css";

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
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  }

  if (status === "success") {
    return (
      <div
        id="newsletter-success"
        className={`${styles.status} ${styles.successState} wobble`}
        role="status"
        aria-live="polite"
      >
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className={styles.input}
            aria-label="Email address for newsletter"
            aria-describedby={
              status === "error" ? "newsletter-error" : undefined
            }
            aria-invalid={status === "error"}
          />
          {status === "error" && (
            <p
              id="newsletter-error"
              className={styles.errorMessage}
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
          className={styles.submitBtn}
          rotate="0deg"
        >
          {status === "loading" ? "Joining..." : "Join the Newsletter"}
        </Button>

        <p className={styles.disclaimer}>
          By signing up, you agree to receive marketing emails from Naomi Jon
          HQ. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
