import { headers } from "next/headers";
import { env } from "@/env.mjs";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersInstance = await headers();
  const host =
    headersInstance.get("host") || env.NEXT_PUBLIC_SITE_URL || "naomijonhq.com";

  const baseUrl = host.startsWith("www.")
    ? `https://${host.substring(4)}`
    : `https://${host}`;

  const routes = [
    "",
    "/perfumes",
    "/strawberry",
    "/strawberry-album",
    "/strawberry-tour",
    "/newsletter",
    "/legal-notice",
    "/privacy-policy",
    "/contact",
    "/redirect",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
