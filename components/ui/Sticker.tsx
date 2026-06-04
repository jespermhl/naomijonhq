import React from "react";

/**
 * Props for the Sticker component.
 */
interface StickerProps {
  /** The content to display inside the sticker. */
  children: React.ReactNode;
  /** Optional CSS class name. */
  className?: string;
  /** CSS rotation value (e.g., '5deg'). */
  rotate?: string;
}

/**
 * A decorative sticker-style component with customizable rotation.
 */
export const Sticker: React.FC<StickerProps> = ({
  children,
  className = "",
  rotate = "5deg",
}) => {
  const inlineStyles = {
    "--rotate": rotate,
  } as React.CSSProperties;

  return (
    <div className='absolute -top-[18px] right-[20px] bg-[rgba(255,_255,_255,_0.82)] px-[18px] py-[10px] rounded-[999px] border-[1px] border-[solid] border-[rgba(255,79,168,0.26)] font-extrabold text-[#22181f] [transform:rotate(var(--rotate,_5deg))] [box-shadow:0_10px_30px_rgba(255,_79,_168,_0.14)] z-10' style={inlineStyles}>
      {children}
    </div>
  );
};
