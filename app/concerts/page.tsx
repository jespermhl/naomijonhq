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

function calculateDaysUntil(dateStr: string) {
    const t = new Date(dateStr);
    const n = new Date();
    const diff = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() -
        new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' }).format(new Date(dateStr));

const formatTime = (dateStr: string) =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' }).format(new Date(dateStr));

export default async function ConcertsPage() {
    const concerts = await getConcerts();
    const upcoming = concerts.filter(c => calculateDaysUntil(c.date) >= 0);
    const past = concerts.filter(c => calculateDaysUntil(c.date) < 0);

    return (
        <main className="concerts-container bg-pattern">
            <Card className="tour-card">
                <Sticker className="tour-sticker">TOUR!</Sticker>
                <div className="strawberry-emoji wobble">🍓</div>
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
        </main>
    );
}
