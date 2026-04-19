import { Metadata } from "next";
import Image from "next/image";
import { getSanityConcerts } from "@/lib/sanity/concerts";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { ConcertItem } from "@/components/ui/ConcertItem";
import { PastConcertItem } from "@/components/ui/PastConcertItem";
import { Credits } from "@/components/ui/Credits";
import {
  calculateDaysUntil,
  formatDate,
  formatTime,
  getDateParts,
} from "@/lib/utils/date";
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

export const metadata: Metadata = {
  title: "Strawberry Tour",
  description:
    "Join Naomi Jon on the Strawberry Tour! Check out upcoming concert dates and get your tickets now.",
};

export const revalidate = 3600;

/**
 * The Concerts page component.
 * Displays upcoming and past tour dates in a styled card layout.
 */
export default async function ConcertsPage() {
  const concerts = await getConcerts();
  const upcoming = concerts.filter((c) => calculateDaysUntil(c.date) >= 0);
  const past = concerts.filter((c) => calculateDaysUntil(c.date) < 0);

  return (
    <main className={`${styles.tourContainer} bg-pattern`}>
      <Card>
        <Sticker>TOUR!</Sticker>

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

        <div className={styles.concertGrid}>
          {upcoming.length > 0 ? (
            upcoming.map((concert) => (
              <ConcertItem
                key={concert.id}
                date={formatDate(concert.date)}
                time={formatTime(concert.date)}
                city={concert.city}
                country={concert.country}
                location={concert.location}
                days={calculateDaysUntil(concert.date)}
                isSoldOut={concert.isSoldOut}
                buyUrl={concert.buyUrl}
              />
            ))
          ) : (
            <p className={styles.noConcerts}>
              New dates coming soon! Stay tuned 🍓
            </p>
          )}
        </div>

        {past.length > 0 && (
          <div className={styles.pastSection}>
            <h2 className={styles.pastTitle}>Past Dates</h2>
            <div className={styles.pastList}>
              {past.map((c) => {
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

