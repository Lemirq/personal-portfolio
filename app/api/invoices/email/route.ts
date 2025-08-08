import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { Resend } from "resend";
// optional: accept pre-rendered PDF from client

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  const invoice: InvoiceDoc | null = await client.fetch(
    `*[_type == "invoice" && _id == $id][0]{
      _id,_type,invoiceNumber,issueDate,dueDate,taxRate,notes,status,
      client->{_id,_type,name,email,phone,address},
      services[]{description,quantity,rate,total}
    }`,
    { id }
  );

  if (!invoice)
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  const to = (invoice.client as any)?.email;
  if (!to)
    return NextResponse.json(
      { error: "Client email not available" },
      { status: 400 }
    );

  const subtotal = (invoice.services || []).reduce(
    (a, s) => a + (s.quantity || 0) * (s.rate || 0),
    0
  );
  const tax = subtotal * (Number(invoice.taxRate || 0) / 100);
  const total = subtotal + tax;

  // Minimal body; PDF will be attached
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1225">
      <p>Hi ${(invoice.client as any)?.name || ""},</p>
      <p>Your invoice ${invoice.invoiceNumber || ""} is attached as a PDF.</p>
      <p>Total: $${total.toFixed(2)}</p>
      <p>Thank you!</p>
    </div>
  `;

  // Prefer base64 PDF from client; if not provided, generate server-side via Puppeteer PDF endpoint
  let pdfBase64: string | undefined;
  if (request.headers.get("content-type")?.includes("application/json")) {
    try {
      const data = await request.json();
      if (data?.pdf && typeof data.pdf === "string") pdfBase64 = data.pdf;
    } catch {}
  }
  if (!pdfBase64) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${origin}/api/invoices/pdf?id=${encodeURIComponent(id)}`
    );
    if (res.ok) {
      const buf = await res.arrayBuffer();
      pdfBase64 = Buffer.from(buf).toString("base64");
    }
  }

  const resend = new Resend(process.env.RESEND);
  const { error } = await resend.emails.send({
    from: "Vihaan Sharma <vihaan@vhaan.me>",
    to,
    subject: `Invoice ${invoice.invoiceNumber || ""}`,
    html,
    attachments: pdfBase64
      ? [
          {
            filename: `${invoice.invoiceNumber || "invoice"}.pdf`,
            content: pdfBase64,
          },
        ]
      : undefined,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
