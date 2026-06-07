"use client";

import type { DiscordStats } from "@/app/api/discord/route";
import { useState, useEffect } from "react";

export default function DiscordStats() {
    const [stats, setStats] = useState<DiscordStats>({
        online: 750,
        members: 3672,
    });

    useEffect(() => {
        async function fetchDiscordStats() {
            try {
                const res = await fetch("/api/discord");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error("Error fetching Discord stats:", err);
            }
        }

        fetchDiscordStats();
    }, []);

    return (
        <div className="mb-1 w-full flex items-center justify-end gap-3 self-center max-sm:mb-0">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
                <span>{new Intl.NumberFormat("de-DE").format(stats.online)} online</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white/90 shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span>{new Intl.NumberFormat("de-DE").format(stats.members)} members</span>
            </div>
        </div>
    );
}