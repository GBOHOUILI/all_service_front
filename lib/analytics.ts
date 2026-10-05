// Umami (cookieless, no consent banner needed). The script is only loaded when
// NEXT_PUBLIC_UMAMI_WEBSITE_ID is set, so calls are no-ops in dev and demos.
type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export function track(event: string, data?: EventData) {
  if (typeof window !== "undefined") window.umami?.track(event, data);
}
