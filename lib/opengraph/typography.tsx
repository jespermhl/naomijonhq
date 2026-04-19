import type { CSSProperties, ReactNode } from "react";
import { OG_COLORS } from "@/lib/og-theme";
import { compactChildren } from "./compact";

type OgVStackProps = {
  children: ReactNode;
  gap: number;
  flex?: number;
  marginTop?: number;
  marginLeft?: number;
  textAlign?: "center";
};

/** Vertical stack; always `display: flex` for Satori. */
export function OgVStack({
  children,
  gap,
  flex,
  marginTop,
  marginLeft,
  textAlign = "center",
}: OgVStackProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex,
        gap,
        textAlign,
        marginTop,
        marginLeft,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

type OgCoverSlotProps = {
  children: ReactNode;
  marginTop?: number;
  marginLeft?: number;
};

/** Centers framed artwork in the left column of split cards. */
export function OgCoverSlot({ children, marginTop = 36, marginLeft = 12 }: OgCoverSlotProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop,
        marginLeft,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgTourCoverSlot({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: 32,
        marginLeft: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgEmojiHero({
  emoji,
  fontSize,
  textShadow,
  marginTop,
}: {
  emoji: string;
  fontSize: number;
  textShadow?: boolean;
  marginTop?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        lineHeight: 1,
        marginTop,
        textShadow: textShadow ? `4px 4px 0px ${OG_COLORS.brandRed}` : undefined,
      }}
    >
      {emoji}
    </div>
  );
}

export function OgGlyph({ emoji, fontSize, marginTop }: { emoji: string; fontSize: number; marginTop?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        marginTop,
      }}
    >
      {emoji}
    </div>
  );
}

export function OgDisplayTitle({
  children,
  fontSize,
  letterSpacing,
  lineHeight = 1.05,
}: {
  children: ReactNode;
  fontSize: number;
  letterSpacing?: number | string;
  lineHeight?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: 900,
        color: OG_COLORS.brandRed,
        lineHeight,
        letterSpacing,
        textAlign: "center",
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgKicker({
  children,
  fontSize = 22,
  letterSpacing = "0.12em",
}: {
  children: ReactNode;
  fontSize?: number;
  letterSpacing?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: 800,
        color: OG_COLORS.brandPink,
        textTransform: "uppercase",
        letterSpacing,
        textAlign: "center",
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgBody({
  children,
  fontSize,
  maxWidth,
  lineHeight = 1.45,
  style,
}: {
  children: ReactNode;
  fontSize: number;
  maxWidth?: number;
  lineHeight?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight: 700,
        color: OG_COLORS.textDark,
        lineHeight,
        maxWidth,
        textAlign: "center",
        ...style,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgSiteUrl({ children, fontSize = 18, marginTop }: { children: ReactNode; fontSize?: number; marginTop?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop,
        fontSize,
        fontWeight: 800,
        color: OG_COLORS.brandRed,
        textAlign: "center",
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgPill({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        fontSize: 16,
        fontWeight: 700,
        color: OG_COLORS.brandRed,
        backgroundColor: OG_COLORS.bg,
        padding: "6px 14px",
        borderRadius: 8,
        border: `2px solid ${OG_COLORS.brandRed}`,
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

export function OgShout({ children, fontSize = 22, marginTop = 16 }: { children: ReactNode; fontSize?: number; marginTop?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop,
        fontSize,
        fontWeight: 900,
        color: OG_COLORS.brandRed,
        textAlign: "center",
      }}
    >
      {compactChildren(children)}
    </div>
  );
}

/** Two-line display title (no &lt;br /&gt; — Satori-safe). */
export function OgTwoLineTitle({
  line1,
  line2,
  fontSize,
  gap = 2,
  letterSpacing,
  lineHeight = 1.1,
}: {
  line1: string;
  line2: string;
  fontSize: number;
  gap?: number;
  letterSpacing?: number | string;
  lineHeight?: number;
}) {
  const lineStyle = {
    display: "flex" as const,
    fontSize,
    fontWeight: 900 as const,
    color: OG_COLORS.brandRed,
    lineHeight,
    letterSpacing,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap,
        textAlign: "center",
      }}
    >
      <div style={lineStyle}>{line1}</div>
      <div style={lineStyle}>{line2}</div>
    </div>
  );
}
