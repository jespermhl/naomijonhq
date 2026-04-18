"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import styles from "./redirect.module.css";

function RedirectContent() {
  const searchParams = useSearchParams();
  const target = searchParams.get("to") || "https://linktr.ee/naomijonhq";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = target;
    }, 1500);

    return () => clearTimeout(timer);
  }, [target]);

  return (
    <main className={`${styles.redirectPage} bg-pattern`}>
      <Card className={styles.redirectCard} maxWidth="500px">
        <div className="strawberry-emoji wobble">🍓</div>
        <h1 className="page-title">Redirecting...</h1>
        <p className="page-subtitle">
          Taking you to your destination.
          <br />
          Hold on a second!
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
