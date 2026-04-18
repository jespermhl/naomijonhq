import React from "react";
import styles from "./button.module.css";

/**
 * Custom properties unique to our Button component.
 * We don't include standard HTML attributes like 'children' or 'className' 
 * here because they are inherited from standard React types.
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
  const combinedClassName = `${styles.button} ${styles[size]} ${className}`;

  const inlineStyles = {
    "--rotate": rotate,
  } as React.CSSProperties;

  // Pattern match for href to determine if it's an anchor or button
  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("http://") || 
                     props.href.startsWith("https://") || 
                     props.href.startsWith("//");
    
    // Extract style from props to merge it properly
    const { target, rel, href, style: userStyle, ...anchorProps } = props as AnchorButtonProps;
    const mergedStyles = { ...inlineStyles, ...(userStyle || {}) };
    
    return (
      <a
        href={href}
        className={combinedClassName}
        style={mergedStyles}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  // Handle native button behavior
  // Extract style from props to merge it properly
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
