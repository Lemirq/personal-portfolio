import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function basicAuthOk(request: NextRequest): boolean {
  const user = process.env.INVOICE_BASIC_USER || "admin";
  const pass =
    process.env.INVOICE_BASIC_PASS || process.env.INVOICE_PORTAL_PASSWORD || "";
  if (!pass) return true; // disabled if no secret configured

  const header =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");
  if (!header || !header.startsWith("Basic ")) return false;
  const base64 = header.slice(6);
  try {
    const decoded = atob(base64);
    const [u, p] = decoded.split(":");
    return u === user && p === pass;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const pass =
    process.env.INVOICE_BASIC_PASS || process.env.INVOICE_PORTAL_PASSWORD || "";
  if (!pass) return NextResponse.next();

  if (!basicAuthOk(request)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Invoices"' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/invoices",
    "/invoices/:path*",
    "/api/invoices/:path*",
    "/api/clients/:path*",
  ],
};
