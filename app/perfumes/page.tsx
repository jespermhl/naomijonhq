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

interface Perfume {
  _id: string;
  title: string;
  slug: string;
  image: any;
  storeLinks: any[];
}

async function getPerfumes(): Promise<Perfume[]> {
  const query = `*[_type == "perfume"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    image,
    storeLinks
  }`;
  const perfumes = await client.fetch<Perfume[]>(query);
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
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume._id} perfume={perfume} />
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
