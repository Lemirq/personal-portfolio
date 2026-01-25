import { NextRequest, NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const COOKIE_AUTH = "invo_auth";
const COOKIE_ATTEMPTS = "invo_attempts";
const LOCK_WINDOW_SECONDS = 15 * 60;

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.INVOICE_PORTAL_PASSWORD || "";
  const maxAttempts = Number(process.env.INVOICE_MAX_ATTEMPTS || 5);

  const attempts = Number(req.cookies.get(COOKIE_ATTEMPTS)?.value || 0);
  const posthog = getPostHogClient();
  const distinctId = req.headers.get('x-posthog-distinct-id') || 'anonymous-server';

  if (attempts >= maxAttempts) {
    posthog.capture({
      distinctId,
      event: 'invoice_login_rate_limited',
      properties: {
        attempts,
        source: 'api',
      },
    });
    return NextResponse.json(
      { error: "Too many attempts. Try later." },
      { status: 429 }
    );
  }

  if (!expected)
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  if (!password || password !== expected) {
    posthog.capture({
      distinctId,
      event: 'invoice_login_failed',
      properties: {
        attempt_number: attempts + 1,
        source: 'api',
      },
    });
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

  posthog.capture({
    distinctId,
    event: 'invoice_login_succeeded',
    properties: {
      source: 'api',
    },
  });

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
