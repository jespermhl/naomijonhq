"use client";

import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

const defaultLinks: NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Links", href: "https://naomijonhq.com/links" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <header className="relative z-50 mx-auto mt-4 mb-6 w-full max-w-275 pt-4 max-sm:mb-4 max-sm:px-4 max-sm:pt-3">
      <div className="flex h-18 items-center justify-between rounded-full border border-white/20 bg-white/10 px-8 py-3.5 shadow-sm backdrop-blur-md max-sm:px-5">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-10 text-xs font-black tracking-[0.2em] text-[`#5f4e58`] uppercase md:flex">
          {defaultLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-brand-red transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 flex h-6 w-6 flex-col items-center justify-center gap-1 focus-visible:outline-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`bg-text-dark h-0.5 w-5 transition-transform duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`bg-text-dark h-0.5 w-5 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`bg-text-dark h-0.5 w-5 transition-transform duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        role="menu"
        className={`absolute top-22 right-6 left-6 z-50 origin-top rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 text-center text-sm font-black tracking-widest text-text-muted uppercase">
          {defaultLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-brand-red border-b border-gray-100 py-2 transition-colors last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
