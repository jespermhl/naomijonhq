'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StrawberryCountdownPage() {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('2026-03-20T00:00:00+01:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <main className="countdown-main" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff5f5',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 10c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zm30 30c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM25 45c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM50 15c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4z' fill='%23e53e3e' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '24px'
        }}>
            <div className="countdown-card" style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: '#ffffff',
                border: '6px solid #e53e3e',
                borderRadius: '32px',
                padding: '64px 40px',
                textAlign: 'center',
                boxShadow: '12px 12px 0px #e53e3e',
                transform: 'rotate(1deg)',
                position: 'relative'
            }}>
                <div className="soon-sticker" style={{
                    position: 'absolute',
                    top: '-25px',
                    left: '30px',
                    backgroundColor: '#feb2b2',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '3px solid #e53e3e',
                    fontWeight: '800',
                    fontSize: '16px',
                    color: '#e53e3e',
                    transform: 'rotate(-5deg)',
                    boxShadow: '4px 4px 0px #e53e3e'
                }}>
                    COMING SOON
                </div>

                <div className="strawberry-emoji" style={{
                    fontSize: '100px',
                    marginBottom: '24px',
                    animation: 'wobble 4s ease-in-out infinite',
                    display: 'inline-block',
                    filter: 'drop-shadow(4px 4px 0px #e53e3e)'
                }}>
                    🍓
                </div>

                <h1 className="countdown-title" style={{
                    fontSize: '42px',
                    fontWeight: '900',
                    marginBottom: '8px',
                    color: '#e53e3e',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                }}>
                    STRAWBERRY
                </h1>
                <p style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#feb2b2',
                    marginBottom: '40px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Naomi’s Sophomore Album
                </p>

                <div className="time-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    marginBottom: '48px'
                }}>
                    <TimeSticker value={timeLeft.days} label="Days" />
                    <TimeSticker value={timeLeft.hours} label="Hours" />
                    <TimeSticker value={timeLeft.minutes} label="Mins" />
                    <TimeSticker value={timeLeft.seconds} label="Secs" />
                </div>

                <a
                    href="#"
                    className="pre-order-btn"
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#e53e3e',
                        color: '#ffffff',
                        padding: '18px 36px',
                        borderRadius: '20px',
                        fontSize: '24px',
                        fontWeight: '900',
                        textDecoration: 'none',
                        border: '4px solid #ffffff',
                        boxShadow: '6px 6px 0px #feb2b2',
                        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: 'rotate(-2deg)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px) rotate(0deg) scale(1.05)';
                        e.currentTarget.style.boxShadow = '10px 10px 0px #feb2b2';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0px) rotate(-2deg) scale(1)';
                        e.currentTarget.style.boxShadow = '6px 6px 0px #feb2b2';
                    }}
                >
                    PRE-ORDER NOW
                </a>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes wobble {
                    0% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.05) rotate(3deg); }
                    50% { transform: scale(1) rotate(-3deg); }
                    75% { transform: scale(1.05) rotate(2deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                body {
                    margin: 0;
                    overflow: auto !important;
                }
                
                @media (max-width: 640px) {
                    .countdown-card {
                        padding: 48px 24px !important;
                        margin: 20px;
                    }
                    .countdown-title {
                        font-size: 32px !important;
                    }
                    .time-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 16px !important;
                    }
                    .pre-order-btn {
                        font-size: 20px !important;
                        padding: 16px 28px !important;
                    }
                }
            `}} />
        </main>
    );
}

function TimeSticker({ value, label }: { value: number; label: string }) {
    return (
        <div className="time-sticker" style={{
            backgroundColor: '#ffffff',
            border: '4px solid #e53e3e',
            borderRadius: '20px',
            padding: '16px 8px',
            boxShadow: '4px 4px 0px #e53e3e',
            transform: `rotate(${Math.random() * 4 - 2}deg)`
        }}>
            <div style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#e53e3e',
                lineHeight: '1'
            }}>
                {value.toString().padStart(2, '0')}
            </div>
            <div style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#feb2b2',
                marginTop: '4px',
                textTransform: 'uppercase'
            }}>
                {label}
            </div>
        </div>
    );
}
