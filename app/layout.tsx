import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ogImagesForVariant } from "@/lib/opengraph";
import { OG_THEME_COLOR } from "@/lib/og-theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naomijonhq.com"),
  themeColor: OG_THEME_COLOR,
  title: {
    default: "Naomi Jon HQ",
    template: "%s | Naomi Jon HQ",
  },
  description:
    "The official Naomi Jon HQ — Strawberry Tour, newsletter, Strawberry album, and every link in one place.",
  openGraph: {
    title: "Naomi Jon HQ",
    description:
      "Tour dates, newsletter, and releases — the official home for everything Naomi Jon.",
    url: "https://naomijonhq.com",
    siteName: "Naomi Jon HQ",
    locale: "en_US",
    type: "website",
    images: ogImagesForVariant("default", "Naomi Jon HQ"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Naomi Jon HQ",
    description:
      "Tour dates, newsletter, and releases — the official home for everything Naomi Jon.",
    images: ogImagesForVariant("default", "Naomi Jon HQ"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { NewsletterPromotion } from "@/components/NewsletterPromotion";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <NewsletterPromotion />
      </body>
    </html>
  );
}
