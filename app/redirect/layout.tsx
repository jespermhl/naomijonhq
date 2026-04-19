import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ogImagesForVariant } from "@/lib/opengraph";

export const metadata: Metadata = {
  title: "Redirect",
  description:
    "You are being redirected through Naomi Jon HQ to a verified destination.",
  openGraph: {
    title: "Redirect | Naomi Jon HQ",
    description:
      "Secure link hub — we check the destination before sending you on.",
    images: ogImagesForVariant("redirect", "Redirect | Naomi Jon HQ"),
  },
  twitter: {
    images: ogImagesForVariant("redirect", "Redirect | Naomi Jon HQ"),
  },
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return children;
}
