import { getSite } from "@/lib/sanity/sites";
import { SiteRenderer } from "@/components/site/SiteRenderer";
import { NewsletterSection } from "@/app/_components/NewsletterSection";
import { CommunitySocials } from "@/app/_components/CommunitySocials";
import { HeroSection } from "@/app/_components/HeroSection";

export default async function HomePage() {
  const site = await getSite("/");
  if (site) return <SiteRenderer site={site} />;

  return (
    <div className="relative flex w-full flex-col">
      <main className="relative z-20 flex w-full flex-col">
        <HeroSection />
        <CommunitySocials />
        <NewsletterSection />
      </main>
    </div>
  );
}
