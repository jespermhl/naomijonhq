import { Children, type ReactNode } from "react";

/** Satori: strip whitespace-only text nodes between JSX elements. */
export function compactChildren(nodes: ReactNode): ReactNode[] {
  return Children.toArray(nodes).filter(
    (n) => !(typeof n === "string" && n.trim() === ""),
  );
}
