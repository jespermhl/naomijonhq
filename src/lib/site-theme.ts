let cmsTheme: string | null = null;

/**
 * Client-side registry so the layout's theme effect can honour a CMS site's
 * theme override (child effects run before the layout's, so without this the
 * layout would clobber the site theme on every navigation).
 */
export function setCmsTheme(theme: string | null) {
  cmsTheme = theme;
}

export function getCmsTheme(): string | null {
  return cmsTheme;
}
