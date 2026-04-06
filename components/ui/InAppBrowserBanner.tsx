"use client";

import { useEffect, useState } from "react";

/**
 * A banner that appears only when the page is opened in an in-app browser
 * like Instagram, TikTok, or Facebook, suggesting to open in a system browser.
 */
/**
 * Helper function to detect if the current environment is a mobile in-app browser.
 * Uses a safe check for the legacy window.opera property and types.
 */
function detectInApp(): boolean {
  if (typeof window === "undefined") return false;

  const win = window as Window & { opera?: string };
  const ua = navigator.userAgent || navigator.vendor || win.opera || "";

  return (
    ua.includes("Instagram") ||
    ua.includes("TikTok") ||
    ua.includes("FBAN") ||
    ua.includes("FBAV")
  );
}

/**
 * A banner that appears only when the page is opened in an in-app browser
 * like Instagram, TikTok, or Facebook, suggesting to open in a system browser.
 */
export function InAppBrowserBanner() {
  const [isInApp] = useState(() => detectInApp());

  useEffect(() => {
    if (isInApp) {
      document.body.classList.add("has-in-app-banner");
      return () => {
        document.body.classList.remove("has-in-app-banner");
      };
    }
  }, [isInApp]);

  if (!isInApp) return null;

  return (
    <div className="in-app-banner">
      <div className="in-app-content">
        <span className="banner-text">
          Open in system browser if form doesn’t appear
        </span>
        <div className="arrow-container">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow-icon"
          >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
