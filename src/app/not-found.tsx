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
    <main className="bg-pattern flex min-h-screen items-center justify-center p-5">
      <Card
        maxWidth="460px"
        rotated={false}
        className="px-10 py-15 text-center max-sm:px-5 max-sm:py-10"
      >
        <div className="animate-wobble mb-4 inline-block text-7xl max-sm:mb-2 max-sm:text-[64px]">
          🍓
        </div>
        <h1 className="text-brand-red mb-8 text-center text-3xl leading-tight font-black">
          Page Not Found
        </h1>
        <p className="text-text-dark mb-10 text-center text-[17px] leading-relaxed font-semibold">
          Oops! We couldn&apos;t find that link.
          <br />
          Taking you back to the home page in a moment...
        </p>
        <Link
          href="/"
          className="bg-brand-red block flex-1 rotate-1 rounded-full border border-white/80 px-5 py-3 text-center text-lg font-black text-white! no-underline shadow-[0_8px_0_rgba(255,79,168,0.28)] transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] will-change-transform hover:-translate-y-1 hover:scale-105 hover:rotate-0 hover:shadow-[0_12px_0_rgba(255,79,168,0.34)] active:scale-95 max-sm:py-2.5 max-sm:text-sm"
        >
          Back to Home Now
        </Link>
      </Card>
    </main>
  );
}
