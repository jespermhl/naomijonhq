import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { CACHE_TAGS } from "@/lib/cache-tags";

export interface StoreLink {
  store: "dm" | "rossmann" | "amazon";
  url: string;
  price?: string;
  _key: string;
}

export interface Perfume {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource | null;
  storeLinks: StoreLink[];
  isNew?: boolean;
  heartNotes?: string;
}

const PERFUME_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  image,
  storeLinks,
  isNew,
  heartNotes
`;

export function getPerfumes(): Promise<Perfume[]> {
  return client.fetch<Perfume[]>(
    `*[_type == "perfume"] | order(order asc) {${PERFUME_FIELDS}}`,
    {},
    { next: { revalidate: 60, tags: [CACHE_TAGS.perfume] } },
  );
}
