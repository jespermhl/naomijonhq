'use client';

import React from 'react';
import posthog from 'posthog-js/dist/module.full';

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
    // Sanitization: trim whitespace and split by space
    const sanitizedDate = date.trim();
    const dateParts = sanitizedDate.split(/\s+/);

    // Attempt to extract month and numeric day
    // We expect month as the first part and day as the second part
    const month = dateParts[0];
    const day = dateParts[1];

    // Lightweight validation: check if we have two parts and day looks numeric-ish
    const isValidSplit = dateParts.length >= 2 && /^\d+/.test(day);

    return (
        <div className="concert-item">
            <div className="date-section">
                {isValidSplit ? (
                    <>
                        <span className="month">{month.toUpperCase()}</span>
                        <span className="day">{day.replace(/\D/g, '')}</span>
                    </>
                ) : (
                    <span className="full-date">{date}</span>
                )}
            </div>

            <div className="info-section">
                <div className="location-group">
                    <h3 className="city">{country ? `${city}, ${country}` : city}</h3>
                    <p className="venue">{location} <span className="time-at">@ {time}</span></p>
                </div>
                {days >= 0 && (
                    <div className="countdown-tag">
                        {days === 0 ? 'LIVE TODAY!' : days === 1 ? 'LIVE TOMORROW!' : `${days} DAYS TO GO`}
                    </div>
                )}
            </div>

            <div className="action-section">
                {isSoldOut ? (
                    <div className="status-label sold-out">SOLD OUT</div>
                ) : buyUrl ? (
                    <a
                        href={buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-btn"
                        onClick={() => posthog.capture("ticket_link_clicked", { city, country, venue: location, date })}
                    >
                        TICKETS
                    </a>
                ) : null}
            </div>
        </div>
    );
};
