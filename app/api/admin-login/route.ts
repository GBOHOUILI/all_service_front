import { NextResponse } from "next/server";

export async function POST() {
  // DÉMO : accepte n'importe quel email/mot de passe. Pose un cookie
  // simple sans hash ni expiration gérée serveur. À remplacer par une
  // vraie vérification (mot de passe hashé + comparaison en DB) avant
  // toute mise en production.
  const res = NextResponse.json({ ok: true });
  res.cookies.set("as_admin_session", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h
  });
  return res;
}
