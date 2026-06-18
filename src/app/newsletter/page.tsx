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
      <PropertyMetaTags source={SOURCE} />

      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-9 sm:px-6 sm:py-20">
        <Card
          className="xs:px-8 flex w-full max-w-140 flex-col items-center p-5 py-12 text-center sm:p-[60px_46px]"
          maxWidth="560px"
          rotated={false}
        >
          <Sticker rotate="-3deg">HEY!</Sticker>

          <div className="animate-wobble-strawberry mt-4 mb-7 text-[92px] leading-none drop-shadow filter select-none">
            🍓
          </div>

          <h1 className="page-title mb-4 leading-tight">
            Naomi&nbsp;Jon&nbsp;HQ
            <br />
            Newsletter
          </h1>

          <p className="page-subtitle mb-8 max-w-95 pb-4">
            Stay updated with new music, concert dates, and news from Naomi Jon.
          </p>

          <NewsletterForm />
        </Card>
      </main>
    </>
  );
}
