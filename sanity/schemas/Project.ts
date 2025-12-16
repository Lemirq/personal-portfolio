import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleDesc",
      by: [{ field: "title", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "invisible",
      title: "Invisible",
      type: "boolean",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "Optional YouTube (or other) video URL to embed for this project. If present, it will be shown instead of the image.",
    }),
    defineField({
      name: "tech",
      title: "Tech",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tech" }],
        },
      ],
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      description: "A high-level summary of the project.",
      type: "blockContent",
    }),
    defineField({
      name: "problemStatement",
      title: "Problem Statement",
      description: "What problem were you solving?",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      description: "How did you solve it?",
      type: "blockContent",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "blockContent",
    }),
    defineField({
      name: "results",
      title: "Results / Impact",
      type: "blockContent",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      description: "Additional images to showcase in the project modal.",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
});
