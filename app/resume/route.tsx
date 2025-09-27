import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await client.fetch(`
    *[_type == "about"][0]{
      "file": resume.asset->url,
    }
  `);

  if (!res?.file) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return NextResponse.redirect(res.file);
}
