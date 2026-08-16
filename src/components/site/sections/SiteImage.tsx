import Image from "next/image";
import { urlFor } from "@/sanity/imageUrl";
import type { SiteSection } from "@/lib/sanity/sites";

export function SiteImage({ section }: { section: SiteSection }) {
  if (section._type !== "imageBlock") return null;

  const imageUrl = section.image ? urlFor(section.image).width(1400).url() : null;
  if (!imageUrl) return null;

  return (
    <section className="w-full px-6 py-16 max-sm:px-4 max-sm:py-12">
      <figure className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-card border border-border-glass shadow-float">
          <Image
            src={imageUrl}
            alt={section.alt ?? ""}
            width={1400}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>
        {section.caption && (
          <figcaption className="text-text-faint mt-3 text-center text-sm font-semibold">
            {section.caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
