import { Metadata } from "next";
import Image from "next/image";
import { getSanityConcerts } from "@/lib/sanity/concerts";
import { Card } from "@/components/ui/Card";
import { Sticker } from "@/components/ui/Sticker";
import { ConcertItem } from "@/components/ui/ConcertItem";

interface Concert {
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
    return events.map(event => ({
        date: event.date,
        city: event.city,
        location: event.location,
        country: event.country || "",
        buyUrl: event.buyUrl || "",
        isSoldOut: event.isSoldOut || false
    }));
}

/**
 * Calculates the number of days between a target date and today.
 * 
 * @param dateStr - The target date string.
 * @returns The number of days (can be negative for past dates).
 */
function calculateDaysUntil(dateStr: string) {
    const t = new Date(dateStr);
    const n = new Date();
    const diff = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() -
        new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Formats a date string into "MMM DD" format (e.g., "MAY 24").
 * 
 * @param dateStr - The target date string to format.
 * @returns The formatted date string.
 */
const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
};

/**
 * Formats a date string into "HH:MM" format.
 * 
 * @param dateStr - The target date string to format.
 * @returns The formatted time string.
 */
const formatTime = (dateStr: string) =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' }).format(new Date(dateStr));

export const metadata: Metadata = {
    title: "Strawberry Tour",
    description: "Join Naomi Jon on the Strawberry Tour! Check out upcoming concert dates and get your tickets now.",
};

/**
 * The Concerts page component.
 * Displays upcoming and past tour dates in a styled card layout.
 */
export default async function ConcertsPage() {
    const concerts = await getConcerts();
    const upcoming = concerts.filter(c => calculateDaysUntil(c.date) >= 0);
    const past = concerts.filter(c => calculateDaysUntil(c.date) < 0);

    return (
        <main className="concerts-container bg-pattern">
            <Card className="tour-card">
                <Sticker className="tour-sticker">TOUR!</Sticker>

                <div className="tour-image-container" style={{
                    marginBottom: '40px',
                    position: 'relative',
                    display: 'inline-block',
                }}>
                    <div style={{
                        width: '280px',
                        height: '280px',
                        backgroundColor: '#ffffff',
                        border: '8px solid var(--brand-red)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '12px 12px 0px var(--brand-red)',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <Image
                            src="/images/strawberry-tour.png"
                            alt="Strawberry Tour"
                            fill
                            style={{
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    {/* Floating Strawberry Emoji */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        right: '-20px',
                        fontSize: '64px',
                        filter: 'drop-shadow(4px 4px 0px var(--brand-red))',
                        zIndex: 3
                    }}>
                        🍓
                    </div>
                </div>

                <h1 className="tour-title">Strawberry Tour</h1>

                <div className="concert-grid">
                    {upcoming.length > 0 ? (
                        upcoming.map((concert, i) => {
                            const days = calculateDaysUntil(concert.date);
                            return (
                                <ConcertItem
                                    key={i}
                                    date={formatDate(concert.date)}
                                    time={formatTime(concert.date)}
                                    city={concert.city}
                                    country={concert.country}
                                    location={concert.location}
                                    days={days}
                                    isSoldOut={concert.isSoldOut}
                                    buyUrl={concert.buyUrl}
                                />
                            );
                        })
                    ) : (
                        <p className="no-concerts">New dates coming soon! Stay tuned 🍓</p>
                    )}
                </div>

                {past.length > 0 && (
                    <div className="past-section">
                        <h2 className="past-title">Past Dates</h2>
                        <div className="past-list">
                            {past.map((c, i) => (
                                <div key={i} className="past-item">
                                    <span className="past-info">{formatDate(c.date)} - {c.city}</span>
                                    <span className="past-venue">{c.location}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 640px) {
                    .tour-image-container {
                        margin-bottom: 24px !important;
                    }
                    .tour-image-container .wobble {
                        width: 180px !important;
                        height: 180px !important;
                        border-width: 6px !important;
                        box-shadow: 8px 8px 0px var(--brand-red) !important;
                    }
                    .tour-image-container div:last-child {
                        font-size: 48px !important;
                        bottom: -15px !important;
                        right: -15px !important;
                    }
                }
            `}} />
        </main>
    );
}

