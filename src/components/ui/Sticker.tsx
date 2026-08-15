import React from "react";

/**
 * Props for the Sticker component.
 */
interface StickerProps {
  /** The content to display inside the sticker. */
  children: React.ReactNode;
  /** Optional CSS class name. */
  className?: string;
  /** CSS rotation value (e.g., '5deg'). */
  rotate?: string;
}

/**
 * A decorative sticker-style component with customizable rotation.
 */
export const Sticker: React.FC<StickerProps> = ({
  children,
  className = "",
  rotate = "5deg",
}) => {
  const inlineStyles = {
    "--rotate": rotate,
  } as React.CSSProperties;

  const stickerClasses = [
    "absolute -top-4.5 right-5",
    "bg-bg-glass",
    "px-4.5 py-2.5 rounded-[999px]",
    "border border-solid",
    "font-extrabold text-text-dark",
    "transform-[rotate(var(--rotate,5deg))]",
    "shadow-float",
    "z-10",
  ].join(" ");

  return (
    <div className={`${stickerClasses} ${className}`} style={inlineStyles}>
      {children}
    </div>
  );
};
