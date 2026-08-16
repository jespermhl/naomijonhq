import type { ComponentType } from "react";
import type { SiteDoc, SiteSection } from "@/lib/sanity/sites";
import { SiteTheme } from "./SiteTheme";
import { SiteHero } from "./sections/SiteHero";
import { SiteRichText } from "./sections/SiteRichText";
import { SiteImage } from "./sections/SiteImage";
import { SiteLinks } from "./sections/SiteLinks";
import { SiteSocials } from "./sections/SiteSocials";
import { SiteNewsletter } from "./sections/SiteNewsletter";
import { SiteCta } from "./sections/SiteCta";
import { SiteStats } from "./sections/SiteStats";
import { SiteTourList } from "./sections/SiteTourList";
import { SitePerfumeGrid } from "./sections/SitePerfumeGrid";

const RENDERERS: Record<SiteSection["_type"], ComponentType<{ section: SiteSection }>> = {
  hero: SiteHero,
  richText: SiteRichText,
  image: SiteImage,
  links: SiteLinks,
  socials: SiteSocials,
  newsletter: SiteNewsletter,
  cta: SiteCta,
  stats: SiteStats,
  tourList: SiteTourList,
  perfumeGrid: SitePerfumeGrid,
};

export function SiteRenderer({ site }: { site: SiteDoc }) {
  return (
    <div className="relative flex w-full flex-col">
      {site.theme && <SiteTheme theme={site.theme} />}
      <main className="relative z-20 flex w-full flex-col">
        {site.sections.map((section) => {
          const Renderer = RENDERERS[section._type];
          return Renderer ? (
            <Renderer key={section._key} section={section} />
          ) : null;
        })}
      </main>
    </div>
  );
}
