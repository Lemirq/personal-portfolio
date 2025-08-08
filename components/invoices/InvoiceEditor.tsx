"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoicePreview, { BusinessInfo } from "./InvoicePreview";
import InvoiceList from "./InvoiceList";
import { format } from "date-fns";

const defaultBusiness: BusinessInfo = {
  name: "Vihaan Sharma",
  address: "210 Huguenot Rd, Oakville, ON, L6H 0L6",
  email: "sharmavihaan190@gmail.com",
  phone: "+1 (226) 503-5687",
  logoUrl: "/logos/logo-black.png",
  taxLabel: "Tax",
};

const inputBase =
  "bg-[#0d112a] border border-[#1a1f3d] rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-600";
const btnBase = "px-3 py-2 rounded text-sm font-medium";

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export default function InvoiceEditor() {
  const [clients, setClients] = useState<ClientDoc[]>([]);
  const [invoice, setInvoice] = useState<InvoiceDoc>({
    _id: "",
    _type: "invoice",
    client: { _ref: "", _type: "reference" } as any,
    services: [{ description: "", quantity: 1, rate: 0 }],
    taxRate: 0,
    invoiceNumber: undefined,
    issueDate: format(new Date(), "yyyy-MM-dd"),
    dueDate: undefined,
    notes: "",
    status: "draft",
  });
  const [editingClient, setEditingClient] = useState<Partial<ClientDoc>>({});
  const newClientNameRef = useRef<HTMLInputElement | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const previewRootId = "invoice-print-root";
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const printableRootRef = useRef<HTMLDivElement | null>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const baseWidthPx = 8.5 * 96; // 8.5in at 96dpi
    const baseHeightPx = 11 * 96; // 11in at 96dpi
    const updateScale = () => {
      if (!previewContainerRef.current) return;
      const rect = previewContainerRef.current.getBoundingClientRect();
      const containerWidth = rect.width - 16; // padding allowance
      const containerHeight = rect.height - 16;
      const scaleW = containerWidth / baseWidthPx;
      const scaleH = containerHeight / baseHeightPx;
      const scale = Math.min(1, scaleW, scaleH);
      setPreviewScale(Number.isFinite(scale) && scale > 0 ? scale : 1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    fetchJSON<{ clients: ClientDoc[] }>("/api/clients")
      .then((d) => setClients(d.clients))
      .catch(() => {});
  }, []);

  const selectedClient = useMemo(() => {
    if ((invoice.client as any)?._id) return invoice.client as ClientDoc;
    const ref = (invoice.client as any)?._ref;
    return clients.find((c) => c._id === ref);
  }, [invoice.client, clients]);

  const totals = useMemo(() => {
    const subtotal = (invoice.services || []).reduce(
      (a, s) => a + (s.quantity || 0) * (s.rate || 0),
      0
    );
    const tax = (subtotal * Number(invoice.taxRate || 0)) / 100;
    return { subtotal, tax, total: subtotal + tax };
  }, [invoice.services, invoice.taxRate]);

  const saveClient = async () => {
    if (!editingClient.name || editingClient.name.trim().length === 0) {
      alert("Client name is required");
      newClientNameRef.current?.focus();
      return;
    }
    try {
      const payload = editingClient;
      const res = await fetchJSON<{ client: ClientDoc }>("/api/clients", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setClients((prev) => {
        const idx = prev.findIndex((c) => c._id === res.client._id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = res.client;
          return copy;
        }
        return [...prev, res.client].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      });
      // Select newly created/updated client on the invoice form
      setInvoice((p) => ({
        ...p,
        client: { _type: "reference", _ref: res.client._id } as any,
      }));
      setEditingClient({});
      alert("Client saved");
    } catch (err: any) {
      alert("Failed to save client: " + (err?.message || "Unknown error"));
    }
  };

  const deleteClient = async (id: string) => {
    await fetchJSON("/api/clients?id=" + id, { method: "DELETE" });
    setClients((prev) => prev.filter((c) => c._id !== id));
  };

  const saveInvoice = async () => {
    if (!selectedClient?._id) {
      alert("Please select a client before saving the invoice");
      return;
    }
    const payload = {
      ...invoice,
      client: selectedClient?._id
        ? { _id: selectedClient._id }
        : invoice.client,
    } as Partial<InvoiceDoc>;
    const res = await fetchJSON<{ invoice: InvoiceDoc }>("/api/invoices", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setInvoice((prev) => ({
      ...prev,
      _id: res.invoice._id,
      invoiceNumber: res.invoice.invoiceNumber,
    }));
  };

  const emailInvoice = async () => {
    if (!invoice._id) return alert("Please save the invoice first");
    const base64 = await generatePdfFromPreview();
    await fetch(`/api/invoices/email?id=${invoice._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pdf: base64 }),
    });
    alert("Email sent");
  };

  const downloadPdf = async () => {
    const base64 = await generatePdfFromPreview();
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });
    const bytes = atob(base64);
    const len = bytes.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.invoiceNumber || "invoice"}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  async function generatePdfFromPreview(): Promise<string> {
    const node = document.getElementById(
      previewRootId
    ) as HTMLDivElement | null;
    if (!node) throw new Error("Preview not ready");
    // Clone unscaled preview to avoid capturing scaled/blurred text
    const offscreen = document.createElement("div");
    offscreen.style.position = "fixed";
    offscreen.style.left = "-10000px";
    offscreen.style.top = "0";
    offscreen.style.background = "#ffffff";
    offscreen.style.width = `${8.5 * 96}px`;
    offscreen.style.height = `${11 * 96}px`;
    const clone = node.cloneNode(true) as HTMLElement;
    clone.style.transform = "none";
    clone.style.width = "8.5in";
    clone.style.height = "11in";
    // Improve text spacing and rendering for rasterization
    clone.style.letterSpacing = "normal";
    clone.style.lineHeight = "1.35";
    clone.style.textRendering = "optimizeLegibility";
    offscreen.appendChild(clone);
    document.body.appendChild(offscreen);
    try {
      // @ts-ignore
      if (document.fonts && document.fonts.ready)
        await (document.fonts as any).ready;
    } catch {}
    const scale = Math.max(2, Math.ceil((window.devicePixelRatio || 1) * 2));
    const canvas = await html2canvas(clone, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      letterRendering: true,
    });
    document.body.removeChild(offscreen);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    return pdf.output("datauristring").split(",")[1];
  }

  const loadInvoice = async (id: string) => {
    const res = await fetchJSON<{ invoice: InvoiceDoc }>(
      `/api/invoices?id=${id}`
    );
    const loaded = res.invoice;
    setInvoice({
      _id: loaded._id,
      _type: "invoice",
      invoiceNumber: loaded.invoiceNumber,
      issueDate: loaded.issueDate,
      dueDate: loaded.dueDate,
      client: (loaded.client as any)?._id
        ? { _type: "reference", _ref: (loaded.client as any)._id }
        : loaded.client,
      services: loaded.services || [],
      taxRate: loaded.taxRate || 0,
      notes: loaded.notes || "",
      status: loaded.status || "draft",
    });
    // ensure the selected client exists in local list
    const c = loaded.client as any;
    if (c?._id && !clients.find((x) => x._id === c._id))
      setClients((prev) => [...prev, c]);
  };

  const removeService = (idx: number) => {
    setInvoice((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== idx),
    }));
  };

  const updateService = (
    idx: number,
    field: keyof InvoiceServiceItem,
    value: string
  ) => {
    setInvoice((prev) => {
      const copy = [...prev.services];
      const item = { ...copy[idx] } as InvoiceServiceItem;
      if (field === "description") item.description = value;
      if (field === "quantity") item.quantity = Number(value);
      if (field === "rate") item.rate = Number(value);
      copy[idx] = item;
      return { ...prev, services: copy };
    });
  };

  return (
    <div className="w-full overflow-x-hidden py-10 px-4 md:px-6 lg:px-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>

      <div className="flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-10">
        <div className="flex-1 min-w-0 md:pr-4 flex flex-col gap-6">
          <div className="bg-[#0b0f26] border border-[#1a1f3d] rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Issue Date</label>
                <input
                  className={inputBase}
                  type="date"
                  value={invoice.issueDate || ""}
                  onChange={(e) =>
                    setInvoice({ ...invoice, issueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Due Date</label>
                <input
                  className={inputBase}
                  type="date"
                  value={invoice.dueDate || ""}
                  onChange={(e) =>
                    setInvoice({ ...invoice, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400">Client</label>
              <div className="fr gap-2">
                <select
                  className={inputBase}
                  value={(invoice.client as any)?._ref || ""}
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      client: {
                        _type: "reference",
                        _ref: e.target.value,
                      } as any,
                    })
                  }
                >
                  <option value="">Select a client…</option>
                  {clients.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  className={`${btnBase} bg-violet-600`}
                  onClick={() => {
                    setEditingClient({});
                    setTimeout(() => newClientNameRef.current?.focus(), 0);
                  }}
                >
                  New
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400">Services</label>
              <div className="space-y-2">
                {invoice.services.map((svc, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      className={`${inputBase} col-span-6`}
                      placeholder="Description"
                      value={svc.description}
                      onChange={(e) =>
                        updateService(i, "description", e.target.value)
                      }
                    />
                    <input
                      className={`${inputBase} col-span-2`}
                      type="number"
                      min={0}
                      placeholder="Qty"
                      value={svc.quantity}
                      onChange={(e) =>
                        updateService(i, "quantity", e.target.value)
                      }
                    />
                    <input
                      className={`${inputBase} col-span-2`}
                      type="number"
                      min={0}
                      placeholder="Rate"
                      value={svc.rate}
                      onChange={(e) => updateService(i, "rate", e.target.value)}
                    />
                    <div className="col-span-1 text-right text-sm">
                      ${(svc.quantity * svc.rate).toFixed(2)}
                    </div>
                    <button
                      className="col-span-1 text-rose-400 text-sm"
                      onClick={() => removeService(i)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className={`${btnBase} bg-[#131a3a] border border-[#1a1f3d]`}
                  onClick={() =>
                    setInvoice((p) => ({
                      ...p,
                      services: [
                        ...p.services,
                        { description: "", quantity: 1, rate: 0 },
                      ],
                    }))
                  }
                >
                  + Add Service
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-400">Tax Rate (%)</label>
                <input
                  className={inputBase}
                  type="number"
                  min={0}
                  value={invoice.taxRate || 0}
                  onChange={(e) =>
                    setInvoice({ ...invoice, taxRate: Number(e.target.value) })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-400">Notes</label>
                <input
                  className={inputBase}
                  placeholder="Optional notes"
                  value={invoice.notes || ""}
                  onChange={(e) =>
                    setInvoice({ ...invoice, notes: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="fr justify-between pt-2">
              <div className="text-sm text-slate-300">
                Subtotal: ${totals.subtotal.toFixed(2)} | Tax: $
                {totals.tax.toFixed(2)} | Total: ${totals.total.toFixed(2)}
              </div>
              <div className="fr gap-2">
                <button
                  className={`${btnBase} bg-violet-600`}
                  onClick={saveInvoice}
                >
                  Save Invoice
                </button>
                <button
                  className={`${btnBase} bg-indigo-600`}
                  onClick={emailInvoice}
                >
                  Send Email
                </button>
                {invoice._id ? (
                  <button
                    className={`${btnBase} bg-emerald-600`}
                    onClick={downloadPdf}
                  >
                    Download PDF
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <InvoiceList onSelect={loadInvoice} />
            <div className="bg-[#0b0f26] border border-[#1a1f3d] rounded-xl p-4">
              <div className="fr justify-between items-center mb-2">
                <h3 className="font-semibold">Clients</h3>
                <button
                  className={`${btnBase} bg-violet-600`}
                  onClick={() => setEditingClient({})}
                >
                  New Client
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {clients.map((c) => (
                  <div key={c._id} className="fr justify-between gap-2 text-sm">
                    <button
                      className="text-left truncate hover:underline"
                      onClick={() =>
                        setInvoice((p) => ({
                          ...p,
                          client: { _type: "reference", _ref: c._id } as any,
                        }))
                      }
                    >
                      {c.name}
                    </button>
                    <button
                      className="text-rose-400"
                      onClick={() => deleteClient(c._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0b0f26] border border-[#1a1f3d] rounded-xl p-4 space-y-2">
              <h3 className="font-semibold">
                {editingClient?._id ? "Edit Client" : "New Client"}
              </h3>
              <input
                className={inputBase}
                placeholder="Name"
                ref={newClientNameRef}
                value={editingClient.name || ""}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, name: e.target.value })
                }
              />
              <input
                className={inputBase}
                placeholder="Email"
                value={editingClient.email || ""}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, email: e.target.value })
                }
              />
              <input
                className={inputBase}
                placeholder="Phone"
                value={editingClient.phone || ""}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, phone: e.target.value })
                }
              />
              <textarea
                className={inputBase}
                placeholder="Address"
                value={editingClient.address || ""}
                onChange={(e) =>
                  setEditingClient({
                    ...editingClient,
                    address: e.target.value,
                  })
                }
              />
              <div className="fr gap-2">
                <button
                  className={`${btnBase} bg-violet-600`}
                  onClick={saveClient}
                >
                  Save Client
                </button>
                {editingClient._id ? (
                  <button
                    className={`${btnBase} bg-[#131a3a] border border-[#1a1f3d]`}
                    onClick={() => setEditingClient({})}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <aside
          className="md:sticky md:top-6 flex-shrink-0 max-h-[calc(100vh-5rem)] overflow-hidden md:pl-4 w-full md:w-[min(48vw,900px)] lg:w-[min(44vw,960px)]"
          ref={previewContainerRef}
        >
          <div className="bg-white/5 border border-[#1a1f3d] rounded-xl p-3">
            <div className="fr justify-between mb-2">
              <h3 className="font-semibold text-white">Live Preview</h3>
              <span className="text-xs text-slate-300">
                Letter (8.5in x 11in)
              </span>
            </div>
            <div
              className="rounded-lg shadow"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: "top left",
                width: `${8.5 * 96}px`,
                height: `${11 * 96}px`,
              }}
            >
              <div
                id={previewRootId}
                className="bg-white rounded-lg overflow-hidden"
                style={{ width: "8.5in" }}
              >
                <InvoicePreview
                  business={defaultBusiness}
                  invoice={{
                    ...invoice,
                    client: (selectedClient as any) || invoice.client,
                  }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
