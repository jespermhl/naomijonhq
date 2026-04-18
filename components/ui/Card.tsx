import React from "react";
import styles from "./card.module.css";

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
  maxWidth,
  id,
}) => {
  const inlineStyles = {
    "--rotate": rotate,
    ...(maxWidth ? { maxWidth } : {}),
  } as React.CSSProperties;

  return (
    <div
      id={id}
      className={`${styles.card} ${className}`}
      style={inlineStyles}
    >
      {children}
    </div>
  );
};
