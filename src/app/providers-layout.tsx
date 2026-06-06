"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_PAGES } from "@/config/routes";

const BurstAnimation = dynamic(
  () => import("@/app/_components/BurstAnimation").then((m) => m.BurstAnimation),
  { ssr: false },
);

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  const pageConfig = ALL_PAGES.find((p) => p.path === pathname) ?? {
    showHeader: false,
    showFooter: true,
    showBurst: false,
    showSocials: true,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {pageConfig.showBurst && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <BurstAnimation />
        </div>
      )}
      {pageConfig.showHeader && <Header />}
      <div className="relative z-10">{children}</div>
      {pageConfig.showFooter && <Footer showSocials={pageConfig.showSocials} />}
    </div>
  );
}
