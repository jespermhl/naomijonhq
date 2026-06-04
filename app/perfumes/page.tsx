import React from "react";
import { client } from "../../sanity/client";
import PerfumeCard from "../../components/PerfumeCard";
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
  return await client.fetch<Perfume[]>(query);
}

export default async function PerfumesPage() {
  const perfumes = await getPerfumes();

  return (
    <>
      <style>{`
        @keyframes inline-wobble {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        .animate-sparkle-wobble {
          animation: inline-wobble 2s ease-in-out infinite;
        }
      `}</style>

      {/* Container aligned to 1100px width with the footer */}
      <div className="mx-auto max-w-[1100px] px-5 py-14 pb-18">
        <h1 className="page-title">
          Perfumes{" "}
          <span className="inline-block animate-sparkle-wobble">✨</span>
        </h1>
        <p className="page-subtitle">
          Discover all the amazing perfumes by Naomi Jon.
        </p>

        {perfumes.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 justify-items-stretch sm:grid-cols-2">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume._id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div
            className="mx-auto mt-10 max-w-2xl px-6 py-14 text-center rounded-[28px] border border-white/85 bg-white/74 font-bold text-[1.05rem] text-[#22181f] shadow-[0_24px_60px_rgba(255,79,168,0.1)] backdrop-blur-sm"
          >
            <p>New perfumes dropping soon! Stay tuned.</p>
          </div>
        )}
      </div>
    </>
  );
}