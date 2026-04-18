"use client";

import { useEffect, useState, Suspense } from "react";
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

function RedirectContent() {
  const searchParams = useSearchParams();
  const rawTarget = searchParams.get("to");
  const [target, setTarget] = useState<string>(FALLBACK_URL);
  const [isValidating, setIsValidating] = useState(true);

  interface SanityEntry {
    destination?: string;
    url?: string;
    buyUrl?: string;
  }

  useEffect(() => {
    async function validateAndRedirect() {
      if (!rawTarget) {
        setTarget(FALLBACK_URL);
        setIsValidating(false);
        return;
      }

      // Explicitly reject protocol-relative URLs early
      if (rawTarget.startsWith("//")) {
        setTarget(FALLBACK_URL);
        setIsValidating(false);
        return;
      }

      // Handle safe single-root relative paths early
      if (rawTarget.startsWith("/") && !rawTarget.startsWith("//")) {
        setTarget(rawTarget);
        setIsValidating(false);
        return;
      }

      try {
        const url = new URL(rawTarget);

        // 1. Basic safety check - only allow HTTPS
        if (url.protocol !== "https:") {
          setTarget(FALLBACK_URL);
          setIsValidating(false);
          return;
        }

        const hostname = url.hostname;

        // 2. Check static allowlist
        if (
          STATIC_ALLOWED_HOSTS.some(
            (h) => hostname === h || hostname.endsWith(`.${h}`),
          )
        ) {
          setTarget(rawTarget);
          setIsValidating(false);
          return;
        }

        // 3. Check Sanity for this host
        // We fetch entries that match the hostname as a token and then verify the parsed hostname in JS
        const query = `*[_type in ["redirect", "social", "concert"] && (destination match $host || url match $host || buyUrl match $host)]`;
        const results = await client.fetch(query, { host: hostname });

        const isFound = results.some((doc: SanityEntry) => {
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
        // Only allow safe single-root relative paths if URL parsing fails
        if (rawTarget.startsWith("/") && !rawTarget.startsWith("//")) {
          setTarget(rawTarget);
        } else {
          setTarget(FALLBACK_URL);
        }
      } finally {
        setIsValidating(false);
      }
    }

    validateAndRedirect();
  }, [rawTarget]);

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

export default function RedirectPage() {
  return (
    <Suspense
      fallback={
        <main className={`${styles.redirectPage} bg-pattern`}>
          <Card maxWidth="500px">
            <div className="strawberry-emoji wobble">🍓</div>
            <h1 className="page-title">Loading...</h1>
          </Card>
        </main>
      }
    >
      <RedirectContent />
    </Suspense>
  );
}
