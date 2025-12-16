import type {
  Project as SanityProject,
  Tech as SanityTech,
  About as SanityAbout,
  Iknow as SanityIknow,
  Client as SanityClient,
  Invoice as SanityInvoice,
  BlockContent,
  ExcludedDirectories as SanityExcludedDirectories,
} from "./sanity.types";

declare global {
  interface ExcludedDirectories extends SanityExcludedDirectories {}

  // Align our runtime shape with GROQ selections (asset-> { _id, url })
  interface project extends Omit<SanityProject, "body" | "mainImage"> {
    slug: { current: string };
    headline: string;
    overview: BlockContent;
    problemStatement: BlockContent;
    solution: BlockContent;
    features: BlockContent;
    results: BlockContent;
    order?: number | null;
    body: BlockContent;
    mainImage: {
      asset: {
        _id: string;
        url: string;
      };
    };
    gallery?: Array<{
      asset: {
        _id: string;
        url: string;
      };
    }>;
  }

  type tech = SanityTech;
  interface about extends Omit<SanityAbout, "body"> {
    body: BlockContent;
  }
  type iknow = SanityIknow;

  // Keep convenient aliases for client/invoice docs from Sanity
  type ClientDoc = SanityClient;
  type InvoiceDoc = SanityInvoice;

  // Used in invoice components; keep as-is
  interface InvoiceServiceItem {
    description: string;
    quantity: number;
    rate: number;
    total?: number;
  }
}

// Fallback types for packages without TS in this project
declare module "react-to-print";
