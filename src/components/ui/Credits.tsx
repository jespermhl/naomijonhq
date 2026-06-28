import React from "react";

/**
 * A shared credits component used across various landing pages.
 */
export const Credits: React.FC = () => {
  return (
    <div className="text-text-muted mt-6 mb-0 text-center text-[11px] font-bold tracking-widest uppercase">
      Made with 🍓 by{" "}
      <a
        href="https://mahelwebdesign.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-red hover:border-brand-red border-b border-transparent no-underline transition-all duration-200 ease-in-out hover:opacity-80"
      >
        Mahel Webdesign
      </a>
    </div>
  );
};
