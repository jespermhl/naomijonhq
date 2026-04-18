"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
    <main className="concerts-container bg-pattern">
      <div className="tour-card" style={{ maxWidth: '500px' }}>
        <div className="strawberry-emoji wobble">🍓</div>
        <h1 className="tour-title">Redirecting...</h1>
        <p className="newsletter-p">
          Taking you to your destination.<br />
          Hold on a second!
        </p>
        <div className="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>

      <style jsx>{`
        .loading-dots {
          font-size: 48px;
          color: var(--brand-red);
          font-weight: 900;
        }
        .loading-dots span {
          animation: dot-pulse 1.5s infinite;
          display: inline-block;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dot-pulse {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}

export default function RedirectPage() {
  return (
    <Suspense fallback={
      <main className="concerts-container bg-pattern">
        <div className="tour-card">
          <div className="strawberry-emoji wobble">🍓</div>
          <h1 className="tour-title">Loading...</h1>
        </div>
      </main>
    }>
      <RedirectContent />
    </Suspense>
  );
}
