export type SiteTheme = "strawberry" | "villain";

export const DEFAULT_THEME: SiteTheme = "villain";

export const PAGE_THEMES: Record<string, SiteTheme> = {
  "/strawberry": "strawberry",
  "/strawberry-album": "strawberry",
  "/strawberry-tour": "strawberry",
  "/villainofyourdreams": "villain",
};
