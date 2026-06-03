import React from "react";

/**
 * Props for the Card component.
 */
interface CardProps {
  /** The content to display inside the card. */
  children: React.ReactNode;
  /** Optional CSS class name. */
  className?: string;
  /** CSS rotation value (e.g., '0.5deg'). */
  rotate?: string;
  /** Whether the card should be rotated. Defaults to true. */
  rotated?: boolean;
  /** Optional maximum width of the card. */
  maxWidth?: string;
  /** Unique ID for the card. */
  id?: string;
}

/**
 * A styled card component with a customizable rotation.
 * Used as a primary container for sections like Tour and Newsletter.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  rotate = "0.5deg",
  rotated = true,
  maxWidth,
  id,
}) => {
  const inlineStyles = {
    transform: rotated ? `rotate(${rotate})` : "none",
    ...(maxWidth ? { maxWidth } : {}),
  } as React.CSSProperties;

  const baseClass = "w-full max-w-[800px] bg-card-bg border-6 border-brand-red rounded-[32px] px-12 py-16 text-center shadow-[12px_12px_0px_var(--color-brand-red)] relative max-sm:px-5 max-sm:py-16 max-sm:pb-12 max-sm:border-4 max-sm:rounded-3xl max-sm:shadow-[6px_6px_0px_var(--color-brand-red)] max-sm:!transform-none";

  return (
    <div
      id={id}
      className={`${baseClass} ${className}`}
      style={inlineStyles}
    >
      {children}
    </div>
  );
};

