import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/imageUrl";
import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./perfume-detail.module.css";
import { Metadata } from "next";

export const revalidate = 60;

interface PerfumeProps {
  params: Promise<{ slug: string }>;
}

interface StoreLink {
  _key: string;
  url: string;
  store: string;
  price?: string | number;
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

interface Perfume {
  title: string;
  image: SanityImageSource;
  description?: string;
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  storeLinks: StoreLink[];
}

export async function generateMetadata(props: PerfumeProps): Promise<Metadata> {
  const { slug } = await props.params;
  const perfume = await client.fetch(`*[_type == "perfume" && slug.current == $slug][0]{title, description}`, { slug });

  if (!perfume) {
    return { title: "Perfume Not Found" };
  }

  return {
    title: `${perfume.title} | Naomi Jon Fragrance`,
    description: perfume.description || `Buy ${perfume.title} at DM, Rossmann, or Amazon.`,
  };
}

export default async function PerfumeDetailPage(props: PerfumeProps) {
  const { slug } = await props.params;
  const query = `*[_type == "perfume" && slug.current == $slug][0]{
    title,
    image,
    description,
    topNotes,
    heartNotes,
    baseNotes,
    storeLinks
  }`;

  const perfume: Perfume | null = await client.fetch(query, { slug });

  if (!perfume) {
    notFound();
  }

  const imageUrl = perfume.image ? urlFor(perfume.image).url() : "";
  const storeLinkCount = perfume.storeLinks?.length ?? 0;

  return (
    <div className={styles.container}>
      <Link href="/perfumes" className={styles.backLink}>
        ← Back to all perfumes
      </Link>

      <div className={styles.detailCard}>
        <div className={styles.imageColumn}>
          <div className={styles.imageContainer}>
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

          {(perfume.topNotes || perfume.heartNotes || perfume.baseNotes) && (
            <div className={styles.notesSection}>
              <h2 className={styles.notesTitle}>Fragrance Notes</h2>
              <div className={styles.notesList}>
                {perfume.topNotes && (
                  <div className={styles.noteItem}>
                    <span className={styles.noteLabel}>Top Notes</span>
                    <span className={styles.noteValue}>{perfume.topNotes}</span>
                  </div>
                )}
                {perfume.heartNotes && (
                  <div className={styles.noteItem}>
                    <span className={styles.noteLabel}>Heart Notes</span>
                    <span className={styles.noteValue}>{perfume.heartNotes}</span>
                  </div>
                )}
                {perfume.baseNotes && (
                  <div className={styles.noteItem}>
                    <span className={styles.noteLabel}>Base Notes</span>
                    <span className={styles.noteValue}>{perfume.baseNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.topInfo}>
            <h1 className={styles.title}>{perfume.title}</h1>

            {perfume.description && (
              <p className={styles.description}>{perfume.description}</p>
            )}
          </div>

          <div className={styles.linksContainer}>
            <h2 className={styles.subtitle}>
              Get it now at your favorite store{storeLinkCount > 1 ? "s" : ""}:
            </h2>
            {perfume.storeLinks && perfume.storeLinks.length > 0 ? (
              <ul className={styles.linksList}>
                {perfume.storeLinks.map((link: StoreLink) => (
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
                          <Image src={STORE_ICONS[link.store]} alt={link.store} width={28} height={28} style={{ objectFit: 'contain' }} />
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
