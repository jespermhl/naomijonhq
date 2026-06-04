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
    <div className="relative min-h-screen flex flex-col">
      {shouldShowBurst && (
        <div className="absolute inset-x-0 top-0 bottom-0 z-0 pointer-events-none h-full w-full">
          <BurstAnimation />
        </div>
      )}
      <div className="relative z-10 flex-col flex flex-1">{children}</div>
    </div>
  );
}
