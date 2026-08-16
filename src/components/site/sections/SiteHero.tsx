import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/sanity/imageUrl";
import type { SiteSection } from "@/lib/sanity/sites";

export function SiteHero({ section }: { section: SiteSection }) {
  if (section._type !== "hero") return null;

  const imageUrl = section.image
    ? urlFor(section.image).width(1200).url()
    : null;

  return (
    <section className="flex min-h-[calc(100vh-140px)] w-full items-center px-6 pt-4 pb-8 max-sm:px-4 max-sm:pt-3 max-sm:pb-6">
      <div className="mx-auto w-full max-w-275">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start space-y-6 lg:max-w-130">
            {section.eyebrow && (
              <p className="text-brand-red text-xs font-black tracking-[0.18em] uppercase">
                {section.eyebrow}
              </p>
            )}
            <h1 className="text-text-dark text-display-lg leading-[1.05] font-black tracking-[-0.06em] uppercase">
              {section.title}
            </h1>
            {section.subtitle && (
              <p className="text-text-muted text-body-lg leading-relaxed font-semibold">
                {section.subtitle}
              </p>
            )}
            {section.buttonLabel && section.buttonHref && (
              <Button href={section.buttonHref} rotate="0deg" size="large">
                {section.buttonLabel}
              </Button>
            )}
          </div>

          {imageUrl && (
            <div className="relative aspect-[2.2/1] w-full overflow-hidden rounded-card border border-border-glass shadow-glow">
              <Image
                src={imageUrl}
                alt={section.imageAlt ?? ""}
                fill
                className="object-cover opacity-90"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
