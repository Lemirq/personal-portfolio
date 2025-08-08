import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import puppeteer from "puppeteer-core";

function resolveExecutablePath(): string | undefined {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  // Common local paths (darwin/linux). Adjust as needed for your env
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
  ];
  return candidates.find((p) => {
    try {
      require("fs").accessSync(p);
      return true;
    } catch {
      return false;
    }
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  // Ensure invoice exists (fast fail)
  const exists = await client.fetch(
    `defined(*[_type=="invoice" && _id==$id][0]._id)`,
    { id }
  );
  if (!exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const targetUrl = `${origin}/invoices?id=${encodeURIComponent(id)}&print=1`;

  const path = resolveExecutablePath();
  if (!path)
    return NextResponse.json(
      { error: "Chromium not configured" },
      { status: 500 }
    );

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: path,
  });
  const page = await browser.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
  });
  await browser.close();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${id}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
