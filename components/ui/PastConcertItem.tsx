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
    <div className="group relative w-full overflow-hidden rounded-[26px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(255,247,251,0.9)_100%)] p-5 text-left shadow-[0_16px_36px_rgba(255,79,168,0.08)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(255,79,168,0.12)] max-sm:rounded-[20px] max-sm:p-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-red via-[#ff7ebb] to-brand-pink opacity-80" />

      <div className="relative flex items-center gap-5 max-sm:items-start max-sm:gap-4">
        <div className="flex min-w-[112px] flex-col items-center justify-center rounded-[20px] border border-[#ffd5e5] bg-white/95 px-4 py-4 shadow-[0_10px_24px_rgba(255,79,168,0.1)] max-sm:min-w-[92px] max-sm:rounded-[16px] max-sm:px-3 max-sm:py-3">
          <span className="text-[0.68rem] font-black uppercase tracking-[0.34em] text-[#c73d84] max-sm:text-[0.6rem]">
            Date
          </span>
          <span className="mt-2 text-[0.86rem] font-black tracking-[0.28em] text-brand-red uppercase leading-none text-center max-sm:text-[0.72rem] max-sm:tracking-[0.24em]">
            {date}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
            <span className="text-[0.72rem] font-black uppercase tracking-[0.28em] text-[#c73d84]">
              Played
            </span>
          </div>
          <h3 className="mt-2 text-[1.65rem] font-black leading-[0.95] tracking-[-0.04em] text-brand-red max-sm:text-[1.25rem]">
            {city}
          </h3>
          <p className="mt-2 text-[0.98rem] font-semibold leading-relaxed text-text-dark/80 max-sm:text-[0.9rem]">
            {place}
          </p>
        </div>

        <div className="shrink-0 self-center rounded-full border border-[#ffd5e5] bg-[#fff2f8] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.24em] text-[#b61e6b] shadow-[0_8px_18px_rgba(255,79,168,0.08)] max-sm:hidden">
          Archive
        </div>
      </div>
    </div>
  );
};
