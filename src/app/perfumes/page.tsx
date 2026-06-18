import React from "react";
import { client } from "@/sanity/client";
import PerfumeCard from "./_components/PerfumeCard";
import { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata: Metadata = {
  title: "Naomi Jon Perfumes",
  description: "Discover all the amazing perfumes by Naomi Jon.",
};

export const revalidate = 60;

interface Perfume {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource | null;
  storeLinks: StoreLink[];
  isNew?: boolean;
  heartNotes?: string;
}

interface StoreLink {
  store: "dm" | "rossmann" | "amazon";
  url: string;
  price?: string;
  _key: string;
}

async function getPerfumes(): Promise<Perfume[]> {
  const query = `*[_type == "perfume"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    image,
    storeLinks,
    isNew,
    heartNotes
  }`;
  return client.fetch<Perfume[]>(query);
}

export default async function PerfumesPage() {
  const perfumes = await getPerfumes();

  return (
    <>
      <div className="mx-auto max-w-275 px-5 py-14 pb-18">
        <h1 className="page-title">
          Perfumes{" "}
          <span className="animate-sparkle-wobble inline-block">✨</span>
        </h1>
        <p className="page-subtitle">
          Discover all the amazing perfumes by Naomi Jon.
        </p>

        {perfumes.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 justify-items-stretch gap-8 sm:grid-cols-2">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume._id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="text-text-dark mx-auto mt-10 max-w-2xl rounded-[28px] border border-white/85 bg-white/74 px-6 py-14 text-center text-[1.05rem] font-bold shadow-[0_24px_60px_rgba(255,79,168,0.1)] backdrop-blur-sm">
            <p>New perfumes dropping soon! Stay tuned.</p>
          </div>
        )}
      </div>
    </>
  );
}
