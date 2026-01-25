import React from 'react';

interface ConcertItemProps {
    date: string;
    time: string;
    city: string;
    country: string;
    location: string;
    days: number;
    isSoldOut: boolean;
    buyUrl?: string;
}

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
