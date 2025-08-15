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
          <div className={cn(block || "text-sm text-slate-200")}>
            {children}
          </div>
        ),
        list: ({ children }) => (
          <ul className="list-disc list-outside pl-5 text-sm text-slate-200">
            {children}
          </ul>
        ),
        listItem: ({ children }) => (
          <li className="text-sm text-slate-300">{children}</li>
        ),
      }}
      value={markdown}
    />
  );
};

export default Markdown;
