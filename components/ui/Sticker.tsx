import React from "react";
import styles from "./sticker.module.css";

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

  return (
    <div className={`${styles.sticker} ${className}`} style={inlineStyles}>
      {children}
    </div>
  );
};
