import NewsletterSection from "@/src/components/NewsletterSection";
import CommunitySocials from "@/src/components/CommunitySocials";
import Header from "@/src/components/Header";
import HeroSection from "@/src/components/HeroSection";

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