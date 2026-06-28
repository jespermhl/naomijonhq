"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/imageUrl";

interface StoreLink {
  store: "dm" | "rossmann" | "amazon";
  url: string;
  price?: string;
  _key: string;
}

interface PerfumeCardProps {
  perfume: {
    title: string;
    slug?: string;
    image?: SanityImageSource | null;
    storeLinks: StoreLink[];
    isNew?: boolean;
    heartNotes?: string;
  };
}

const STORE_ICONS: Record<string, string> = {
  dm: "/icons/dm.svg",
  rossmann: "/icons/rossmann.svg",
  amazon: "/icons/amazon.svg",
};

const STORE_COLORS: Record<string, string> = {
  dm: "var(--color-dm)",
  rossmann: "var(--color-rossmann)",
  amazon: "var(--color-amazon)",
};

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
    <div className="glass-panel group/card relative mx-auto flex w-full max-w-95 flex-col overflow-hidden rounded-[30px] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_30px_70px_var(--color-brand-pink-shadow,rgba(255,79,168,0.12))]">
      {" "}
      {perfume.isNew && (
        <div className="bg-brand-red animate-float-badge absolute top-4 left-4 z-30 rounded-full border border-white/80 px-4 py-1.5 text-[0.85rem] font-extrabold tracking-wider text-white shadow-[0_10px_20px_rgba(255,79,168,0.24)]">
          NEW
        </div>
      )}
      <div className="relative aspect-11/10 w-full cursor-pointer overflow-hidden bg-white/70">
        {imageUrl ? (
          perfume.slug ? (
            <Link href={`/perfumes/${perfume.slug}`}>
              <Image
                src={imageUrl}
                alt={perfume.title}
                fill
                className="object-contain transition-transform duration-500 group-hover/card:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          ) : (
            <Image
              src={imageUrl}
              alt={perfume.title}
              fill
              className="object-contain transition-transform duration-500 group-hover/card:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )
        ) : (
          <div className="to-brand-pink/10 text-text-muted/60 flex h-full w-full items-center justify-center bg-linear-to-br from-white text-lg font-bold">
            No Image
          </div>
        )}

        <div
          className={`absolute inset-0 z-20 flex items-center justify-center bg-white/35 backdrop-blur-md transition-opacity duration-300 ${showLinks ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <div
            className={`glass-panel relative w-[85%] max-w-75 rounded-[22px] p-6 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showLinks ? "translate-y-0" : "translate-y-5"}`}
          >
            <button
              type="button"
              className="text-text-muted hover:text-brand-red focus-visible:text-brand-red focus-visible:outline-brand-red absolute top-2.5 right-3.5 cursor-pointer rounded-full border border-white/85 bg-white/80 p-1 text-2xl leading-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleLinks();
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h4 className="text-text-dark mb-4 text-center text-[1.2rem] font-extrabold">
              Buy {perfume.title}
            </h4>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {perfume.storeLinks
                ?.filter((link) => isHttpOrHttpsUrl(link.url))
                .map((link) => (
                  <li key={link._key} className="m-0">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-dark hover:bg-brand-red hover:border-brand-red focus-visible:bg-brand-red focus-visible:border-brand-red focus-visible:outline-brand-red group/price flex items-center justify-between rounded-full border border-white/90 bg-white/80 px-4 py-3 font-bold no-underline transition-all duration-200 hover:translate-x-1 hover:text-white focus-visible:translate-x-1 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span className="text-[0.95rem] tracking-wider">
                        {link.store.toUpperCase()}
                      </span>
                      {link.price && (
                        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[0.9rem] opacity-90 transition-colors group-hover/price:bg-white/20 group-hover/price:text-white">
                          {link.price}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/90 bg-white/80 p-4 px-5">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center">
            {perfume.slug ? (
              <Link
                href={`/perfumes/${perfume.slug}`}
                className="group/title no-underline"
              >
                <h3 className="text-brand-red group-hover/title:text-brand-red/90 group-focus-visible/title:text-brand-red/90 m-0 text-2xl font-black tracking-tight transition-colors">
                  {perfume.title}
                </h3>
              </Link>
            ) : (
              <h3 className="text-brand-red m-0 text-2xl font-black tracking-tight">
                {perfume.title}
              </h3>
            )}
          </div>
          {perfume.heartNotes && (
            <p className="text-text-muted m-0 mt-0.5 overflow-hidden text-[0.8rem] leading-tight font-semibold text-ellipsis whitespace-nowrap">
              {perfume.heartNotes}
            </p>
          )}
        </div>

        {perfume.storeLinks && perfume.storeLinks.length > 0 && (
          <div className="flex items-center gap-2">
            {perfume.storeLinks.map((link) => (
              <button
                type="button"
                key={link._key}
                className="hover:outline-brand-red flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full text-base text-white shadow-[0_8px_16px_var(--color-brand-pink-shadow,rgba(255,79,168,0.12))] transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.15] hover:rotate-5 hover:outline-2 hover:outline-offset-2"
                style={{
                  backgroundColor: STORE_COLORS[link.store] || "#333",
                  border:
                    link.store === "amazon" ? "1px solid #e2e8f0" : "none",
                }}
                title={`Available at ${link.store}`}
                aria-label={`Open store links for ${link.store}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleLinks();
                }}
              >
                {STORE_ICONS[link.store] ? (
                  <Image
                    src={STORE_ICONS[link.store]}
                    alt={link.store}
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                  />
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
