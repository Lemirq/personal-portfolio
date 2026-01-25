import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { format } from "date-fns";
import { getPostHogClient } from "@/lib/posthog-server";

const generateInvoiceNumber = async (): Promise<string> => {
  // Generate INV-YYYYMMDD-XXXX based on count that day
  const today = format(new Date(), "yyyyMMdd");
  const existing: { invoiceNumber?: string }[] = await client.fetch(
    `*[_type == "invoice" && invoiceNumber match $prefix]{invoiceNumber}`,
    { prefix: `INV-${today}-*` }
  );
  const seq = existing.length + 1;
  return `INV-${today}-${String(seq).padStart(3, "0")}`;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const invoice: InvoiceDoc = await client.fetch(
      `*[_type == "invoice" && _id == $id][0]{
        _id,_type,invoiceNumber,issueDate,dueDate,taxRate,notes,status,
        client->{_id,_type,name,email,phone,address},
        services[]{description,quantity,rate,total}
      }`,
      { id }
    );
    return NextResponse.json({ invoice });
  }
  const invoices: InvoiceDoc[] = await client.fetch(
    `*[_type == "invoice"] | order(issueDate desc){
      _id,_type,invoiceNumber,issueDate,dueDate,taxRate,notes,status,
      client->{_id,_type,name,email,phone,address},
      services[]{description,quantity,rate,total}
    }`
  );
  return NextResponse.json({ invoices });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<InvoiceDoc>;
  const hasId = Boolean(body._id);

  const services = (body.services ?? []).map((s: any) => ({
    _key:
      typeof s?._key === "string" && s._key.length > 0
        ? s._key
        : crypto.randomUUID(),
    description: s.description ?? "",
    quantity: Number(s.quantity ?? 0),
    rate: Number(s.rate ?? 0),
    total: Number((s.quantity ?? 0) * (s.rate ?? 0)),
  }));
  const taxRate = Number(body.taxRate ?? 0);

  const docBase = {
    _type: "invoice",
    invoiceNumber: body.invoiceNumber || (await generateInvoiceNumber()),
    issueDate: body.issueDate || format(new Date(), "yyyy-MM-dd"),
    dueDate: body.dueDate || undefined,
    client:
      typeof (body.client as any)?._id === "string"
        ? { _type: "reference", _ref: (body.client as any)._id }
        : body.client,
    services,
    taxRate,
    notes: body.notes ?? "",
    status: (body.status as any) ?? "draft",
  } as any;

  const posthog = getPostHogClient();
  const distinctId = request.headers.get('x-posthog-distinct-id') || 'anonymous-server';

  // Calculate total for tracking
  const subtotal = services.reduce((sum: number, s: any) => sum + (s.quantity * s.rate), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  if (hasId && body._id) {
    const patched = await client
      .patch(body._id)
      .set(docBase)
      .commit({ autoGenerateArrayKeys: true });
    posthog.capture({
      distinctId,
      event: 'invoice_updated',
      properties: {
        invoice_id: body._id,
        invoice_number: docBase.invoiceNumber,
        total_amount: total,
        services_count: services.length,
        source: 'api',
      },
    });
    return NextResponse.json({ invoice: patched });
  }
  const created = await client.create(docBase);
  posthog.capture({
    distinctId,
    event: 'invoice_created',
    properties: {
      invoice_id: created._id,
      invoice_number: docBase.invoiceNumber,
      total_amount: total,
      services_count: services.length,
      source: 'api',
    },
  });
  return NextResponse.json({ invoice: created });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  await client.delete(id);
  return NextResponse.json({ ok: true });
}
