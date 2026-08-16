import type { SiteSection } from "@/lib/sanity/sites";

export function SiteRichText({ section }: { section: SiteSection }) {
  if (section._type !== "richText") return null;
  if (!section.heading && !section.body) return null;

  const paragraphs = (section.body ?? "").split(/\n{2,}/);

  return (
    <section className="w-full px-6 py-20 max-sm:px-4 max-sm:py-14">
      <div className="mx-auto max-w-2xl">
        {section.heading && (
          <h2 className="text-text-dark mb-6 text-display-md leading-[1.1] font-black tracking-tight uppercase">
            {section.heading}
          </h2>
        )}
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-text-muted text-body-lg leading-relaxed font-semibold"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
