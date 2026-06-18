import { Credits } from "./ui/Credits";
import { LegalLinks } from "./LegalLinks";
import { SocialIconBar } from "./ui/SocialIconBar";
import type { SocialLink } from "./SocialConfig";

export const dynamic = "force-dynamic";

interface FooterProps {
  showSocials?: boolean;
  currentPath: string;
  socials: SocialLink[];
  showWebsite?: boolean;
  baseUrl: string;
  isModalOpen: boolean;
}

export function Footer({
  showSocials = true,
  currentPath,
  socials,
  showWebsite = true,
  baseUrl,
  isModalOpen,
}: FooterProps) {
  return (
    <footer className="mx-auto mt-auto flex w-full max-w-275 flex-col items-center gap-6 py-8">
      <div className="md:border--text-dark/10 flex w-full flex-col items-center gap-4 md:flex-row md:justify-between md:border-t md:pt-6">
        {showSocials && (
          <SocialIconBar
            socials={socials}
            showWebsite={showWebsite}
            baseUrl={baseUrl}
          />
        )}

        <div className="border--text-dark/10 order-2 w-full border-t md:hidden" />
        <LegalLinks currentPath={currentPath} isModalOpen={isModalOpen} />
        <div className="text--text-dark/60 [&_a]:text--brand-red hover:[&_a]:text--text-dark order-4 flex items-center gap-1.5 text-[0.85rem] font-semibold md:order-2 [&_a]:font-extrabold [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200 [&_div]:mt-0">
          <Credits />
        </div>
      </div>
    </footer>
  );
}
