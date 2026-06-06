import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/src/lib/sanity/redirects";
import { PropertyMetaTags } from "@/src/components/PropertyMetaTags";
import { Card } from "@/src/components/ui/Card";
import { Sticker } from "@/src/components/ui/Sticker";
import { NewsletterForm } from "@/src/components/NewsletterForm";

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
      <PropertyMetaTags source={SOURCE} />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-9 sm:px-6 sm:py-20">
        <Card
          className="w-full max-w-140 flex flex-col items-center text-center p-5 py-12 xs:px-8 sm:p-[60px_46px]"
          maxWidth="560px"
          rotated={false}
        >
          <Sticker rotate="-3deg">HEY!</Sticker>

          <div className="text-[92px] leading-none animate-wobble-strawberry select-none mb-7 filter drop-shadow mt-4">
            🍓
          </div>

          <h1 className="page-title leading-tight mb-4">
            Naomi&nbsp;Jon&nbsp;HQ
            <br />
            Newsletter
          </h1>

          <p className="page-subtitle max-w-95 mb-8 pb-4">
            Stay updated with new music, concert dates, and news from Naomi Jon.
          </p>

          <NewsletterForm />
        </Card>
      </main>
    </>
  );
}
