import type { Metadata, Viewport } from "next";
import { getRedirectMeta } from "@/lib/sanity/redirects";
import { StrawberryRelease } from "../strawberry/StrawberryRelease";

const SOURCE = "/strawberry-album";

const DEFAULT_TITLE = "Strawberry - New Album";
const DEFAULT_DESCRIPTION = "Naomi Jon's album 'Strawberry'. Out now!";
const DEFAULT_IMAGE = "/images/strawberry-cover.jpg";
const DEFAULT_THEME_COLOR = "#a54c88";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getRedirectMeta(SOURCE);

  const title = meta.metaTitle?.trim() || DEFAULT_TITLE;
  const description = meta.metaDescription?.trim() || DEFAULT_DESCRIPTION;
  const image = meta.metaImage?.trim() || DEFAULT_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const meta = await getRedirectMeta(SOURCE);
  return {
    themeColor: meta.themeColor?.trim() || DEFAULT_THEME_COLOR,
  };
}

/**
 * The Strawberry Album landing page (Doesn't include MV).
 */
export default function StrawberryAlbumPage() {
  return <StrawberryRelease showVideo={false} />;
}
