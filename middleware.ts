import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_AUTH = "invo_auth";
const COOKIE_ATTEMPTS = "invo_attempts";
const LOCK_WINDOW_SECONDS = 15 * 60; // 15 minutes

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Enable guard only if password env exists
  const portalPass = process.env.INVOICE_PORTAL_PASSWORD || "";
  if (!portalPass) return NextResponse.next();

  // Allow auth endpoints and login page to pass through
  if (
    url.pathname.startsWith("/invoices/login") ||
    url.pathname.startsWith("/api/invoices/auth")
  ) {
    return NextResponse.next();
  }

  // Already authenticated
  const authCookie = request.cookies.get(COOKIE_AUTH)?.value;
  if (authCookie === "1") return NextResponse.next();

  // Brute-force: if attempts cookie exceeds max, block here
  const maxAttempts = Number(process.env.INVOICE_MAX_ATTEMPTS || 5);
  const currentAttempts = Number(
    request.cookies.get(COOKIE_ATTEMPTS)?.value || 0
  );
  if (currentAttempts >= maxAttempts) {
    return new NextResponse("Too many attempts. Please try again later.", {
      status: 429,
    });
  }

  // Redirect to login for any other protected route
  const loginUrl = new URL("/invoices/login", request.url);
  loginUrl.searchParams.set("next", url.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/invoices/:path*", "/api/invoices/:path*", "/api/clients/:path*"],
};
