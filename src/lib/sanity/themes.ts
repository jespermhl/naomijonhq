import { cache } from "react";
import { client } from "@/sanity/client";
import { logger } from "@/lib/logger";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { DEFAULT_THEME } from "@/config/theme";

/**
 * A CMS theme document. Each field maps to a CSS custom property
 * (see the FIELD_TO_CSS_VAR map in `@/lib/theme-css`).
 */
export interface ThemeDoc {
  _id: string;
  name: string;
  slug: string;
  bgBase1?: string;
  bgBase2?: string;
  bgBase3?: string;
  bgGlowA?: string;
  bgGlowB?: string;
  brandRed?: string;
  brandRedDark?: string;
  brandBtn?: string;
  brandPink?: string;
  brandPinkDeep?: string;
  brandPinkMid?: string;
  onBrand?: string;
  bgPrimary?: string;
  bgSurface?: string;
  bgGlass?: string;
  bgGlassStrong?: string;
  bgGlassSoft?: string;
  bgPinkTint?: string;
  bgFooter?: string;
  textDark?: string;
  textMuted?: string;
  textFaint?: string;
  onTextDark?: string;
  borderGlass?: string;
  borderGlassSoft?: string;
  borderPink?: string;
  borderSubtle?: string;
  dropBrandStrong?: string;
  dropBrandSoft?: string;
  themeColor?: string;
}

const THEME_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  bgBase1, bgBase2, bgBase3, bgGlowA, bgGlowB,
  brandRed, brandRedDark, brandBtn, brandPink, brandPinkDeep, brandPinkMid, onBrand,
  bgPrimary, bgSurface, bgGlass, bgGlassStrong, bgGlassSoft, bgPinkTint, bgFooter,
  textDark, textMuted, textFaint, onTextDark,
  borderGlass, borderGlassSoft, borderPink, borderSubtle,
  dropBrandStrong, dropBrandSoft, themeColor
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
