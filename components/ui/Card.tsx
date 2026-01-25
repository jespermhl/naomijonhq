import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    rotate?: string;
    maxWidth?: string;
}

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
