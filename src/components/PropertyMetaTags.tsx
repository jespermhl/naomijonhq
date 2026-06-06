import { getCustomOgTags } from "@/lib/sanity/redirects";

interface PropertyMetaTagsProps {
  source: string;
}

/**
 * Server Component that renders <meta property="og:..." content="..."> tags
 * for any custom og: entries stored in Sanity for the given source path.
 *
 * React 19 (used by Next.js 16) automatically hoists these to <head>.
 * This is necessary because Next.js's `other` metadata field renders tags
 * with the `name` attribute, but OG tags require `property` attribute.
 */
export async function PropertyMetaTags({ source }: PropertyMetaTagsProps) {
  const tags = await getCustomOgTags(source);

  if (tags.length === 0) return null;

  return (
    <>
      {tags.map(({ key, content }) => (
        <meta key={key} property={key} content={content} />
      ))}
    </>
  );
}
