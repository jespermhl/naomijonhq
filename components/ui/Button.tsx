import React from 'react';

/**
 * Props for the Button component. Supports both button and anchor (link) attributes.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        /** The URL to link to. If provided, the component renders as an <a> tag. */
        href?: string;
        /** The target attribute for the link. */
        target?: string;
        /** The rel attribute for the link. Defaults to 'noopener noreferrer' if target is provided. */
        rel?: string;
        /** The content of the button. */
        children: React.ReactNode;
        /** Optional CSS class name. */
        className?: string;
        /** CSS rotation value (e.g., '-2deg'). */
        rotate?: string;
    };

/**
 * A styled button component that can also act as a link if an `href` is provided.
 * Features a custom rotation/sticker aesthetic.
 */
export const Button: React.FC<ButtonProps> = ({
    href,
    target,
    rel,
    children,
    className = '',
    rotate = '-2deg',
    ...props
}) => {
    const baseClass = 'buy-btn';
    const combinedClassName = `${baseClass} ${className}`;

    const styles = {
        '--rotate': rotate,
    } as React.CSSProperties;

    if (href) {
        return (
            <a
                href={href}
                target={target || '_blank'}
                rel={rel || 'noopener noreferrer'}
                className={combinedClassName}
                style={styles}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={(props.type as any) ?? 'button'}
            className={combinedClassName}
            style={styles}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    );
};
