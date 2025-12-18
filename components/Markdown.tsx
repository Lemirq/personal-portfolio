import React from "react";
import { PortableText } from "next-sanity";
import { BlockContent } from "@/sanity.types";
import { cn } from "@/utils/cn";

const Markdown = ({
  markdown,
  block,
}: {
  markdown: BlockContent;
  block?: string;
}) => {
  return (
    <PortableText
      components={{
        block: ({ children }) => (
          <div className={cn(block || "text-sm text-neutral-400")}>
            {children}
          </div>
        ),
        list: ({ children }) => (
          <ul className="list-disc list-outside pl-5 fc gap-2 items-start text-sm text-neutral-400">
            {children}
          </ul>
        ),
        listItem: ({ children }) => (
          <li className="text-sm text-neutral-400">{children}</li>
        ),
      }}
      value={markdown}
    />
  );
};

export default Markdown;
