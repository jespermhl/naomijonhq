import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { logger } from "@/lib/logger";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { slugFromRoute } from "@/lib/site-route";

export interface SiteLink {
  _key: string;
  label: string;
  href: string;
}

export interface SiteStat {
  _key: string;
  label: string;
  value: string;
}

export type SiteSection =
  | {
      _type: "hero";
      _key: string;
      eyebrow?: string;
      title: string;
      subtitle?: string;
      image?: SanityImageSource | null;
      imageAlt?: string;
      buttonLabel?: string;
      buttonHref?: string;
    }
  | { _type: "richText"; _key: string; heading?: string; body?: string }
  | {
      _type: "image";
      _key: string;
      image?: SanityImageSource | null;
      alt?: string;
      caption?: string;
    }
  | { _type: "links"; _key: string; title?: string; links?: SiteLink[] }
  | { _type: "socials"; _key: string; eyebrow?: string; title?: string }
  | {
      _type: "newsletter";
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
    }
  | {
      _type: "cta";
      _key: string;
      title: string;
      description?: string;
      buttonLabel: string;
      buttonHref: string;
    }
  | { _type: "stats"; _key: string; title?: string; stats?: SiteStat[] }
  | { _type: "tourList"; _key: string; title?: string }
  | { _type: "perfumeGrid"; _key: string; title?: string };

export interface SiteDoc {
  _id: string;
  name: string;
  slug: string;
  theme?: string;
  sections: SiteSection[];
}

const SITE_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  "theme": theme->slug.current,
  sections
`;

/**
 * Fetches a CMS site document for the given route (e.g. "/", "/merch").
 * Returns null when no site is published for that path.
 */
export const getSite = cache(async (route: string): Promise<SiteDoc | null> => {
  try {
    const site = await client.fetch<SiteDoc | null>(
      `*[_type == "site" && slug.current == $slug][0]{${SITE_FIELDS}}`,
      { slug: slugFromRoute(route) },
      { next: { revalidate: 60, tags: [CACHE_TAGS.site] } },
    );
    return site ?? null;
  } catch (error) {
    logger.error(`Failed to fetch site for "${route}":`, error);
    return null;
  }
});

/**
 * Returns the slugs of every published CMS site (no leading slash),
 * for the sitemap.
 */
export const getSiteSlugs = cache(async (): Promise<string[]> => {
  try {
    const sites = await client.fetch<Array<{ slug: string }>>(
      `*[_type == "site"]{"slug": slug.current}`,
      {},
      { next: { revalidate: 60, tags: [CACHE_TAGS.site] } },
    );
    return sites.map((s) => s.slug).filter(Boolean);
  } catch (error) {
    logger.error("Failed to fetch site slugs:", error);
    return [];
  }
});
