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
          Taking you back to the HQ in a moment...
        </p>
        <Link
          href="/"
          className="inline-block bg-brand-red text-white px-7 py-3.5 rounded-xl no-underline font-black text-base mt-5 border-[3px] border-black shadow-[4px_4px_0px_#000] transition-all duration-200 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
        >
          Back to Home Now
        </Link>
      </Card>
    </main>
  );
}
