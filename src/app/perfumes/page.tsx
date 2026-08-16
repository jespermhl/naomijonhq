import React from "react";
import PerfumeCard from "./_components/PerfumeCard";
import { Metadata } from "next";
import { getPerfumes } from "@/lib/sanity/perfumes";

export const metadata: Metadata = {
  title: "Naomi Jon Perfumes",
  description: "Discover all the amazing perfumes by Naomi Jon.",
};

export const revalidate = 60;

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
          <div className="text-text-dark mx-auto mt-10 max-w-2xl rounded-card-sm border border-border-glass bg-bg-glass px-6 py-14 text-center text-body-lg font-bold shadow-card backdrop-blur-sm">
            <p>New perfumes dropping soon! Stay tuned.</p>
          </div>
        )}
      </div>
    </>
  );
}
