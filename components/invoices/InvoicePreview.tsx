"use client";
import React, { forwardRef } from "react";

export interface BusinessInfo {
  name: string;
  address?: string;
  email: string;
  phone?: string;
  logoUrl?: string;
  taxLabel?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function computeTotals(
  services: Array<{ quantity?: number; rate?: number }>,
  taxRate: number
) {
  const subtotal = services.reduce(
    (a, s) => a + (s.quantity || 0) * (s.rate || 0),
    0
  );
  const tax = (subtotal * (taxRate || 0)) / 100;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

const InvoicePreview = forwardRef<
  HTMLDivElement,
  { business: BusinessInfo; invoice: InvoiceDoc }
>(({ business, invoice }, ref) => {
  const { subtotal, tax, total } = computeTotals(
    invoice.services || [],
    Number(invoice.taxRate || 0)
  );
  const client = invoice.client as unknown as Partial<ClientDoc>;
  return (
    <div
      ref={ref as any}
      className="bg-white text-[#0b1225] w-[8.5in] min-h-[11in] p-[0.6in] mx-auto"
    >
      <style>{`
@page { size: Letter; margin: 0.5in; }
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
}
        `}</style>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl font-extrabold tracking-tight">Invoice</div>
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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.logoUrl}
            alt="Logo"
            className="w-28 h-28 object-contain"
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
            <div className="text-slate-600 text-sm whitespace-pre-wrap">
              {business.address}
            </div>
          ) : null}
          <div className="text-slate-600 text-sm">{business.email}</div>
          {business.phone ? (
            <div className="text-slate-600 text-sm">{business.phone}</div>
          ) : null}
        </div>
        <div>
          <div className="font-semibold uppercase text-xs tracking-wider text-slate-500">
            Bill To
          </div>
          <div>{client?.name}</div>
          {client?.address ? (
            <div className="text-slate-600 text-sm whitespace-pre-wrap">
              {client.address}
            </div>
          ) : null}
          {client?.email ? (
            <div className="text-slate-600 text-sm">{client.email}</div>
          ) : null}
          {client?.phone ? (
            <div className="text-slate-600 text-sm">{client.phone}</div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 rounded overflow-hidden border border-slate-200 shadow-xs">
        <div className="grid grid-cols-12 bg-slate-100/80 text-sm font-medium">
          <div className="col-span-6 p-2">Description</div>
          <div className="col-span-2 p-2 text-right">Qty</div>
          <div className="col-span-2 p-2 text-right">Rate</div>
          <div className="col-span-2 p-2 text-right">Total</div>
        </div>
        {(invoice.services || []).map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-12 border-t border-slate-200 text-sm hover:bg-slate-50"
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
        <div className="w-72">
          <div className="flex justify-between">
            <div className="text-slate-600">Subtotal</div>
            <div>${formatCurrency(subtotal)}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-slate-600">
              {business.taxLabel || "Tax"} (
              {Number(invoice.taxRate || 0).toFixed(2)}%)
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
          <span className="font-medium">sharmavihaan190@gmail.com</span>.
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
  );
});

InvoicePreview.displayName = "InvoicePreview";
export default InvoicePreview;
