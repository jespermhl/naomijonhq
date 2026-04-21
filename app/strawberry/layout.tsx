import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";

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

export default function StrawberryCountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PropertyMetaTags source={SOURCE} />
      {children}
    </>
  );
}
