"use client";

import { useState, useEffect } from "react";

interface StatsType {
    online: string;
    members: string;
}

export function DiscordStats() {
    // Lokaler State für die Discord-Statistiken mit Fallback-Werten
    const [stats, setStats] = useState<StatsType>({
        online: "750",
        members: "3.752",
    });

    useEffect(() => {
        async function fetchDiscordStats() {
            try {
                const res = await fetch("/api/discord");
                if (res.ok) {
                    const data = await res.json();
                    const formatter = new Intl.NumberFormat("de-DE");
                    setStats({
                        online: formatter.format(data.online),
                        members: formatter.format(data.members),
                    });
                }
            } catch (err) {
                console.error("Error fetching Discord stats:", err);
            }
        }

        fetchDiscordStats();
    }, []);

    return (
        <div className="mb-1 flex items-center justify-center gap-3 self-center max-sm:mb-0">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
                <span>{stats.online} online</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-black text-white/90 shadow-sm max-sm:px-3 max-sm:py-1 max-sm:text-[10px]">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span>{stats.members} members</span>
            </div>
        </div>
    );
}