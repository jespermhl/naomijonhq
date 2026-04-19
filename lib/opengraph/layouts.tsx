import type { ReactNode } from "react";
import { compactChildren } from "./compact";
import { OgCard, type OgCardChrome } from "./primitives";

function slots(...nodes: (ReactNode | null | undefined)[]) {
  return compactChildren(nodes.filter((n) => n != null));
}

type OgSplitPromoCardProps = OgCardChrome & {
  sticker?: ReactNode;
  left: ReactNode;
  right: ReactNode;
};

/**
 * White card: optional absolute sticker + two horizontal columns (e.g. copy + framed art).
 */
export function OgSplitPromoCard({ sticker, left, right, ...card }: OgSplitPromoCardProps) {
  return (
    <OgCard {...card} direction="row">
      {slots(sticker, left, right)}
    </OgCard>
  );
}

type OgStackedBrandCardProps = OgCardChrome & {
  sticker?: ReactNode;
  main: ReactNode;
  footer?: ReactNode;
};

/** Column card: sticker + main stack + optional footer (redirect, admin). */
export function OgStackedBrandCard({ sticker, main, footer, ...card }: OgStackedBrandCardProps) {
  return (
    <OgCard {...card} direction="column">
      {slots(sticker, main, footer)}
    </OgCard>
  );
}
