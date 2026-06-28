"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPageConfig } from "@/config/routes";
import type { SocialLink } from "@/components/SocialConfig";

const BurstAnimation = dynamic(
  () =>
    import("@/app/_components/BurstAnimation").then((m) => m.BurstAnimation),
  { ssr: false },
);

interface ClientLayoutProps {
  children: ReactNode;
  baseUrl: string;
  modal?: ReactNode;
  socials: SocialLink[];
}

export function ClientLayout({
  children,
  modal,
  socials,
  baseUrl,
}: ClientLayoutProps) {
  const pathname = usePathname();
  const pageConfig = getPageConfig(pathname);

  const isModalTrueOpen = !!modal;
  const isLegalPage =
    pathname === "/legal-notice" || pathname === "/privacy-policy";
  const showModal = isModalTrueOpen;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {pageConfig.showBurst && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <BurstAnimation />
        </div>
      )}
      {pageConfig.showHeader && <Header />}
      <div className="relative z-10">
        {children}
        {showModal ? modal : null}
      </div>
      {pageConfig.showFooter && (
        <Footer
          showSocials={isModalTrueOpen && isLegalPage ? false : pageConfig.showSocials}
          socials={socials}
          currentPath={pathname}
          isModalOpen={isModalTrueOpen}
          showWebsite={isModalTrueOpen && isLegalPage ? false : pageConfig.showWebsite}
          baseUrl={baseUrl}
        />
      )}
    </div>
  );
}
