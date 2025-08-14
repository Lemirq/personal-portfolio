import { client } from "@/sanity/lib/client";

export default async function PublicInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const business = {
    name: "Vihaan Sharma",
    address: "210 Huguenot Rd, Oakville, ON, L6H 0L6",
    email: "sharmavihaan190@gmail.com",
    phone: "+1 (226) 503-5687",
    logoUrl: "/logos/logo-black.png",
    etransferEmail: "sharmavihaan190@gmail.com",
  };
  const invoice: InvoiceDoc | null = await client.fetch(
    `*[_type=="invoice" && _id==$id][0]{
      _id, invoiceNumber, issueDate, dueDate, taxRate, notes, status,
      client->{name,email,phone,address},
      services[]{description,quantity,rate,total}
    }`,
    { id }
  );

  if (!invoice)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invoice not found
      </div>
    );

  // very light-weight, reusing the preview component would require client-side rendering; keep server-rendered HTML here
  const subtotal = (invoice.services || []).reduce(
    (a, s) => a + (s.quantity || 0) * (s.rate || 0),
    0
  );
  const tax = subtotal * (Number(invoice.taxRate || 0) / 100);
  const total = subtotal + tax;

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <div className="min-h-screen w-screen bg-[#f6f7fb] text-[#0b1225] py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-3xl font-extrabold">Invoice</div>
            {invoice.invoiceNumber ? (
              <div className="text-sm text-slate-600">
                Invoice # {invoice.invoiceNumber}
              </div>
            ) : null}
            {invoice.issueDate ? (
              <div className="text-sm text-slate-600">
                Issue Date: {invoice.issueDate}
              </div>
            ) : null}
            {invoice.dueDate ? (
              <div className="text-sm text-slate-600">
                Due Date: {invoice.dueDate}
              </div>
            ) : null}
          </div>
          {business.logoUrl ? (
            <img
              src={business.logoUrl}
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <div className="font-semibold uppercase text-xs tracking-wider text-slate-500">
              From
            </div>
            <div>{business.name}</div>
            {business.address ? (
              <div className="text-sm text-slate-600 whitespace-pre-wrap">
                {business.address}
              </div>
            ) : null}
            {business.email ? (
              <div className="text-sm text-slate-600">{business.email}</div>
            ) : null}
            {business.phone ? (
              <div className="text-sm text-slate-600">{business.phone}</div>
            ) : null}
          </div>
          <div>
            <div className="font-semibold uppercase text-xs tracking-wider text-slate-500">
              Bill To
            </div>
            <div>{(invoice.client as any)?.name}</div>
            {(invoice.client as any)?.email ? (
              <div className="text-sm text-slate-600">
                {(invoice.client as any).email}
              </div>
            ) : null}
            {(invoice.client as any)?.phone ? (
              <div className="text-sm text-slate-600">
                {(invoice.client as any).phone}
              </div>
            ) : null}
            {(invoice.client as any)?.address ? (
              <div className="text-sm text-slate-600 whitespace-pre-wrap">
                {(invoice.client as any).address}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 rounded overflow-hidden border border-slate-200">
          <div className="grid grid-cols-12 bg-slate-100 text-sm font-medium">
            <div className="col-span-6 p-2">Description</div>
            <div className="col-span-2 p-2 text-right">Qty</div>
            <div className="col-span-2 p-2 text-right">Rate</div>
            <div className="col-span-2 p-2 text-right">Total</div>
          </div>
          {(invoice.services || []).map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-12 border-t border-slate-200 text-sm"
            >
              <div className="col-span-6 p-2">{s.description}</div>
              <div className="col-span-2 p-2 text-right">
                {Number(s.quantity || 0).toFixed(2)}
              </div>
              <div className="col-span-2 p-2 text-right">
                ${formatCurrency(Number(s.rate || 0))}
              </div>
              <div className="col-span-2 p-2 text-right">
                ${formatCurrency((s.quantity || 0) * (s.rate || 0))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 w-full flex justify-end text-sm">
          <div className="w-64">
            <div className="flex justify-between">
              <div className="text-slate-600">Subtotal</div>
              <div>${formatCurrency(subtotal)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-slate-600">
                Tax ({Number(invoice.taxRate || 0).toFixed(2)}%)
              </div>
              <div>${formatCurrency(tax)}</div>
            </div>
            <div className="flex justify-between font-semibold mt-1 border-t border-slate-300 pt-2 text-base">
              <div>Total</div>
              <div>${formatCurrency(total)}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
          <div className="font-semibold mb-1">Payment Instructions</div>
          <div className="text-sm">
            Please send e‑transfer to{" "}
            <span className="font-medium">{business.etransferEmail}</span>.
          </div>
        </div>

        {invoice.notes ? (
          <div className="mt-6">
            <div className="font-semibold">Notes</div>
            <div className="text-slate-600 text-sm whitespace-pre-wrap">
              {invoice.notes}
            </div>
          </div>
        ) : null}

        <div className="mt-6 text-center text-slate-700 text-sm">
          Thanks for your business!
        </div>
      </div>
    </div>
  );
}
