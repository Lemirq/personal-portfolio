import type { BlockContent } from "@/sanity.types";

/**
 * Extracts plain text from Sanity BlockContent (Portable Text)
 * Used for SEO and LLM accessibility
 */
export function extractTextFromBlockContent(
  content: BlockContent | undefined
): string {
  if (!content || !Array.isArray(content)) return "";

  return content
    .map((block) => {
      // Handle text blocks
      if (block._type === "block") {
        return (
          block.children
            ?.map((child) => {
              if ("text" in child) {
                return child.text;
              }
              return "";
            })
            .join("") || ""
        );
      }
      // Skip image blocks and other non-text content
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
