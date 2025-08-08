import { defineField, defineType } from "sanity";

const Invoice = defineType({
  name: "invoice",
  title: "Invoice",
  type: "document",
  fields: [
    defineField({
      name: "invoiceNumber",
      title: "Invoice Number",
      type: "string",
    }),
    defineField({ name: "issueDate", title: "Issue Date", type: "date" }),
    defineField({ name: "dueDate", title: "Due Date", type: "date" }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "invoiceService",
          fields: [
            defineField({
              name: "description",
              title: "Description",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "rate",
              title: "Rate",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({ name: "total", title: "Total", type: "number" }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({ name: "taxRate", title: "Tax Rate (%)", type: "number" }),
    defineField({ name: "notes", title: "Notes", type: "text" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["draft", "sent", "paid"] },
      initialValue: "draft",
    }),
  ],
});

export default Invoice;
