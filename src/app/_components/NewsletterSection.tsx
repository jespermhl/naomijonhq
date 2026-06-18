import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

export function NewsletterSection() {
  return (
    <section className="relative w-full border-t border-white/20 px-6 py-20 max-sm:px-4 max-sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="Don't miss out"
          title="Newsletter"
          titleClassName="text-[clamp(2rem,4vw,3.2rem)] mb-4"
        />

        <p className="mx-auto mb-8 max-w-lg text-[clamp(0.95rem,1.1vw,1.1rem)] leading-relaxed font-semibold text-text-muted/90">
          Stay updated with new music, concert dates,
          <br />
          and exclusive news from Naomi Jon.
        </p>

        <div className="mx-auto w-full max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
