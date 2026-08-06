import { PLATFORM_ICONS } from "@/components/SocialConfig";
import { SocialLink } from "@/lib/strapi/socials";

interface SocialIconBarProps {
  socials: SocialLink[];
  showWebsite?: boolean;
  baseUrl?: string;
}

const iconButtonClass =
  "flex items-center justify-center w-8 h-8 p-0 rounded-full bg-white/80 border border-white/85 text-text-dark/80 no-underline transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-1 hover:bg-brand-red hover:border-brand-red hover:text-white hover:shadow-[0_10px_20px_rgba(255,79,168,0.18)] focus-visible:-translate-y-1 focus-visible:bg-brand-red focus-visible:border-brand-red focus-visible:text-white";

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
          const iconContent = PLATFORM_ICONS[social.slug] || PLATFORM_ICONS.other;

          return (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={iconButtonClass}
                aria-label={`Visit our ${social.title}`}
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
