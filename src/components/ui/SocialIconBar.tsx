import { PLATFORM_ICONS } from "@/components/SocialConfig";
import type { SocialLink } from "@/components/SocialConfig";

interface SocialIconBarProps {
  socials: SocialLink[];
  showWebsite?: boolean;
  baseUrl?: string;
}

const iconButtonClass =
  "flex items-center justify-center w-8 h-8 p-0 rounded-full bg-bg-glass border border-border-glass text-text-dark/80 no-underline transition-all duration-200 ease-spring hover:-translate-y-1 hover:bg-brand-btn hover:border-brand-btn hover:text-on-brand hover:shadow-float focus-visible:-translate-y-1 focus-visible:bg-brand-btn focus-visible:border-brand-btn focus-visible:text-on-brand";

export function SocialIconBar({
  socials,
  showWebsite = true,
  baseUrl,
}: SocialIconBarProps) {
  return (
    <ul className="order-1 m-0 flex w-full list-none flex-wrap justify-center gap-2 p-0 pb-4 md:order-1 md:w-auto md:gap-4 md:pb-0">
      {showWebsite && baseUrl && (
        <li>
          <a
            href={baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={iconButtonClass}
            aria-label="Visit Website"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              {PLATFORM_ICONS.website}
            </svg>
          </a>
        </li>
      )}
      {socials.length > 0 &&
        socials.map((social) => {
          const platform = (social.platform || "other").toLowerCase();
          const iconContent = PLATFORM_ICONS[platform] || PLATFORM_ICONS.other;

          return (
            <li key={social._id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={iconButtonClass}
                aria-label={`Visit our ${social.name}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  {iconContent}
                </svg>
              </a>
            </li>
          );
        })}
    </ul>
  );
}
