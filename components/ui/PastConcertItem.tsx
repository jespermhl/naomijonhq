import React from "react";

interface PastConcertItemProps {
  date: {
    month: string;
    day: string;
  };
  city: string;
  location: string;
}

/**
 * A simpler component for past concert dates.
 */
export const PastConcertItem: React.FC<PastConcertItemProps> = ({
  date,
  city,
  location,
}) => {
  return (
    <div className="flex items-center gap-6 bg-white border-3 border-brand-red rounded-2xl p-4 shadow-[4px_4px_0px_var(--color-brand-red)] relative max-sm:gap-4 max-sm:px-4 max-sm:py-3 max-sm:rounded-xl max-sm:shadow-[3px_3px_0px_var(--color-brand-red)]">
      <div className="flex flex-col items-center justify-center bg-brand-red text-white min-w-[60px] h-[60px] rounded-xl font-sans border-2 border-white shadow-[2px_2px_0px_var(--color-brand-pink)] max-sm:min-w-[50px] max-sm:h-[50px] max-sm:rounded-lg">
        <span className="text-[10px] font-black uppercase leading-none mb-0.5 max-sm:text-[8px]">{date.month}</span>
        <span className="text-2xl font-black leading-none max-sm:text-base">{date.day}</span>
      </div>
      <div className="grow text-left flex flex-col gap-1">
        <span className="text-lg font-black text-brand-red leading-tight max-sm:text-[15px]">{city}</span>
        <span className="text-[13px] text-text-dark font-semibold max-sm:text-[11px]">{location}</span>
      </div>
      <div className="flex items-center">
        <span className="bg-border-color-light text-[#718096] text-[11px] font-black py-1.5 px-3 rounded-lg uppercase tracking-wider border border-[#e2e8f0] max-sm:text-[9px] max-sm:py-1 max-sm:px-2 max-sm:rounded-md">Played</span>
      </div>
    </div>
  );
};

