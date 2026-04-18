"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import styles from "./not-found.module.css";

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
    <main className={`${styles.notFoundMain} bg-pattern`}>
      <Card maxWidth="460px" className={styles.notFoundCard}>
        <div className="strawberry-emoji wobble">🍓</div>
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-subtitle">
          Oops! We couldn&apos;t find that link.
          <br />
          Taking you back to the HQ in a moment...
        </p>
        <Link href="/" className={styles.backBtn}>
          Back to Home Now
        </Link>
      </Card>
    </main>
  );
}
