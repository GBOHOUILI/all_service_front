// Single admin account defined by environment variables, with an HMAC-signed
// session cookie. Web Crypto only, so it runs in both middleware and routes.
export const ADMIN_COOKIE = "as_admin_session";
export const SESSION_TTL = 60 * 60 * 8; // 8h, in seconds

const encoder = new TextEncoder();

export function adminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(process.env.ADMIN_SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Constant-time comparison so response timing does not leak how much matched.
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function checkCredentials(email: string, password: string) {
  if (!adminConfigured()) return false;
  // Comparing signatures gives equal-length strings whatever the input length.
  const [e1, e2, p1, p2] = await Promise.all([
    sign(`email:${email.trim().toLowerCase()}`),
    sign(`email:${process.env.ADMIN_EMAIL!.trim().toLowerCase()}`),
    sign(`password:${password}`),
    sign(`password:${process.env.ADMIN_PASSWORD}`),
  ]);
  return safeEqual(e1, e2) && safeEqual(p1, p2);
}

export async function createSessionToken() {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_TTL);
  return `${exp}.${await sign(exp)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(exp));
}
