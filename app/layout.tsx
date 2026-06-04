import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { NewsletterPromotion } from "@/components/NewsletterPromotion";
import Footer from "@/components/Footer";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { ClientLayout } from "./providers-layout";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const SOURCE = "/";
const DEFAULTS = {
  title: "Naomi Jon HQ",
  description:
    "The official Naomi Jon HQ. Get details on Strawberry, the tour archive, perfume links, newsletter updates, and more.",
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
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${displayFont.variable} bg-pattern min-h-screen flex flex-col relative`}
      >
        <link
          rel="alternate"
          type="application/json+oembed"
          href="https://naomijonhq.com/oembed.json"
        />

        {/* ClientLayout rendert die Animation sicher auf Client-Ebene */}
        <ClientLayout>
          <main className="relative z-10 flex-1 w-full flex flex-col justify-center min-h-screen">
            {children}
            {modal}
          </main>
          <Footer />
        </ClientLayout>

        <PropertyMetaTags source={SOURCE} />
        <NewsletterPromotion />
      </body>
    </html>
  );
}
