import { Metadata } from "next";
import { ogImagesForVariant } from "@/lib/opengraph";

export const metadata: Metadata = {
  title: "Strawberry - New Album",
  description: "Naomi Jon's album Strawberry — out now.",
  openGraph: {
    title: "Strawberry - New Album",
    description: "Naomi Jon's album Strawberry — out now.",
    images: ogImagesForVariant("strawberry", "Strawberry — Naomi Jon"),
  },
  twitter: {
    images: ogImagesForVariant("strawberry", "Strawberry — Naomi Jon"),
  },
};

/**
 * Layout component for the Strawberry Countdown page.
 * Provides metadata for SEO and social sharing.
 *
 * @param props - Component props containing children.
 * @returns The layout wrapper for the countdown page.
 */
export default function StrawberryCountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
