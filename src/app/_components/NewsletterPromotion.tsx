"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function NewsletterPromotion() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/newsletter" || pathname === "/") {
      return;
    }

    const dismissed = localStorage.getItem("newsletter-promo-dismissed");
    if (dismissed) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("newsletter-promo-dismissed", "true");
  };

  const isDismissed =
    typeof window !== "undefined" &&
    localStorage.getItem("newsletter-promo-dismissed") === "true";

  if (pathname === "/newsletter" || pathname === "/") {
    return null;
  }

  if (isDismissed && !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-1000 flex items-center justify-center p-6 transition-all duration-500 ${
        isVisible
          ? "pointer-events-auto bg-black/30 backdrop-blur-[6px]"
          : "pointer-events-none bg-transparent"
      }`}
      onClick={handleDismiss}
      role="presentation"
    >
      {isVisible && (
        <div
          id="newsletter-promo"
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter signup"
          className="glass-panel relative flex w-full max-w-100 flex-col items-center gap-4 rounded-[30px] px-8 pt-10 pb-8 text-center max-sm:max-w-full max-sm:rounded-[26px] max-sm:px-6 max-sm:py-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleDismiss}
            className="text-brand-red absolute -top-3 -right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-pink-100 bg-white shadow-md transition-transform duration-200 hover:scale-110 active:scale-95"
            aria-label="Close promotion"
          >
            <svg
              className="h-4 w-4 stroke-current stroke-[2.5]"
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
            <h3 className="text-brand-red m-0 text-2xl font-black max-sm:text-xl">
              Don&apos;t miss out!
            </h3>
            <p className="text-text-dark m-0 text-[15px] leading-relaxed font-semibold max-sm:text-[14px]">
              Get the latest updates on all things Naomi Jon, directly into your
              inbox.
            </p>
          </div>

          <Button
            href="/newsletter"
            className="mt-2 w-full"
            rotate="0deg"
            onClick={() => {
              localStorage.setItem("newsletter-promo-dismissed", "true");
            }}
          >
            Join the Newsletter
          </Button>
        </div>
      )}
    </div>
  );
}
