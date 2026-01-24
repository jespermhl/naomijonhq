import { getSanityConcerts } from "@/lib/sanity/concerts";

async function getConcerts() {
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

const cityTimezones: Record<string, string> = {
    'Berlin': 'Europe/Berlin',
    'Hamburg': 'Europe/Berlin',
    'Munich': 'Europe/Berlin',
    'München': 'Europe/Berlin',
    'Cologne': 'Europe/Berlin',
    'Köln': 'Europe/Berlin',
    'Frankfurt': 'Europe/Berlin',
    'Düsseldorf': 'Europe/Berlin',
    'Stuttgart': 'Europe/Berlin',
    'Leipzig': 'Europe/Berlin',
    'Dortmund': 'Europe/Berlin',
    'Essen': 'Europe/Berlin',
    'Bremen': 'Europe/Berlin',
    'Hannover': 'Europe/Berlin',
    'Vienna': 'Europe/Vienna',
    'Wien': 'Europe/Vienna',
    'Zurich': 'Europe/Zurich',
    'Zürich': 'Europe/Zurich',
    'London': 'Europe/London',
    'Manchester': 'Europe/London',
    'Birmingham': 'Europe/London',
    'Paris': 'Europe/Paris',
    'Madrid': 'Europe/Madrid',
    'Barcelona': 'Europe/Madrid',
    'Rome': 'Europe/Rome',
    'Amsterdam': 'Europe/Amsterdam',
    'Brussels': 'Europe/Brussels',
    'Prague': 'Europe/Prague',
    'Warsaw': 'Europe/Warsaw',
};

function getTimezoneForCity(city: string) {
    return cityTimezones[city] || 'Europe/Berlin';
}

function calculateDaysUntil(dateStr: string) {
    const target = new Date(dateStr);
    const now = new Date();
    const t = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const n = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = t.getTime() - n.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string, city: string) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: getTimezoneForCity(city)
    }).format(date);
}

function formatTime(dateStr: string, city: string) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: getTimezoneForCity(city)
    }).format(date);
}

