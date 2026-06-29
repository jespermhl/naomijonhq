import { env } from "@/env.mjs";

export interface SocialLink {
  id: number;
  title: string;
  slug: string;
  url: string;
}

export const fetchSocials = async (): Promise<SocialLink[]> => {
  const apiToken = env.STRAPI_API_TOKEN;
  const baseUrl = env.NEXT_PUBLIC_STRAPI_URL;

  if (!apiToken || !baseUrl) return [];

  const url = `${baseUrl}/api/socials?fields=id,title,slug,url`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["socials"] },
    });

    if (!response.ok) return [];

    const data = await response.json();

    return data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      url: item.url,
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
};
