import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";
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

  // Minimal body with link to hosted invoice page
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const invoiceUrl = `${origin}/invoice/${id}`;
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1225">
      <p>Hi ${(invoice.client as any)?.name || ""},</p>
      <p>Your invoice ${invoice.invoiceNumber || ""} is available here:</p>
      <p><a href="${invoiceUrl}">${invoiceUrl}</a></p>
      <p>Total: $${total.toFixed(2)}</p>
      <p>Thank you!</p>
    </div>
  `;

  // We no longer attach PDFs

  const resend = new Resend(process.env.RESEND);
  const { error } = await resend.emails.send({
    from: "Vihaan Sharma <vihaan@vhaan.me>",
    to,
    subject: `Invoice ${invoice.invoiceNumber || ""}`,
    html,
  });

  const posthog = getPostHogClient();
  const distinctId = request.headers.get('x-posthog-distinct-id') || 'anonymous-server';

  if (error) {
    posthog.capture({
      distinctId,
      event: 'invoice_email_failed',
      properties: {
        invoice_id: id,
        invoice_number: invoice.invoiceNumber,
        error: error.message,
        source: 'api',
      },
    });
    return NextResponse.json({ error }, { status: 500 });
  }

  posthog.capture({
    distinctId,
    event: 'invoice_email_delivered',
    properties: {
      invoice_id: id,
      invoice_number: invoice.invoiceNumber,
      total_amount: total,
      source: 'api',
    },
  });
  return NextResponse.json({ ok: true });
}
