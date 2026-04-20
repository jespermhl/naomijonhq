import { createClient } from "@sanity/client";
import type { Metadata, Viewport } from "next";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-13",
  useCdn: false,
});

const DEFAULT_THEME_COLOR = "#a54c88";

interface RedirectMeta {
  themeColor?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
}

interface PageDefaults {
  title?: string;
  description?: string;
}

/**
 * Fetches the meta override fields stored on a Sanity `redirect` document
 * whose `source` matches the given pathname (e.g. "/strawberry-tour").
 *
 * Returns an empty object when no document is found or the fetch fails,
 * so callers can safely fall back to their own defaults.
 */
async function getRedirectMeta(source: string): Promise<RedirectMeta> {
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
    console.error(
      `[getRedirectMeta] Failed to fetch meta for "${source}":`,
      error,
    );
    return {};
  }
}

/**
 * Builds a Next.js Metadata object for a given source path.
 * Sanity values take precedence; `defaults` are used as fallbacks.
 * No image is included unless explicitly set in Sanity.
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

  if (!title && !description && !image) return {};

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
