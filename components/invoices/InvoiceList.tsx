"use client";
import React, { useEffect, useState } from "react";

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export default function InvoiceList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [invoices, setInvoices] = useState<InvoiceDoc[]>([]);

  const load = async () => {
    const data = await fetchJSON<{ invoices: InvoiceDoc[] }>("/api/invoices");
    setInvoices(data.invoices);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const deleteInvoice = async (id: string) => {
    await fetchJSON("/api/invoices?id=" + id, { method: "DELETE" });
    await load();
  };

  return (
    <div className="bg-[#0b0f26] border border-[#1a1f3d] rounded-xl p-4">
      <h3 className="font-semibold mb-2">All Invoices</h3>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-sm">
        {invoices.map((inv) => (
          <div key={inv._id} className="fr justify-between gap-2">
            <button
              className="text-left hover:underline truncate"
              onClick={() => onSelect(inv._id)}
            >
              {(inv.invoiceNumber || "Invoice") +
                " — " +
                ((inv.client as any)?.name || "")}
            </button>
            <div className="fr gap-2">
              <button
                className="text-rose-400"
                onClick={() => deleteInvoice(inv._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
