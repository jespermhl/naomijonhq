export const CACHE_TAGS = {
  theme: "sanity:theme",
  site: "sanity:site",
  redirect: "sanity:redirect",
  social: "sanity:social",
  concert: "sanity:concert",
  perfume: "sanity:perfume",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/**
 * Maps a Sanity document `_type` to the cache tag that should be
 * revalidated when that document is published/deleted.
 */
const SANITY_TYPE_TO_TAG: Record<string, CacheTag> = {
  theme: CACHE_TAGS.theme,
  site: CACHE_TAGS.site,
  redirect: CACHE_TAGS.redirect,
  social: CACHE_TAGS.social,
  concert: CACHE_TAGS.concert,
  perfume: CACHE_TAGS.perfume,
};

export function tagForSanityType(
  type: string | undefined,
): CacheTag | undefined {
  return type ? SANITY_TYPE_TO_TAG[type] : undefined;
}
