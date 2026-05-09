import React from "react";
import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/imageUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./perfume-detail.module.css";
import { Metadata } from "next";

export const revalidate = 60;

interface PerfumeProps {
  params: Promise<{ slug: string }>;
}

const STORE_ICONS: Record<string, string> = {
  dm: "/icons/dm.svg",
  rossmann: "/icons/rossmann.svg",
  amazon: "/icons/amazon.svg",
};

const STORE_BORDER_COLORS: Record<string, string> = {
  dm: "#004085",
  rossmann: "#e30613",
  amazon: "#000000",
};

const STORE_ICON_BG: Record<string, string> = {
  dm: "#004085",
  rossmann: "#e30613",
  amazon: "#ffffff",
};

export async function generateMetadata(props: PerfumeProps): Promise<Metadata> {
  const { slug } = await props.params;
  const perfume = await client.fetch(`*[_type == "perfume" && slug.current == $slug][0]{title}`, { slug });
  
  if (!perfume) {
    return { title: "Perfume Not Found" };
  }

  return {
    title: `${perfume.title} | Naomi Jon Fragrance`,
    description: `Buy ${perfume.title} at DM, Rossmann, or Amazon.`,
  };
}

export default async function PerfumeDetailPage(props: PerfumeProps) {
  const { slug } = await props.params;
  const query = `*[_type == "perfume" && slug.current == $slug][0]{
    title,
    image,
    storeLinks
  }`;
  
  const perfume = await client.fetch(query, { slug });

  if (!perfume) {
    notFound();
  }

  const imageUrl = perfume.image ? urlFor(perfume.image).url() : "";

  return (
    <div className={styles.container}>
      <Link href="/perfumes" className={styles.backLink}>
        ← Back to all perfumes
      </Link>
      
      <div className={styles.detailCard}>
        <div className={styles.imageColumn}>
          {imageUrl ? (
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                alt={perfume.title}
                fill
                className={styles.perfumeImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className={styles.placeholderImage}>No Image</div>
          )}
        </div>

        <div className={styles.infoColumn}>
          <h1 className={styles.title}>{perfume.title}</h1>
          <p className={styles.subtitle}>Get it now at your favorite store.</p>
          
          <div className={styles.linksContainer}>
            {perfume.storeLinks && perfume.storeLinks.length > 0 ? (
              <ul className={styles.linksList}>
                {perfume.storeLinks.map((link: any) => (
                  <li key={link._key} className={styles.linkItem}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.storeLink}
                      style={{ borderColor: STORE_BORDER_COLORS[link.store] || "#edf2f7" }}
                    >
                      <span className={styles.storeIconWrapper} style={{ backgroundColor: STORE_ICON_BG[link.store] || "#333", border: link.store === 'amazon' ? '1px solid #e2e8f0' : 'none' }}>
                        {STORE_ICONS[link.store] ? (
                          <Image src={STORE_ICONS[link.store]} alt={link.store} width={28} height={28} style={{objectFit: 'contain'}} />
                        ) : (
                          "🛒"
                        )}
                      </span>
                      <div className={styles.linkText}>
                        <span className={styles.storeName}>{link.store.toUpperCase()}</span>
                        {link.price && <span className={styles.storePrice}>{link.price}</span>}
                      </div>
                      <span className={styles.arrow}>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noLinks}>No stores available right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
