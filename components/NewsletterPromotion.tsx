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
  const [isDismissed, setIsDismissed] = useState(true); // start hidden until the client decides whether to show it
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/newsletter") {
      return;
    }

    const dismissed = localStorage.getItem("newsletter-promo-dismissed");
    if (dismissed) {
      return;
    }

    if (isDismissed) {
      const revealTimer = window.setTimeout(() => {
        setIsDismissed(false);
      }, 0);

      return () => window.clearTimeout(revealTimer);
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [pathname, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("newsletter-promo-dismissed", "true");
    setTimeout(() => setIsDismissed(true), 600);
  };

  if (isDismissed || pathname === "/newsletter") return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-6 transition-all duration-400 ${isVisible ? "bg-black/55 pointer-events-auto backdrop-blur-[3px]" : "bg-transparent pointer-events-none"}`}
      onClick={handleDismiss}
      aria-label="Close newsletter promotion"
      role="presentation"
    >
      <div
        id="newsletter-promo"
        className={`bg-white border-4 border-brand-red rounded-[28px] px-8 pt-9 pb-7 w-full max-w-[380px] shadow-[10px_10px_0px_var(--color-brand-red)] relative flex flex-col items-center gap-3.5 text-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:px-5 max-sm:py-8 max-sm:pb-6 max-sm:rounded-3xl max-sm:shadow-[6px_6px_0px_var(--color-brand-red)] max-sm:max-w-full ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-85 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Newsletter Promotion"
        aria-modal="true"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 bg-none border-none text-lg cursor-pointer text-brand-red p-1 flex items-center justify-center transition-transform duration-200 hover:scale-120 hover:rotate-90"
          aria-label="Close promotion"
        >
          ✕
        </button>

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-black text-brand-red m-0 max-sm:text-xl">Don&apos;t miss out!</h3>
          <p className="text-[15px] text-text-dark font-semibold leading-relaxed m-0 max-sm:text-[14px]">
            Get the latest updates on all things Naomi Jon, directly into your inbox.
          </p>
        </div>

        <Button
          href="/newsletter"
          className="w-full mt-1"
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
