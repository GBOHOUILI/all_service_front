// Customer account pages are mock-ups not wired to any backend. They stay
// hidden for the MVP test and can be turned back on for a demo with
// NEXT_PUBLIC_DEMO_PAGES=1. The admin has its own gate (lib/admin-session.ts).
export const DEMO_PAGES = process.env.NEXT_PUBLIC_DEMO_PAGES === "1";

export const DEMO_ROUTES = ["/connexion", "/inscription", "/mot-de-passe-oublie", "/compte"];

export function isDemoRoute(pathname: string) {
  return DEMO_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}
