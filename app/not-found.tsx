"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import styles from "./not-found.module.css";

/**
 * Custom 404 handler that automatically redirects to the Home hub
 * if a specific local page or Sanity redirect was not found.
 */
export default function NotFound() {
  useEffect(() => {
    // Graceful redirect to home after a short delay
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-pattern" style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      padding: "20px"
    }}>
      <Card maxWidth="460px" className={styles.notFoundCard}>
        <div className="strawberry-emoji wobble">🍓</div>
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-subtitle">
          Oops! We couldn&apos;t find that link.
          <br />
          Taking you back to the HQ in a moment...
        </p>
        <a href="/" className={styles.backBtn}>
          Back to Home Now
        </a>
      </Card>
    </main>
  );
}
