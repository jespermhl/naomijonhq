import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href?: string;
        target?: string;
        rel?: string;
        children: React.ReactNode;
        className?: string;
        rotate?: string;
    };

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
