import { NextRequest, NextResponse } from "next/server";

const COOKIE_AUTH = "invo_auth";
const COOKIE_ATTEMPTS = "invo_attempts";
const LOCK_WINDOW_SECONDS = 15 * 60;

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.INVOICE_PORTAL_PASSWORD || "";
  const maxAttempts = Number(process.env.INVOICE_MAX_ATTEMPTS || 5);

  const attempts = Number(req.cookies.get(COOKIE_ATTEMPTS)?.value || 0);
  if (attempts >= maxAttempts) {
    return NextResponse.json(
      { error: "Too many attempts. Try later." },
      { status: 429 }
    );
  }

  if (!expected)
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  if (!password || password !== expected) {
    const res = NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
    res.cookies.set(COOKIE_ATTEMPTS, String(attempts + 1), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: LOCK_WINDOW_SECONDS,
      path: "/",
    });
    return res;
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_AUTH, "1", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  res.cookies.set(COOKIE_ATTEMPTS, "0", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return res;
}
