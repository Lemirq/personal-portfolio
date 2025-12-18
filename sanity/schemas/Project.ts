import { defineField, defineType } from "sanity";
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    orderRankOrdering,
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "orderRank", direction: "asc" }],
    },
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A brief description of the project (used for previews and summaries)",
    }),
    defineField({
      name: "invisible",
      title: "Invisible",
      type: "boolean",
    }),
    orderRankField({ type: "project" }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
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
      type: "array",
      of: [
        {
          type: "object",
          title: "Feature Card",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "blockContent",
            },
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
            prepare({ title }) {
              return {
                title: title || "Feature",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Results / Impact",
      type: "array",
      of: [
        {
          type: "object",
          title: "Result Card",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "blockContent",
            },
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title: title || "Result",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Media Gallery",
      description: "Images and videos to showcase the project. Add images or YouTube/video URLs.",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
        },
        {
          type: "object",
          name: "video",
          title: "Video",
          fields: [
            {
              name: "url",
              title: "Video URL",
              type: "url",
              description: "YouTube or other video embed URL",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption for the video",
            },
          ],
          preview: {
            select: {
              url: "url",
              caption: "caption",
            },
            prepare({ url, caption }) {
              return {
                title: caption || "Video",
                subtitle: url,
                media: () => "🎥",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      invisible: "invisible",
      gallery: "gallery",
    },
    prepare({ title, invisible, gallery }) {
      // filter gallery by type image 
      const imageGallery = gallery?.filter((item: any) => item._type === "image");
      const firstItem = imageGallery?.[0];
      const media = firstItem ? firstItem : undefined;

      return {
        title,
        subtitle: invisible ? "Hidden" : "Visible",
        media,
      };
    },
  },
});
