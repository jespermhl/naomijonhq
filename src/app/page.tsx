import NewsletterSection from "@/app/_components/NewsletterSection";
import CommunitySocials from "@/app/_components/CommunitySocials";
import Header from "@/components/Header";
import HeroSection from "@/app/_components/HeroSection";

export default function DiscordLanding() {

    return (
        <div className="relative flex w-full flex-col">
            <Header />

            <main className="relative z-20 flex w-full flex-col">
                <HeroSection />
                <CommunitySocials />
                <NewsletterSection />
            </main>
        </div>
    );
}