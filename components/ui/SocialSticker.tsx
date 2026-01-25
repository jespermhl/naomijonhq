import React from 'react';

interface SocialStickerProps {
    href: string;
    name: string;
    icon: React.ReactNode;
    className?: string;
}

export const SocialSticker: React.FC<SocialStickerProps> = ({
    href,
    name,
    icon,
    className = '',
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className={`social-sticker ${className}`}
        >
            <svg viewBox="0 0 24 24" fill="currentColor">
                {icon}
            </svg>
        </a>
    );
};
