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
                maxWidth: '500px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '32px',
                padding: '48px 32px',
                textAlign: 'center',
                border: '1px solid rgba(255, 121, 121, 0.2)',
                boxShadow: '0 20px 40px rgba(255, 121, 121, 0.15)'
            }}>
                <div style={{
                    fontSize: '72px',
                    marginBottom: '24px',
                    animation: 'float 3s ease-in-out infinite',
                    display: 'inline-block'
                }}>
                    🍓
                </div>

                <h1 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '16px',
                    background: 'linear-gradient(to right, #e53e3e, #f687b3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                }}>
                    Sweet as a strawberry,<br />but the form is shy.
                </h1>

                <p style={{
                    color: '#718096',
                    fontSize: '17px',
                    lineHeight: '1.6',
                    marginBottom: '32px',
                    fontWeight: '500'
                }}>
                    Our newsletter subscription is currently taking a break. You can still reach us directly at:
                </p>

                <Link
                    href="mailto:info@naomijonhq.com"
                    style={{
                        display: 'inline-block',
                        padding: '16px 36px',
                        backgroundColor: '#e53e3e',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: '16px',
                        fontWeight: '700',
                        fontSize: '18px',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: '0 10px 20px rgba(229, 62, 62, 0.3)',
                        marginBottom: '24px'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                        e.currentTarget.style.backgroundColor = '#c53030';
                        e.currentTarget.style.boxShadow = '0 15px 25px rgba(229, 62, 62, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0px)';
                        e.currentTarget.style.backgroundColor = '#e53e3e';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(229, 62, 62, 0.3)';
                    }}
                >
                    info@naomijonhq.com
                </Link>

                <p style={{
                    fontSize: '14px',
                    color: '#a0aec0',
                    marginTop: '16px'
                }}>
                    Try refreshing the page if the issue persists.
                </p>
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
