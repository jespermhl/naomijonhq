'use client';

import Link from "next/link";

export default function NewsletterPage() {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
            color: '#2d3748',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '440px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                borderRadius: '40px',
                padding: '48px 32px',
                textAlign: 'center',
                border: '1px solid rgba(255, 121, 121, 0.25)',
                boxShadow: '0 25px 50px -12px rgba(229, 62, 62, 0.15)'
            }}>
                <div style={{
                    fontSize: '80px',
                    marginBottom: '20px',
                    animation: 'float 3s ease-in-out infinite',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))'
                }}>
                    🍓
                </div>

                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    marginBottom: '12px',
                    background: 'linear-gradient(to right, #e53e3e, #f687b3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                }}>
                    Naomi Jon HQ Newsletter
                </h1>

                <p style={{
                    color: '#4a5568',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    marginBottom: '32px',
                    fontWeight: '500'
                }}>
                    If the form is not showing up, subscribe later or say hi at:<br />
                    <Link
                        href="mailto:info@naomijonhq.com"
                        style={{ color: '#e53e3e', textDecoration: 'none', fontWeight: '700' }}
                    >
                        info@naomijonhq.com
                    </Link>
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '12px' }}>
                    <SocialIcon
                        href="https://www.instagram.com/naomijonhq/"
                        name="Instagram"
                        icon={<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                    />
                    <SocialIcon
                        href="https://www.youtube.com/@NaomiJonHQ"
                        name="YouTube"
                        icon={<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                    />
                    <SocialIcon
                        href="https://www.tiktok.com/@naomijonhq"
                        name="TikTok"
                        icon={<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.776 8.776 0 0 1-1.87-1.35v7.54a7.042 7.042 0 0 1-1.49 4.39c-1.57 1.94-4.13 2.94-6.58 2.52-2.31-.34-4.42-1.92-5.32-4.11-.94-2.22-.61-4.97 1-6.85 1.49-1.74 3.95-2.5 6.19-2.03v4.03c-1.12-.22-2.38.07-3.15.91-.8.85-1.01 2.15-.55 3.23.44 1.08 1.63 1.84 2.8 1.83 1.61.02 3.05-1.2 3.25-2.8.04-.33.04-.67.04-1V0h-.01z" />}
                    />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                body {
                    margin: 0;
                    overflow: auto !important;
                }
            `}} />
        </main>
    );
}

function SocialIcon({ href, name, icon }: { href: string; name: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(229, 62, 62, 0.1)',
                borderRadius: '14px',
                transition: 'all 0.3s ease',
                color: '#e53e3e'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
                e.currentTarget.style.backgroundColor = '#e53e3e';
                e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(229, 62, 62, 0.1)';
                e.currentTarget.style.color = '#e53e3e';
            }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '22px', height: '22px' }}
            >
                {icon}
            </svg>
        </a>
    );
}
