import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteSection } from "@/lib/sanity/sites";

export function SiteStats({ section }: { section: SiteSection }) {
  if (section._type !== "stats") return null;
  if (!section.stats?.length) return null;

  return (
    <section className="w-full px-6 py-16 max-sm:px-4 max-sm:py-12">
      <div className="mx-auto max-w-4xl text-center">
        {section.title && <SectionHeading eyebrow="Stats" title={section.title} />}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {section.stats.map((stat) => (
            <div
              key={stat._key}
              className="rounded-panel border border-border-glass bg-bg-glass px-4 py-6 text-center shadow-float-sm"
            >
              <div className="text-brand-red text-3xl font-black tracking-tighter sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-text-dark/65 mt-2 text-[0.65rem] font-black tracking-[0.18em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
