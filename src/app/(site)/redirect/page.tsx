import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import { Card } from "@/components/ui/Card";
import { RedirectContent } from "./RedirectContent";

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
          <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
            <Card
              maxWidth="500px"
              rotated={false}
              className="flex w-full max-w-125 flex-col items-center p-8 text-center"
            >
              <div className="mb-6 animate-bounce text-5xl">🍓</div>
              <h1 className="text-2xl font-extrabold tracking-tight text-neutral-800 uppercase">
                Loading...
              </h1>
            </Card>
          </main>
        }
      >
        <RedirectContent />
      </Suspense>
    </>
  );
}
