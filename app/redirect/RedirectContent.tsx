"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { client } from "@/sanity/client";
import styles from "./redirect.module.css";

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

      // --- Fast path: proxy.ts already looked this up in Sanity ---
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

      // --- Fallback path: direct /redirect?to= links without a source ---
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
    <main className={`${styles.redirectPage} bg-pattern`}>
      <Card className={styles.redirectCard} maxWidth="500px">
        <div className="strawberry-emoji wobble">🍓</div>
        <h1 className="page-title">
          {isValidating ? "Verifying..." : "Redirecting..."}
        </h1>
        <p className="page-subtitle">
          {isValidating
            ? "Checking destination safety..."
            : "Taking you to your destination. Hold on!"}
        </p>
        <div className={styles.loadingDots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </Card>
    </main>
  );
}
