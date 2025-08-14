// Deprecated endpoint with Puppeteer – keep returning 410 to indicate removed
import { NextRequest, NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(
    { error: "PDF generation removed. Use hosted invoice page." },
    { status: 410 }
  );
}
