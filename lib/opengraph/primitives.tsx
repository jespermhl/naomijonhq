import type { ReactNode } from "react";
import { OG_BG_PATTERN, OG_COLORS } from "@/lib/og-theme";
import { compactChildren } from "./compact";

export const ogFontFamily =
  'Outfit, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export function OgCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 36,
        backgroundColor: OG_COLORS.bg,
        backgroundImage: OG_BG_PATTERN,
        fontFamily: ogFontFamily,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export type OgCardChrome = {
  maxWidth: number;
  height: number;
  padding?: string;
  rotate?: string;
  shadowPx?: 10 | 12;
  direction?: "row" | "column";
};

export function OgCard({
  children,
  maxWidth,
  height,
  padding = "44px 48px",
  rotate = "0.8deg",
  shadowPx = 12,
  direction = "row",
}: OgCardChrome & { children: ReactNode }) {
  const isCol = direction === "column";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: direction,
        alignItems: "center",
        justifyContent: isCol ? "center" : "space-between",
        gap: isCol ? 20 : 0,
        width: "100%",
        maxWidth,
        height,
        padding,
        backgroundColor: OG_COLORS.white,
        border: `6px solid ${OG_COLORS.brandRed}`,
        borderRadius: 32,
        boxShadow: `${shadowPx}px ${shadowPx}px 0px ${OG_COLORS.brandRed}`,
        transform: `rotate(${rotate})`,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export type OgStickerChrome = {
  top?: number;
  left?: number;
  right?: number;
  backgroundColor?: string;
  rotate?: string;
};

export function OgSticker({
  children,
  top = 28,
  left,
  right,
  backgroundColor = OG_COLORS.stickerOrange,
  rotate = "-5deg",
}: OgStickerChrome & { children: ReactNode }) {
  const horizontal = right !== undefined ? { right } : { left: left ?? 40 };

  return (
    <div
      style={{
        position: "absolute",
        top,
        ...horizontal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 22px",
        borderRadius: 12,
        border: `3px solid ${OG_COLORS.brandRed}`,
        fontWeight: 800,
        fontSize: 20,
        color: OG_COLORS.brandRed,
        backgroundColor,
        transform: `rotate(${rotate})`,
        boxShadow: `4px 4px 0px ${OG_COLORS.brandRed}`,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

type OgFramedCoverProps = {
  src: string;
  size: number;
  emojiSize?: number;
  showEmoji?: boolean;
};

export function OgFramedCover({
  src,
  size,
  emojiSize = 48,
  showEmoji = true,
}: OgFramedCoverProps) {
  const frame = (
    <div
      key="frame"
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
        overflow: "hidden",
        border: `8px solid ${OG_COLORS.brandRed}`,
        boxShadow: `12px 12px 0px ${OG_COLORS.brandRed}`,
        backgroundColor: OG_COLORS.white,
      }}
    >
      <img src={src} width={size} height={size} alt="" style={{ display: "block", objectFit: "cover" }} />
    </div>
  );

  const emoji =
    showEmoji === true ? (
      <div
        key="emoji"
        style={{
          position: "absolute",
          bottom: -10,
          right: -10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: emojiSize,
          lineHeight: 1,
        }}
      >
        🍓
      </div>
    ) : null;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {compactChildren([frame, emoji])}
    </div>
  );
}

type OgSquareThumbProps = {
  src: string;
  size: number;
  borderWidth?: number;
  borderRadius?: number;
  boxShadow?: string;
};

/** Bordered square image (newsletter column, redirect footer). */
export function OgSquareThumb({
  src,
  size,
  borderWidth = 8,
  borderRadius = 24,
  boxShadow,
}: OgSquareThumbProps) {
  const shadow = boxShadow ?? `12px 12px 0px ${OG_COLORS.brandRed}`;
  return (
    <div
      style={{
        display: "flex",
        borderRadius,
        overflow: "hidden",
        border: `${borderWidth}px solid ${OG_COLORS.brandRed}`,
        boxShadow: shadow,
      }}
    >
      <img src={src} width={size} height={size} alt="" style={{ display: "block", objectFit: "cover" }} />
    </div>
  );
}
