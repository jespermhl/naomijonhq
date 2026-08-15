import React from "react";

interface PastConcertItemProps {
  date: string;
  city: string;
  location: string;
  country?: string;
}

/**
 * A simpler component for past concert dates.
 */
export const PastConcertItem: React.FC<PastConcertItemProps> = ({
  date,
  city,
  location,
  country,
}) => {
  const place = country ? `${location} · ${country}` : location;

  return (
    <div className="group relative w-full overflow-hidden rounded-card-sm border border-border-glass bg-[linear-gradient(135deg,var(--color-bg-glass-strong)_0%,var(--color-bg-pink-tint)_100%)] p-5 text-left shadow-float-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-float max-sm:rounded-card-sm max-sm:p-4">
      <div className="from-brand-red to-brand-pink pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-linear-to-b via-brand-pink-mid opacity-80" />

      <div className="relative flex items-center gap-5 max-sm:items-start max-sm:gap-4">
        <div className="flex min-w-28 flex-col items-center justify-center rounded-panel border border-border-pink bg-bg-glass-strong px-4 py-4 shadow-float-sm max-sm:min-w-23 max-sm:rounded-card-sm max-sm:px-3 max-sm:py-3">
          <span className="text-eyebrow font-black tracking-[0.16em] text-brand-red-dark uppercase max-sm:text-[0.6rem]">
            Date
          </span>
          <span className="text-brand-red mt-2 text-center text-[0.86rem] leading-none font-black tracking-[0.12em] uppercase max-sm:text-[0.72rem] max-sm:tracking-[0.08em]">
            {date}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
            <span className="text-eyebrow font-black tracking-[0.14em] text-brand-red-dark uppercase">
              Played
            </span>
          </div>
          <h3 className="text-brand-red mt-2 text-[1.65rem] leading-[0.95] font-black tracking-[-0.04em] max-sm:text-[1.25rem]">
            {city}
          </h3>
          <p className="text-text-dark/80 mt-2 text-[0.98rem] leading-relaxed font-semibold max-sm:text-[0.9rem]">
            {place}
          </p>
        </div>

        <div className="shrink-0 self-center rounded-full border border-border-pink bg-bg-pink-tint px-4 py-2 text-eyebrow font-black tracking-[0.1em] text-brand-pink-deep uppercase shadow-float-sm max-sm:hidden">
          Archive
        </div>
      </div>
    </div>
  );
};
