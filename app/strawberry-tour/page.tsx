import type { Metadata, Viewport } from "next";
import { buildPageMetadata, buildPageViewport } from "@/lib/sanity/redirects";
import Image from "next/image";
import Link from "next/link";
import { getSanityConcerts } from "@/lib/sanity/concerts";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { PastConcertItem } from "@/components/ui/PastConcertItem";
import { Credits } from "@/components/ui/Credits";
import { getDateParts } from "@/lib/utils/date";
import styles from "./tour.module.css";

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
    <main className={`${styles.tourContainer} bg-pattern`}>
      <Card>
        <Sticker>IT&apos;S A WRAP!</Sticker>

        <div className={styles.tourImageContainer}>
          <div className={styles.tourImageWrapper}>
            <Image
              src="/images/strawberry-tour.png"
              alt="Strawberry Tour"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className={styles.floatingStrawberry}>🍓</div>
        </div>

        <h1 className="page-title">Strawberry Tour</h1>

        <div className={styles.tourOverBox}>
          <p className={styles.tourOverEmoji}>🍓🎤✨</p>
          <p className={styles.tourOverText}>
            The Strawberry Tour is officially a wrap — thank you to every single
            one of you who came out and sang along. It was absolutely magical!
          </p>
          <Link href="/strawberry-album" className={styles.albumBtn}>
            🍓 Listen to Strawberry
          </Link>
        </div>

        {concerts.length > 0 && (
          <div className={styles.pastSection}>
            <h2 className={styles.pastTitle}>Tour Dates</h2>
            <div className={styles.pastList}>
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

        <Credits />
      </Card>
    </main>
  );
}
