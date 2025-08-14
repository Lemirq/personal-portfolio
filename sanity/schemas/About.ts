import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "iknow",
      title: "Tech I Know",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "iknow" }],
        },
      ],
    }),

    defineField({
      name: "mainImage",
      title: "Image",
      type: "image",
    }),
  ],
});
