// For actual redirects, prefer navigating to `/:code` on the server which
// performs a canonical HTTP 302 and increments counters. This helper simply
// returns the server URL to visit — caller may `window.location.replace(url)`.
const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL ?? "";

export function shortUrlServerPath(code: string): string {
  // Ensure no double-slash when BACKEND_BASE includes trailing slash
  const base = BACKEND_BASE.replace(/\/$/, "");
  return `${base}/${encodeURIComponent(code)}`;
}
