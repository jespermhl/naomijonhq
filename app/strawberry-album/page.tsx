import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { StrawberryRelease } from "@/components/StrawberryRelease";

const SOURCE = "/strawberry-album";
const DEFAULTS = {
  title: "Strawberry - New Album",
  description: "Naomi Jon's album 'Strawberry'. Out now!",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(SOURCE, DEFAULTS);
}

export async function generateViewport(): Promise<Viewport> {
  return buildPageViewport(SOURCE);
}

/**
 * The Strawberry Album landing page (Doesn't include MV).
 */
export default function StrawberryAlbumPage() {
  return (
    <>
      <PropertyMetaTags source={SOURCE} />
      <StrawberryRelease showVideo={false} />
    </>
  );
}
