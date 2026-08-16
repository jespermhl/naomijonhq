import type { SiteSection } from "@/lib/sanity/sites";

export function SiteLinks({ section }: { section: SiteSection }) {
  if (section._type !== "links") return null;
  if (!section.links?.length) return null;

  return (
    <section className="w-full px-6 py-16 max-sm:px-4 max-sm:py-12">
      <div className="mx-auto max-w-3xl text-center">
        {section.title && (
          <h2 className="text-text-dark mb-8 text-display-md leading-[1.1] font-black tracking-tight uppercase">
            {section.title}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          {section.links.map((link) => (
            <a
              key={link._key}
              href={link.href}
              className="text-text-dark rounded-full border border-border-glass bg-bg-glass px-6 py-3 text-eyebrow font-black tracking-[0.12em] uppercase shadow-float-sm transition-transform hover:-translate-y-0.5"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
