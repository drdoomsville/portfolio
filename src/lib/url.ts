// Base-path helpers for GitHub Pages (site served under `base`, e.g. /portfolio).
// Astro auto-prefixes its own asset bundles, but NOT hardcoded link hrefs or
// image srcs — route those through `withBase` so they resolve under the base.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // '' at root, '/portfolio' otherwise

/** Prefix a root-absolute site path with the base. External/relative URLs pass through. */
export const withBase = (path: string): string => (path.startsWith('/') ? `${BASE}${path}` : path);

/** Strip the base prefix from a pathname (e.g. Astro.url.pathname) back to root-relative. */
export const stripBase = (path: string): string =>
  BASE && path.startsWith(BASE) ? path.slice(BASE.length) || '/' : path;
