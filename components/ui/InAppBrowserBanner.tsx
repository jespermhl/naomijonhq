"use client";

import { useEffect, useState } from "react";

/**
 * A banner that appears only when the page is opened in an in-app browser
 * like Instagram, TikTok, or Facebook, suggesting to open in a system browser.
 */
export function InAppBrowserBanner() {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInstagram = ua.indexOf("Instagram") > -1;
    const isTikTok = ua.indexOf("TikTok") > -1;
    const isFB = ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;

    if (isInstagram || isTikTok || isFB) {
      setIsInApp(true);
      document.body.classList.add('has-in-app-banner');
    }

    return () => {
      document.body.classList.remove('has-in-app-banner');
    }
  }, []);

  if (!isInApp) return null;

  return (
    <div className="in-app-banner">
      <div className="in-app-content">
        <span className="banner-text">Open in system browser for the best experience!</span>
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
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
