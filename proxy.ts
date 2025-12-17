import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiVersion, dataset, projectId } from "./sanity/env";

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

export async function proxy(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // 1) URL shortener: check redirects from Sanity
  const redirect = await getRedirectForPath(pathname);
  if (redirect) {
    const destination = new URL(redirect.to, request.url);
    const status = redirect.permanent ? 308 : 307;
    return NextResponse.redirect(destination, status);
  }

  // 2) Protect invoice-related routes with Basic Auth
  const needsInvoiceAuth =
    /^(?:\/invoices(?:\/|$)|\/api\/(?:invoices|clients)(?:\/|$))/.test(
      pathname
    );
  if (!needsInvoiceAuth) return NextResponse.next();

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

type RedirectDoc = { to: string; permanent?: boolean } | null;

async function getRedirectForPath(pathname: string): Promise<RedirectDoc> {
  // Normalize: drop trailing slash except for root
  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const query =
    '*[_type=="redirect" && enabled==true && from==$path][0]{to, permanent}';
  const params = encodeURIComponent(JSON.stringify({ path: normalized }));
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    query
  )}&%24params=${params}`;

  try {
    const res = await fetch(url, {
      headers: { "content-type": "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: RedirectDoc };
    console.log("redirect data", data);
    return data.result ?? null;
  } catch {
    return null;
  }
}

export const config = {
  // Run on most routes to enable redirects; exclude static assets and Studio
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|studio).*)"],
};
