import React from 'react';

/**
 * Props for the SocialSticker component.
 */
interface SocialStickerProps {
    /** The URL of the social media profile. */
    href: string;
    /** The name of the social platform (for aria-label). */
    name: string;
    /** The SVG path or React node representing the platform icon. */
    icon: React.ReactNode;
    /** Optional CSS class name. */
    className?: string;
}

/**
 * A circular social media link component styled as a sticker.
 */
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
