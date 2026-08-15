"use client";

import { useEffect, useState } from "react";

const TARGET = new Date(2026, 7, 16, 0, 0, 0).getTime();

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function VillainCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = TARGET - now;

  if (diff <= 0) {
    return null;
  }

  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const units = [
    { value: pad(days), label: "Days" },
    { value: pad(hours), label: "Hours" },
    { value: pad(minutes), label: "Minutes" },
    { value: pad(seconds), label: "Seconds" },
  ];

  return (
    <div className="grid w-full grid-cols-4 items-center gap-3">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-panel border border-villain-lilac/45 bg-white/8 px-3 py-2.5 backdrop-blur-sm"
        >
          <span
            className="text-villain-text text-2xl leading-none font-black tracking-tight"
            suppressHydrationWarning
          >
            {unit.value}
          </span>
          <span className="text-villain-muted mt-1 text-[0.58rem] font-black tracking-[0.18em] uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
