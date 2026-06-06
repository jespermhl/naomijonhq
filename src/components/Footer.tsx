import { Credits } from "./ui/Credits";
import LegalLinks from "./LegalLinks";
import { PLATFORM_ICONS, getSocials } from "./SocialConfig";

const WEBSITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://naomijonhq.com";

export const dynamic = "force-dynamic";

export default async function Footer({ showSocials = true }: { showSocials: boolean }) {
  const socials = await getSocials();

  const socialIconButtonClasses =
    "flex items-center justify-center w-8 h-8 p-0 rounded-full bg-white/80 border border-white/85 text-[#1f171d]/80 no-underline transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-1 hover:bg-[#ff4fa8] hover:border-[#ff4fa8] hover:text-white hover:shadow-[0_10px_20px_rgba(255,79,168,0.18)] focus-visible:-translate-y-1 focus-visible:bg-[#ff4fa8] focus-visible:border-[#ff4fa8] focus-visible:text-white";

  return (
    <footer className="w-full py-8 mt-auto flex flex-col items-center gap-6 max-w-275 mx-auto">
      <div className="flex flex-col items-center gap-4 w-full md:flex-row md:justify-between md:border-t md:border-[#1f171d]/10 md:pt-6">

        {showSocials && (
          <ul className="flex flex-wrap justify-center gap-2 md:gap-4 list-none p-0 m-0 order-1 md:order-1 pb-4 md:pb-0 w-full md:w-auto">
            <li>
              <a
                href={WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconButtonClasses}
                aria-label="Visit Website"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 shrink-0"
                  aria-hidden="true"
                >
                  {PLATFORM_ICONS.website}
                </svg>
              </a>
            </li>
            {socials.length > 0 &&
              socials.map((social) => {
                const platform = (social.platform || "other").toLowerCase();
                const iconContent =
                  PLATFORM_ICONS[platform] || PLATFORM_ICONS.other;

                return (
                  <li key={social._id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={socialIconButtonClasses}
                      aria-label={`Visit our ${social.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 shrink-0"
                        aria-hidden="true"
                      >
                        {iconContent}
                      </svg>
                    </a>
                  </li>
                );
              })}
          </ul>
        )}

        <div className="w-full border-t border-[#1f171d]/10 order-2 md:hidden" />
        <LegalLinks />
        <div className="text-[0.85rem] text-[#1f171d]/60 font-semibold flex items-center gap-1.5 [&_div]:mt-0 [&_a]:text-[#ff4fa8] [&_a]:font-extrabold hover:[&_a]:text-[#1f171d] [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200 order-4 md:order-2">
          <Credits />
        </div>
      </div>
    </footer>
  );
}