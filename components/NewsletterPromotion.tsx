"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import styles from "./newsletter-promotion.module.css";

/**
 * A floating promotion popup for the newsletter.
 * It appears after a delay and can be dismissed.
 */
export function NewsletterPromotion() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // Default to true to prevent flash
  const pathname = usePathname();

  useEffect(() => {
    // Don't show on the newsletter page itself
    if (pathname === "/newsletter") {
      setIsDismissed(true);
      return;
    }

    // Check if user has already dismissed the promotion
    const dismissed = localStorage.getItem("newsletter-promo-dismissed");
    if (!dismissed) {
      setIsDismissed(false);

      // Show after a delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("newsletter-promo-dismissed", "true");
    // Remove from DOM after transition
    setTimeout(() => setIsDismissed(true), 600);
  };

  if (isDismissed || pathname === "/newsletter") return null;

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ""}`}
      onClick={handleDismiss}
      aria-label="Close newsletter promotion"
      role="presentation"
    >
      <div
        id="newsletter-promo"
        className={`${styles.container} ${isVisible ? styles.visible : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Newsletter Promotion"
        aria-modal="true"
      >
        <button
          onClick={handleDismiss}
          className={styles.closeBtn}
          aria-label="Close promotion"
        >
          ✕
        </button>

        <div className={styles.iconLarge} aria-hidden="true">🍓</div>

        <div className={styles.text}>
          <h3 className={styles.title}>Don't miss out!</h3>
          <p className={styles.description}>
            Get the latest updates on all things Naomi Jon, directly into your inbox.
          </p>
        </div>

        <Button
          href="/newsletter"
          className={styles.actionBtn}
          onClick={() => {
            localStorage.setItem("newsletter-promo-dismissed", "true");
          }}
        >
          Join the Newsletter
        </Button>
      </div>
    </div>
  );
}
