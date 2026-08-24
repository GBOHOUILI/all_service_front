import { NextRequest, NextResponse } from "next/server";

// DÉMO : ce cookie n'est qu'un indicateur "connecté oui/non", sans
// vérification serveur d'identité ni expiration réelle. Une vraie
// authentification (NextAuth, Clerk, ou sessions signées côté serveur)
// remplacera ce mécanisme quand la sécurité deviendra un besoin réel.
const ADMIN_COOKIE = "as_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
  matcher: ["/admin/:path*"],
};
