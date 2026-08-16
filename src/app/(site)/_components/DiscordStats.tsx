"use client";

import type { DiscordStats } from "@/app/api/discord/route";
import { useState, useEffect } from "react";
import { logger } from "@/lib/logger";

export function DiscordStats() {
  const [stats, setStats] = useState<DiscordStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscordStats() {
      try {
        const res = await fetch("/api/discord");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        logger.error("Error fetching Discord stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDiscordStats();
  }, []);

  if (isLoading) {
    return (
      <div className="mb-1 flex w-full items-center justify-end gap-3 self-center max-sm:mb-0">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white/20" />
          <span className="inline-block h-3 w-16 animate-pulse rounded bg-white/20 align-middle" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white/20" />
          <span className="inline-block h-3 w-20 animate-pulse rounded bg-white/20 align-middle" />
        </div>
      </div>
    );
  }

  const online = stats?.online ?? 0;
  const members = stats?.members ?? 0;

  return (
    <div className="mb-1 flex w-full items-center justify-end gap-3 self-center max-sm:mb-0">
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
        <span>
          {new Intl.NumberFormat("de-DE").format(online)} online
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white/90 shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
        <span className="h-2 w-2 rounded-full bg-slate-400" />
        <span>
          {new Intl.NumberFormat("de-DE").format(members)} members
        </span>
      </div>
    </div>
  );
}
