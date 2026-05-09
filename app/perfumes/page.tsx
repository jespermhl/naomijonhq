import React from "react";
import { client } from "../../sanity/client";
import PerfumeCard from "../../components/PerfumeCard";
import styles from "./perfumes.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naomi Jon Perfumes",
  description: "Discover all the amazing perfumes by Naomi Jon.",
};

export const revalidate = 60;

async function getPerfumes() {
  const query = `*[_type == "perfume"] | order(order asc) {
    title,
    "slug": slug.current,
    image,
    storeLinks
  }`;
  const perfumes = await client.fetch(query);
  return perfumes;
}

export default async function PerfumesPage() {
  const perfumes = await getPerfumes();

  return (
    <div className={styles.container}>
      <h1 className="page-title">Perfumes <span className={styles.sparkle}>✨</span></h1>
      <p className="page-subtitle">Discover all the amazing perfumes by Naomi Jon.</p>

      {perfumes.length > 0 ? (
        <div className={styles.grid}>
          {perfumes.map((perfume: any) => (
            <PerfumeCard key={perfume.slug || perfume.title} perfume={perfume} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>New perfumes dropping soon! Stay tuned.</p>
        </div>
      )}
    </div>
  );
}
