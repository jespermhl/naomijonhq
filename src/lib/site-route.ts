/**
 * Site route helper: a site slug is the URL path without the leading slash
 * ("" for the homepage).
 */
export function slugFromRoute(route: string): string {
  return route.replace(/^\//, "").replace(/\/$/, "");
}
