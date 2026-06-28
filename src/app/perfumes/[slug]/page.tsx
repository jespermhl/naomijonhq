import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/imageUrl";
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
  const perfume = await client.fetch(
    `*[_type == "perfume" && slug.current == $slug][0]{title, description}`,
    { slug },
  );

  if (!perfume) {
    return { title: "Perfume Not Found" };
  }

  return {
    title: `${perfume.title} | Naomi Jon Fragrance`,
    description:
      perfume.description || `Buy ${perfume.title} at DM, Rossmann, or Amazon.`,
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
        className="text-brand-red hover:text-text-dark mb-8 inline-flex items-center text-sm font-bold transition-colors duration-200"
      >
        ← Back to all perfumes
      </Link>

      <div className="grid grid-cols-1 gap-8 rounded-[30px] border border-white/85 bg-white/74 p-6 shadow-[0_24px_60px_var(--color-brand-pink-shadow,rgba(255,79,168,0.1))] backdrop-blur-xl md:gap-12 md:p-10 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6">
            {imageUrl ? (
              <div className="relative h-full max-h-95 w-full max-w-95">
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
              <span className="text-sm font-bold text-neutral-400">
                No Image
              </span>
            )}
          </div>

          {(perfume.topNotes || perfume.heartNotes || perfume.baseNotes) && (
            <div className="rounded-2xl border border-white/80 bg-white/40 p-6 md:p-8">
              <h2 className="text-text-dark mb-5 text-xl font-black tracking-wide uppercase">
                Fragrance Notes
              </h2>
              <div className="flex flex-col gap-4">
                {perfume.topNotes && (
                  <div className="flex flex-col gap-1 border-b border-white/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-brand-red font-display text-xs font-black tracking-widest uppercase">
                      Top Notes
                    </span>
                    <span className="text-text-dark text-[1.05rem] font-bold">
                      {perfume.topNotes}
                    </span>
                  </div>
                )}
                {perfume.heartNotes && (
                  <div className="flex flex-col gap-1 border-b border-white/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-brand-red font-display text-xs font-black tracking-widest uppercase">
                      Heart Notes
                    </span>
                    <span className="text-text-dark text-[1.05rem] font-bold">
                      {perfume.heartNotes}
                    </span>
                  </div>
                )}
                {perfume.baseNotes && (
                  <div className="flex flex-col gap-1 border-b border-white/60 pb-3 last:border-0 last:pb-0">
                    <span className="text-brand-red font-display text-xs font-black tracking-widest uppercase">
                      Base Notes
                    </span>
                    <span className="text-text-dark text-[1.05rem] font-bold">
                      {perfume.baseNotes}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-10 lg:col-span-6">
          <div className="flex flex-col gap-5">
            <h1 className="text-text-dark font-display text-4xl leading-tight font-black tracking-tight uppercase md:text-5xl">
              {perfume.title}
            </h1>

            {perfume.description && (
              <p className="text-text-dark/80 max-w-prose text-base leading-relaxed font-medium md:text-lg">
                {perfume.description}
              </p>
            )}
          </div>

          <div className="bg-brand-red/5 border-brand-red/10 flex flex-col gap-5 rounded-2xl border p-6">
            <h2 className="text-text-dark text-base leading-snug font-black md:text-lg">
              Get it now at your favorite store{storeLinkCount > 1 ? "s" : ""}:
            </h2>
            {perfume.storeLinks && perfume.storeLinks.length > 0 ? (
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {perfume.storeLinks.map((link: StoreLink) => (
                  <li key={link._key}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border bg-white/90 p-3 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        borderColor:
                          STORE_BORDER_COLORS[link.store] ||
                          "var(--color-border-color-light, #edf2f7)",
                      }}
                    >
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200"
                        style={{
                          backgroundColor: STORE_ICON_BG[link.store] || "#333",
                          border:
                            link.store === "amazon"
                              ? "1px solid var(--color-border-color-light, #e2e8f0)"
                              : "none",
                        }}
                      >
                        {STORE_ICONS[link.store] ? (
                          <Image
                            src={STORE_ICONS[link.store]}
                            alt={link.store}
                            width={24}
                            height={24}
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <span aria-hidden="true">🛒</span>
                        )}
                      </span>

                      <div className="flex flex-1 flex-col justify-center">
                        <span className="text-text-dark text-sm font-black tracking-wider uppercase">
                          {link.store.toUpperCase()}
                        </span>
                        {link.price && (
                          <span className="text-text-muted mt-0.5 text-xs font-bold">
                            {link.price}
                          </span>
                        )}
                      </div>

                      <span className="text-text-dark/40 group-hover:text-brand-red px-2 text-xl font-extrabold transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm font-bold italic">
                No stores available right now.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
