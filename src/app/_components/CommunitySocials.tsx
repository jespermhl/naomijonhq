import { getSocials } from "@/components/SocialConfig";
import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function CommunitySocials() {
  const socials = await getSocials(false);

  if (socials.length === 0) return null;

  return (
    <section className="relative w-full px-6 py-20 max-sm:px-4 max-sm:py-12">
      <div className="mx-auto max-w-275 text-center">
        <SectionHeading eyebrow="Stay Connected" title="Follow the Socials" />

        <div className="grid grid-cols-2 justify-center gap-6 max-sm:gap-4 md:grid-cols-3">
          {socials.map((social) => (
            <SocialLinkCard key={social._id} social={social} />
          ))}
        </div>
      </div>
    </section>
  );
}
