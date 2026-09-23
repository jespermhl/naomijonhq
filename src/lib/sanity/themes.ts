import { cache } from "react";
import { client } from "@/sanity/client";
import { logger } from "@/lib/logger";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { DEFAULT_THEME } from "@/config/theme";

/**
 * A CMS theme document. Five seed colors drive derivation of all 30 CSS
 * variables; optional override fields replace specific derived values.
 * (See `deriveAll` in `@/lib/theme-css`.)
 */
export interface ThemeDoc {
  _id: string;
  name: string;
  slug: string;
  // Seeds (required)
  brand: string;
  bg: string;
  surface: string;
  accent: string;
  muted: string;
  // Optional overrides
  brandBtn?: string;
  onBrand?: string;
  onTextDark?: string;
  bgGlowA?: string;
  bgGlowB?: string;
  themeColor?: string;
  [key: string]: string | undefined; // index signature so overrides are accessible
}

const THEME_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  brand, bg, surface, accent, muted,
  brandBtn, onBrand, onTextDark, bgGlowA, bgGlowB, themeColor
`;

/**
 * Fetches every CMS theme document.
 */
export const getThemes = cache(async (): Promise<ThemeDoc[]> => {
  try {
    return await client.fetch<ThemeDoc[]>(
      `*[_type == "theme"]{${THEME_FIELDS}}`,
      {},
      { next: { revalidate: 60, tags: [CACHE_TAGS.theme] } },
    );
  } catch (error) {
    logger.error("Failed to fetch themes from Sanity:", error);
    return [];
  }
});

/**
 * Returns the default theme slug from the siteSettings singleton.
 * Falls back to the static default when unset.
 */
export const getDefaultTheme = cache(async (): Promise<string> => {
  try {
    const settings = await client.fetch<{ defaultThemeSlug?: string } | null>(
      `*[_type == "siteSettings"][0]{ "defaultThemeSlug": defaultTheme->slug.current }`,
      {},
      { next: { revalidate: 60, tags: [CACHE_TAGS.site] } },
    );
    return settings?.defaultThemeSlug || DEFAULT_THEME;
  } catch (error) {
    logger.error("Failed to fetch site settings from Sanity:", error);
    return DEFAULT_THEME;
  }
});
