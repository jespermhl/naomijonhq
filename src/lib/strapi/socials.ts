import { env } from "@/env.mjs";

export interface SocialLink {
  id: number;
  title: string;
  slug: string;
  url: string;
}

export const fetchSocials = async (): Promise<SocialLink[]> => {
  const url = `${env.NEXT_PUBLIC_STRAPI_URL}/api/socials?fields=id,title,slug,url`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { tags: ["socials"] },
  });

  if (!response.ok) {
    throw new Error(`Strapi socials fetch failed: ${response.status}`);
  }

  const data = await response.json();

  return data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    url: item.url,
  }));
};
