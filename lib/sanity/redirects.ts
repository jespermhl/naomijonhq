import { client } from '@/sanity/client';

export interface RedirectMeta {
  themeColor?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
}

/**
 * Fetches the meta override fields stored on a Sanity `redirect` document
 * whose `source` matches the given pathname (e.g. "/strawberry-tour").
 *
 * Returns an empty object when no document is found or the fetch fails,
 * so callers can safely fall back to their own defaults.
 */
export async function getRedirectMeta(source: string): Promise<RedirectMeta> {
  try {
    const result = await client.fetch<RedirectMeta | null>(
      `*[_type == "redirect" && source == $source][0]{
        themeColor,
        metaTitle,
        metaDescription,
        metaImage
      }`,
      { source },
      { next: { revalidate: 60 } },
    );
    return result ?? {};
  } catch (error) {
    console.error(`[getRedirectMeta] Failed to fetch meta for "${source}":`, error);
    return {};
  }
}
