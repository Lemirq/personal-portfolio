import { Providers } from "../providers";
import InvoiceEditor from "@/components/invoices/InvoiceEditor";

export default function InvoicesPage() {
  return (
    <div className="bg-[#000318] bg-grid-white/[0.02] text-white min-h-screen w-screen overflow-x-hidden dark overscroll-none">
      <Providers>
        <InvoiceEditor />
      </Providers>
    </div>
  );
}
