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
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-slate-950/80 px-3 py-1.5 text-[0.7rem] font-black tracking-wider text-white uppercase opacity-0 shadow-sm backdrop-blur-sm transition-all duration-150 group-hover/tooltip:opacity-100"
      >
        {label}
      </span>
    </div>
  );
}
