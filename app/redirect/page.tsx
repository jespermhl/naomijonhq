import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { getRedirectMeta } from "@/lib/sanity/redirects";
import { Card } from "@/components/ui/Card";
import { RedirectContent } from "./RedirectContent";
import styles from "./redirect.module.css";

const DEFAULT_THEME_COLOR = "#a54c88";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}): Promise<Metadata> {
  const { source } = await searchParams;
  if (!source) return {};

  const meta = await getRedirectMeta(source);

  const title = meta.metaTitle?.trim() || undefined;
  const description = meta.metaDescription?.trim() || undefined;
  const image = meta.metaImage?.trim() || undefined;

  if (!title && !description && !image) return {};

  return {
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    },
  };
}

export async function generateViewport({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}): Promise<Viewport> {
  const { source } = await searchParams;
  if (!source) return { themeColor: DEFAULT_THEME_COLOR };

  const meta = await getRedirectMeta(source);
  return {
    themeColor: meta.themeColor?.trim() || DEFAULT_THEME_COLOR,
  };
}

export default function RedirectPage() {
  return (
    <Suspense
      fallback={
        <main className={`${styles.redirectPage} bg-pattern`}>
          <Card maxWidth="500px">
            <div className="strawberry-emoji wobble">🍓</div>
            <h1 className="page-title">Loading...</h1>
          </Card>
        </main>
      }
    >
      <RedirectContent />
    </Suspense>
  );
}
