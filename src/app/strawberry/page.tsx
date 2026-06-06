import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/src/lib/sanity/redirects";
import { PropertyMetaTags } from "@/src/components/PropertyMetaTags";
import { StrawberryRelease } from "@/src/components/StrawberryRelease";

const SOURCE = "/strawberry";
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

export default function StrawberryAlbumPage() {
  return (
    <>
      <PropertyMetaTags source={SOURCE} />
      <StrawberryRelease showVideo={true} />
    </>
  );
}
