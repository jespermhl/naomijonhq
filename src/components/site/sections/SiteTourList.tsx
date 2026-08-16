import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSanityConcerts } from "@/lib/sanity/concerts";
import { formatDate } from "@/lib/utils/date";
import type { SiteSection } from "@/lib/sanity/sites";

export async function SiteTourList({ section }: { section: SiteSection }) {
  if (section._type !== "tourList") return null;

  const concerts = await getSanityConcerts();
  if (concerts.length === 0) return null;

  return (
    <section className="w-full px-6 py-16 max-sm:px-4 max-sm:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="Concerts" title={section.title || "Tour Dates"} />
        <div className="grid gap-3 text-left">
          {concerts.map((concert) => (
            <div
              key={concert._id}
              className="flex items-center justify-between gap-4 rounded-card-sm border border-border-glass-soft bg-bg-glass-soft px-5 py-4 shadow-float-sm"
            >
              <div>
                <div className="text-text-dark text-lg font-black tracking-tight">
                  {formatDate(concert.date)}
                  <span className="text-brand-red"> · {concert.city}</span>
                </div>
                <div className="text-text-muted text-sm font-semibold">
                  {concert.location}
                  {concert.country ? `, ${concert.country}` : ""}
                </div>
              </div>
              {concert.buyUrl && !concert.isSoldOut ? (
                <a
                  href={concert.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-btn px-4 py-2 text-xs font-black tracking-wide text-on-brand uppercase transition-transform hover:-translate-y-0.5"
                >
                  Tickets
                </a>
              ) : (
                <span className="text-text-faint rounded-full border border-border-glass px-4 py-2 text-xs font-black tracking-wide uppercase">
                  {concert.isSoldOut ? "Sold Out" : "Someday"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
