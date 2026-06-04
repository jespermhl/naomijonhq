import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { NewsletterForm } from "@/components/NewsletterForm";

const SOURCE = "/newsletter";
const DEFAULTS = {
  title: "Newsletter",
  description:
    "Join Naomi Jon's newsletter for the latest updates, exclusive content, and more!",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(SOURCE, DEFAULTS);
}

export async function generateViewport(): Promise<Viewport> {
  return buildPageViewport(SOURCE);
}

/**
 * The Newsletter page component.
 * Displays a custom newsletter signup form with utility styles.
 */
export default function NewsletterPage() {
  return (
    <>
      <style>{`
        @keyframes custom-emoji-wobble {
          0%, 100% { transform: rotate(-8deg) scale(1.05); }
          50% { transform: rotate(8deg) scale(1.05); }
        }
        .animate-wobble-strawberry {
          animation: custom-emoji-wobble 0.6s ease-in-out infinite alternate;
        }
      `}</style>

      <PropertyMetaTags source={SOURCE} />

      {/* Container - Replicated .newsletterPage exactly */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-9 sm:px-6 sm:py-20">

        {/* Card - Replicated .newsletterCard with exact max-width and paddings */}
        <Card
          className="w-full max-w-[560px] flex flex-col items-center text-center p-5 py-12 xs:px-8 sm:p-[60px_46px]"
          maxWidth="560px"
          rotated={false}
        >
          {/* Sticker rendered normally directly inside the Card parent (restores original layout math) */}
          <Sticker rotate="-3deg">HEY!</Sticker>

          {/* Strawberry Emoji */}
          <div className="text-[92px] leading-none animate-wobble-strawberry select-none mb-7 filter drop-shadow mt-4">
            🍓
          </div>

          {/* Page Title */}
          <h1 className="page-title leading-tight mb-4">
            Naomi&nbsp;Jon&nbsp;HQ
            <br />
            Newsletter
          </h1>

          {/* Page Subtitle */}
          <p className="page-subtitle max-w-[380px] mb-8 pb-4">
            Stay updated with new music, concert dates, and news from Naomi Jon.
          </p>

          <NewsletterForm />
        </Card>
      </main>
    </>
  );
}