export default async function ConcertsPage() {
    const concerts = await getConcerts();

    const upcomingConcerts = concerts.filter((c: any) => calculateDaysUntil(c.date) >= 0);
    const pastConcerts = concerts.filter((c: any) => calculateDaysUntil(c.date) < 0);

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff5f5',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 10c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zm30 30c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM25 45c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM50 15c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4z' fill='%23e53e3e' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '40px 24px'
        }}>
            <div className="tour-card" style={{
                maxWidth: '800px',
                width: '100%',
                backgroundColor: '#ffffff',
                border: '6px solid #e53e3e',
                borderRadius: '32px',
                padding: '56px 40px',
                textAlign: 'center',
                boxShadow: '12px 12px 0px #e53e3e',
                transform: 'rotate(0.5deg)',
                position: 'relative',
                marginTop: 'auto',
                marginBottom: 'auto'
            }}>
                <div className="hey-sticker" style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '20px',
                    backgroundColor: '#feb2b2',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: '3px solid #e53e3e',
                    fontWeight: '800',
                    fontSize: '14px',
                    color: '#e53e3e',
                    transform: 'rotate(5deg)',
                    boxShadow: '4px 4px 0px #e53e3e'
                }}>
                    TOUR!
                </div>

                <div className="strawberry-emoji" style={{
                    fontSize: '72px',
                    marginBottom: '16px',
                    animation: 'wobble 4s ease-in-out infinite',
                    display: 'inline-block',
                    filter: 'drop-shadow(4px 4px 0px #e53e3e)'
                }}>
                    🍓
                </div>

                <h1 className="tour-title" style={{
                    fontSize: '48px',
                    fontWeight: '900',
                    marginBottom: '40px',
                    color: '#e53e3e',
                    lineHeight: '1',
                    letterSpacing: '-0.02em'
                }}>
                    Strawberry Tour
                </h1>

                <div className="concert-grid" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {upcomingConcerts.length > 0 ? (
                        upcomingConcerts.map((concert: any, index: number) => {
                            const daysUntil = calculateDaysUntil(concert.date);
                            return (
                                <div key={index} className="concert-item" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'minmax(120px, 1fr) 2fr 1fr',
                                    alignItems: 'center',
                                    gap: '20px',
                                    padding: '24px',
                                    backgroundColor: '#fff5f5',
                                    border: '4px solid #e53e3e',
                                    borderRadius: '24px',
                                    boxShadow: '6px 6px 0px #e53e3e',
                                    textAlign: 'left',
                                    position: 'relative'
                                }}>
                                    <div className="concert-date-box" style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#e53e3e' }}>
                                            {formatDate(concert.date, concert.city)}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#feb2b2' }}>
                                            {formatTime(concert.date, concert.city)}
                                        </div>
                                    </div>

                                    <div className="concert-info">
                                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#e53e3e', marginBottom: '4px' }}>
                                            {concert.city}, {concert.country}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#4a5568' }}>
                                            {concert.location}
                                        </div>
                                        <div className="countdown-sticker" style={{
                                            display: 'inline-block',
                                            marginTop: '8px',
                                            backgroundColor: '#e53e3e',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            padding: '4px 8px',
                                            borderRadius: '8px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {daysUntil === 0 ? 'TODAY!' : daysUntil === 1 ? 'TOMORROW!' : `${daysUntil} DAYS TO GO`}
                                        </div>
                                    </div>

                                    <div className="concert-action" style={{ textAlign: 'right' }}>
                                        {concert.isSoldOut ? (
                                            <div style={{
                                                backgroundColor: '#4a5568',
                                                color: '#fff',
                                                padding: '12px 20px',
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                fontWeight: '900',
                                                transform: 'rotate(-3deg)'
                                            }}>
                                                SOLD OUT
                                            </div>
                                        ) : concert.buyUrl ? (
                                            <a
                                                href={concert.buyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="buy-btn"
                                                style={{
                                                    display: 'inline-block',
                                                    backgroundColor: '#e53e3e',
                                                    color: '#fff',
                                                    padding: '12px 24px',
                                                    borderRadius: '16px',
                                                    fontSize: '18px',
                                                    fontWeight: '900',
                                                    textDecoration: 'none',
                                                    border: '3px solid #000',
                                                    boxShadow: '4px 4px 0px #000',
                                                    transform: 'rotate(-2deg)',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                TICKETS
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#4a5568' }}>
                            New dates coming soon! Stay tuned 🍓
                        </p>
                    )}
                </div>

                {pastConcerts.length > 0 && (
                    <div className="past-concerts" style={{ marginTop: '56px', opacity: 0.6 }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#feb2b2', marginBottom: '24px' }}>
                            Past Dates
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {pastConcerts.map((concert: any, index: number) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: '#4a5568',
                                    padding: '8px 16px',
                                    borderBottom: '2px dashed #feb2b2'
                                }}>
                                    <span>{formatDate(concert.date, concert.city)} - {concert.city}</span>
                                    <span>{concert.location}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes wobble {
                    0% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.1) rotate(5deg); }
                    50% { transform: scale(1) rotate(-5deg); }
                    75% { transform: scale(1.1) rotate(3deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                body {
                    margin: 0;
                }
                .buy-btn:hover {
                    transform: translateY(-2px) rotate(0deg) scale(1.05) !important;
                    box-shadow: 6px 6px 0px #000 !important;
                }
                @media (max-width: 640px) {
                    .tour-card {
                        padding: 40px 20px !important;
                    }
                    .tour-title {
                        font-size: 32px !important;
                    }
                    .concert-item {
                        grid-template-columns: 1fr !important;
                        text-align: center !important;
                    }
                    .concert-action {
                        text-align: center !important;
                    }
                }
            `}} />
        </main>
    );
}
