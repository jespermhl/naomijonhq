import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/sanity/sites";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { SiteRenderer } from "@/components/site/SiteRenderer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = `/${slug.join("/")}`;
  const site = await getSite(route);
  if (!site) return {};
  return buildPageMetadata(route, { title: site.name });
}

export async function generateViewport({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Viewport> {
  const { slug } = await params;
  return buildPageViewport(`/${slug.join("/")}`);
}

export default async function CmsSitePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const site = await getSite(`/${slug.join("/")}`);
  if (!site) notFound();

  return <SiteRenderer site={site} />;
}
