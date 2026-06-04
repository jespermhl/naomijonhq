"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";

/**
 * A floating promotion popup for the newsletter.
 * It appears after a delay and can be dismissed.
 */
export function NewsletterPromotion() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/newsletter") {
      return;
    }

    const dismissed = localStorage.getItem("newsletter-promo-dismissed");
    if (dismissed) {
      return;
    }

    setHasMounted(true);

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("newsletter-promo-dismissed", "true");
  };

  if (!hasMounted || pathname === "/newsletter") {
    return null;
  }

  const isCurrentlyDismissed =
    typeof window !== "undefined" &&
    localStorage.getItem("newsletter-promo-dismissed") === "true";

  if (isCurrentlyDismissed && !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-1000 flex items-center justify-center p-6 transition-all duration-500 ${
        isVisible
          ? "bg-black/30 pointer-events-auto backdrop-blur-[6px]"
          : "bg-transparent pointer-events-none"
      }`}
      onClick={handleDismiss}
      aria-label="Close newsletter promotion"
      role="presentation"
    >
      <div
        id="newsletter-promo"
        className={`glass-panel rounded-[30px] px-8 pt-10 pb-8 w-full max-w-[400px] relative flex flex-col items-center gap-4 text-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:px-6 max-sm:py-8 max-sm:rounded-[26px] max-sm:max-w-full ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.85] translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Newsletter Promotion"
        aria-modal="true"
      >
        <button
          onClick={handleDismiss}
          className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-pink-100 rounded-full text-brand-red flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 shadow-md cursor-pointer"
          aria-label="Close promotion"
        >
          <svg
            className="w-4 h-4 stroke-current stroke-[2.5]"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-black text-brand-red m-0 max-sm:text-xl">
            Don&apos;t miss out!
          </h3>
          <p className="text-[15px] text-text-dark font-semibold leading-relaxed m-0 max-sm:text-[14px]">
            Get the latest updates on all things Naomi Jon, directly into your
            inbox.
          </p>
        </div>

        <Button
          href="/newsletter"
          className="w-full mt-2"
          rotate="0deg"
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
