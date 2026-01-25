import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    target?: string;
    rel?: string;
    children: React.ReactNode;
    className?: string;
    rotate?: string;
}

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
            >
                {children}
            </a>
        );
    }

    return (
        <button className={combinedClassName} style={styles} {...props}>
            {children}
        </button>
    );
};
