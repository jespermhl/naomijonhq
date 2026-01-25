import { getSanityConcerts } from "@/lib/sanity/concerts";

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
    return Math.floor(diff / (1000 * 80 * 60 * 24));
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
        <main className="concerts-container">
            <div className="tour-card">
                <div className="tour-sticker">TOUR!</div>
                <div className="strawberry-emoji">🍓</div>
                <h1 className="tour-title">Strawberry Tour</h1>

                <div className="concert-grid">
                    {upcoming.length > 0 ? (
                        upcoming.map((concert, i) => {
                            const days = calculateDaysUntil(concert.date);
                            return (
                                <div key={i} className="concert-item">
                                    <div className="date-box">
                                        <div className="date">{formatDate(concert.date)}</div>
                                        <div className="time">{formatTime(concert.date)}</div>
                                    </div>

                                    <div className="info-box">
                                        <div className="location">{concert.city}, {concert.country}</div>
                                        <div className="venue">{concert.location}</div>
                                        <div className="countdown">
                                            {days === 0 ? 'TODAY!' : days === 1 ? 'TOMORROW!' : `${days} DAYS TO GO`}
                                        </div>
                                    </div>

                                    <div className="action-box">
                                        {concert.isSoldOut ? (
                                            <div className="status-label sold-out">SOLD OUT</div>
                                        ) : concert.buyUrl ? (
                                            <a href={concert.buyUrl} target="_blank" rel="noopener" className="buy-btn">TICKETS</a>
                                        ) : null}
                                    </div>
                                </div>
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
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                :root {
                    --bg-primary: #fff5f5;
                    --brand-red: #e53e3e;
                    --brand-pink: #feb2b2;
                    --text-dark: #4a5568;
                }
                .concerts-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: var(--bg-primary);
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 10c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zm30 30c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM25 45c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM50 15c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4z' fill='%23e53e3e' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                    font-family: 'Outfit', sans-serif;
                    padding: 80px 24px;
                    box-sizing: border-box;
                }
                .tour-card {
                    max-width: 800px;
                    width: 100%;
                    background: white;
                    border: 6px solid var(--brand-red);
                    border-radius: 32px;
                    padding: 32px 24px;
                    text-align: center;
                    box-shadow: 12px 12px 0px var(--brand-red);
                    transform: rotate(0.5deg);
                    position: relative;
                }
                .tour-sticker {
                    position: absolute;
                    top: -20px;
                    right: 20px;
                    background: var(--brand-pink);
                    padding: 8px 16px;
                    border-radius: 12px;
                    border: 3px solid var(--brand-red);
                    font-weight: 800;
                    color: var(--brand-red);
                    transform: rotate(5deg);
                    box-shadow: 4px 4px 0px var(--brand-red);
                }
                .strawberry-emoji {
                    font-size: 72px;
                    margin-bottom: 16px;
                    animation: wobble 4s ease-in-out infinite;
                    display: inline-block;
                    filter: drop-shadow(4px 4px 0px var(--brand-red));
                }
                .tour-title {
                    font-size: 36px;
                    font-weight: 900;
                    margin-bottom: 32px;
                    color: var(--brand-red);
                    line-height: 1;
                }
                .concert-grid { display: flex; flex-direction: column; gap: 24px; }
                .concert-item {
                    display: grid;
                    grid-template-columns: 120px 1fr 140px;
                    align-items: center;
                    gap: 20px;
                    padding: 24px;
                    background: var(--bg-primary);
                    border: 4px solid var(--brand-red);
                    border-radius: 24px;
                    box-shadow: 6px 6px 0px var(--brand-red);
                    text-align: left;
                }
                .date-box { text-align: center; }
                .date { font-size: 18px; font-weight: 900; color: var(--brand-red); }
                .time { font-size: 14px; font-weight: 700; color: var(--brand-pink); }
                .location { font-size: 20px; font-weight: 900; color: var(--brand-red); margin-bottom: 4px; }
                .venue { font-size: 16px; font-weight: 600; color: var(--text-dark); }
                .countdown {
                    display: inline-block;
                    margin-top: 8px;
                    background: var(--brand-red);
                    color: white;
                    font-size: 11px;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 8px;
                    text-transform: uppercase;
                }
                .status-label {
                    background: var(--text-dark);
                    color: white;
                    padding: 10px 16px;
                    border-radius: 16px;
                    font-size: 14px;
                    font-weight: 900;
                    transform: rotate(-3deg);
                    display: inline-block;
                }
                .buy-btn {
                    display: inline-block;
                    background: var(--brand-red);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 16px;
                    font-size: 16px;
                    font-weight: 900;
                    text-decoration: none;
                    border: 3px solid black;
                    box-shadow: 4px 4px 0px black;
                    transform: rotate(-2deg);
                    transition: all 0.2s;
                }
                .buy-btn:hover {
                    transform: translateY(-2px) rotate(0deg) scale(1.05);
                    box-shadow: 6px 6px 0px black;
                }
                .no-concerts { font-size: 18px; font-weight: 600; color: var(--text-dark); }
                .past-section { margin-top: 56px; opacity: 0.7; }
                .past-title { font-size: 24px; font-weight: 900; color: var(--brand-pink); margin-bottom: 24px; }
                .past-list { display: flex; flex-direction: column; gap: 12px; }
                .past-item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 15px;
                    font-weight: 700;
                    color: var(--text-dark);
                    padding: 8px 12px;
                    border-bottom: 2px dashed var(--brand-pink);
                }
                @keyframes wobble {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.1) rotate(5deg); }
                    50% { transform: scale(1) rotate(-5deg); }
                    75% { transform: scale(1.1) rotate(3deg); }
                }
                @media (max-width: 640px) {
                    .concerts-container { padding: 40px 16px; }
                    .tour-card { padding: 40px 16px; border-width: 4px; border-radius: 24px; }
                    .strawberry-emoji { font-size: 56px; }
                    .tour-title { font-size: 28px; margin-bottom: 24px; }
                    .concert-item {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 16px;
                        padding: 20px;
                    }
                    .location { font-size: 18px; }
                    .past-item { flex-direction: column; align-items: center; gap: 4px; text-align: center; }
                    .past-venue { font-size: 13px; opacity: 0.8; }
                }
            ` }} />
        </main>
    );
}
