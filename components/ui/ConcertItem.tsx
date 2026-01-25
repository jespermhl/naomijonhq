import React from 'react';

/**
 * Props for the ConcertItem component.
 */
interface ConcertItemProps {
    /** The formatted date of the concert. */
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
    return (
        <div className="concert-item">
            <div className="date-box">
                <div className="date">{date}</div>
                <div className="time">{time}</div>
            </div>

            <div className="info-box">
                <div className="location">{city}, {country}</div>
                <div className="venue">{location}</div>
                <div className="countdown">
                    {days < 0 ? 'EVENT PASSED' : days === 0 ? 'TODAY!' : days === 1 ? 'TOMORROW!' : `${days} DAYS TO GO`}
                </div>
            </div>

            <div className="action-box">
                {isSoldOut ? (
                    <div className="status-label sold-out">SOLD OUT</div>
                ) : buyUrl ? (
                    <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="buy-btn">TICKETS</a>
                ) : null}
            </div>
        </div>
    );
};
