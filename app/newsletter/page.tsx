import Link from "next/link";

export default function NewsletterPage() {
    return (
        <main>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Our newsletter form ghosted us 👻. You can still drop your email at <Link href="mailto:info@naomijonhq.com">info@naomijonhq.com</Link>!</h1>
                    <p>Try refreshing the page if the issue persists.</p>
                </div>
            </div>
        </main>
    );
}
