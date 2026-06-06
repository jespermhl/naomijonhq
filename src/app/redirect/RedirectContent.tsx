"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/src/components/ui/Card";
import { client } from "@/src/sanity/client";

const STATIC_ALLOWED_HOSTS = [
  "naomijonhq.com",
  "www.naomijonhq.com",
  "linktr.ee",
];

const FALLBACK_URL = "https://linktr.ee/naomijonhq";

interface SanityEntry {
  destination?: string;
  url?: string;
  buyUrl?: string;
}

export function RedirectContent() {
  const searchParams = useSearchParams();
  const rawTarget = searchParams.get("to");
  const source = searchParams.get("source");
  const [target, setTarget] = useState<string>(FALLBACK_URL);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    async function validateAndRedirect() {
      if (!rawTarget) {
        setTarget(FALLBACK_URL);
        setIsValidating(false);
        return;
      }

      if (rawTarget.startsWith("//")) {
        setTarget(FALLBACK_URL);
        setIsValidating(false);
        return;
      }

      if (rawTarget.includes("\\")) {
        // Continue to strict parsing
      } else if (rawTarget.startsWith("/") && !rawTarget.startsWith("//")) {
        setTarget(rawTarget);
        setIsValidating(false);
        return;
      }

      if (source) {
        try {
          const entry = await client.fetch<{ destination?: string }>(
            `*[_type == "redirect" && source == $source][0]{destination}`,
            { source },
          );
          if (entry?.destination) {
            const sanityDest = new URL(entry.destination).toString();
            if (sanityDest === new URL(rawTarget).toString()) {
              setTarget(rawTarget);
              setIsValidating(false);
              return;
            }
          }
        } catch {
          // fall through to static/hostname checks below
        }
      }

      try {
        const url = new URL(rawTarget);

        if (url.protocol !== "https:") {
          setTarget(FALLBACK_URL);
          setIsValidating(false);
          return;
        }

        const hostname = url.hostname;

        if (
          STATIC_ALLOWED_HOSTS.some(
            (h) => hostname === h || hostname.endsWith(`.${h}`),
          )
        ) {
          setTarget(rawTarget);
          setIsValidating(false);
          return;
        }

        const httpsHost = `https://${hostname}`;
        const query = `*[_type in ["redirect", "social", "concert"] && (
          string::startsWith(destination, $httpsHost) ||
          string::startsWith(url, $httpsHost) ||
          string::startsWith(buyUrl, $httpsHost)
        )]`;
        const results = await client.fetch<SanityEntry[]>(query, { httpsHost });

        const isFound = results.some((doc) => {
          const possibleUrls = [doc.destination, doc.url, doc.buyUrl].filter(
            (u): u is string => Boolean(u),
          );
          return possibleUrls.some((u) => {
            try {
              return new URL(u).hostname === hostname;
            } catch {
              return false;
            }
          });
        });

        if (isFound) {
          setTarget(rawTarget);
        } else {
          setTarget(FALLBACK_URL);
        }
      } catch {
        setTarget(FALLBACK_URL);
      } finally {
        setIsValidating(false);
      }
    }

    validateAndRedirect();
  }, [rawTarget, source]);

  useEffect(() => {
    if (!isValidating) {
      const timer = setTimeout(() => {
        window.location.href = target;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [target, isValidating]);

  return (
    <>
      {/* Self-contained micro-animations for dot-pulsing loading indicator */}
      <style>{`
        @keyframes custom-dot-pulse {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-8px); }
        }
        .animate-dot-pulse-1 {
          animation: custom-dot-pulse 1.4s infinite ease-in-out;
        }
        .animate-dot-pulse-2 {
          animation: custom-dot-pulse 1.4s infinite ease-in-out 0.2s;
        }
        .animate-dot-pulse-3 {
          animation: custom-dot-pulse 1.4s infinite ease-in-out 0.4s;
        }
      `}</style>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <Card
          className="w-full flex flex-col items-center text-center p-8 md:p-12 shadow-xl border border-neutral-100 bg-white"
          maxWidth="500px"
          rotated={false}
        >
          <div className="text-6xl md:text-7xl animate-wobble-strawberry select-none mb-8 drop-shadow-lg">
            🍓
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3 uppercase leading-tight">
            {isValidating ? "Verifying..." : "Redirecting..."}
          </h1>

          <p className="text-sm md:text-base font-semibold text-neutral-500 max-w-[320px] mb-8 leading-snug">
            {isValidating
              ? "Checking destination safety..."
              : "Taking you to your destination. Hold on!"}
          </p>

          <div className="flex items-center gap-1.5 h-10 select-none">
            <span className="text-5xl font-extrabold text-rose-500 animate-dot-pulse-1">
              .
            </span>
            <span className="text-5xl font-extrabold text-rose-500 animate-dot-pulse-2">
              .
            </span>
            <span className="text-5xl font-extrabold text-rose-500 animate-dot-pulse-3">
              .
            </span>
          </div>
        </Card>
      </main>
    </>
  );
}
