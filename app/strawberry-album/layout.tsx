import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ogImagesForVariant } from "@/lib/opengraph";

export const metadata: Metadata = {
  title: "Strawberry Album",
  description:
    "Stream and order Naomi Jon's album Strawberry — official Naomi Jon HQ page.",
  openGraph: {
    title: "Strawberry Album | Naomi Jon HQ",
    description:
      "Stream and order Strawberry — full album hub (music video on /strawberry).",
    images: ogImagesForVariant("strawberry-album", "Strawberry Album | Naomi Jon HQ"),
  },
  twitter: {
    images: ogImagesForVariant("strawberry-album", "Strawberry Album | Naomi Jon HQ"),
  },
};

export default function StrawberryAlbumLayout({ children }: { children: ReactNode }) {
  return children;
}
