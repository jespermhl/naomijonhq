import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import { PropertyMetaTags } from "@/components/PropertyMetaTags";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getSanityConcerts } from "@/lib/sanity/concerts";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { PastConcertItem } from "@/app/strawberry-tour/_components/PastConcertItem";
import { formatDate } from "@/lib/utils/date";

interface Concert {
  id: string;
  date: string;
  city: string;
  location: string;
  country: string;
  buyUrl: string;
  isSoldOut: boolean;
}

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

export default async function ConcertsPage() {
  const concerts = await getConcerts();
  const stats = [
    { label: "Shows", value: concerts.length },
    { label: "Cities", value: new Set(concerts.map((c) => c.city)).size },
    {
      label: "Countries",
      value: new Set(concerts.map((c) => c.country).filter(Boolean)).size,
    },
  ];

  return (
    <>
      <PropertyMetaTags source={SOURCE} />
      <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6">
        <Card
          rotated={false}
          maxWidth="1120px"
          className="relative px-6 py-8 text-left sm:p-10 lg:p-12"
        >
          <Sticker>IT&apos;S A WRAP!</Sticker>

          <div className="flex flex-col gap-8 md:flex-row md:items-start lg:gap-12">
            <div className="relative w-full max-w-85 shrink-0 self-center md:self-start">
              <div className="absolute -inset-4 rounded-[36px] bg-[radial-gradient(circle_at_top_left,rgba(255,79,168,0.2),transparent_58%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/90 bg-white/85 shadow-[0_20px_50px_rgba(255,79,168,0.12)]">
                <div className="aspect-square">
                  <Image
                    src="/images/strawberry-tour.png"
                    alt="Strawberry Tour"
                    width={720}
                    height={720}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-5xl drop-shadow-[4px_4px_0px_rgba(255,79,168,0.28)] filter max-sm:text-[40px]">
                🍓
              </div>

              {/* Stats Counters */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {stats.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-[20px] border border-white/90 bg-white/80 px-2 py-2.5 text-center shadow-[0_10px_24px_rgba(255,79,168,0.08)]"
                  >
                    <div className="text-brand-red text-xl font-black tracking-tighter sm:text-2xl">
                      {value}
                    </div>
                    <div className="text-text-dark/65 mt-1 text-[0.6rem] font-black tracking-[0.18em] uppercase sm:text-[0.65rem]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Information Column */}
            <div className="flex-1 space-y-5 pt-2 max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
              <div className="space-y-3">
                <p className="inline-flex rounded-full border border-white/90 bg-white/75 px-3.5 py-1.5 text-[0.68rem] font-black tracking-[0.12em] text-strawberry-accent uppercase shadow-[0_8px_20px_rgba(255,79,168,0.08)]">
                  Tour Archive
                </p>
                <h1 className="page-title text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-5xl lg:text-[54px]">
                  Strawberry Tour
                </h1>
                <p className="page-subtitle text-text-dark/80 max-w-130 text-sm leading-relaxed sm:text-base">
                  The Strawberry Tour has come to an end. Stream the album and
                  keep the Strawberry era alive.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 max-md:justify-center">
                <div className="text-text-dark/70 rounded-full border border-white/90 bg-white/75 px-3.5 py-1.5 text-[0.68rem] font-black tracking-[0.12em] uppercase shadow-[0_8px_20px_rgba(255,79,168,0.08)]">
                  All dates played
                </div>
                <div className="rounded-full border border-white/90 bg-[#fff2f8] px-3.5 py-1.5 text-[0.68rem] font-black tracking-[0.12em] text-strawberry-pink uppercase shadow-[0_8px_20px_rgba(255,79,168,0.08)]">
                  Streaming now
                </div>
              </div>

              <div className="pt-2">
                <Button href="/strawberry-album" size="large" rotate="0deg">
                  Listen to Strawberry
                </Button>
              </div>
            </div>
          </div>

          {/* Concerts List Section */}
          {concerts.length > 0 && (
            <section className="mt-10 rounded-[28px] border border-white/75 bg-white/58 p-5 shadow-[0_15px_40px_rgba(255,79,168,0.08)] sm:p-6 lg:mt-12">
              <h2 className="text-text-dark text-xl font-black tracking-[-0.04em] sm:text-2xl">
                Tour Dates
              </h2>
              <div className="mt-4 grid gap-2.5">
                {concerts.map(({ id, date, city, location, country }) => (
                  <PastConcertItem
                    key={id}
                    date={formatDate(date)}
                    city={city}
                    location={location}
                    country={country}
                  />
                ))}
              </div>
            </section>
          )}
        </Card>
      </main>
    </>
  );
}
