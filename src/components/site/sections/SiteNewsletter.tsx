import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteSection } from "@/lib/sanity/sites";

const NewsletterForm = dynamic(
  () => import("@/components/NewsletterForm").then((m) => m.NewsletterForm),
  {
    loading: () => (
      <div className="flex w-full max-w-md mx-auto justify-center py-8">
        <div className="h-12 w-12 animate-pulse rounded-full bg-brand-red/20" />
      </div>
    ),
  },
);

export function SiteNewsletter({ section }: { section: SiteSection }) {
  if (section._type !== "newsletter") return null;

  const description =
    section.description ||
    "Stay updated with new music, concert dates,\nand exclusive news from Naomi Jon.";

  return (
    <section className="relative w-full border-t border-border-subtle px-6 py-20 max-sm:px-4 max-sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow={section.eyebrow || "Don't miss out"}
          title={section.title || "Newsletter"}
          titleClassName="text-display-md mb-4"
        />
        <p className="text-text-muted/90 mx-auto mb-8 max-w-lg text-[clamp(0.95rem,1.1vw,1.1rem)] leading-relaxed font-semibold">
          {description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="mx-auto w-full max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
