"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Die Animation wird weiterhin sicher dynamisch ohne SSR auf dem Client importiert
const BurstAnimation = dynamic(
    () => import("@/components/BurstAnimation").then((m) => m.BurstAnimation),
    { ssr: false }
);

interface ClientLayoutProps {
    children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();

    const allowedPaths = ["/strawberry", "/strawberry-album", "/strawberry-tour"];

    const shouldShowBurst = allowedPaths.includes(pathname);

    return (
        <>
            {shouldShowBurst && (
                <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
                    <BurstAnimation />
                </div>
            )}
            {children}
        </>
    );
}