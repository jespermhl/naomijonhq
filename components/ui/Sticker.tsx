import React from 'react';

interface StickerProps {
    children: React.ReactNode;
    className?: string;
    rotate?: string;
}

export const Sticker: React.FC<StickerProps> = ({
    children,
    className = '',
    rotate = '5deg',
}) => {
    const styles = {
        '--rotate': rotate,
    } as React.CSSProperties;

    return (
        <div className={`tour-sticker ${className}`} style={styles}>
            {children}
        </div>
    );
};
