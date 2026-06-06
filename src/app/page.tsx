import NewsletterSection from "@/src/app/_components/NewsletterSection";
import CommunitySocials from "@/src/app/_components/CommunitySocials";
import Header from "@/src/components/Header";
import HeroSection from "@/src/app/_components/HeroSection";

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