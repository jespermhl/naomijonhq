'use client';

import Link from "next/link";

export default function NewsletterPage() {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff5f5',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 10c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zm30 30c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM25 45c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4zM50 15c0-2-2-4-2-4s-2 2-2 4 2 4 2 4 2-2 2-4z' fill='%23e53e3e' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '24px'
        }}>
            <div className="newsletter-card" style={{
                maxWidth: '460px',
                width: '100%',
                backgroundColor: '#ffffff',
                border: '6px solid #e53e3e',
                borderRadius: '32px',
                padding: '56px 40px',
                textAlign: 'center',
                boxShadow: '12px 12px 0px #e53e3e',
                transform: 'rotate(-1deg)',
                position: 'relative'
            }}>
                {/* Decorative Sticker Detail */}
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
                    HEY!
                </div>

                <div className="strawberry-emoji" style={{
                    fontSize: '92px',
                    marginBottom: '16px',
                    animation: 'wobble 4s ease-in-out infinite',
                    display: 'inline-block',
                    filter: 'drop-shadow(4px 4px 0px #e53e3e)'
                }}>
                    🍓
                </div>

                <h1 className="newsletter-title" style={{
                    fontSize: '32px',
                    fontWeight: '900',
                    marginBottom: '16px',
                    color: '#e53e3e',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em'
                }}>
                    Naomi Jon HQ<br />Newsletter
                </h1>

                <p className="newsletter-p" style={{
                    color: '#4a5568',
                    fontSize: '17px',
                    lineHeight: '1.5',
                    marginBottom: '40px',
                    fontWeight: '600'
                }}>
                    If the form doesn’t appear, open this page in your browser (not Instagram or TikTok) or wait a few seconds. You can also say hi at:<br />
                    <Link
                        href="mailto:info@naomijonhq.com"
                        style={{
                            color: '#e53e3e',
                            textDecoration: 'underline',
                            fontWeight: '800',
                            textUnderlineOffset: '4px'
                        }}
                    >
                        info@naomijonhq.com
                    </Link>
                </p>

                <div className="social-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    justifyItems: 'center',
                    marginBottom: '12px'
                }}>
                    <SocialSticker
                        href="https://www.instagram.com/naomijonhq/"
                        name="Instagram"
                        icon={<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                    />
                    <SocialSticker
                        href="https://www.tiktok.com/@naomijonhq"
                        name="TikTok"
                        icon={<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.776 8.776 0 0 1-1.87-1.35v7.54a7.042 7.042 0 0 1-1.49 4.39c-1.57 1.94-4.13 2.94-6.58 2.52-2.31-.34-4.42-1.92-5.32-4.11-.94-2.22-.61-4.97 1-6.85 1.49-1.74 3.95-2.5 6.19-2.03v4.03c-1.12-.22-2.38.07-3.15.91-.8.85-1.01 2.15-.55 3.23.44 1.08 1.63 1.84 2.8 1.83 1.61.02 3.05-1.2 3.25-2.8.04-.33.04-.67.04-1V0h-.01z" />}
                    />
                    <SocialSticker
                        href="https://www.youtube.com/@NaomiJonHQ"
                        name="YouTube"
                        icon={<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                    />
                    <SocialSticker
                        href="https://open.spotify.com/user/31yei2h2znbfbn2ehvxxl7ssprly"
                        name="Spotify"
                        icon={<path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12C24 5.372 18.627 0 12 0zm5.508 17.308c-.221.362-.689.471-1.05.25-2.812-1.718-6.353-2.103-10.518-1.151-.412.095-.823-.162-.918-.574-.095-.411.162-.823.574-.918 4.56-1.042 8.471-.6 11.662 1.349.362.221.472.689.25 1.05zm1.473-3.255c-.278.452-.867.6-1.319.32-3.217-1.977-8.123-2.553-11.928-1.398-.511.155-1.05-.138-1.205-.649-.155-.511.138-1.05.649-1.205 4.354-1.321 9.771-.682 13.483 1.597.452.278.599.867.319 1.32zm.126-3.394c-3.858-2.291-10.222-2.503-13.916-1.381-.592.179-1.218-.163-1.397-.754-.179-.592.163-1.218.754-1.397 4.25-1.291 11.285-1.041 15.71 1.587.532.316.703 1.004.386 1.536-.316.533-1.004.704-1.536.386z" />}
                    />
                    <SocialSticker
                        href="https://discord.com/invite/GJPk2Y9Mvk"
                        name="Discord"
                        icon={<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.252-.192.37-.29a.074.074 0 0 1 .077-.01c3.928 1.794 8.18 1.794 12.056 0a.073.073 0 0 1 .077.01c.118.098.245.196.37.29a.077.077 0 0 1-.006.127 12.98 12.98 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />}
                    />
                    <SocialSticker
                        href="https://www.whatsapp.com/channel/0029Vb6wHWF8kyyUdpjrr02u"
                        name="WhatsApp"
                        icon={<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />}
                    />
                </div>
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
                    overflow: auto !important;
                }
                
                /* Responsive Overrides */
                @media (max-width: 480px) {
                    .newsletter-card {
                        padding: 40px 24px !important;
                        border-width: 4px !important;
                        box-shadow: 8px 8px 0px #e53e3e !important;
                    }
                    .strawberry-emoji {
                        font-size: 72px !important;
                    }
                    .newsletter-title {
                        font-size: 24px !important;
                    }
                    .newsletter-p {
                        font-size: 15px !important;
                        margin-bottom: 32px !important;
                    }
                    .social-sticker {
                        width: 48px !important;
                        height: 48px !important;
                        border-width: 3px !important;
                    }
                    .social-sticker svg {
                        width: 22px !important;
                        height: 22px !important;
                    }
                    .hey-sticker {
                        font-size: 11px !important;
                        padding: 6px 12px !important;
                        top: -15px !important;
                        right: 15px !important;
                    }
                }
            `}} />
        </main>
    );
}

function SocialSticker({ href, name, icon }: { href: string; name: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="social-sticker"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                backgroundColor: '#ffffff',
                border: '4px solid #e53e3e',
                borderRadius: '16px',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                color: '#e53e3e',
                boxShadow: '4px 4px 0px #e53e3e'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) rotate(-8deg)';
                e.currentTarget.style.backgroundColor = '#feb2b2';
                e.currentTarget.style.boxShadow = '8px 8px 0px #e53e3e';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) rotate(0deg)';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '4px 4px 0px #e53e3e';
            }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '28px', height: '28px' }}
            >
                {icon}
            </svg>
        </a>
    );
}
