"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "../sanity/imageUrl";

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
    <div className="flex flex-col w-full max-w-[380px] mx-auto rounded-3xl bg-white/70 border-4 border-brand-red shadow-[8px_8px_0px_var(--color-brand-pink)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden relative hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[12px_12px_0px_var(--color-brand-red)] group/card">
      {perfume.isNew && (
        <div className="absolute top-4 left-4 bg-brand-red text-white font-extrabold text-[0.85rem] tracking-wider px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(229,62,62,0.4)] z-30 border-2 border-white animate-float-badge">
          NEW
        </div>
      )}
      <div className="relative w-full aspect-[11/10] bg-white cursor-pointer overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-[#ccc] font-bold text-lg">
            No Image
          </div>
        )}

        <div className={`absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 z-20 ${showLinks ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className={`bg-white p-6 rounded-[20px] w-[85%] max-w-[300px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-3 border-brand-pink relative transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showLinks ? "translate-y-0" : "translate-y-5"}`}>
            <button 
              type="button" 
              className="absolute top-2.5 right-3.5 bg-none border-none text-2xl text-[#888] cursor-pointer leading-none p-1 hover:text-brand-red focus-visible:text-brand-red focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2 focus-visible:rounded" 
              onClick={(e) => { e.stopPropagation(); toggleLinks(); }} 
              aria-label="Close"
            >
              ×
            </button>
            <h4 className="text-[1.2rem] font-extrabold text-text-dark mb-4 text-center">Buy {perfume.title}</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {perfume.storeLinks?.filter((link) => isHttpOrHttpsUrl(link.url)).map((link) => (
                <li key={link._key} className="m-0">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex justify-between items-center no-underline bg-[#f8f9fa] px-4 py-3 rounded-xl border-2 border-border-color-light text-text-dark font-bold transition-all duration-200 hover:bg-brand-pink hover:border-brand-red hover:text-white hover:translate-x-1 focus-visible:bg-brand-pink focus-visible:border-brand-red focus-visible:text-white focus-visible:translate-x-1 focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2 group/price"
                  >
                    <span className="text-[0.95rem] tracking-wider">{link.store.toUpperCase()}</span>
                    {link.price && <span className="text-[0.9rem] opacity-90 bg-white/50 px-2 py-0.5 rounded-lg group-hover/price:bg-black/10 group-hover/price:text-white transition-colors">{link.price}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 px-5 flex items-center justify-between bg-white border-t-3 border-brand-pink gap-3">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center">
            {perfume.slug ? (
              <Link href={`/perfumes/${perfume.slug}`} className="no-underline group/title">
                <h3 className="text-2xl font-black text-brand-red tracking-tight m-0 transition-colors group-hover/title:text-brand-pink group-focus-visible/title:text-brand-pink">{perfume.title}</h3>
              </Link>
            ) : (
              <h3 className="text-2xl font-black text-brand-red tracking-tight m-0">{perfume.title}</h3>
            )}
          </div>
          {perfume.heartNotes && (
            <p className="text-[0.8rem] text-[#718096] font-semibold m-0 mt-0.5 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{perfume.heartNotes}</p>
          )}
        </div>

        {perfume.storeLinks && perfume.storeLinks.length > 0 && (
          <div className="flex gap-2 items-center">
            {perfume.storeLinks.map((link) => (
              <button
                type="button"
                key={link._key}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base shadow-[0_4px_10px_rgba(0,0,0,0.1)] cursor-pointer transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:rotate-5 hover:outline-2 hover:outline-brand-red hover:outline-offset-2 overflow-hidden"
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
