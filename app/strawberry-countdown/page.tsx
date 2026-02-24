'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * The Strawberry Countdown page component.
 * Displays a live countdown to the album release date with animations.
 */
export default function StrawberryCountdownPage() {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2026-03-20T00:00:00+01:00').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
                setIsFinished(false);
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsFinished(true);
            }
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

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
            padding: '40px 24px',
            overflowY: 'auto',
            position: 'relative'
        }}>
            {isFinished && <BurstAnimation />}

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
                position: 'relative',
                zIndex: 10
            }}>
                <div className="soon-sticker" style={{
                    position: 'absolute',
                    top: '-25px',
                    left: '30px',
                    backgroundColor: isFinished ? '#f6ad55' : '#feb2b2',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '3px solid #e53e3e',
                    fontWeight: '800',
                    fontSize: '16px',
                    color: '#e53e3e',
                    transform: 'rotate(-5deg)',
                    boxShadow: '4px 4px 0px #e53e3e'
                }}>
                    {isFinished ? 'OUT NOW!' : 'COMING SOON'}
                </div>

                <div className="cover-container" style={{
                    marginBottom: '32px',
                    position: 'relative',
                    display: 'inline-block',
                    animation: isFinished ? 'celebrate 1s ease-in-out infinite' : 'wobble 4s ease-in-out infinite'
                }}>
                    <div style={{
                        width: isFinished ? '320px' : '280px',
                        height: isFinished ? '320px' : '280px',
                        backgroundColor: '#ffffff',
                        border: '8px solid #e53e3e',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '12px 12px 0px #e53e3e',
                        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        position: 'relative'
                    }}>
                        <Image
                            src="/images/strawberry-cover.jpg"
                            alt="Strawberry Album Cover"
                            fill
                            style={{
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    {/* Tiny Floating Strawberry Emoji for extra flavor */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-15px',
                        right: '-15px',
                        fontSize: '48px',
                        filter: 'drop-shadow(3px 3px 0px #e53e3e)'
                    }}>
                        🍓
                    </div>
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
                <p className="countdown-subtitle" style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#feb2b2',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Naomi&apos;s Sophomore Album
                </p>
                <p className="date-pill" style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#e53e3e',
                    marginBottom: '40px',
                    backgroundColor: '#fff5f5',
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '2px solid #e53e3e'
                }}>
                    March 20, 2026
                </p>

                {!isFinished ? (
                    <div className="time-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '12px',
                        marginBottom: '48px'
                    }}>
                        <TimeSticker value={timeLeft.days} label="Days" rotate="-1deg" />
                        <TimeSticker value={timeLeft.hours} label="Hours" rotate="1.5deg" />
                        <TimeSticker value={timeLeft.minutes} label="Mins" rotate="-0.5deg" />
                        <TimeSticker value={timeLeft.seconds} label="Secs" rotate="2deg" />
                    </div>
                ) : (
                    <div style={{
                        fontSize: '28px',
                        fontWeight: '900',
                        color: '#e53e3e',
                        marginBottom: '40px',
                        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        IT&apos;S FINALLY HERE! 🎉
                    </div>
                )}

                <div className="cta-container" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <a
                        href="https://open.spotify.com/prerelease/2DaNG0z6noDTCZ00laRSLh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn secondary"
                        style={{
                            flex: 1,
                            backgroundColor: '#ffffff',
                            color: '#e53e3e',
                            padding: '16px 20px',
                            borderRadius: '16px',
                            fontSize: '20px',
                            fontWeight: '900',
                            textDecoration: 'none',
                            border: '4px solid #e53e3e',
                            boxShadow: '6px 6px 0px #feb2b2',
                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: 'rotate(1deg)',
                            textAlign: 'center',
                            maxWidth: '240px'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px) rotate(0deg) scale(1.05)';
                            e.currentTarget.style.boxShadow = '10px 10px 0px #feb2b2';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0px) rotate(1deg) scale(1)';
                            e.currentTarget.style.boxShadow = '6px 6px 0px #feb2b2';
                        }}
                    >
                        {isFinished ? 'STREAM' : 'PRE-SAVE'}
                    </a>

                    <a
                        href="https://releeze.com/en/collections/naomi-jon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn primary"
                        style={{
                            flex: 1,
                            backgroundColor: '#e53e3e',
                            color: '#ffffff',
                            padding: '16px 20px',
                            borderRadius: '16px',
                            fontSize: '20px',
                            fontWeight: '900',
                            textDecoration: 'none',
                            border: '4px solid #ffffff',
                            boxShadow: '6px 6px 0px #feb2b2',
                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: 'rotate(-2deg)',
                            textAlign: 'center',
                            maxWidth: '240px'
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
                        {isFinished ? 'ORDER' : 'PRE-ORDER'}
                    </a>
                </div>
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
                @keyframes celebrate {
                    0% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.2) rotate(10deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes burst {
                    0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(var(--tx), var(--ty)) scale(1.5) rotate(var(--tr)); opacity: 0; }
                }
                body {
                    margin: 0;
                    overflow: auto !important;
                }
                
                @media (max-width: 640px) {
                    .countdown-main {
                        padding: 16px !important;
                        align-items: center !important;
                        overflow-y: auto !important;
                    }
                    .countdown-card {
                        padding: 32px 16px 24px !important;
                        margin: 0 !important;
                        border-width: 4px !important;
                        border-radius: 20px !important;
                        box-shadow: 6px 6px 0px #e53e3e !important;
                    }
                    .countdown-title {
                        font-size: 28px !important;
                        margin-bottom: 2px !important;
                    }
                    .countdown-subtitle {
                        font-size: 14px !important;
                        margin-bottom: 4px !important;
                        letter-spacing: 0.05em !important;
                    }
                    .date-pill {
                        font-size: 13px !important;
                        padding: 2px 8px !important;
                        margin-bottom: 20px !important;
                    }
                    .time-grid {
                        grid-template-columns: repeat(4, 1fr) !important;
                        gap: 8px !important;
                        margin-bottom: 24px !important;
                    }
                    .time-sticker {
                        padding: 8px 2px !important;
                        border-width: 2px !important;
                        border-radius: 12px !important;
                        box-shadow: 3px 3px 0px #e53e3e !important;
                    }
                    .time-sticker div:first-child {
                        font-size: 18px !important;
                    }
                    .time-sticker div:last-child {
                        font-size: 9px !important;
                    }
                    .cta-container {
                        gap: 8px !important;
                        flex-direction: row !important;
                    }
                    .cta-btn {
                        font-size: 14px !important;
                        padding: 10px 4px !important;
                        border-width: 2px !important;
                        min-width: unset !important;
                        width: 100% !important;
                        border-radius: 12px !important;
                    }
                    .cover-container {
                        margin-bottom: 16px !important;
                    }
                    .cover-container div:first-child {
                        width: 140px !important;
                        height: 140px !important;
                        border-width: 4px !important;
                        box-shadow: 6px 6px 0px #e53e3e !important;
                    }
                    .soon-sticker {
                        top: -12px !important;
                        left: 15px !important;
                        font-size: 12px !important;
                        padding: 6px 12px !important;
                        border-width: 2px !important;
                    }
                }
            `}} />
        </main>
    );
}

/**
 * A burst animation component that displays animated strawberry emojis.
 * Used when the countdown reaches zero.
 */
function BurstAnimation() {
    const [particles] = useState(() => {
        return Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * 360;
            const distance = 200 + Math.random() * 300;
            return {
                tx: Math.cos((angle * Math.PI) / 180) * distance,
                ty: Math.sin((angle * Math.PI) / 180) * distance,
                tr: Math.random() * 360,
                delay: Math.random() * 2
            };
        });
    });

    if (particles.length === 0) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 5
        }}>
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        fontSize: '40px',
                        animation: 'burst 2s ease-out infinite',
                        animationDelay: `${p.delay}s`,
                        '--tx': `${p.tx}px`,
                        '--ty': `${p.ty}px`,
                        '--tr': `${p.tr}deg`
                    } as React.CSSProperties}
                >
                    🍓
                </div>
            ))}
        </div>
    );
}

/**
 * A time sticker component that displays a countdown unit (days, hours, minutes, seconds).
 * 
 * @param props - Component props.
 * @param props.value - The numeric value to display.
 * @param props.label - The label for the time unit.
 * @param props.rotate - CSS rotation value for the sticker.
 */
function TimeSticker({ value, label, rotate }: { value: number; label: string; rotate: string }) {
    return (
        <div className="time-sticker" style={{
            backgroundColor: '#ffffff',
            border: '4px solid #e53e3e',
            borderRadius: '20px',
            padding: '16px 8px',
            boxShadow: '4px 4px 0px #e53e3e',
            transform: `rotate(${rotate})`
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
