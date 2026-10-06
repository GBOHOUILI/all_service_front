import { NextRequest, NextResponse } from "next/server";
import { DEMO_PAGES, isDemoRoute } from "@/lib/features";
import { ADMIN_COOKIE, adminConfigured, verifySessionToken } from "@/lib/admin-session";

const notFound = (req: NextRequest) =>
  // Rewriting to a path with no page renders the regular 404.
  NextResponse.rewrite(new URL("/page-indisponible", req.url));

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!DEMO_PAGES && isDemoRoute(pathname)) return notFound(req);

  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin-");
  if (isAdmin && !adminConfigured()) return notFound(req);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!(await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
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
