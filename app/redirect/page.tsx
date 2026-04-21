import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { Card } from "@/components/ui/Card";
import { RedirectContent } from "./RedirectContent";
import styles from "./redirect.module.css";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}): Promise<Metadata> {
  const { source } = await searchParams;
  if (!source) return {};
  return buildPageMetadata(source);
}

export async function generateViewport({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}): Promise<Viewport> {
  const { source } = await searchParams;
  if (!source) return {};
  return buildPageViewport(source);
}

export default async function RedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source } = await searchParams;
  return (
    <>
      {source && <PropertyMetaTags source={source} />}
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
    </>
  );
}
