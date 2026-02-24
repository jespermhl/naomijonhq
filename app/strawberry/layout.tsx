import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Strawberry - New Album Countdown",
    description: "Counting down to Naomi Jon's sophomore album 'Strawberry'. Pre-order now!",
    openGraph: {
        title: "Strawberry - New Album Countdown",
        description: "Counting down to Naomi Jon's sophomore album 'Strawberry'. Pre-order now!",
        images: ["/images/strawberry-cover.jpg"],
    },
};

/**
 * Layout component for the Strawberry Countdown page.
 * Provides metadata for SEO and social sharing.
 * 
 * @param props - Component props containing children.
 * @returns The layout wrapper for the countdown page.
 */
export default function StrawberryCountdownLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
