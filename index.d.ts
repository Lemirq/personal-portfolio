declare interface ExcludedDirectories {
  directoryName: string;
}

declare interface body {
  children: {
    marks: [];
    text: string;
    _key: string;
    _type: string;
  }[];
  _type: string;
  style: string;
  _key: string;
  markDefs: [];
}

declare interface project {
  invisible: boolean;
  title: string;
  order: number | null;
  headline: string;
  url: string;
  tech: {
    _ref: string;
    _type: string;
    _key: string;
  }[];
  body: body[];
  _id: string;
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
}
declare interface about {
  heading: string;
  iknow: {
    _key: string;
    _ref: string;
    _type: string;
  }[];
  body: string;
  mainImage: {
    asset: {
      url: string;
      _id: string;
    };
  };
}

declare interface iknow {
  _id: string;
  title: string;
  img: string;
  className: string;
}

declare interface tech {
  techName: string;
  _id: string;
}

declare interface ClientDoc {
  _id: string;
  _type: "client";
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

declare interface InvoiceServiceItem {
  description: string;
  quantity: number;
  rate: number;
  total?: number;
}

declare interface InvoiceDoc {
  _id: string;
  _type: "invoice";
  invoiceNumber?: string;
  issueDate?: string; // ISO date
  dueDate?: string; // ISO date
  client: { _ref: string; _type: "reference" } | ClientDoc;
  services: InvoiceServiceItem[];
  taxRate?: number; // percent
  notes?: string;
  status?: "draft" | "sent" | "paid";
}

// Fallback types for packages without TS in this project
declare module "react-to-print";
