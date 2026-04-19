import type { Metadata, Viewport } from "next";
import { getRedirectMeta } from "@/lib/sanity/redirects";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Credits } from "@/components/ui/Credits";
import styles from "./newsletter.module.css";

const SOURCE = "/newsletter";

const DEFAULT_TITLE = "Newsletter";
const DEFAULT_DESCRIPTION =
  "Join Naomi Jon's newsletter for the latest updates, exclusive content, and more!";
const DEFAULT_IMAGE = "/images/strawberry-cover.jpg";
const DEFAULT_THEME_COLOR = "#a54c88";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getRedirectMeta(SOURCE);

  const title = meta.metaTitle?.trim() || DEFAULT_TITLE;
  const description = meta.metaDescription?.trim() || DEFAULT_DESCRIPTION;
  const image = meta.metaImage?.trim() || DEFAULT_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const meta = await getRedirectMeta(SOURCE);
  return {
    themeColor: meta.themeColor?.trim() || DEFAULT_THEME_COLOR,
  };
}

/**
 * The Newsletter page component.
 * Displays a custom newsletter signup form.
 */
export default function NewsletterPage() {
  return (
    <main className={`${styles.newsletterPage} bg-pattern`}>
      <Card className={styles.newsletterCard} maxWidth="460px" rotated={false}>
        <Sticker rotate="-3deg">HEY!</Sticker>

        <div className="strawberry-emoji wobble" style={{ fontSize: "92px" }}>
          🍓
        </div>

        <h1 className="page-title">
          Naomi Jon HQ
          <br />
          Newsletter
        </h1>

        <p className="page-subtitle">
          Stay updated with new music, concert dates, and news from Naomi Jon.
        </p>

        <NewsletterForm />

        <Credits />
      </Card>
    </main>
  );
}
