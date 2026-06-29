import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

export function Tooltip({ children, label }: TooltipProps) {
  return (
    <div className="group/tooltip relative inline-flex">
      {children}
      <span
        className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-text-dark/95 px-2.5 py-1.5 text-[0.7rem] font-bold tracking-wide text-white uppercase shadow-md opacity-0 transition-all duration-150 group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1"
      >
        {label}
      </span>
    </div>
  );
}
