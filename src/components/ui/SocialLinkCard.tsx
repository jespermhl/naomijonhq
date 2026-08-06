import { PLATFORM_ICONS } from "@/components/SocialConfig";
import type { SocialLink } from "@/lib/strapi/socials";

interface SocialLinkCardProps {
  social: SocialLink;
}

const SAFE_PROTOCOLS = ["http:", "https:", "mailto:"];

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return SAFE_PROTOCOLS.includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function SocialLinkCard({ social }: SocialLinkCardProps) {
  const iconContent = PLATFORM_ICONS[social.slug] || PLATFORM_ICONS.other;

  if (!isValidUrl(social.url)) {
    return null;
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center justify-center rounded-4xl border border-white/60 bg-white/25 p-8 shadow-[0px_0px_24px_-8px_rgba(255,63,159,0.1)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:bg-white/40 hover:shadow-[0px_12px_32px_-8px_rgba(255,63,159,0.25)]"
    >
      <div className="group-hover:text-brand-red text-text-muted/30 absolute top-6 right-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>

      <div className="bg-text-dark/5 text-text-dark group-hover:bg-brand-red mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:text-white">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7 shrink-0"
          aria-hidden="true"
        >
          {iconContent}
        </svg>
      </div>

      <span className="text-text-dark block text-base font-black tracking-tight uppercase">
        {social.title}
      </span>
    </a>
  );
}
