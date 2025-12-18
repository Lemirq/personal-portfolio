import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: "experience",
  title: "Work Experience",
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
    {
      name: "title",
      title: "Job Title",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave blank if currently working here",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    orderRankField({ type: "experience" }),
  ],
};
