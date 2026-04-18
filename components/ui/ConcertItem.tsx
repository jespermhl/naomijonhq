import React from "react";
import { Button } from "./Button";
import styles from "./concert-item.module.css";

/**
 * Props for the ConcertItem component.
 */
interface ConcertItemProps {
  /** The formatted date of the concert. Expected format: "MMM DD" (e.g., "MAY 24"). */
  date: string;
  /** The formatted time of the concert. */
  time: string;
  /** The city where the concert is held. */
  city: string;
  /** The country where the concert is held. */
  country: string;
  /** The name of the venue or location. */
  location: string;
  /** Number of days until the concert for the countdown. */
  days: number;
  /** Whether the concert is sold out. */
  isSoldOut: boolean;
  /** Optional URL to buy tickets. */
  buyUrl?: string;
}

/**
 * A component that displays information about a single concert event,
 * including date, location, countdown, and ticket status.
 */
export const ConcertItem: React.FC<ConcertItemProps> = ({
  date,
  time,
  city,
  country,
  location,
  days,
  isSoldOut,
  buyUrl,
}) => {
  // Split date into month and day if possible (e.g., "MAY 24")
  const sanitizedDate = date.trim();
  const dateParts = sanitizedDate.split(/\s+/);

  const month = dateParts[0];
  const day = dateParts[1];

  const isValidSplit = dateParts.length >= 2 && /^\d+/.test(day);

  return (
    <div className={styles.concertItem}>
      <div className={styles.dateSection}>
        {isValidSplit ? (
          <>
            <span className={styles.month}>{month.toUpperCase()}</span>
            <span className={styles.day}>{day.replace(/\D/g, "")}</span>
          </>
        ) : (
          <span className={styles.fullDate}>{date}</span>
        )}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.locationGroup}>
          <h3 className={styles.city}>
            {country ? `${city}, ${country}` : city}
          </h3>
          <p className={styles.venue}>
            {location} <span className={styles.timeAt}>@ {time}</span>
          </p>
        </div>
        {days >= 0 && (
          <div className={styles.countdownTag}>
            {days === 0
              ? "LIVE TODAY!"
              : days === 1
              ? "LIVE TOMORROW!"
              : `${days} DAYS TO GO`}
          </div>
        )}
      </div>

      <div className={styles.actionSection}>
        {isSoldOut ? (
          <div className={`${styles.statusLabel} ${styles.soldOut}`}>
            SOLD OUT
          </div>
        ) : buyUrl ? (
          <Button href={buyUrl} className={styles.buyBtn}>
            TICKETS
          </Button>
        ) : null}
      </div>
    </div>
  );
};
