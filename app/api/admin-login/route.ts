import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_TTL, checkCredentials, createSessionToken } from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ok = await checkCredentials(String(body.email ?? ""), String(body.password ?? ""));

  if (!ok) {
    // No rate limiting yet: a short delay at least slows down guessing.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  });
  return res;
}
