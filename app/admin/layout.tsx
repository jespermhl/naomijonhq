import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ogImagesForVariant } from "@/lib/opengraph";

export const metadata: Metadata = {
  title: "Studio",
  description: "Naomi Jon HQ — Sanity content studio.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Studio | Naomi Jon HQ",
    description: "Internal Sanity Studio for naomijonhq.com.",
    images: ogImagesForVariant("admin", "Studio | Naomi Jon HQ"),
  },
  twitter: {
    images: ogImagesForVariant("admin", "Studio | Naomi Jon HQ"),
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
