"use client";

import { useEffect } from "react";
import { setCmsTheme } from "@/lib/site-theme";

/**
 * Applies a CMS site's theme override to the document element. Rendered by
 * SiteRenderer only when the site doc sets a theme.
 */
export function SiteTheme({ theme }: { theme: string }) {
  useEffect(() => {
    setCmsTheme(theme);
    document.documentElement.dataset.theme = theme;
    return () => setCmsTheme(null);
  }, [theme]);

  return null;
}
