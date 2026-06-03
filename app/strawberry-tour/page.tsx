import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getSanityConcerts } from "@/lib/sanity/concerts";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { PastConcertItem } from "@/components/ui/PastConcertItem";
import { getDateParts } from "@/lib/utils/date";

interface Concert {
  id: string;
  date: string;
  city: string;
  location: string;
  country: string;
  buyUrl: string;
  isSoldOut: boolean;
}

/**
 * Fetches and maps concert data from Sanity for the UI.
 *
 * @returns A promise that resolves to an array of mapped Concert objects.
 */
async function getConcerts(): Promise<Concert[]> {
  const events = await getSanityConcerts();
  return events.map((event) => ({
    id: event._id,
    date: event.date,
    city: event.city,
    location: event.location,
    country: event.country || "",
    buyUrl: event.buyUrl || "",
    isSoldOut: event.isSoldOut || false,
  }));
}

const SOURCE = "/strawberry-tour";
const DEFAULTS = {
  title: "Strawberry Tour",
  description:
    "The Strawberry Tour is a wrap! Relive the memories and stream the album now.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(SOURCE, DEFAULTS);
}

export async function generateViewport(): Promise<Viewport> {
  return buildPageViewport(SOURCE);
}

export const revalidate = 3600;

/**
 * The Concerts page component.
 * Displays upcoming and past tour dates in a styled card layout.
 */
export default async function ConcertsPage() {
  const concerts = await getConcerts();

  return (
    <>
      <PropertyMetaTags source={SOURCE} />
      <main className="min-h-screen flex flex-col items-center px-6 py-20 max-sm:px-4 max-sm:py-10 max-sm:pb-16 bg-pattern">
        <Card>
          <Sticker>IT&apos;S A WRAP!</Sticker>

          <div className="mb-10 relative inline-block max-sm:mb-6 max-sm:!transform-none">
            <div className="w-[280px] h-[280px] bg-white border-8 border-brand-red rounded-3xl overflow-hidden shadow-[12px_12px_0px_var(--color-brand-red)] relative z-2 max-sm:w-[180px] max-sm:h-[180px] max-sm:border-6 max-sm:shadow-[8px_8px_0px_var(--color-brand-red)]">
              <Image
                src="/images/strawberry-tour.png"
                alt="Strawberry Tour"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="absolute -bottom-5 -right-5 text-6xl filter drop-shadow-[4px_4px_0px_var(--color-brand-red)] z-3 max-sm:text-[48px] max-sm:-bottom-3.5 max-sm:-right-3.5 max-sm:z-10">🍓</div>
          </div>

          <h1 className="page-title">Strawberry Tour</h1>

          <div className="flex flex-col items-center gap-4 bg-[#fff0f0] border-4 border-brand-red rounded-2xl p-8 py-6 mb-2 shadow-[6px_6px_0px_var(--color-brand-red)] text-center">
            <p className="text-[17px] font-semibold text-text-dark leading-relaxed max-w-[400px]">
              The Strawberry Tour has come to an end. Stream the album and keep
              the Strawberry era alive.
            </p>
            <Button href="/strawberry-album" size="large" rotate="0deg">
              Listen to Strawberry
            </Button>
          </div>

          {concerts.length > 0 && (
            <div className="mt-16 border-t-4 border-dashed border-brand-pink pt-12 text-center max-sm:mt-12 max-sm:pt-10">
              <h2 className="text-2xl font-black text-brand-red mb-6 uppercase tracking-wider">Tour Dates</h2>
              <div className="flex flex-col gap-4 items-center w-full">
                {concerts.map((c) => {
                  const dateParts = getDateParts(c.date);
                  return (
                    <PastConcertItem
                      key={c.id}
                      date={dateParts}
                      city={c.city}
                      location={c.location}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </main>
    </>
  );
}

