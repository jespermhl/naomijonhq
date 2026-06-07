"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

/**
 * Custom 404 handler that automatically redirects to the Home hub.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Graceful redirect to home after a short delay
    const timer = setTimeout(() => {
      router.replace("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen p-5 bg-pattern">
      <Card maxWidth="460px" rotated={false} className="text-center py-15 px-10 max-sm:px-5 max-sm:py-10">
        <div className="text-7xl mb-4 inline-block animate-wobble max-sm:text-[64px] max-sm:mb-2">🍓</div>
        <h1 className="text-3xl font-black mb-8 text-brand-red leading-tight text-center">Page Not Found</h1>
        <p className="text-text-dark text-[17px] leading-relaxed mb-10 font-semibold text-center">
          Oops! We couldn&apos;t find that link.
          <br />
          Taking you back to the home page in a moment...
        </p>
        <Link
          href="/"
          className="bg-brand-red border-white/80 shadow-[0_8px_0_rgba(255,79,168,0.28)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_12px_0_rgba(255,79,168,0.34)] block flex-1 rotate-1 rounded-full border py-3 px-5 text-center text-lg font-black !text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105 active:scale-95 will-change-transform max-sm:py-2.5 max-sm:text-sm"
        >
          Back to Home Now
        </Link>
      </Card>
    </main>
  );
}
