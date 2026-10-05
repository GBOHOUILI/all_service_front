import { NextRequest, NextResponse } from "next/server";
import { DEMO_PAGES, isDemoRoute } from "@/lib/features";

// DÉMO : ce cookie n'est qu'un indicateur "connecté oui/non", sans
// vérification serveur d'identité ni expiration réelle. Une vraie
// authentification (NextAuth, Clerk, ou sessions signées côté serveur)
// remplacera ce mécanisme quand la sécurité deviendra un besoin réel.
const ADMIN_COOKIE = "as_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rewriting to a path with no page renders the regular 404.
  if (!DEMO_PAGES && isDemoRoute(pathname)) {
    return NextResponse.rewrite(new URL("/page-indisponible", req.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = req.cookies.get(ADMIN_COOKIE);
    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin-login",
    "/api/admin-logout",
    "/connexion",
    "/inscription",
    "/mot-de-passe-oublie",
    "/compte/:path*",
  ],
};
