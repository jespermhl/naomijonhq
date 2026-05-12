import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { NewsletterPromotion } from "@/components/NewsletterPromotion";
import Footer from "@/components/Footer";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";

const SOURCE = "/";
const DEFAULTS = {
  title: "Naomi Jon HQ",
  description:
    "The official Naomi Jon HQ. Get details on the Strawberry Tour, newsletter updates, and more.",
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = await buildPageMetadata(SOURCE, DEFAULTS);

  return {
    ...meta,
    metadataBase: new URL("https://naomijonhq.com"),
    title: {
      default: "Naomi Jon HQ",
      template: "%s | Naomi Jon HQ",
    },
    icons: {
      icon: "https://naomijonhq.com/icon.png",
      apple: "https://naomijonhq.com/icon.png",
    },
    openGraph: {
      ...meta.openGraph,
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
      ...meta.twitter,
      card: "summary",
      images: ["https://naomijonhq.com/icon.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  return buildPageViewport(SOURCE);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <link
          rel="alternate"
          type="application/json+oembed"
          href="https://naomijonhq.com/oembed.json"
        />
        {children}
        <Footer />
        <PropertyMetaTags source={SOURCE} />
        <NewsletterPromotion />
      </body>
    </html>
  );
}