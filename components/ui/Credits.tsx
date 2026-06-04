import React from "react";

/**
 * A shared credits component used across various landing pages.
 */
export const Credits: React.FC = () => {
  return (
    <div className="mt-6 mb-0 text-[11px] font-bold text-text-muted uppercase tracking-widest text-center">
      Made with 🍓 by{" "}
      <a
        href="https://mahelwebdesign.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-red no-underline border-b border-transparent transition-all duration-200 ease-in-out hover:border-brand-red hover:opacity-80"
      >
        Mahel Webdesign
      </a>{" "}
    </div>
  );
};
