import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naomijonhq.com"),
  title: {
    default: "Naomi Jon HQ",
    template: "%s | Naomi Jon HQ",
  },
  description: "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
  openGraph: {
    title: "Naomi Jon HQ",
    description: "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
    url: "https://naomijonhq.com",
    siteName: "Naomi Jon HQ",
    images: [
      {
        url: "/images/strawberry-cover.jpg",
        width: 1200,
        height: 1200,
        alt: "Strawberry - Naomi Jon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naomi Jon HQ",
    description: "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
    images: ["/images/strawberry-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { NewsletterPromotion } from "@/components/NewsletterPromotion";

/**
 * The root layout component for the entire application.
 * Providers horizontal hydration warning suppression and globally active scripts.
 * 
 * @param props - Component props containing children.
 * @returns The HTML structure for all pages.
 */
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
