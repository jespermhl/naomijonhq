import React from "react";

/**
 * Custom properties for the Button component.
 */
interface ButtonCustomProps {
  /** CSS rotation value (e.g., '-2deg'). */
  rotate?: string;
  /** Size variant of the button. */
  size?: "small" | "medium" | "large";
}

/** Props specifically for link-style buttons. */
interface AnchorButtonProps extends ButtonCustomProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Required href renders the component as an <a> tag. */
  href: string;
}

/** Props specifically for native button elements. */
interface NativeButtonProps extends ButtonCustomProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ensures href is not allowed on a native button. */
  href?: never;
}

/** Discriminated union to ensure type safety between <a> and <button> attributes. */
export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const SIZE_CLASSES = {
  small: "px-4 py-2 text-xs min-w-0",
  medium: "px-5 py-2.5 text-sm min-w-[100px]",
  large: "px-8 py-4 text-lg min-w-[140px]",
};

/**
 * A styled button component that can also act as a link if an `href` is provided.
 * Features a custom rotation/sticker aesthetic and support for different sizes.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  rotate = "-2deg",
  size = "medium",
  ...props
}) => {
  const baseClass = "inline-flex items-center justify-center bg-brand-red text-text-light font-black no-underline border-3 border-text-light rounded-xl cursor-pointer hover:-translate-y-1 hover:rotate-0 hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-[6px_6px_0px_var(--color-brand-pink)] hover:shadow-[10px_10px_0px_var(--color-brand-pink)] max-sm:w-auto max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px] max-sm:min-w-[90px] max-sm:shadow-[4px_4px_0px_var(--color-brand-pink)] max-sm:!transform-none";
  const combinedClassName = `${baseClass} ${SIZE_CLASSES[size]} ${className}`;

  const inlineStyles = {
    transform: `rotate(${rotate})`,
  } as React.CSSProperties;

  // Pattern match for href to determine if it's an anchor or button
  if ("href" in props && props.href !== undefined) {
    const isExternal = props.href.startsWith("http://") || 
                     props.href.startsWith("https://") || 
                     props.href.startsWith("//");
    
    const { target, rel, href, style: userStyle, ...anchorProps } = props as AnchorButtonProps;
    const mergedStyles = { ...inlineStyles, ...(userStyle || {}) };
    
    const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
    const resolvedRel = rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <a
        href={href}
        className={combinedClassName}
        style={mergedStyles}
        target={resolvedTarget}
        rel={resolvedRel}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { type, style: userStyle, ...buttonProps } = props as NativeButtonProps;
  const mergedStyles = { ...inlineStyles, ...(userStyle || {}) };

  return (
    <button
      type={type ?? "button"}
      className={combinedClassName}
      style={mergedStyles}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

