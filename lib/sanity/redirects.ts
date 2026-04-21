import { createClient } from "@sanity/client";
import { cache } from "react";
import type { Metadata, Viewport } from "next";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-13",
  useCdn: false,
});

const DEFAULT_THEME_COLOR = "#a54c88";

interface CustomMetaEntry {
  key?: string;
  content?: string;
}

interface RedirectMeta {
  themeColor?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  customMeta?: CustomMetaEntry[];
}

interface PageDefaults {
  title?: string;
  description?: string;
}

/**
 * Fetches the meta override fields stored on a Sanity `redirect` document
 * whose `source` matches the given pathname (e.g. "/strawberry-tour").
 *
 * Wrapped in React.cache() so multiple calls with the same source within
 * a single render pass (e.g. generateMetadata + PropertyMetaTags) only
 * hit Sanity once.
 */
const getRedirectMeta = cache(async (source: string): Promise<RedirectMeta> => {
  try {
    const result = await client.fetch<RedirectMeta | null>(
      `*[_type == "redirect" && source == $source][0]{
        themeColor,
        metaTitle,
        metaDescription,
        metaImage,
        customMeta
      }`,
      { source },
      { next: { revalidate: 60 } },
    );
    return result ?? {};
  } catch (error) {
    console.error(
      `[getRedirectMeta] Failed to fetch meta for "${source}":`,
      error,
    );
    return {};
  }
});

/**
 * Returns the custom meta entries whose key starts with "og:" for a given
 * source path. Used by the PropertyMetaTags Server Component to render
 * <meta property="og:..." content="..."> tags (which require the `property`
 * attribute that Next.js's `other` field cannot produce).
 */
export async function getCustomOgTags(
  source: string,
): Promise<Array<{ key: string; content: string }>> {
  const meta = await getRedirectMeta(source);
  return (meta.customMeta ?? []).filter(
    (e): e is { key: string; content: string } =>
      Boolean(e.key?.trim().startsWith("og:") && e.content?.trim()),
  );
}

/**
 * Builds a Next.js Metadata object for a given source path.
 * Sanity values take precedence; `defaults` are used as fallbacks.
 * No image is included unless explicitly set in Sanity.
 * og:* custom meta keys are intentionally excluded here — they are
 * rendered with the correct `property` attribute by PropertyMetaTags.
 * Returns an empty object when there is nothing to set.
 */
export async function buildPageMetadata(
  source: string,
  defaults?: PageDefaults,
): Promise<Metadata> {
  const meta = await getRedirectMeta(source);

  const title = meta.metaTitle?.trim() || defaults?.title;
  const description = meta.metaDescription?.trim() || defaults?.description;
  const image = meta.metaImage?.trim() || undefined;

  // Exclude og:* keys — those need property="..." attribute and are handled
  // separately by the PropertyMetaTags Server Component.
  const other = meta.customMeta?.reduce<Record<string, string>>(
    (acc, entry) => {
      const key = entry.key?.trim();
      const content = entry.content?.trim();
      if (key && content && !key.startsWith("og:")) {
        acc[key] = content;
      }
      return acc;
    },
    {},
  );

  const hasOther = other !== undefined && Object.keys(other).length > 0;
  if (!title && !description && !image && !hasOther) return {};

  return {
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    },
    ...(hasOther && { other }),
  };
}

/**
 * Builds a Next.js Viewport object for a given source path.
 * Falls back to the brand default theme colour when Sanity has no value.
 */
export async function buildPageViewport(source: string): Promise<Viewport> {
  const meta = await getRedirectMeta(source);
  return {
    themeColor: meta.themeColor?.trim() || DEFAULT_THEME_COLOR,
  };
}
