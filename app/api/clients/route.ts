import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  const clients: ClientDoc[] =
    await client.fetch(`*[_type == "client"] | order(name asc){
    _id, _type, name, email, phone, address
  }`);
  return NextResponse.json({ clients });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { _id, name, email, phone, address } = body as Partial<ClientDoc> & {
    name: string;
  };
  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  if (_id) {
    const patched = await client
      .patch(_id)
      .set({ name, email, phone, address })
      .commit({ autoGenerateArrayKeys: true });
    return NextResponse.json({ client: patched });
  }

  const created = await client.create({
    _type: "client",
    name,
    email,
    phone,
    address,
  });
  return NextResponse.json({ client: created });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  await client.delete(id);
  return NextResponse.json({ ok: true });
}
