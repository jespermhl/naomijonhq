import React from 'react';

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
}

/**
 * A styled card component with a customizable rotation.
 * Used as a primary container for sections like Tour and Newsletter.
 */
export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    rotate = '0.5deg',
    maxWidth,
}) => {
    const styles = {
        '--rotate': rotate,
        ...(maxWidth ? { maxWidth } : {}),
    } as React.CSSProperties;

    return (
        <div className={`tour-card ${className}`} style={styles}>
            {children}
        </div>
    );
};
