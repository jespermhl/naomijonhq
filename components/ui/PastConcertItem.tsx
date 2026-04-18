import React from "react";
import styles from "./past-concert-item.module.css";

interface PastConcertItemProps {
  date: {
    month: string;
    day: string;
  };
  city: string;
  location: string;
}

/**
 * A simpler component for past concert dates.
 */
export const PastConcertItem: React.FC<PastConcertItemProps> = ({
  date,
  city,
  location,
}) => {
  return (
    <div className={styles.pastItem}>
      <div className={styles.pastDate}>
        <span className={styles.pastMonth}>{date.month}</span>
        <span className={styles.pastDay}>{date.day}</span>
      </div>
      <div className={styles.pastDetails}>
        <span className={styles.pastCity}>{city}</span>
        <span className={styles.pastVenue}>{location}</span>
      </div>
      <div className={styles.pastStatus}>
        <span className={styles.pastLabel}>Played</span>
      </div>
    </div>
  );
};
