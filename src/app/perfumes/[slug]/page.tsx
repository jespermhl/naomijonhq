import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/imageUrl";
import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  dm: "var(--color-dm)",
  rossmann: "var(--color-rossmann)",
  amazon: "var(--color-text-dark)",
};

const STORE_ICON_BG: Record<string, string> = {
  dm: "var(--color-dm)",
  rossmann: "var(--color-rossmann)",
  amazon: "var(--color-amazon)",
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
    <div className="mx-auto max-w-275 px-5 py-12 md:py-16">
      <Link
        href="/perfumes"
        className="inline-flex items-center text-sm font-bold text-brand-red hover:text-text-dark transition-colors duration-200 mb-8"
      >
        ← Back to all perfumes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white/74 border border-white/85 rounded-[30px] p-6 md:p-10 shadow-[0_24px_60px_var(--color-brand-pink-shadow,rgba(255,79,168,0.1))] backdrop-blur-xl">

        <div className="lg:col-span-6 flex flex-col gap-8">

          <div className="relative aspect-square w-full rounded-2xl bg-neutral-50/50 border border-neutral-100 flex items-center justify-center overflow-hidden p-6">
            {imageUrl ? (
              <div className="relative w-full h-full max-w-95 max-h-95">
                <Image
                  src={imageUrl}
                  alt={perfume.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <span className="text-sm font-bold text-neutral-400">No Image</span>
            )}
          </div>

          {(perfume.topNotes || perfume.heartNotes || perfume.baseNotes) && (
            <div className="p-6 md:p-8 rounded-2xl bg-white/40 border border-white/80">
              <h2 className="text-xl font-black text-text-dark mb-5 uppercase tracking-wide">
                Fragrance Notes
              </h2>
              <div className="flex flex-col gap-4">
                {perfume.topNotes && (
                  <div className="flex flex-col gap-1 border-b border-white/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs font-black uppercase text-brand-red tracking-widest font-display">Top Notes</span>
                    <span className="text-[1.05rem] font-bold text-text-dark">{perfume.topNotes}</span>
                  </div>
                )}
                {perfume.heartNotes && (
                  <div className="flex flex-col gap-1 border-b border-white/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs font-black uppercase text-brand-red tracking-widest font-display">Heart Notes</span>
                    <span className="text-[1.05rem] font-bold text-text-dark">{perfume.heartNotes}</span>
                  </div>
                )}
                {perfume.baseNotes && (
                  <div className="flex flex-col gap-1 border-b border-white/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs font-black uppercase text-brand-red tracking-widest font-display">Base Notes</span>
                    <span className="text-[1.05rem] font-bold text-text-dark">{perfume.baseNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl md:text-5xl font-black text-text-dark uppercase tracking-tight leading-tight font-display">
              {perfume.title}
            </h1>

            {perfume.description && (
              <p className="text-base md:text-lg font-medium text-text-dark/80 leading-relaxed max-w-prose">
                {perfume.description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5 p-6 rounded-2xl bg-brand-red/5 border border-brand-red/10">
            <h2 className="text-base md:text-lg font-black text-text-dark leading-snug">
              Get it now at your favorite store{storeLinkCount > 1 ? "s" : ""}:
            </h2>
            {perfume.storeLinks && perfume.storeLinks.length > 0 ? (
              <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
                {perfume.storeLinks.map((link: StoreLink) => (
                  <li key={link._key}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 bg-white/90 rounded-2xl border transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md group"
                      style={{ borderColor: STORE_BORDER_COLORS[link.store] || "var(--color-border-color-light, #edf2f7)" }}
                    >
                      <span
                        className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-transform duration-200"
                        style={{
                          backgroundColor: STORE_ICON_BG[link.store] || "#333",
                          border: link.store === 'amazon' ? '1px solid var(--color-border-color-light, #e2e8f0)' : 'none'
                        }}
                      >
                        {STORE_ICONS[link.store] ? (
                          <Image
                            src={STORE_ICONS[link.store]}
                            alt={link.store}
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        ) : (
                          "🛒"
                        )}
                      </span>

                      <div className="flex flex-col justify-center flex-1">
                        <span className="text-sm font-black text-text-dark uppercase tracking-wider">
                          {link.store.toUpperCase()}
                        </span>
                        {link.price && (
                          <span className="text-xs font-bold text-text-muted mt-0.5">
                            {link.price}
                          </span>
                        )}
                      </div>

                      <span className="text-xl font-extrabold text-text-dark/40 transition-transform duration-200 ease-in-out px-2 group-hover:translate-x-1 group-hover:text-brand-red">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-bold text-text-muted italic">
                No stores available right now.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}