"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Dynamically import BurstAnimation purely on the client side
const BurstAnimation = dynamic(
  () => import("@/components/BurstAnimation").then((m) => m.BurstAnimation),
  { ssr: false },
);

interface ClientLayoutProps {
  children: ReactNode;
}

const ALLOWED_PATHS = ["/strawberry", "/strawberry-album", "/strawberry-tour"];

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const shouldShowBurst = ALLOWED_PATHS.includes(pathname);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {shouldShowBurst && (
        <div className="absolute top-0 left-0 z-0 pointer-events-none overflow-hidden h-screen w-screen">
          <BurstAnimation />
        </div>
      )}
      <div className="relative z-10 flex flex-col flex-1">{children}</div>
    </div>
  );
}
