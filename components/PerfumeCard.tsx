"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./perfume-card.module.css";
import { urlFor } from "../sanity/imageUrl";

interface StoreLink {
  store: "dm" | "rossmann" | "amazon";
  url: string;
  price?: string;
  _key: string;
}

interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  [key: string]: any;
}

interface PerfumeCardProps {
  perfume: {
    title: string;
    slug?: string;
    image: SanityImage;
    storeLinks: StoreLink[];
  };
}

const STORE_ICONS: Record<string, string> = {
  dm: "/icons/dm.svg",
  rossmann: "/icons/rossmann.svg",
  amazon: "/icons/amazon.svg",
};

const STORE_COLORS: Record<string, string> = {
  dm: "#004085",
  rossmann: "#e30613",
  amazon: "#ffffff",
}

function isHttpOrHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const imageUrl = perfume.image ? urlFor(perfume.image).url() : "";

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          perfume.slug ? (
            <Link href={`/perfumes/${perfume.slug}`}>
              <Image
                src={imageUrl}
                alt={perfume.title}
                fill
                className={styles.perfumeImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          ) : (
            <Image
              src={imageUrl}
              alt={perfume.title}
              fill
              className={styles.perfumeImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )
        ) : (
          <div className={styles.placeholderImage}>No Image</div>
        )}

        <div className={`${styles.linksOverlay} ${showLinks ? styles.show : ""}`}>
          <div className={styles.linksContainer}>
            <button type="button" className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); toggleLinks(); }} aria-label="Close">×</button>
            <h4 className={styles.overlayTitle}>Buy {perfume.title}</h4>
            <ul className={styles.linksList}>
              {perfume.storeLinks?.filter((link) => isHttpOrHttpsUrl(link.url)).map((link) => (
                <li key={link._key} className={styles.linkItem}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.storeLink}>
                    <span className={styles.storeName}>{link.store.toUpperCase()}</span>
                    {link.price && <span className={styles.storePrice}>{link.price}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          {perfume.slug ? (
            <Link href={`/perfumes/${perfume.slug}`} className={styles.titleLink}>
              <h3 className={styles.title}>{perfume.title}</h3>
            </Link>
          ) : (
            <h3 className={styles.title}>{perfume.title}</h3>
          )}
        </div>

        {perfume.storeLinks && perfume.storeLinks.length > 0 && (
          <div className={styles.iconLayerBottom}>
            {perfume.storeLinks.map((link) => (
              <button
                type="button"
                key={link._key}
                className={styles.storeIconSmall}
                style={{ backgroundColor: STORE_COLORS[link.store] || "#333", border: link.store === 'amazon' ? '1px solid #e2e8f0' : 'none' }}
                title={`Available at ${link.store}`}
                aria-label={`Open store links for ${link.store}`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLinks(); }}
              >
                {STORE_ICONS[link.store] ? (
                  <Image src={STORE_ICONS[link.store]} alt={link.store} width={20} height={20} style={{ objectFit: 'contain' }} />
                ) : (
                  "🛒"
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
