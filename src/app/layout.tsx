import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { NewsletterPromotion } from "@/app/_components/NewsletterPromotion";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { ClientLayout } from "./providers-layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { fetchSocials } from "@/lib/strapi/socials";
import { headers } from "next/headers";

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

async function getBaseUrl() {
  const headersInstance = await headers();
  const host = headersInstance.get("host") || "naomijonhq.com";

  const baseUrl = host.startsWith("www.")
    ? `https://${host.substring(4)}`
    : `https://${host}`;
  return baseUrl;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await buildPageMetadata(SOURCE, DEFAULTS);
  const baseUrl = await getBaseUrl();

  return {
    ...meta,
    metadataBase: new URL(baseUrl),
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

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const socials = await fetchSocials();
  const baseUrl = await getBaseUrl();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${displayFont.variable} relative flex min-h-screen flex-col`}
      >
        <a
          href="#main-content"
          className="bg-brand-red fixed top-0 left-0 z-9999 -translate-y-full rounded-br-lg px-4 py-2 text-sm font-black text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>

        <link
          rel="alternate"
          type="application/json+oembed"
          href="https://naomijonhq.com/oembed.json"
        />

        <ErrorBoundary>
          <ClientLayout modal={modal} socials={socials} baseUrl={baseUrl}>
            <main id="main-content" className="relative z-10 flex-1 w-full flex flex-col justify-center min-h-screen">
              {children}
            </main>
          </ClientLayout>
        </ErrorBoundary>

        <PropertyMetaTags source={SOURCE} />
        <NewsletterPromotion />
      </body>
    </html>
  );
}
