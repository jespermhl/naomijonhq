"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageConfig } from "@/config/routes";
import type { SocialLink } from "@/components/SocialConfig";

const BurstAnimation = dynamic(
  () => import("@/app/_components/BurstAnimation").then((m) => m.BurstAnimation),
  { ssr: false },
);

interface ClientLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
  socials: SocialLink[];
}

export function ClientLayout({ children, modal, socials }: ClientLayoutProps) {
  const pathname = usePathname();

  const pageConfig = getPageConfig(pathname);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {pageConfig.showBurst && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <BurstAnimation />
        </div>
      )}
      {pageConfig.showHeader && <Header />}
      <div className="relative z-10">
        {children}
        {modal}
      </div>
      {pageConfig.showFooter && <Footer showSocials={pageConfig.showSocials} socials={socials} currentPath={pathname} showWebsite={pageConfig.showWebsite} />}
    </div>
  );
}
