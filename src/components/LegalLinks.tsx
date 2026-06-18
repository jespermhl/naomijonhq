import Link from "next/link";

interface LegalLinkProps {
  currentPath: string;
  isModalOpen: boolean;
}

export function LegalLinks({ currentPath, isModalOpen }: LegalLinkProps) {
  const links = [
    { path: "/legal-notice", label: "Legal Notice" },
    { path: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <div className="order-3 flex gap-5 pt-2 md:order-0 md:pt-0">
      {links.map(({ path, label }) => {
        // On the actual legal page, hide that link from footer, but show it when a modal is open
        if (!isModalOpen && currentPath === path) return null;

        return (
          <Link
            key={path}
            href={path}
            // Default prefetching is the most stable for modals
            prefetch={true}
            className="text-text-dark hover:text-brand-red text-[0.85rem] font-bold no-underline transition-colors duration-200 ease-in-out"
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
